import DateTimePicker from "react-native-ui-datepicker";
import { Button, ButtonIcon, Input, Text, View, XStack, YStack } from "tamagui";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Airplay, Calendar, PlusCircle } from "@tamagui/lucide-icons";
import { useSystem } from "library/powersync/system";
import * as Crypto from "expo-crypto";

export default function TabTwoScreen() {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weightKg, setWeightKg] = useState(0);

  const [dateAt, setDateAt] = useState(new Date());
  const system = useSystem();
  return (
    <YStack gap="$3" marginHorizontal="$4" marginVertical="$4">
      <Input
        placeholder="Your Weight"
        keyboardType="numeric"
        inputMode="numeric"
        value={"" + weightKg}
        onChangeText={(text) => setWeightKg(+text)}
      />

      <Button icon={Calendar} onPress={() => setShowDatePicker(true)}>
        Open Picker
      </Button>

      <DateTimePicker
        mode="single"
        date={dateAt}
        maxDate={new Date()}
        minDate={new Date(0)}
        onChange={(v) => setDateAt(new Date(v.date?.valueOf() || new Date()))}
      />
      <Button
        icon={PlusCircle}
        theme="blue_active"
        onPress={async () => {
          const user = await system.supabaseConnector.client.auth.getUser();
          const user_id = await user.data.user?.id!;
          console.debug(
            "result: ",
            await system.powersync.execute(
              "INSERT INTO users_weight (id, user_id, date_at, weight_kg, created_at, updated_at, deleted) values (uuid(), ?, ?, ?, datetime(), datetime() )",
              [user_id, dateAt, weightKg]
            )
          );
        }}
      >
        Add weight
      </Button>
    </YStack>
  );
}
