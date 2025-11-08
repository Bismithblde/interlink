import { Stack } from "expo-router";
import "./globals.css";
import { TamaguiProvider } from "tamagui";
import { PortalProvider } from "@tamagui/portal";
import config from "../tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <PortalProvider shouldAddRootHost>
        <Stack />
      </PortalProvider>
    </TamaguiProvider>
  );
}
