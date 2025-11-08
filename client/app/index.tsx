import { Redirect } from "expo-router";
import "./globals.css";

export default function Index() {
  // Check if user is authenticated (replace with actual auth check)
  const isAuthenticated = false; // TODO: Connect to actual auth state management

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/index.tsx" />;
  }

  return <Redirect href="/(auth)/LoginPage" />;
}
