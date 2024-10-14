import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { setupMicrotasks } from "react-native-reanimated/lib/typescript/reanimated2/threads";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "@/supabase";

async function signUp(
  supabase: SupabaseClient,
  email: string,
  password: string,
) {
  return await supabase.auth.signUp({ email, password });
}

async function signIn(
  supabase: SupabaseClient,
  email: string,
  password: string,
) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export default function HomeScreen() {
  const [signMode, setSignMode] = useState<"login" | "signup">("login");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLogged, setIsLoggedIn] = useState(false);
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
      {!isLogged ? (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">BodyTrackr!</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText>
              Put your credentials to see Track your progress!
            </ThemedText>
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

            <Button
              title={signMode == "login" ? "log in" : "sign up"}
              color={"teal"}
              onPress={async () => {
                let loginInfo;
                if (signMode == "login") {
                  loginInfo = await signIn(SUPABASE_CLIENT, email, password);
                } else {
                  loginInfo = await signUp(SUPABASE_CLIENT, email, password);
                }
                setIsLoggedIn(loginInfo.error ? false : true);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setSignMode(signMode == "signup" ? "login" : "signup");
              }}
            >
              {signMode == "login" ? (
                <ThemedText>Don't have an account? Sign Up</ThemedText>
              ) : (
                <ThemedText>Already have an account? Sign in</ThemedText>
              )}
            </TouchableOpacity>
          </ThemedView>
        </>
      ) : (
        <ThemedView>
          <ThemedText>Logged in!</ThemedText>
          <Button
            title="Sign out"
            color={"teal"}
            onPress={() => {
              setIsLoggedIn(false);
            }}
          />
        </ThemedView>
      )}
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
