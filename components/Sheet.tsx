import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import type { SheetProps } from '@tamagui/sheet'
import { Sheet } from '@tamagui/sheet'
import React, { type Dispatch, type SetStateAction, type PropsWithChildren } from 'react'
import { Button, H2, Input, Paragraph, XStack, YStack } from 'tamagui'

const spModes = ['percent', 'constant', 'fit', 'mixed'] as const
export type SnapPointsMode = 'percent' | 'constant' | 'fit' | 'mixed'

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
  let [open, setOpen] = [props.open, props.setOpen]
  const [modal, setModal] = React.useState(props.modal ?? true)
  const [snapPointsMode, setSnapPointsMode] =
    React.useState<(typeof spModes)[number]>('percent')

  const [mixedFitDemo, setMixedFitDemo] = React.useState(false)
  const isPercent = snapPointsMode === 'percent'
  const isConstant = snapPointsMode === 'constant'
  const isFit = snapPointsMode === 'fit'
  const isMixed = snapPointsMode === 'mixed'
  const snapPoints = isPercent
    ? [50, 25]
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
          <Button onPress={() => setOpen(true)}>Open</Button>
        </YStack>
      )}

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        snapPointsMode={snapPointsMode}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        // zIndex={100_000}
      >
        <Sheet.Overlay enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

        <Sheet.Handle />
        <Sheet.Frame>{props.children}</Sheet.Frame>
      </Sheet>
    </>
  )
}
