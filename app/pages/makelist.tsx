import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
  Linking,
  ImageBackground,
  Dimensions
} from 'react-native'
import Link from 'next/link'

const styles = StyleSheet.create({
  app: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center'
  },
  container1: {
    maxWidth: 720,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  heroText: {
    alignItems: 'center',
    textAlign: 'center',
    // color: theme.black,
    fontSize: 36,
    padding: 48
  },
  buttonContainer: {
    padding: 48
  },
  logo: {
    marginTop: 50,
    height: 100,
    width: 320
  }
})
// const { width } = Dimensions.get('window')
// const maxWidth = theme.maxContentWidth
// const widthPlayer = Math.min(width - 40, maxWidth - 10)
// const heightPlayer = Math.round(widthPlayer * (9 / 16))

const MakeList = (): JSX.Element => (
  <ScrollView
    contentContainerStyle={{
      width: '100%',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    }}
  >
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
      Check it out
    </Text>
  </ScrollView>
)

export default MakeList
