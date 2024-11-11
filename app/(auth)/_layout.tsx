import { Link, router, Tabs } from "expo-router";
import { Button, useTheme } from "tamagui";
import { Atom, AudioWaveform, Scale, Weight } from "@tamagui/lucide-icons";
import { system } from "library/powersync/system";
import { useAuth } from "app/_layout";

export default function TabLayout() {
  const theme = useTheme();
  const { setIsSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <Atom color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Button
                mr="$4"
                bg="$purple8"
                color="$purple12"
                onPress={async () => {
                  await system.supabaseConnector.client.auth.signOut();
                  setIsSignedIn(() => false);
                  router.replace("/");
                }}
              >
                Sign out
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Weight Log",
          tabBarIcon: ({ color }) => <Weight color={color} />,
        }}
      />
    </Tabs>
  );
}
