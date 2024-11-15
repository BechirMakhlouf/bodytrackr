import { AlertDialog, Button, XStack, YStack } from 'tamagui'
import { create } from 'zustand'

interface AlertDialogState {
  title: string
  description: string
  confirmText: string
  cancelText: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onCancel: () => void
  onConfirm: () => void
  resetAlertDialogState: () => void
  setAlertDialogState: (props: {
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    isOpen?: boolean
    onCancel?: () => void
    onConfirm?: () => Promise<void> | void
  }) => Promise<void>
}

export const useAlertDialogState = create<AlertDialogState>((set) => ({
  title: 'Alert',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  resetAlertDialogState: () => {
    set({
      title: 'Alert',
      description: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      isOpen: false,
      onConfirm: () => {
        set((state) => {
          state.resetAlertDialogState()
          return {}
        })
      },
      onCancel: () => {
        set((state) => {
          state.resetAlertDialogState()
          return {}
        })
      },
    })
  },

  onConfirm: () => {
    set((state) => {
      state.resetAlertDialogState()
      return {}
    })
  },
  onCancel: () => {
    set((state) => {
      state.resetAlertDialogState()
      return {}
    })
  },

  setAlertDialogState: ({
    title,
    description,
    confirmText,
    cancelText,
    isOpen,
    onCancel: onClose,
    onConfirm,
  }) => {
    set((state) => {
      state.resetAlertDialogState()
      return {}
    })
    set((state) => ({
      title: title || 'Alert',
      description: description || '',
      confirmText: confirmText || 'Confirm',
      cancelText: cancelText || 'Cancel',
      isOpen: isOpen || false,
      onCancel: () => {
        onClose && onClose()
        state.resetAlertDialogState()
      },
      onConfirm: async () => {
        onConfirm && (await onConfirm())
        state.resetAlertDialogState()
      },
    }))
  },
}))

export function AlertDialogWrapper() {
  const {
    isOpen,
    confirmText,
    cancelText,
    title,
    description,
    setIsOpen,
    onConfirm,
    onCancel,
  } = useAlertDialogState()

  return (
    <AlertDialog modal open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          onPress={() => setIsOpen(false)}
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          zIndex={99999999}
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$3">
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>{description}</AlertDialog.Description>
            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button onPress={onCancel}>{cancelText}</Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild>
                <Button theme="active" onPress={onConfirm}>
                  {confirmText}
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
