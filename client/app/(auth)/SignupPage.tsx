import React from "react";
import { View } from "react-native";
import SignupForm from "../../src/components/ui/SignupForm";

export default function SignupPage() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-4">
      <SignupForm />
    </View>
  );
}
