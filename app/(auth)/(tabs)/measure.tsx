import { Button, Text, XStack, ScrollView, ListItem, View, YStack } from 'tamagui'
import { useAddWeightDialogState } from 'components/AddWeightDialog'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useState } from 'react'
import { ChevronRight, Plus, User } from '@tamagui/lucide-icons'
import { useAppStore } from 'store'
import { RefreshControl } from 'react-native'
import type { UserWeightRow } from 'repository/UserWeight'
import { useRouter } from 'expo-router'
import { system } from 'library/powersync/system'
import { Database } from 'library/powersync/AppSchema'
import { SheetDemo } from 'components/SheetTest'

export default function Measure() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [body_measurements_types, set_body_measurements_types] = useState(
    [] as Database['body_measurements_types'][]
  )
  const router = useRouter()

  useEffect(() => {
    system.db
      .selectFrom('body_measurements_types')
      .selectAll()
      .execute()
      .then((result) =>
        set_body_measurements_types(result as Database['body_measurements_types'][])
      )
  }, [])
  const onRefresh = useCallback(() => {
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }, [])
  return (
    <>
      <ScrollView paddingVertical="$2">
        <YStack gap="$2">
          {body_measurements_types.map((measurementType) => (
            <ListItem
              key={measurementType.id}
              hoverTheme
              fontSize={'$6'}
              pressTheme
              iconAfter={ChevronRight}
              onPress={() =>
                router.push(`/(auth)/measurement/${measurementType.name?.toLowerCase()}`)
              }
              scaleIcon={2}
            >
              {measurementType.name}
            </ListItem>
          ))}
        </YStack>
      </ScrollView>
    </>
  )
}
