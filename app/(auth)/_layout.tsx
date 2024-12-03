import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { router, Stack } from 'expo-router'
//import { Provider } from './Provider'
import { useTheme, Text } from 'tamagui'
import { useAppStore } from 'store'
import { userWeightRowToUserWeight } from 'repository/UserWeight'
import { useCallback, useEffect } from 'react'

export default function tabLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = useTheme()

  //WARN: this is temporary change this.
  useEffect(() => {
    router.navigate('/ProfileSettings')
  }, [])
  // const { repository, setWeightLog, userSettings } = useAppStore()
  // const updateUserWeightList = useCallback(async () => {
  //   if (!repository) return
  //
  //   for await (const userWeightRows of repository.userWeightRepo.watch()) {
  //     setWeightLog(userWeightRowToUserWeight(userWeightRows, userSettings?.prefUnit))
  //   }
  // }, [repository, userSettings])
  //
  // const updateUserMeasurements = useCallback(async () => {
  //   if (!repository) return
  //
  //   for await (const userWeightRows of repository.userWeightRepo.watch()) {
  //     setWeightLog(userWeightRowToUserWeight(userWeightRows, userSettings?.prefUnit))
  //   }
  // }, [repository, userSettings])
  //
  // useEffect(() => {
  //   if (!repository) {
  //     return
  //   }
  //   updateUserWeightList()
  // }, [])

  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          options={{
            title: 'Settings',
            presentation: 'modal',
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            contentStyle: {
              backgroundColor: theme.background.val,
            },
          }}
        />
        <Stack.Screen
          name="ProfileSettings"
          options={{
            title: 'Edit Profile',
            presentation: 'modal',
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            contentStyle: {
              backgroundColor: theme.background.val,
            },
          }}
        />
        <Stack.Screen
          name="measurement/[measurementTypeId]"
          options={{
            title: 'Measurement',
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            contentStyle: {
              //backgroundColor: theme.background.val,
            },
          }}
        />
      </Stack>
    </>
  )
}
