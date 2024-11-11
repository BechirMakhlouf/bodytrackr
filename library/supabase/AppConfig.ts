if (
  !process.env.EXPO_PUBLIC_SUPABASE_URL ||
  !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  //!process.env.EXPO_PUBLIC_SUPABASE_BUCKET ||
  !process.env.EXPO_PUBLIC_POWERSYNC_URL
) {
  throw new Error("Some env Variables are missing");
}

export const AppConfig = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  supabaseBucket: process.env.EXPO_PUBLIC_SUPABASE_BUCKET || "",
  powersyncUrl: process.env.EXPO_PUBLIC_POWERSYNC_URL!,
};
