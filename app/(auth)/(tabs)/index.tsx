import { H2, YStack, Text } from 'tamagui'
import { ToastControl } from 'app/CurrentToast'
//import { ChartTest } from 'components/ChartTest'
import SideSheet from 'components/SideSheet'
import { useAppStore } from 'store'
import { ChartTest } from 'components/ChartTest'

export default function TabOneScreen() {
  const { userWeightLog } = useAppStore()
  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5" bg="$background">
      <H2>BodyTrackr</H2>
      {
        //  <ToastControl />
      }
      <ChartTest />
    </YStack>
  )
}
