import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Linking,
  ScrollView
} from 'react-native'
import Head from 'next/head'
import Router from 'next/router'

import { db } from '../firebase'
import { colors } from '../theme'
import { FadeIn } from '../components/FadeIn'
import { AdSense } from '../components/AdSense'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 16,
    top: 0,
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  contentContainer: {
    alignItems: 'stretch',
    maxWidth: 480,
    marginTop: 54,
    width: '100%',
    flexGrow: 1
  },
  background: {
    flexDirection: 'row',
    top: -65,
    left: -30,
    flexWrap: 'wrap',
    height: 80,
    width: 2000,
    transform: [{ rotate: '-3deg' }],
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
      <Head>
        <title>Ranklist - Rank everything!</title>
      </Head>
      <ScrollView>
        <View style={styles.background} />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <FadeIn>
              <Text style={styles.text}>Welcome to Ranklist!</Text>
              <Text style={styles.text3}>Make it. Share it. Rank it</Text>
              <View style={{ marginVertical: 8 }}>
                <Text style={{ fontSize: 16 }}>
                  Create a list and rank them using A/B selection and ELO
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
                  title={'fast food chains'}
                  onPress={(): Promise<boolean> =>
                    Router.push(
                      '/rank?slug=jM23cMCFmkVLAY6WWuOk',
                      '/rank/l/jM23cMCFmkVLAY6WWuOk'
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
                      '/rank?slug=b7XUHNdgQg6XeTp0IMSO',
                      '/rank/l/b7XUHNdgQg6XeTp0IMSO'
                    )
                  }
                />
              </View>
              <View style={{ marginVertical: 8 }}>
                <Button
                  color={colors.secondary}
                  title={'arnotts biscuits'}
                  onPress={(): Promise<boolean> =>
                    Router.push(
                      '/rank?slug=Q9d04QrgFm2dZx6Po2Kv',
                      '/rank/l/Q9d04QrgFm2dZx6Po2Kv'
                    )
                  }
                />
              </View>
              <Text
                onPress={(): Promise<any> => {
                  return Linking.openURL(
                    'https://twitter.com/d_broadbridge'
                  ).catch(
                    (err): void => console.error('An error occurred', err)
                  )
                }}
                style={{ marginVertical: 16, textDecorationLine: 'underline' }}
              >
                Issues? Message me on Twitter
              </Text>
            </FadeIn>
            <AdSense />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const Index = (): JSX.Element => {
  return <StartPage />
}

export default Index
