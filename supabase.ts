import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import {
  configureSyncedSupabase,
  syncedSupabase,
} from "@legendapp/state/sync-plugins/supabase";
import { v4 as uuidv4 } from "uuid";
import { observable } from "@legendapp/state";

const SUPABASE_URL = "https://pddkthwdvsxtlceimttc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkZGt0aHdkdnN4dGxjZWltdHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NTY3NTYsImV4cCI6MjA0MzUzMjc1Nn0.HCg_o0xMxhweWI2FP6vaiOgSu1_BmsL_KIHIF43ibog";

export const SUPABASE_CLIENT = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

const generateId = () => uuidv4();
configureSyncedSupabase({
  generateId,
});

//const todos$ = observable(
//  syncedSupabase({
//    supabase: SUPABASE_CLIENT,
//    collection: "todos",
//    select: (from) => from.select("*"),
//  }),
//);
