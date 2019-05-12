import React from 'react'
import { Linking, Text, TouchableOpacity } from 'react-native'
export const Coffee = ({}): JSX.Element => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        marginVertical: 24,
        width: 130,
        padding: 8,
        color: 'white',
        backgroundColor: 'brown'
      }}
      onPress={(): Promise<any> => {
        return Linking.openURL('https://www.buymeacoffee.com/DixKVXogb').catch(
          (err): void => console.error('An error occurred', err)
        )
      }}
    >
      <Text>Buy me a Coffee</Text>
    </TouchableOpacity>
  )
}
