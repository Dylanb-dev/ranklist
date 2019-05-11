import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { FadeIn } from '../components/FadeIn'
import { Share } from '../components/Share'

import { Thing } from '../interfaces'
import { colors } from '../theme'
import { useCollection } from '../useCollection'

import Router from 'next/router'

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
// const { width } = Dimensions.get('window')
// const maxWidth = theme.maxContentWidth
// const widthPlayer = Math.min(width - 40, maxWidth - 10)
// const heightPlayer = Math.round(widthPlayer * (9 / 16))
const ResultsPage = ({
  query: { slug }
}: {
  query: { slug: string }
}): JSX.Element => {
  const listId = slug
  //@ts-ignore
  const things: Thing[] = useCollection(`lists/${listId}/things`, 'createdAt')
  const rankThings: Thing[] = things.sort((a, b): number => b.rank - a.rank)
  const uniqueRanks = new Set(rankThings.map(({ rank }): number => rank))
  const groupThings = Array.from(uniqueRanks).map(
    (rank): Thing[] =>
      rankThings.filter(({ rank: filterRank }): boolean => rank === filterRank)
  )

  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FadeIn>
            <Text style={[styles.text, { marginVertical: 16 }]}>Results!</Text>
            <ScrollView
              style={{
                height: 220,
                backgroundColor: 'white',
                padding: 8,
                marginBottom: 8
              }}
            >
              {groupThings.map(
                (group, index): JSX.Element[] =>
                  group.map(
                    ({ label, rank }): JSX.Element => (
                      <View
                        key={label}
                        style={{
                          marginVertical: 8,
                          flexDirection: 'row',
                          alignItems: 'flex-start'
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: 'bold',
                            width: 80,
                            alignItems: 'center',
                            fontSize: 16,
                            marginVertical: 6
                          }}
                        >
                          {index + 1}.{' '}
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'normal'
                            }}
                          >
                            ({rank})
                          </Text>
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            fontSize: 16,
                            marginVertical: 6
                          }}
                        >
                          {label}
                        </Text>
                      </View>
                    )
                  )
              )}
            </ScrollView>
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.secondary}
                title={'Add More'}
                onPress={(): Promise<boolean> =>
                  Router.push(
                    `/makelist?slug=${listId}`,
                    `/makelist/l/${listId}`
                  )
                }
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.primary}
                title={'Rank More'}
                onPress={(): Promise<boolean> =>
                  Router.push(`/rank?slug=${listId}`, `/rank/l/${listId}`)
                }
              />
            </View>
            <Share listId={listId} />
          </FadeIn>
        </View>
      </View>
    </>
  )
}

ResultsPage.getInitialProps = async ({
  query
}: {
  query: { slug: string }
}): Promise<object> => {
  return { query }
}

export default ResultsPage