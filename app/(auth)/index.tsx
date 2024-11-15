import { H2, YStack, Text } from 'tamagui'
import { ToastControl } from 'app/CurrentToast'

export default function TabOneScreen() {
  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5" bg="$background">
      <H2>BodyTrackr</H2>
      <ToastControl />
    </YStack>
  )
}
