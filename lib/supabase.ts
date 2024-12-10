import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://maqiefirlfeummlwhnsk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcWllZmlybGZldW1tbHdobnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NTI0MjAsImV4cCI6MjA0OTMyODQyMH0.gFLRi3e61IKioMugnfaOQ3sOfB4I8Y8tAE25zcY-qhE',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
