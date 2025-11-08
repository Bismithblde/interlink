import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function FindFriendFilter() {
  const [selectedPeople, setSelectedPeople] = useState<number | null>(null);

  const peopleOptions = [2, 3, 4];

  return (
    <View>
      <Text>How many people in your group?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        {peopleOptions.map((option) => (
          <Pressable
            key={option}
            onPress={() => setSelectedPeople(option)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: selectedPeople === option ? 'blue' : 'gray',
              borderRadius: 5,
            }}
          >
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>
      {selectedPeople && <Text>Looking for groups of {selectedPeople}.</Text>}
      {/* Add other filter controls here */}
    </View>
  );
}
