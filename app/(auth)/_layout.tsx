import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
//import { Provider } from './Provider'
import { useTheme, Text } from 'tamagui'

export default function tabLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = useTheme()
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
          name="measurement/[measurement]"
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
