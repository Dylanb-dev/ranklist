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
    width: '100vw',
    padding: 16,
    height: '100vh',
    zIndex: 2,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)'
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
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true })
        }}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}

const StartPage = ({
  setPage
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <FadeIn>
          <Text style={styles.text}>Welcome to Ranklist!</Text>
          <Button
            color={colors.primary}
            title={'start'}
            onPress={(): void => setPage('makelist')}
          />
        </FadeIn>
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
      console.log('TEST')
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
    <Text>{thing.label}</Text>
  </TouchableOpacity>
)

type ReadyProgress = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100

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
  const thingA = things[0]
  const thingB = things[1]

  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <FadeIn>
          <Text style={styles.text}>Choose which one you prefer!</Text>
          <View style={{ flexDirection: 'row' }}>
            <ThingCard
              thing={thingA}
              style={{ marginRight: 4 }}
              onPress={() => console.log(`clicked ${thingA.label}`)}
            />
            <ThingCard
              thing={thingB}
              style={{ marginLeft: 4 }}
              onPress={() => console.log(`clicked ${thingB.label}`)}
            />
          </View>
          <Button
            color={colors.secondary}
            title={'Skip'}
            onPress={(): void => setPage('results')}
          />
          {readyProgress === 100 ? (
            <View style={{ marginVertical: 8 }}>
              <Button
                color={colors.primary}
                title={'View Results!'}
                onPress={(): void => setPage('results')}
              />
            </View>
          ) : (
            <Text>{readyProgress}% Complete</Text>
          )}
        </FadeIn>
      </View>
    </>
  )
}

const Index = (): JSX.Element => {
  const [page, setPage] = useState('start')
  const [things, setThings] = useState<Thing[]>([])
  const [readyProgress, setReadyProgress] = useState<ReadyProgress>(100)

  const removeThing = (thingLabel: string): void => {
    setThings(things.filter(({ label }): boolean => label !== thingLabel))
  }
  const addThing = (thingLabel: string): void => {
    setThings([...things, { label: thingLabel, rank: 0 }])
  }
  const chooseThing = ({
    thingWin,
    thingLose
  }: {
    thingWin: Thing
    thingLose: Thing
  }): void => {}

  switch (page) {
    case 'start':
      return <StartPage setPage={setPage} />
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
    default:
      return <StartPage setPage={setPage} />
  }
}

export default Index
