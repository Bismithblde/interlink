import React, { useState } from "react";
import { YStack, XStack, Text, Button, Input, Label } from "tamagui";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Login:", { email, password });
    // TODO: Add login logic
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
      >
        Sign In
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
