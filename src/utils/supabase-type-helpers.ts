
import type { Json } from '@/integrations/supabase/types';

/**
 * Helper function to cast Supabase Json type to Record<string, any>
 */
export const jsonToRecord = <T = Record<string, any>>(json: Json | null | undefined): T | null => {
  if (json === null || json === undefined) return null;
  
  if (typeof json === 'string') {
    try {
      return JSON.parse(json) as T;
    } catch (e) {
      console.error('Failed to parse JSON string:', e);
      return null;
    }
  }
  
  return json as unknown as T;
};

/**
 * Safely cast any Supabase database object that contains Json fields to their proper type
 */
export const castDatabaseObject = <T extends Record<string, any>>(
  obj: Record<string, any>,
  jsonFields: string[]
): T => {
  const result = { ...obj };
  
  for (const field of jsonFields) {
    if (field in result) {
      result[field] = jsonToRecord(result[field]);
    }
  }
  
  return result as T;
};
