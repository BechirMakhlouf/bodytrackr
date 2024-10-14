import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import {
	configureSyncedSupabase,
	syncedSupabase,
} from "@legendapp/state/sync-plugins/supabase";
import { v4 as uuidv4 } from "uuid";
import { observable } from "@legendapp/state";

const supabase = createClient<Database>(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!,
);

const generateId = () => uuidv4();
configureSyncedSupabase({
	generateId,
});

const todos$ = observable(
	syncedSupabase({
		supabase,
		collection: "todos",
		select: (from) => from.select("*"),
	}),
);
