
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { NGO } from '@/integrations/supabase/client';
import { Heart, DollarSign, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const donationSchema = z.object({
  amount: z.number().min(5, 'Minimum donation is $5').max(10000, 'Maximum donation is $10,000'),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
});

type DonationFormValues = z.infer<typeof donationSchema>;

interface DonationFormProps {
  ngo: NGO;
  onSuccess?: () => void;
}

const DonationForm = ({ ngo, onSuccess }: DonationFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(25);
  
  const predefinedAmounts = [10, 25, 50, 100, 250];
  
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 25,
      fullName: '',
      email: user?.email || '',
    },
  });
  
  const handlePredefinedAmount = (amount: number) => {
    setSelectedAmount(amount);
    form.setValue('amount', amount);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSelectedAmount(value[0]);
    form.setValue('amount', value[0]);
  };
  
  const handleDonation = async (values: DonationFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to make a donation.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would integrate with a payment processor like Stripe
      // For now, we'll simulate a donation by creating a user action
      const { data, error } = await supabase
        .from('user_actions')
        .insert([{
          user_id: user.id,
          post_id: ngo.id, // Using NGO ID directly for this demo
          action_type: 'donation',
          action_details: {
            amount: values.amount,
            ngo_id: ngo.id,
            ngo_name: ngo.name,
            timestamp: new Date().toISOString(),
          },
        }])
        .select();
      
      if (error) throw error;
      
      // Update user's impact score
      // Fix: Instead of trying to use supabase.rpc, we'll simply increment the value
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('impact_score')
        .eq('id', user.id)
        .single();
        
      if (profileError) {
        console.error('Error getting current impact score:', profileError);
      } else {
        const currentScore = profileData?.impact_score || 0;
        const newScore = currentScore + Math.floor(values.amount / 2);
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ impact_score: newScore })
          .eq('id', user.id);
          
        if (updateError) {
          console.error('Error updating impact score:', updateError);
        }
      }
      
      toast({
        title: 'Donation Successful',
        description: `Thank you for your $${values.amount} donation to ${ngo.name}!`,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: 'Donation Failed',
        description: 'There was an error processing your donation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="mr-2 h-5 w-5 text-red-500" />
          Donate to {ngo.name}
        </CardTitle>
        <CardDescription>Your donation helps support their important work</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleDonation)} className="space-y-6">
          <div className="space-y-4">
            <Label>Choose an amount</Label>
            <div className="flex flex-wrap gap-2">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handlePredefinedAmount(amount)}
                  className="flex-1"
                >
                  ${amount}
                </Button>
              ))}
              <Button
                type="button"
                variant={!predefinedAmounts.includes(selectedAmount) ? "default" : "outline"}
                onClick={() => form.setFocus('amount')}
                className="flex-1"
              >
                Custom
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Custom amount</Label>
                <span className="text-sm font-medium">
                  <DollarSign className="inline h-3 w-3" />
                  {selectedAmount}
                </span>
              </div>
              
              <Slider
                id="amount"
                min={5}
                max={500}
                step={5}
                defaultValue={[25]}
                value={[selectedAmount]}
                onValueChange={handleSliderChange}
              />
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...form.register('fullName')}
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Donate ${selectedAmount}</>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-muted-foreground text-center">
          Your donation is secure and encrypted. By donating, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DonationForm;
