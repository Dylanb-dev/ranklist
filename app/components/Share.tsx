import React from 'react'
import { TextInput, Text, View } from 'react-native'
export const Share = ({ listId }: { listId: string }): JSX.Element => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginVertical: 24
      }}
    >
      <Text>Share List: </Text>
      <TextInput
        value={`www.ranklist.xyz/results/l/${listId}`}
        editable={false}
        style={{
          flex: 1,
          height: 42,
          padding: 8,
          backgroundColor: 'white',
          borderRadius: 2,
          borderColor: 'black'
        }}
      />
    </View>
  )
}
