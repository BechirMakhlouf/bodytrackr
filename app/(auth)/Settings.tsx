import {
  University,
  Lasso,
  Moon,
  Divide,
  User,
  ChevronRight,
  Router,
  LogOut,
  Delete,
  Eraser,
  RemoveFormatting,
  X,
} from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import {
  Text,
  Anchor,
  ListItem,
  Paragraph,
  Section,
  View,
  XStack,
  H2,
  H3,
  Separator,
} from 'tamagui'

export default function ModalScreen() {
  return (
    <View flex={1} gap="$3" paddingVertical="$4" paddingHorizontal="$3">
      <Section gap="$3">
        <H3>Profile </H3>
        <ListItem
          hoverTheme
          pressTheme
          title={'Profile info'}
          fontSize={'$10'}
          subTitle="Change info"
          icon={User}
          iconAfter={ChevronRight}
          scaleIcon={2}
          onPress={() => router.push('/ProfileSettings')}
        />
      </Section>
      <Separator />
      <Section gap="$3">
        <H3>General</H3>
        <ListItem
          hoverTheme
          pressTheme
          title={'Preferred Unit'}
          fontSize={'$10'}
          subTitle="Metric"
          icon={Lasso}
          scaleIcon={2}
        />
        <ListItem
          hoverTheme
          pressTheme
          title={'Theme'}
          fontSize={'$10'}
          subTitle="Dark"
          icon={Moon}
          scaleIcon={2}
        />
      </Section>
      <Separator />
    </View>
  )
}
