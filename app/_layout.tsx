import '@azure/core-asynciterator-polyfill'
import '../tamagui-web.css'

import { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { router, SplashScreen, Stack, useSegments } from 'expo-router'
import { Provider } from './Provider'
import { useAppStore } from 'store'
import { AlertDialogWrapper } from 'components/AlertDialog'
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const segment = useSegments()
  const { isSignedIn, initApp } = useAppStore()

  useEffect(() => {
    console.debug('isSignedIn: ', isSignedIn)
    if (isSignedIn) initApp()
    else initApp()
  }, [isSignedIn])

  useEffect(() => {
    // console.debug('return to root: ', segment[0] === '(auth)' && !isSignedIn)
    if (segment[0] === '(auth)' && !isSignedIn) {
      router.replace('/')
    } else if (isSignedIn) {
      router.replace('/(auth)/(tabs)')
    }
  }, [isSignedIn])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AlertDialogWrapper />
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="signIn"
          options={{ headerShown: true, headerTitle: 'Bodytrackr' }}
        />
        <Stack.Screen
          name="signUp"
          options={{ headerShown: true, headerTitle: 'Bodytrackr' }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
