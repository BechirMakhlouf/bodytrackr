import { router } from "expo-router";
import { useState } from "react";
import type { SizeTokens } from "tamagui";
import { Button, H1, useThemeName, XStack, YStack } from "tamagui";

export default function InputsDemo() {
  const theme = useThemeName();
  return (
    <YStack>
      <H1
        color={"whitesmoke"}
        marginTop={"$20"}
        marginLeft={"$3"}
        textAlign="center"
      >
        Bodytrackr
      </H1>
      <YStack
        alignItems="center"
        height={"80%"}
        justifyContent="center"
        //borderWidth="$1"
        //borderColor={"blue"}
        overflow="hidden"
        gap="$4"
        margin="$3"
        marginTop="$3"
        padding="$2"
      >
        <XStack gap="$3">
          <Button
            size={"$7"}
            theme={theme}
            onPress={() => router.push("/signIn")}
          >
            Sign In
          </Button>
          <Button
            size={"$7"}
            onPress={() => router.push("/signUp")}
            backgroundColor={"purple"}
            color={"white"}
          >
            Sign Up
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}
