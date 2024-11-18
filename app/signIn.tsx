import { router } from 'expo-router'
import { useSystem } from 'library/powersync/system'
import { useEffect, useState } from 'react'
import { Button, H1, Input, Spinner, Text, TextArea, XStack, YStack } from 'tamagui'
import { useAppStore } from 'store'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

interface SignInForm {
  email: string
  password: string
}

export default function InputsDemo() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAppStore()
  const { control, handleSubmit, setError } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSignIn: SubmitHandler<SignInForm> = async ({ email, password }) => {
    setIsLoading(true)
    const signInResult = await signIn(email, password)
    setIsLoading(false)
    if (signInResult) {
      if (signInResult.code === 'invalid_credentials') {
        setError('email', { message: signInResult.message })
        setError('password', { message: signInResult.message })
      }
      return
    }
  }

  return (
    <YStack>
      <YStack
        alignItems="center"
        height={'80%'}
        justifyContent="center"
        overflow="hidden"
        gap="$4"
        margin="$3"
        marginTop="$3"
        padding="$2"
      >
        <H1>Sign In</H1>
        <XStack alignItems="center" gap="$5">
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Put your email',
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            }}
            render={({
              field: { onBlur, onChange, value, disabled },
              fieldState: { error },
            }) => (
              <Input
                flex={1}
                size={'$5'}
                theme={error && 'red'}
                placeholder={`Enter email...`}
                keyboardType="email-address"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                disabled={disabled}
              />
            )}
          />
        </XStack>
        <XStack alignItems="center" gap="$5">
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: { onBlur, onChange, value, disabled },
              fieldState: { error },
            }) => (
              <Input
                flex={1}
                size={'$5'}
                theme={error && 'red'}
                placeholder={`enter password...`}
                secureTextEntry
                textContentType="password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                disabled={disabled}
              />
            )}
          />
        </XStack>
        <XStack alignItems="center" gap="$2">
          <Button
            icon={isLoading ? <Spinner size="small" color={'white'} /> : undefined}
            size="$5"
            theme={'blue_active'}
            onPress={handleSubmit(onSignIn)}
          >
            Sign In
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
