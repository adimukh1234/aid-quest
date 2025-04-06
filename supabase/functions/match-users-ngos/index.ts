
// Follow Supabase Edge Functions format
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create supabase client using environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the user ID from the request if available
    let userId = null;
    const authHeader = req.headers.get('Authorization');
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (!error && user) {
        userId = user.id;
      }
    }

    // Get all profiles and NGOs
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) {
      throw profilesError;
    }

    const { data: ngos, error: ngosError } = await supabase
      .from('ngos')
      .select('*');

    if (ngosError) {
      throw ngosError;
    }

    // Calculate mock matching scores and update user_ngo_matches
    const matches = [];
    
    for (const profile of profiles) {
      for (const ngo of ngos) {
        // Simple mock algorithm for matching - in real app would use more sophisticated approach
        const score = Math.random() * 100; // Random score between 0-100
        
        // Create matching record
        matches.push({
          user_id: profile.id,
          ngo_id: ngo.id,
          match_score: score,
        });
      }
    }

    // Insert matches in batches (to avoid hitting size limits)
    const batchSize = 100;
    
    for (let i = 0; i < matches.length; i += batchSize) {
      const batch = matches.slice(i, i + batchSize);
      
      // Use upsert to handle existing matches
      const { error: insertError } = await supabase
        .from('user_ngo_matches')
        .upsert(batch, { 
          onConflict: 'user_id,ngo_id',
          ignoreDuplicates: false 
        });
      
      if (insertError) {
        throw insertError;
      }
    }

    // Return the user's personal matches if userId is available
    if (userId) {
      const { data: userMatches, error: userMatchesError } = await supabase
        .from('user_ngo_matches')
        .select(`
          *,
          ngos:ngo_id (*)
        `)
        .eq('user_id', userId)
        .order('match_score', { ascending: false });
      
      if (userMatchesError) {
        throw userMatchesError;
      }
      
      return new Response(
        JSON.stringify({ success: true, matches: userMatches }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Matches updated successfully',
        totalMatches: matches.length
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }
});
