import { Image, StyleSheet, Platform, TextInput, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { setupMicrotasks } from "react-native-reanimated/lib/typescript/reanimated2/threads";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          //source={require("@/assets/images/partial-react-logo.png")}
          src={
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1229356%2Fpexels-photo-1229356.jpeg%3Fcs%3Dsrgb%26dl%3Dabs-adult-athlete-1229356.jpg%26fm%3Djpg&f=1&nofb=1&ipt=836e6c8f22e2d53627806d1e581267784456f1a8af48f6a201d118ef217cc240&ipo=images"
          }
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">BodyTrackr!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Log in to see Track your progress!</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={"lightgray"}
        />
        <TextInput
          style={styles.input}
          placeholder="Type your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor={"lightgray"}
        />
        <Button title="log in" color={"teal"} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  input: {
    height: 40,
    color: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
  },
});
