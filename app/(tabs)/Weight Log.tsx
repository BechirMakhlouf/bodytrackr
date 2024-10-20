import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, TextInput, Button } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

interface WeightLog {
  weightLog: number;
  date_at: Date;
}
export default function TabTwoScreen() {
  const [weightLog, setWeightLog] = useState<WeightLog[]>([] as WeightLog[]);
  const [weightLogInput, setWeightLogInput] = useState("");
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Log your Weight</ThemedText>
      </ThemedView>
      <ThemedView>
        <TextInput
          placeholder="Enter your weight"
          style={styles.input}
          inputMode="numeric"
          onChangeText={setWeightLogInput}
          value={weightLogInput}
          placeholderTextColor={"white"}
        />

        <TextInput
          placeholder="Enter your weight"
          style={styles.input}
          inputMode="numeric"
          placeholderTextColor={"white"}
        />
        <Button
          title="Submit"
          onPress={() => {
            setWeightLog([
              ...weightLog,
              { weightLog: 100, date_at: new Date() },
            ]);
          }}
          color={"teal"}
        />
      </ThemedView>
      {weightLog.length > 0 &&
        weightLog.map((log) => {
          return (
            <>
              <ThemedText>{log.weightLog}</ThemedText>
              <ThemedText>{log.date_at.toString()}</ThemedText>
            </>
          );
        })}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },

  input: {
    height: 40,
    color: "white",
    borderColor: "gray",
    marginVertical: 8,
    borderWidth: 1,
    paddingLeft: 8,
  },
});
