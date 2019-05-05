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

import { getNewRating } from '../elo'
const premadeLists = require('../premade-lists.json')

const colors = {
  white: '#f8f9fa',
  black: '#374046',
  lightGray: '#dce1e4',
  darkGray: '#7a8b97',
  primary: '#3298d8',
  secondary: '#d87232'
}

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
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center'
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
    fontSize: 24,
    marginVertical: 32
  },
  text2: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 16,
    marginTop: 100
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

const FadeIn = ({
  children
}: {
  children: React.ReactChild | React.ReactChild[]
}): JSX.Element => {
  const [fadeAnim] = useState(new Animated.Value(0))
  useEffect((): void => {
    return Animated.timing(
      // Animate over time
      fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 500 // Make it take a while
      }
    ).start()
  }, [])

  return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
}

interface AutoScrollViewProps {
  children: React.ReactChild[] | React.ReactChild
  style?: any
}
class AutoScrollView extends React.Component<AutoScrollViewProps> {
  [x: string]: any

  render(): JSX.Element {
    const { style = {} } = this.props
    return (
      <ScrollView
        style={style}
        ref={(ref): ScrollView | null => (this.scrollView = ref)}
        onContentSizeChange={(): void => {
          this.scrollView.scrollToEnd({ animated: true })
        }}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}

const StartPage = ({
  setPage,
  setThings
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>
  setThings: React.Dispatch<React.SetStateAction<Thing[]>>
}): JSX.Element => {
  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FadeIn>
            <Text style={styles.text}>Welcome to Ranklist!</Text>
            <View style={{ marginVertical: 8 }}>
              <Text style={{ fontSize: 16 }}>
                Create a list and rank them using A/B selection
              </Text>
            </View>

            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.primary}
                title={'start a new list'}
                onPress={(): void => setPage('makelist')}
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Text style={{ fontSize: 16 }}>Or rank a premade list!</Text>
            </View>

            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.secondary}
                title={'arnotts biscuits'}
                onPress={(): void => {
                  setThings(
                    premadeLists.arnotts.map(
                      (lang: string): Thing => ({
                        label: lang,
                        rank: 0
                      })
                    )
                  )
                  setPage('makelist')
                }}
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.secondary}
                title={'fast food chains'}
                onPress={(): void => {
                  setThings(
                    premadeLists.fastfood.map(
                      (lang: string): Thing => ({
                        label: lang,
                        rank: 0
                      })
                    )
                  )
                  setPage('makelist')
                }}
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.secondary}
                title={'programming languages'}
                onPress={(): void => {
                  setThings(
                    premadeLists.programming.map(
                      (lang: string): Thing => ({
                        label: lang,
                        rank: 0
                      })
                    )
                  )
                  setPage('makelist')
                }}
              />
            </View>
          </FadeIn>
        </View>
      </View>
    </>
  )
}
interface MakeListPageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>
  things: Thing[]
  addThing: (x: string) => void
  removeThing: (x: string) => void
}

interface Thing {
  label: string
  rank: number
}
interface MakeListPageState {
  currentInput: string
  setFocus: boolean
}
class MakeListPage extends React.Component<
  MakeListPageProps,
  MakeListPageState
> {
  _textInput: TextInput | null
  constructor(props: MakeListPageProps) {
    super(props)
    this.state = {
      setFocus: false,
      currentInput: ''
    }
    this._textInput = null
  }

  componentDidMount(): void {
    setTimeout((): void => this.setState({ setFocus: true }), 1000)
  }

  componentDidUpdate(): void {
    if (this.state.setFocus) {
      this.setState(
        { setFocus: false },
        (): void => {
          setTimeout((): void => {
            if (this._textInput !== null) {
              this._textInput.focus()
            }
          }, 50)
        }
      )
    }
  }

  render(): JSX.Element {
    const handleAddThing = (): void => {
      if (this.state.currentInput !== '') {
        this.props.addThing(this.state.currentInput)
        this.setState({
          setFocus: true,
          currentInput: ''
        })
      }
    }

    const handleRemoveThing = (removeThingName: string): void => {
      this.props.removeThing(removeThingName)
    }

    return (
      <>
        <View style={styles.background} />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <FadeIn>
              <Text style={styles.text2}>
                Enter some things you want to rank!
              </Text>
              <AutoScrollView
                style={{ height: 220, backgroundColor: 'white', padding: 8 }}
              >
                {this.props.things.length === 0 ? (
                  <Text style={{ color: colors.darkGray, padding: 2 }}>
                    Things show up here...
                  </Text>
                ) : (
                  this.props.things.map(
                    ({ label }): JSX.Element => (
                      <View key={label} style={{ flexDirection: 'row' }}>
                        <Text style={styles.enteredThingText}>{label}</Text>
                        <View style={{ width: 33, height: 33 }}>
                          <Button
                            color={colors.primary}
                            title={' X '}
                            onPress={(): void => handleRemoveThing(label)}
                          />
                        </View>
                      </View>
                    )
                  )
                )}
              </AutoScrollView>
              <TextInput
                ref={(r): TextInput | null => (this._textInput = r)}
                value={this.state.currentInput}
                onChangeText={(e): void => this.setState({ currentInput: e })}
                placeholder="Enter thing here..."
                placeholderTextColor={colors.darkGray}
                style={styles.textInput}
                blurOnSubmit={false}
                onSubmitEditing={handleAddThing}
                maxLength={40}
              />
              <Button
                color={colors.secondary}
                title={'Add Thing'}
                onPress={handleAddThing}
              />
              <View style={{ height: 14 }} />
              <Button
                color={colors.primary}
                title={'go rank'}
                onPress={(): void => {
                  if (this.props.things.length > 2) {
                    this.props.setPage('rank')
                  }
                }}
              />
            </FadeIn>
          </View>
        </View>
      </>
    )
  }
}

