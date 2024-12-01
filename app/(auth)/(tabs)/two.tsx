import { Button, Text, XStack, ScrollView } from 'tamagui'
import { useAddWeightDialogState } from 'components/AddWeightDialog'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useState } from 'react'
import { ChevronRight, Plus } from '@tamagui/lucide-icons'
import { useAppStore } from 'store'
import { RefreshControl } from 'react-native'
import { userWeightRowToUserWeight } from 'repository/UserWeight'
import type { WeightLog } from 'entities/UserWeight'

export default function TabTwoScreen() {
  const { repository, userSettings } = useAppStore()
  const { openWeightDialog } = useAddWeightDialogState()

  // refresh
  const [isRefreshing, setIsRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }, [])

  const [userWeightLog, setUserWeightLog] = useState([] as WeightLog[])
  const updateUserWeightList = useCallback(async () => {
    if (!repository) return
    for await (const userWeightRows of repository.userWeightRepo.watch()) {
      setUserWeightLog(userWeightRowToUserWeight(userWeightRows, userSettings?.prefUnit))
    }
  }, [repository, userSettings])
  useEffect(() => {
    updateUserWeightList()
  }, [repository, userSettings])

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {userWeightLog.map((weight) => {
          return (
            <XStack
              onPress={() =>
                openWeightDialog(weight.weight || undefined, weight.date, weight.id)
              }
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
        onPress={() => openWeightDialog(undefined, new Date(), undefined)}
      >
        Add Weight
      </Button>
    </SafeAreaView>
  )
}
