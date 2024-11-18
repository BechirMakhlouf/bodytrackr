import { SelectWrapper } from 'components/SelectDemo'
import { SelectTest } from 'components/SelectTest'
import React from 'react'
import type { SizeTokens } from 'tamagui'
import { Button, Form, H4, Input, Label, Spinner, Theme, View, XStack } from 'tamagui'

const items = [
  { name: 'Apple' },
  { name: 'Pear' },
  { name: 'Blackberry' },
  { name: 'Peach' },
  { name: 'Apricot' },
  { name: 'Melon' },
  { name: 'Honeydew' },
  { name: 'Starfruit' },
  { name: 'Blueberry' },
  { name: 'Raspberry' },
  { name: 'Strawberry' },
  { name: 'Mango' },
  { name: 'Pineapple' },
  { name: 'Lime' },
  { name: 'Lemon' },
  { name: 'Coconut' },
  { name: 'Guava' },
  { name: 'Papaya' },
  { name: 'Orange' },
  { name: 'Grape' },
  { name: 'Jackfruit' },
  { name: 'Durian' },
]

export default function ProfileSettings(props: { size: SizeTokens }) {
  const [status, setStatus] = React.useState<'off' | 'submitting' | 'submitted'>('off')

  React.useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [status])

  return (
    <Form
      minWidth={300}
      gap="$3"
      onSubmit={() => setStatus('submitting')}
      borderWidth={1}
      borderRadius="$4"
      backgroundColor="$background"
      borderColor="$borderColor"
      padding="$8"
    >
      <View>
        <Label htmlFor="username">Username</Label>
        <Input id="username" size={'$4'} placeholder="Username..." />
      </View>

      {
        //<Label htmlFor="gender">Gender</Label>
      }
      <SelectWrapper
        label="Gender"
        items={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
        ]}
      />
      <XStack ai="center" justifyContent="space-between" gap="$4">
        <Label htmlFor="height">Height</Label>
        <Input id="height" size={'$4'} miw={220} placeholder="Height" />
      </XStack>
      <Form.Trigger asChild disabled={status !== 'off'}>
        <Button
          themeInverse
          icon={status === 'submitting' ? () => <Spinner themeInverse /> : undefined}
        >
          Edit Profile
        </Button>
      </Form.Trigger>
    </Form>
  )
}
