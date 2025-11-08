import React, { useState } from "react";
import { YStack, XStack, Text, Button, Input, Label, Spinner } from "tamagui";
import { Alert, Platform } from "react-native";
import axios from "axios";

// For Expo Go: use your computer's actual IP address
// Both devices need to be on the same WiFi network
const API_URL = Platform.select({
  android: "http://172.24.59.166:8000",
  ios: "http://172.24.59.166:8000",
  default: "http://172.24.59.166:8000",
});

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        { email, password },
        { timeout: 10000 }
      );

      console.log("Login successful:", response.data);
      Alert.alert("Success", "Login successful!");
    } catch (error: any) {
      console.error("Login failed:", error);

      if (error.response) {
        // Backend returned an error
        Alert.alert(
          "Login Failed",
          error.response.data?.detail || "Invalid credentials"
        );
      } else if (error.request) {
        // Couldn't reach the server
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
        Welcome Back
      </Text>

      <Text fontSize="$4" color="$gray10" marginBottom="$4">
        Sign in to continue
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
            focusStyle={{
              borderColor: "$blue10",
            }}
          />
        </YStack>

        <YStack space="$2">
          <Label htmlFor="password" fontSize="$3" fontWeight="600">
            Password
          </Label>
          <Input
            id="password"
            size="$4"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            borderWidth={1}
            borderColor="$gray6"
            focusStyle={{
              borderColor: "$blue10",
            }}
          />
        </YStack>
      </YStack>

      <Button
        size="$4"
        theme="blue"
        onPress={handleSubmit}
        marginTop="$4"
        backgroundColor="$blue10"
        pressStyle={{
          backgroundColor: "$blue11",
        }}
        disabled={isLoading}
      >
        {isLoading ? <Spinner color="$white" /> : "Sign In"}
      </Button>

      <XStack justifyContent="center" marginTop="$3">
        <Text fontSize="$3" color="$gray11">
          Don't have an account?{" "}
        </Text>
        <Text fontSize="$3" color="$blue10" fontWeight="600">
          Sign Up
        </Text>
      </XStack>
    </YStack>
  );
};

export default LoginForm;
