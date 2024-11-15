import { Tabs } from 'expo-router'
import { View, Button, Text, useTheme } from 'tamagui'
import { Atom, LogOut, Weight } from '@tamagui/lucide-icons'
import { useAppStore } from 'store'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { AddWeightDialog } from 'components/AddWeightDialog'
export default function TabLayout() {
  const theme = useTheme()
  const { signOut } = useAppStore()

  return (
    <>
      <AddWeightDialog />
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
            title: 'Tab One',
            tabBarIcon: ({ color }) => <Atom color={color} />,
            headerRight: () => (
              <Button
                mr="$4"
                bg="$purple8"
                backgroundColor={'$colorTransparent'}
                icon={<LogOut size={'$2'} />}
                onPress={async () => await signOut()}
              ></Button>
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Weight Log',
            tabBarIcon: ({ color }) => <Weight color={color} />,
          }}
        />
      </Tabs>
    </>
  )
}
