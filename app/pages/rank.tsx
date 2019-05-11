import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { FadeIn } from '../components/FadeIn'
import { Share } from '../components/Share'
import { AdSense } from '../components/AdSense'

import { Thing } from '../interfaces'
import { colors } from '../theme'
import { useCollection } from '../useCollection'
import { db } from '../firebase'
import { getNewRating } from '../elo'

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

const ThingCard = ({
  thing = { label: ' ', id: '', rank: 0 },
  onPress,
  style = {}
}: {
  thing: Thing
  onPress: () => void
  style?: any
}): JSX.Element => (
  <TouchableOpacity onPress={onPress} style={[styles.thingContainer, style]}>
    <Text style={{ fontSize: 16 }}>{thing.label}</Text>
  </TouchableOpacity>
)

const RankPage = ({
  query: { slug }
}: {
  query: { slug: string }
}): JSX.Element => {
  const listId = slug
  //@ts-ignore
  const things: Thing[] = useCollection(`lists/${listId}/things`, 'createdAt')
  const rankThings: Thing[] = things.sort((a, b): number => b.rank - a.rank)

  let thingA: Thing | null = null
  let thingB: Thing | null = null

  const uniqueRanks = new Set(rankThings.map(({ rank }): number => rank))
  const groupThings = Array.from(uniqueRanks).map(
    (rank): Thing[] =>
      rankThings.filter(({ rank: filterRank }): boolean => rank === filterRank)
  )
  rankThings.map(
    (thing1): void[] =>
      rankThings.map(
        (thing2): void => {
          if (
            thing1.rank === thing2.rank &&
            thing1.label !== thing2.label &&
            thingA === null &&
            thingB === null
          ) {
            thingA = thing1
            thingB = thing2
          }
        }
      )
  )
  if (thingA === null || thingB === null) {
    thingA = things[Math.floor(Math.random() * things.length)]
    const thingsWithOutA = things.filter(
      //@ts-ignore
      ({ label }): boolean => label !== thingA.label
    )
    thingB = thingsWithOutA[Math.floor(Math.random() * thingsWithOutA.length)]
  }

  const chooseThing = ({
    thingWin,
    thingLose
  }: {
    thingWin: Thing
    thingLose: Thing
  }): void => {
    db.collection(`lists/${listId}/things`)
      .doc(thingWin.id)
      .set({
        ...thingWin,
        rank: getNewRating(thingWin.rank, thingLose.rank, 1)
      })
    db.collection(`lists/${listId}/things`)
      .doc(thingLose.id)
      .set({
        ...thingLose,
        rank: getNewRating(thingLose.rank, thingWin.rank, 0)
      })
  }

  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FadeIn>
            <Text style={styles.text}>Choose which one you prefer!</Text>
            <View style={{ flexDirection: 'row' }}>
              <ThingCard
                thing={thingA}
                style={{ marginRight: 4 }}
                onPress={(): void =>
                  // @ts-ignore
                  chooseThing({ thingWin: thingA, thingLose: thingB })
                }
              />
              <ThingCard
                thing={thingB}
                style={{ marginLeft: 4 }}
                onPress={(): void =>
                  // @ts-ignore
                  chooseThing({ thingWin: thingB, thingLose: thingA })
                }
              />
            </View>
            <Button
              color={colors.primary}
              title={'View Results!'}
              onPress={(): Promise<boolean> =>
                Router.push(`/results?slug=${listId}`, `/results/l/${listId}`)
              }
            />
            <Text style={{ fontSize: 16, padding: 16 }}>
              {things.length - groupThings.length} Ties
            </Text>
            <Share listId={listId} />
          </FadeIn>
          <AdSense />
        </View>
      </View>
    </>
  )
}

RankPage.getInitialProps = async ({
  query
}: {
  query: { slug: string }
}): Promise<object> => {
  return { query }
}

export default RankPage
