import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gpnkvmnrhnzlnphnante.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwbmt2bW5yaG56bG5waG5hbnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDk4NzAsImV4cCI6MjA2ODIyNTg3MH0.ba0RLTsufIDJkK_dyq_X9mbKFj7FTqarbbEHC61x8tY'
export const supabase = createClient(supabaseUrl, supabaseKey)