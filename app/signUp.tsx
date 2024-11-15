import { router } from 'expo-router'
import { useSystem } from 'library/powersync/system'
import { useEffect, useState } from 'react'
import { useAppStore } from 'store'
import type { SizeTokens } from 'tamagui'
import { Button, H1, Input, Spinner, Text, TextArea, XStack, YStack } from 'tamagui'

export default function InputsDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wrongCredentials, setWrongCredentials] = useState(false)
  const { signUp } = useAppStore()
  const system = useSystem()

  return (
    <YStack>
      <YStack
        alignItems="center"
        height={'80%'}
        justifyContent="center"
        //borderWidth="$1"
        //borderColor={"blue"}
        overflow="hidden"
        gap="$4"
        margin="$3"
        marginTop="$3"
        padding="$2"
      >
        <H1>Sign Up</H1>
        <XStack alignItems="center" gap="$5">
          <Input
            flex={1}
            size={'$5'}
            placeholder={`enter your email`}
            keyboardType="email-address"
            value={email}
            disabled={isLoading}
            onChangeText={setEmail}
          />
        </XStack>
        <XStack alignItems="center" gap="$5">
          <Input
            flex={1}
            size={'$5'}
            placeholder={`password`}
            secureTextEntry
            value={password}
            disabled={isLoading}
            onChangeText={setPassword}
          />
        </XStack>
        <XStack alignItems="center" gap="$2">
          <Button
            size="$5"
            theme={'blue_active'}
            onPress={async () => {
              setWrongCredentials(false)
              setIsLoading(true)

              const result = await system.supabaseConnector.client.auth.signUp({
                email,
                password,
              })

              if (result.data.session === null) {
                setWrongCredentials(true)
              } else {
                await signUp(email, password)
                router.replace('/(auth)/')
              }
              setIsLoading(false)
            }}
          >
            {isLoading && <Spinner size="small" color={'white'} />}
            Go
          </Button>

          {wrongCredentials && <Text color={'$red8Light'}>Wrong Credentials</Text>}
        </XStack>
      </YStack>
    </YStack>
  )
}
