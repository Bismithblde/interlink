import { YStack, Text, H1 } from 'tamagui';

export default function Explore() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" backgroundColor="$background">
      <H1>Explore</H1>
      <Text>Discover new connections</Text>
    </YStack>
  );
}
