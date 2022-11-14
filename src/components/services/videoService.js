import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://dmuhomfycmjymwsmvjqs.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtdWhvbWZ5Y21qeW13c212anFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTgzNTQsImV4cCI6MTk4NDAzNDM1NH0.BxDvy9NFrwYwPq6eiTE6dsswfaMc8OvcNxmTtZLmc-0"
const supabase = createClient(PROJECT_URL,PUBLIC_KEY);


export function videoService(){
    return {
        getAllVideos(){
           return supabase.from("video")
                    .select("*")
                    
        }
    }
}