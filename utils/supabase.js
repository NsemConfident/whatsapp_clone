import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xbtqarfgoxrvjocdkzza.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidHFhcmZnb3hydmpvY2RrenphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTc0MTYsImV4cCI6MjA1ODQ3MzQxNn0._Icfmow0VsR4MXVDbpXdcDnfXs_F3MivaBuLd_kh7gM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;