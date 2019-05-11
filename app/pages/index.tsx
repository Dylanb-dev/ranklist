import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import { Thing } from '../interfaces'
import { db } from '../firebase'
import { useCollection } from '../useCollection'
import Router from 'next/router'
import { colors } from '../theme'
import { FadeIn } from '../components/FadeIn'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 16,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  contentContainer: {
    alignItems: 'stretch',
    maxWidth: 480,
    marginTop: 96,
    width: '100%',
    flexGrow: 1
  },
  background: {
    flexDirection: 'row',
    top: -180,
    left: -30,
    flexWrap: 'wrap',
    height: 220,
    width: 2000,
    position: 'absolute',
    transform: [{ rotate: '-4deg' }],
    backgroundColor: colors.primary,
    zIndex: 1
  },
  text: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    fontSize: 24
  },
  text2: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 16
  },
  text3: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    fontSize: 32,
    marginBottom: 24
  },
  enteredThingText: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    fontSize: 16,
    marginVertical: 10
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 16
  },
  thingContainer: {
    flex: 1,
    padding: 8,
    marginVertical: 32,
    backgroundColor: 'white'
  }
})

const StartPage = ({  }: {}): JSX.Element => {
  const [textInput, setTextInput] = useState('')
  const [errorText, setErrorText] = useState('')

  const handleNewList = (): Promise<boolean> | undefined => {
    if (textInput.trim() === '') {
      setErrorText('Please name your list')
    } else {
      const data = {
        createdAt: new Date(),
        name: textInput
      }
      return db
        .collection('lists')
        .add(data)
        .then(
          ({ id }: { id: string }): Promise<boolean> =>
            Router.push(`/makelist?slug=${id}`, `/makelist/l/${id}`)
        )
    }
  }
  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FadeIn>
            <Text style={styles.text}>Welcome to Ranklist!</Text>
            <Text style={styles.text3}>Make it. Share it. Rank it</Text>
            <View style={{ marginVertical: 8 }}>
              <Text style={{ fontSize: 16 }}>
                Create a list and rank them using A/B selection
              </Text>
            </View>
            <View style={{ marginVertical: 8 }}>
              <TextInput
                value={textInput}
                onChangeText={setTextInput}
                autoFocus={true}
                style={{
                  backgroundColor: 'white',
                  height: 48,
                  padding: 8,
                  marginTop: 16,
                  marginBottom: 4
                }}
                onSubmitEditing={handleNewList}
              />
              <Text style={{ height: 16, marginVertical: 4, color: 'red' }}>
                {errorText}
              </Text>
              <Button
                color={colors.primary}
                title={'create list'}
                onPress={handleNewList}
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Text style={{ fontSize: 16 }}>Or rank a premade list!</Text>
            </View>

            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.secondary}
                title={'arnotts biscuits'}
                onPress={(): Promise<boolean> =>
                  Router.push(
                    '/makelist?slug=lK0f3oHvWxopwn6vCO4U',
                    '/makelist/l/lK0f3oHvWxopwn6vCO4U'
                  )
                }
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.secondary}
                title={'fast food chains'}
                onPress={(): Promise<boolean> =>
                  Router.push(
                    '/makelist?slug=lK0f3oHvWxopwn6vCO4U',
                    '/makelist/l/lK0f3oHvWxopwn6vCO4U'
                  )
                }
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.secondary}
                title={'programming languages'}
                onPress={(): Promise<boolean> =>
                  Router.push(
                    '/makelist?slug=lK0f3oHvWxopwn6vCO4U',
                    '/makelist/l/lK0f3oHvWxopwn6vCO4U'
                  )
                }
              />
            </View>
          </FadeIn>
        </View>
      </View>
    </>
  )
}

const Index = (): JSX.Element => {
  return <StartPage />
}

export default Index
