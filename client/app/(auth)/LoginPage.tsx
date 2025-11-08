import LoginForm from "@/src/components/ui/LoginForm";
import React from "react";
import { View } from "react-native";

const LoginPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <LoginForm />
    </View>
  );
};

export default LoginPage;
