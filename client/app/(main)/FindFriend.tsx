import React from 'react';
import { View, Text } from 'react-native';
import FindFriendFilter from '@/src/components/ui/FindFriend/FindFriendFilter';

export default function FindFriendPage() {
  return (
    <View>
      <Text>Find a Friend</Text>
      <FindFriendFilter />
      {/* You can add the results component here */}
    </View>
  );
}