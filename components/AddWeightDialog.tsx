import { create } from 'zustand'
import { useEffect, useMemo, useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { Calendar, X } from '@tamagui/lucide-icons'
import { Adapt, Button, Dialog, Input, Sheet, Text, Unspaced, XStack } from 'tamagui'
import DateTimePicker from 'react-native-modal-datetime-picker'

import { useAppStore } from 'store'
import { useAlertDialogState } from './AlertDialog'

interface AddWeightDialogState {
  weightId?: string
  isOpen: boolean
  date: Date
  weight?: number
  openWeightDialog: (weight?: number, date?: Date, weightId?: string) => void
  setWeight: (weight?: number) => void
  setDate: (date: Date) => void
  setIsOpen: (isOpen: boolean) => void
  setId: (weightId?: string) => void
}

export const useAddWeightDialogState = create<AddWeightDialogState>((set) => ({
  isOpen: false,
  date: new Date(),
  setWeight: (weight?: number) => set(() => ({ weight })),
  setDate: (date: Date) => set(() => ({ date })),
  setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
  setId: (weightId?: string) => set(() => ({ weightId })),
  openWeightDialog: (weight, date, weightId) =>
    set({ weight, date, weightId, isOpen: true }),
}))

interface AddWeightFormInput {
  weight: string
  date: Date
}
//TODO: make calendar adhere to light/dark themes
//TODO: reset AddWeightDialog state every open
export function AddWeightDialog() {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const { repository } = useAppStore()
  const { isOpen, weightId, weight, date, setIsOpen } = useAddWeightDialogState()
  const alertDialogState = useAlertDialogState()

  const isUpdate = useMemo(() => !!weightId, [weightId])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddWeightFormInput>({
    defaultValues: {
      weight: weight ? weight.toString() : '',
      date: new Date(),
    },
  })

  //INFO: change weight and date value input depending on the state
  useEffect(() => setValue('date', date), [date])
  useEffect(() => {
    setValue('weight', weight ? weight.toString() : '')
  }, [weight, isOpen])

  const onSubmit: SubmitHandler<AddWeightFormInput> = async (data) => {
    if (isUpdate || (await repository?.userWeightRepo.get(data.date))) {
      await alertDialogState.setAlertDialogState({
        onConfirm: async () => {
          await repository?.userWeightRepo.upsert(+data.weight, data.date)
          setIsOpen(false)
        },
        title: 'Update weight',
        description: 'Do you really want to update this weight?',
        isOpen: true,
      })
    } else {
      await repository?.userWeightRepo.upsert(+data.weight, data.date)
      setIsOpen(false)
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(newOpen) => {
          clearErrors()
          setIsOpen(newOpen)
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            opacity={0.9}
            enterStyle={{ opacity: 0 }}
            onPress={() => setIsOpen(false)}
            exitStyle={{ opacity: 0 }}
            borderColor={'red'}
            borderWidth="$1"
          />

          <Adapt when="sm" platform="touch">
            <Sheet
              snapPointsMode="percent"
              snapPoints={[80, 60, 100]}
              animation="medium"
              zIndex={200000}
              dismissOnSnapToBottom
            >
              <Sheet.Frame padding="$4" gap="$4">
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>
          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
          >
            <Dialog.Title>Add Weight</Dialog.Title>
            <Dialog.Description>Add or change a weight log.</Dialog.Description>
            <Controller
              name="weight"
              control={control}
              rules={{
                required: 'Input your weight',
                validate: (weight) => {
                  const weightNumber = +weight
                  if (Number.isNaN(weightNumber)) {
                    return 'Invalid number.'
                  }
                  if (weightNumber < 0 || weightNumber > 1000) {
                    return 'Invalid weight.'
                  }
                  return
                },
              }}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  theme={error && 'red'}
                  placeholder="enter your weight"
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
            <Unspaced>
              {errors.weight && <Text color={'red'}>{errors.weight.message}</Text>}
            </Unspaced>

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
                    if (!repository) {
                      return
                    }
                    alertDialogState.setAlertDialogState({
                      onConfirm: () => {
                        repository.userWeightRepo.delete(weightId!)
                        setIsOpen(false)
                      },
                      title: 'Remove Weight',
                      description: 'Do you really want to delete this weight?',
                      isOpen: true,
                    })
                  }}
                >
                  Remove
                </Button>
              )}
            </XStack>

            <Unspaced>
              <Dialog.Close asChild>
                <Button
                  position="absolute"
                  top="$3"
                  right="$3"
                  size="$2"
                  circular
                  icon={X}
                />
              </Dialog.Close>
            </Unspaced>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  )
}
