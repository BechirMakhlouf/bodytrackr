import { Button, Text, XStack, ScrollView, H1, YStack, Separator } from 'tamagui'
import { useAddWeightDialogState } from 'components/AddWeightDialog'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from '@tamagui/lucide-icons'
import { useAppStore } from 'store'
import { RefreshControl } from 'react-native'
import type { UserWeightRow } from 'repository/UserWeight'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { WrappedSheet } from 'components/Sheet'

export default function TabTwoScreen() {
  const { repository, userWeightLog } = useAppStore()
  const { openWeightDialog } = useAddWeightDialogState()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const { measurement } = useLocalSearchParams()

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }, [])
  //const updateUserWeightList = useCallback(async () => {
  //  if (!repository) return
  //
  //  for await (const updatedList of repository.userWeightRepo.watch()) {
  //    setUserWeightList(updatedList)
  //  }
  //}, [repository])
  //
  //useEffect(() => {
  //  if (!repository) {
  //    return
  //  }
  //  updateUserWeightList()
  //}, [])

  return (
    <SafeAreaView>
      <ScrollView
        paddingHorizontal="$1"
        gap="$2"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <XStack padding="$4" alignItems="center" gap="$2">
          <ChevronLeft onPress={router.back} />
          <YStack>
            <Text color={'gray'}>measurement: </Text>
            <H1>{measurement.toString().toUpperCase()}</H1>
          </YStack>
        </XStack>
        <Separator />
        {userWeightLog.map((weight) => {
          return (
            <XStack
              onPress={() => {
                setIsSheetOpen(true)
              }}
              key={weight.id}
              paddingHorizontal="$8"
              paddingVertical="$4"
              borderColor={'$accentBackground'}
              justifyContent="space-between"
            >
              <Text fontSize={'$6'}>{weight.weight}</Text>
              <Text fontSize={'$6'}>{weight.date.toLocaleDateString()}</Text>
              <ChevronRight />
            </XStack>
          )
        })}
      </ScrollView>

      <Button
        icon={Plus}
        theme={'active'}
        marginHorizontal="$4"
        onPress={() => setIsSheetOpen(true)}
      >
        Add measurement
      </Button>

      <WrappedSheet open={isSheetOpen} setOpen={setIsSheetOpen}></WrappedSheet>
    </SafeAreaView>
  )
}
