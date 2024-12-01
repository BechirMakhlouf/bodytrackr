import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Avatar, ScrollView, XStack, H2, YStack } from 'tamagui'

export default function profile() {
  return (
    <SafeAreaView>
      <ScrollView>
        <XStack
          paddingHorizontal="$3"
          //borderWidth="$1" borderColor={'blue'}
        >
          <Avatar circular size={'$10'}>
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
          </Avatar>
          <YStack marginHorizontal="$4" alignSelf="center">
            <H2>Username</H2>
            <Text fontStyle="italic">Member Since: Feb 22, 2024.</Text>
          </YStack>
        </XStack>
      </ScrollView>
    </SafeAreaView>
  )
}