const ThingCard = ({
  thing,
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

type ReadyProgress = number

const RankPage = ({
  setPage,
  chooseThing,
  readyProgress,
  things
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>
  chooseThing: ({
    thingWin,
    thingLose
  }: {
    thingWin: Thing
    thingLose: Thing
  }) => void
  readyProgress: ReadyProgress
  things: Thing[]
}): JSX.Element => {
  const rankThings: Thing[] = things.sort((a, b): number => b.rank - a.rank)

  let thingA: Thing | null = null
  let thingB: Thing | null = null

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
                  //@ts-ignore
                  chooseThing({ thingWin: thingA, thingLose: thingB })
                }
              />
              <ThingCard
                thing={thingB}
                style={{ marginLeft: 4 }}
                onPress={(): void =>
                  //@ts-ignore
                  chooseThing({ thingWin: thingB, thingLose: thingA })
                }
              />
            </View>
            <Button
              color={colors.primary}
              title={'View Results!'}
              onPress={(): void => setPage('results')}
            />
            <Text style={{ fontSize: 16, padding: 16 }}>
              {readyProgress} Ties
            </Text>
          </FadeIn>
        </View>
      </View>
    </>
  )
}

const ResultsPage = ({
  setPage,
  things
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>
  things: Thing[]
}): JSX.Element => {
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
            <Text style={styles.text}>Results!</Text>
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
                    ({ label }): JSX.Element => (
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
                            width: 50,
                            alignItems: 'center',
                            fontSize: 16,
                            marginVertical: 6
                          }}
                        >
                          {index + 1}.
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
                onPress={(): void => setPage('makelist')}
              />
            </View>
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.primary}
                title={'Rank More'}
                onPress={(): void => setPage('rank')}
              />
            </View>
          </FadeIn>
        </View>
      </View>
    </>
  )
}

const Index = (): JSX.Element => {
  const [page, setPage] = useState('start')
  const [things, setThings] = useState<Thing[]>([])
  const [readyProgress, setReadyProgress] = useState<ReadyProgress>(0)

  const filterThingsByLabel = (things: Thing[], thingLabel: string): Thing[] =>
    things.filter(({ label }): boolean => label !== thingLabel)

  const removeThing = (thingLabel: string): void => {
    setThings(filterThingsByLabel(things, thingLabel))
  }
  const addThing = (thingLabel: string): void => {
    setThings([...things, { label: thingLabel, rank: 0 }])
  }

  const checkReadyProgress = (things: Thing[]): ReadyProgress => {
    //@ts-ignore
    return things.filter(
      ({ rank: otherRank, label: otherLabel }): boolean =>
        things.filter(
          ({ rank, label }): boolean =>
            rank === otherRank && label !== otherLabel
        ).length > 0
    ).length
  }

  const chooseThing = ({
    thingWin,
    thingLose
  }: {
    thingWin: Thing
    thingLose: Thing
  }): void => {
    const newThingA = {
      label: thingWin.label,
      rank: getNewRating(thingWin.rank, thingLose.rank, 1)
    }

    const newThingB = {
      label: thingLose.label,
      rank: getNewRating(thingLose.rank, thingWin.rank, 0)
    }
    const newThings = things
      .filter(({ label }): boolean => label !== newThingA.label)
      .filter(({ label }): boolean => label !== newThingB.label)
      .concat(newThingA)
      .concat(newThingB)
    setReadyProgress(checkReadyProgress(newThings))
    setThings(newThings)
  }

  switch (page) {
    case 'start':
      return <StartPage setPage={setPage} setThings={setThings} />
    case 'makelist':
      return (
        <MakeListPage
          things={things}
          addThing={addThing}
          removeThing={removeThing}
          setPage={setPage}
        />
      )
    case 'rank':
      return (
        <RankPage
          setPage={setPage}
          things={things}
          readyProgress={readyProgress}
          chooseThing={chooseThing}
        />
      )
    case 'results':
      return <ResultsPage setPage={setPage} things={things} />
    default:
      return <StartPage setPage={setPage} setThings={setThings} />
  }
}

export default Index
