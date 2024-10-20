import { createClient } from "@supabase/supabase-js";
import { observable } from "@legendapp/state";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import { configureSynced } from "@legendapp/state/sync";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ObservablePersistAsyncStorage,
  observablePersistAsyncStorage,
} from "@legendapp/state/persist-plugins/async-storage";
import { v4 as uuidv4 } from "uuid";
import { Database } from "./database.types";
import * as Crypto from "expo-crypto";

export const SUPABASE_CLIENT = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
);
