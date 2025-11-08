import React, { useState } from "react";
import { YStack, Text, Button, Input, Label, ScrollView } from "tamagui";
import { Alert, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { QuestionnaireData } from "@/src/types/user";

const API_URL = Platform.select({
  android: "http://172.24.59.166:8000",
  ios: "http://172.24.59.166:8000",
  default: "http://172.24.59.166:8000",
});

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say", "Other"];

export default function Questionnaire() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [hobbiesText, setHobbiesText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!age || !gender || !major || !hobbiesText) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
      Alert.alert("Error", "Please enter a valid age");
      return;
    }

    setIsLoading(true);

    try {
      const hobbies = hobbiesText
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h);

      const profileData: QuestionnaireData = {
        age: ageNum,
        gender,
        major,
        hobbies,
        classSchedule: [], // Can add schedule in a future step
      };

      // TODO: Send to backend
      const response = await axios.post(
        `${API_URL}/api/v1/users/${params.userId}/profile`,
        profileData,
        { timeout: 10000 }
      );

      console.log("Profile saved:", response.data);
      Alert.alert("Success", "Profile completed!", [
        { text: "OK", onPress: () => router.replace("/(tabs)/index") }
      ]);
    } catch (error: any) {
      console.error("Failed to save profile:", error);
      Alert.alert("Error", "Could not save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <YStack padding="$6" space="$4" maxWidth={400} width="100%">
        <Text fontSize="$9" fontWeight="700" marginBottom="$2">
          Tell us about yourself
        </Text>

        <Text fontSize="$4" color="$gray10" marginBottom="$4">
          Help us personalize your experience
        </Text>

        <YStack space="$3">
          {/* Age */}
          <YStack space="$2">
            <Label fontSize="$3" fontWeight="600">
              Age
            </Label>
            <Input
              size="$4"
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              borderWidth={1}
              borderColor="$gray6"
              focusStyle={{ borderColor: "$blue10" }}
            />
          </YStack>

          {/* Gender */}
          <YStack space="$2">
            <Label fontSize="$3" fontWeight="600">
              Gender
            </Label>
            <YStack space="$2">
              {GENDERS.map((g) => (
                <Button
                  key={g}
                  size="$4"
                  onPress={() => setGender(g)}
                  backgroundColor={gender === g ? "$blue10" : "$gray3"}
                  color={gender === g ? "$white" : "$gray12"}
                  borderWidth={1}
                  borderColor={gender === g ? "$blue10" : "$gray6"}
                  pressStyle={{
                    backgroundColor: gender === g ? "$blue11" : "$gray4",
                  }}
                >
                  {g}
                </Button>
              ))}
            </YStack>
          </YStack>

          {/* Major */}
          <YStack space="$2">
            <Label fontSize="$3" fontWeight="600">
              Major
            </Label>
            <Input
              size="$4"
              placeholder="e.g., Computer Science"
              value={major}
              onChangeText={setMajor}
              borderWidth={1}
              borderColor="$gray6"
              focusStyle={{ borderColor: "$blue10" }}
            />
          </YStack>

          {/* Hobbies */}
          <YStack space="$2">
            <Label fontSize="$3" fontWeight="600">
              Hobbies
            </Label>
            <Input
              size="$4"
              placeholder="Separate with commas (e.g., gaming, reading)"
              value={hobbiesText}
              onChangeText={setHobbiesText}
              borderWidth={1}
              borderColor="$gray6"
              focusStyle={{ borderColor: "$blue10" }}
              multiline
              numberOfLines={3}
            />
          </YStack>

          {/* Class Schedule - Coming Soon */}
          <YStack space="$2">
            <Label fontSize="$3" fontWeight="600" color="$gray9">
              Class Schedule (Coming Soon)
            </Label>
            <Text fontSize="$2" color="$gray10">
              You'll be able to add your class schedule in the next step
            </Text>
          </YStack>
        </YStack>

        <Button
          size="$4"
          theme="blue"
          onPress={handleSubmit}
          marginTop="$4"
          backgroundColor="$blue10"
          pressStyle={{ backgroundColor: "$blue11" }}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Complete Profile"}
        </Button>
      </YStack>
    </ScrollView>
  );
}
