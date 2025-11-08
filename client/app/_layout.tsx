import { Stack } from "expo-router";
import "./globals.css";
import { TamaguiProvider } from "tamagui";
import { PortalProvider } from "@tamagui/portal";
import { UserProvider } from "@/src/contexts/UserContext";
import config from "../tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <PortalProvider shouldAddRootHost>
        <UserProvider>
          <Stack />
        </UserProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
