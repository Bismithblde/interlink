import { Redirect } from "expo-router";
import "./globals.css";

export default function Index() {
  // Check if user is authenticated (replace with actual auth check)
  const isAuthenticated = false; // TODO: Check auth state

  // Redirect to login page on app start
  return <Redirect href="/(auth)/LoginPage" />;
}
