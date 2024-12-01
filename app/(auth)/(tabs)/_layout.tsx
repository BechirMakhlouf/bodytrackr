import { Tabs, useRouter } from 'expo-router'
import { View, Button, Text, useTheme, Circle } from 'tamagui'
import {
  Atom,
  LogOut,
  Menu,
  Weight,
  PersonStanding,
  Settings,
  ParkingMeter,
  User,
} from '@tamagui/lucide-icons'
import { useAppStore } from 'store'

import { AddWeightDialog } from 'components/AddWeightDialog'

export default function TabLayout() {
  const theme = useTheme()
  const router = useRouter()
  // const { repository, setWeightLog, userSettings } = useAppStore()

  // const updateUserWeightList = useCallback(async () => {
  //   if (!repository) return
  //
  //   for await (const userWeightRows of repository.userWeightRepo.watch()) {
  //     setWeightLog(
  //       userWeightRows.map(
  //         (row) =>
  //           new WeightLog(
  //             row.id,
  //             userSettings?.prefUnit === 'imperial'
  //               ? kgToLbs(row.weight_kg!)
  //               : row.weight_kg!,
  //             new Date(row.date_at!),
  //             userSettings?.prefUnit || 'metric'
  //           )
  //       )
  //     )
  //   }
  // }, [repository])
  //
  // useEffect(() => {
  //   if (!repository) {
  //     return
  //   }
  //   updateUserWeightList()
  // }, [])
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
            title: 'BodyTrackr',
            tabBarIcon: ({ color }) => <Atom color={color} />,
            headerLeft: () => (
              <Button
                mr="$4"
                bg="$purple8"
                backgroundColor={'$colorTransparent'}
                icon={<Menu size={'$2'} />}
                onPress={() => {}}
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
        <Tabs.Screen
          name="measure"
          options={{
            title: 'Measure',
            tabBarIcon: ({ color }) => <PersonStanding color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <User color={color} />,
            headerRight: () => (
              <Button
                bg="$purple8"
                backgroundColor={'$colorTransparent'}
                icon={<Settings size={'$2'} />}
                onPress={() => router.push('/(auth)/Settings')}
              ></Button>
            ),
          }}
        />
      </Tabs>
    </>
  )
}
