import { Calendar, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import type { SheetProps } from '@tamagui/sheet'
import { Sheet } from '@tamagui/sheet'
import React, {
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
  useState,
} from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Button, H2, Input, Paragraph, Text, Unspaced, XStack, YStack } from 'tamagui'

const spModes = ['percent', 'constant', 'fit', 'mixed'] as const
export type SnapPointsMode = 'percent' | 'constant' | 'fit' | 'mixed'

interface AddWeightFormInput {
  weight: string
  date: Date
}
export const WrappedSheet = (
  props: {
    open: boolean
    modal?: boolean
    isPercent?: boolean
    position?: number
    snapPointsMode?: SnapPointsMode
    setOpen: Dispatch<SetStateAction<boolean>>
    DisplayDefaultOpenButton?: boolean
  } & PropsWithChildren
) => {
  const [position, setPosition] = React.useState(props.position || 0)
  let [isOpen, setIsOpen] = [props.open, props.setOpen]
  const [modal, setModal] = React.useState(props.modal ?? true)
  const [snapPointsMode, setSnapPointsMode] =
    React.useState<(typeof spModes)[number]>('percent')

  const isUpdate = true
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddWeightFormInput>({
    defaultValues: {
      weight: '',
      date: new Date(),
    },
  })

  const onSubmit: SubmitHandler<AddWeightFormInput> = async (data) => {}
  const [mixedFitDemo, setMixedFitDemo] = React.useState(false)
  const isPercent = snapPointsMode === 'percent'
  const isConstant = snapPointsMode === 'constant'
  const isFit = snapPointsMode === 'fit'
  const isMixed = snapPointsMode === 'mixed'
  const snapPoints = isPercent
    ? [85, 50, 25]
    : isConstant
      ? [256, 190]
      : isFit
        ? undefined
        : mixedFitDemo
          ? ['fit', 110]
          : ['80%', 256, 190]

  return (
    <>
      {props.DisplayDefaultOpenButton && (
        <YStack gap="$4">
          <Button onPress={() => setIsOpen(true)}>Open</Button>
        </YStack>
      )}

      <Sheet
        forceRemoveScrollEnabled={isOpen}
        modal={modal}
        open={isOpen}
        onOpenChange={setIsOpen}
        //snapPoints={snapPoints}
        //snapPointsMode={snapPointsMode}
        snapPointsMode={'fit'}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
      >
        <Sheet.Overlay enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

        <Sheet.Handle />
        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
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
                  //if (!repository) {
                  //  return
                  //}
                  //alertDialogState.setAlertDialogState({
                  //  onConfirm: () => {
                  //    repository.userWeightRepo.delete(weightId!)
                  //    setIsOpen(false)
                  //  },
                  //  title: 'Remove Weight',
                  //  description: 'Do you really want to delete this weight?',
                  //  isOpen: true,
                  //})
                }}
              >
                Remove
              </Button>
            )}
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
