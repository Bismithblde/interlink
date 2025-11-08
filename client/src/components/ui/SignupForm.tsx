import React, { useState } from "react";
import { YStack, XStack, Text, Button, Input, Label, Spinner } from "tamagui";
import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

// For Expo Go: use your computer's actual IP address
const API_URL = Platform.select({
  android: "http://172.24.59.166:8000",
  ios: "http://172.24.59.166:8000",
  default: "http://172.24.59.166:8000",
});

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/signup`,
        { email, password },
        { timeout: 10000 }
      );

      console.log("Signup successful:", response.data);
      
      // Navigate to questionnaire with user ID
      router.push({
        pathname: "/(auth)/Questionnaire",
        params: { userId: response.data.id, email: response.data.email }
      });
    } catch (error: any) {
      console.error("Signup failed:", error);

      if (error.response) {
        Alert.alert(
          "Signup Failed",
          error.response.data?.detail || "Could not create account"
        );
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "Can't connect to server. Make sure your backend is running."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack
      padding="$6"
      space="$4"
      maxWidth={400}
      width="100%"
      backgroundColor="$background"
      borderRadius="$4"
      shadowColor="$shadowColor"
      shadowRadius={10}
      shadowOpacity={0.1}
    >
      <Text fontSize="$8" fontWeight="700" marginBottom="$2">
        Create Account
      </Text>

      <Text fontSize="$4" color="$gray10" marginBottom="$4">
        Sign up to get started
      </Text>

      <YStack space="$3">
        <YStack space="$2">
          <Label htmlFor="email" fontSize="$3" fontWeight="600">
            Email
          </Label>
          <Input
            id="email"
            size="$4"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            borderWidth={1}
            borderColor="$gray6"
            focusStyle={{ borderColor: "$blue10" }}
            disabled={isLoading}
          />
        </YStack>

        <YStack space="$2">
          <Label htmlFor="password" fontSize="$3" fontWeight="600">
            Password
          </Label>
          <Input
            id="password"
            size="$4"
            placeholder="At least 6 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            borderWidth={1}
            borderColor="$gray6"
            focusStyle={{ borderColor: "$blue10" }}
            disabled={isLoading}
          />
        </YStack>

        <YStack space="$2">
          <Label htmlFor="confirmPassword" fontSize="$3" fontWeight="600">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            size="$4"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            borderWidth={1}
            borderColor="$gray6"
            focusStyle={{ borderColor: "$blue10" }}
            disabled={isLoading}
          />
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
        {isLoading ? <Spinner color="$white" /> : "Create Account"}
      </Button>

      <XStack justifyContent="center" marginTop="$3">
        <Text fontSize="$3" color="$gray11">
          Already have an account?{" "}
        </Text>
        <Text
          fontSize="$3"
          color="$blue10"
          fontWeight="600"
          onPress={() => router.push("/(auth)/LoginPage")}
        >
          Sign In
        </Text>
      </XStack>
    </YStack>
  );
};

export default SignupForm;
