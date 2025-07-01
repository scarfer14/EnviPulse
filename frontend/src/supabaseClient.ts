import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://owwxqlqusxudxdypiuol.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93d3hxbHF1c3h1ZHhkeXBpdW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjY0ODcsImV4cCI6MjA2NjkwMjQ4N30.oQLCPnCwL4kJFvzhi-OOlS9O5yd8BXqOQZBoE7fJcdY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
