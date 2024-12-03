import {
  Button,
  Text,
  XStack,
  ScrollView,
  H1,
  YStack,
  Separator,
  Input,
  H3,
  ListItem,
} from 'tamagui'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Calendar, ChevronLeft, ChevronRight, Plus } from '@tamagui/lucide-icons'

import { useAppStore } from 'store'
import { RefreshControl } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { WrappedSheet } from 'components/Sheet'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {
  type BodyMeasurement,
  type BodyMeasurementType,
  type BodyMeasurementTypeId,
  bodyMeasurementTypesMap,
} from 'entities/BodyMeasurements'
import {
  bodyMeasurementRowToBodyMeasurement,
  type BodyMeasurementsRepository,
} from 'repository/BodyMeasurement'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { useAlertDialogState } from 'components/AlertDialog'
import type { UserSettings } from 'entities/UserSettings'

interface AddMeasurementInput {
  measurement: string
  date: Date
}
export default function TabTwoScreen() {
  const { repository, userSettings } = useAppStore()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const { measurementTypeId } = useLocalSearchParams()
  const [measurementValue, setMeasurementValue] = useState(
    undefined as number | undefined
  )
  const [measurementDate, setMeasurementDate] = useState(new Date())
  const [updateMeasurementId, setUpdateMeasurementId] = useState(
    undefined as string | undefined
  )

  const measurementType = bodyMeasurementTypesMap.get(
    measurementTypeId as BodyMeasurementTypeId
  )!

  const [bodyMeasurement, setBodyMeasurement] = useState([] as BodyMeasurement[])

  const updateBodyMeasurementList = useCallback(async () => {
    if (!repository) return
    for await (const bodyMeasurementRows of repository
      .getMeasurementRepository(measurementType.id)
      .watch()) {
      setBodyMeasurement(
        bodyMeasurementRowToBodyMeasurement(bodyMeasurementRows, userSettings?.prefUnit)
      )
    }
  }, [repository, userSettings])

  useEffect(() => {
    updateBodyMeasurementList()
  }, [repository, userSettings])
  const onRefresh = useCallback(() => {
    setIsRefreshing(true)

    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }, [])

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
            <H1>{measurementTypeId.toString().toUpperCase()}</H1>
          </YStack>
        </XStack>
        <Separator />
        {bodyMeasurement.map((measurement) => {
          return (
            <ListItem
              onPress={() => {
                setUpdateMeasurementId(measurement.id)
                setMeasurementValue(measurement.measurement)
                setMeasurementDate(measurement.date)
                setIsSheetOpen(true)
              }}
              pressTheme
              key={measurement.id}
              paddingHorizontal="$8"
              paddingVertical="$4"
              borderColor={'$accentBackground'}
              theme={'surface1'}
              justifyContent="space-between"
            >
              <Text fontSize={'$6'}>{measurement.measurement}</Text>
              <Text fontSize={'$6'}>{measurement.date.toLocaleDateString()}</Text>
              <ChevronRight />
            </ListItem>
          )
        })}
        <Button
          icon={Plus}
          theme={'active'}
          marginHorizontal="$4"
          onPress={() => {
            setIsSheetOpen(true)
            setUpdateMeasurementId(undefined)
            setMeasurementValue(undefined)
            setMeasurementDate(new Date())
          }}
        >
          Add measurement
        </Button>
      </ScrollView>

      {repository && (
        <InputSheet
          measurementType={measurementType}
          bodyMeasurementRepository={repository.getMeasurementRepository(
            measurementType.id
          )}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          userSettings={userSettings || undefined}
          measurementId={updateMeasurementId}
          measurement={measurementValue}
          date={measurementDate}
        />
      )}
    </SafeAreaView>
  )
}

interface InputSheetProps {
  measurementType: BodyMeasurementType
  bodyMeasurementRepository: BodyMeasurementsRepository
  isSheetOpen: boolean
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  userSettings?: UserSettings
  measurementId?: string
  measurement?: number
  date?: Date
}

function InputSheet({
  measurementType: { id: bodyMeasurementTypeId, name: measurementTypeName },
  bodyMeasurementRepository,
  isSheetOpen,
  setIsSheetOpen,
  userSettings,
  measurementId,
  measurement,
  date,
}: InputSheetProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const isUpdate = useMemo(() => !!measurementId, [measurementId])
  const alertDialogState = useAlertDialogState()

  const onSubmit: SubmitHandler<AddMeasurementInput> = async (data) => {
    if (isUpdate || (await bodyMeasurementRepository.get(data.date))) {
      await alertDialogState.setAlertDialogState({
        onConfirm: async () => {
          bodyMeasurementRepository.upsert(+data.measurement, data.date)
          setIsSheetOpen(false)
        },
        title: 'Update measurement',
        description: 'Do you really want to update this measurement?',
        isOpen: true,
      })
    } else {
      bodyMeasurementRepository.upsert(+data.measurement, data.date)
      setIsSheetOpen(false)
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddMeasurementInput>({
    defaultValues: {
      measurement: measurement ? measurement.toString() : '',
      date: date || new Date(),
    },
  })

  useEffect(() => {
    setValue('date', date || new Date())
    setValue('measurement', measurement?.toString() || '')
  }, [date, measurement])
  return (
    <WrappedSheet open={isSheetOpen} setOpen={setIsSheetOpen} snapPointsMode="fit">
      <YStack paddingHorizontal="$4" paddingVertical="$4" gap="$4">
        <H3>Add {measurementTypeName} measurement</H3>
        <Controller
          name="measurement"
          control={control}
          rules={{
            required: `Enter measurement`,
            validate: (measurement) => {
              const measurementNumber = +measurement
              if (Number.isNaN(measurementNumber)) {
                return 'Invalid number.'
              }
              if (measurementNumber < 0) {
                return 'Invalid measurement.'
              }
              return
            },
          }}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Input
              theme={error && 'red'}
              placeholder="Enter measurement"
              keyboardType="numeric"
              inputMode="numeric"
              fontSize={'$4'}
              textAlign="center"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          rules={{
            required: 'Input your date',
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Button icon={Calendar} onPress={() => setIsDatePickerVisible(true)}>
                {value.toLocaleDateString()}
              </Button>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                date={value}
                onCancel={() => setIsDatePickerVisible(false)}
                onConfirm={(newDate) => {
                  onChange(newDate)
                  setIsDatePickerVisible(false)
                }}
                mode="date"
                maximumDate={new Date()}
                minimumDate={new Date(0)}
              />
            </>
          )}
        />

        <XStack flexDirection="row-reverse" justifyContent="space-between" gap="$4">
          <Button theme="active" aria-label="Close" onPress={handleSubmit(onSubmit)}>
            {isUpdate ? 'Update' : 'Add'}
          </Button>
          {isUpdate && (
            <Button
              theme="red_active"
              aria-label="Remove"
              onPress={async () => {
                if (!bodyMeasurementRepository) {
                  return
                }
                alertDialogState.setAlertDialogState({
                  onConfirm: () => {
                    bodyMeasurementRepository.delete(measurementId!)
                    setIsSheetOpen(false)
                  },
                  title: 'Remove measurement',
                  description: 'Do you really want to delete this measurement?',
                  isOpen: true,
                })
              }}
            >
              Remove
            </Button>
          )}
        </XStack>
      </YStack>
    </WrappedSheet>
  )
}
