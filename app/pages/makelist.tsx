import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView
} from 'react-native'

import Router from 'next/router'
import Head from 'next/head'

import { AutoScrollView } from '../components/AutoScrollView'
import { FadeIn } from '../components/FadeIn'
import { Share } from '../components/Share'
import { AdSense } from '../components/AdSense'

import { Thing } from '../interfaces'
import { colors } from '../theme'
import { useCollection } from '../useCollection'
import { db } from '../firebase'

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
// const { width } = Dimensions.get('window')
// const maxWidth = theme.maxContentWidth
// const widthPlayer = Math.min(width - 40, maxWidth - 10)
// const heightPlayer = Math.round(widthPlayer * (9 / 16))

interface MakeListPageProps {
  things: Thing[]
  listId: string
  name: string
  addThing: (x: string) => void
  removeThing: (x: string) => void
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

    const handleRemoveThing = (removeThingId: string): void => {
      this.props.removeThing(removeThingId)
    }

    return (
      <>
        <Head>
          <title>RankList - {this.props.name}</title>
        </Head>
        <ScrollView>
          <View style={styles.background} />
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <FadeIn>
                <Text style={styles.text2}>
                  Enter {this.props.name} you want to rank!
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
                      ({ label, id }): JSX.Element => (
                        <View key={label} style={{ flexDirection: 'row' }}>
                          <Text style={styles.enteredThingText}>{label}</Text>
                          <View style={{ width: 33, height: 33 }}>
                            <Button
                              color={colors.primary}
                              title={' X '}
                              onPress={(): void => handleRemoveThing(id)}
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
                  title={'Add to List'}
                  onPress={handleAddThing}
                />
                <View style={{ height: 14 }} />
                <Button
                  color={colors.primary}
                  title={'go rank'}
                  onPress={(): void => {
                    if (this.props.things.length > 2) {
                      Router.push(
                        `/rank?slug=${this.props.listId}`,
                        `/rank/l/${this.props.listId}`
                      )
                    }
                  }}
                />
                <Share listId={this.props.listId} />
              </FadeIn>
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
}

const MakeList = ({
  listId,
  things: initialThings,
  name
}: {
  listId: string
  things: Thing[]
  name: string
}): JSX.Element => {
  let things = initialThings
  //@ts-ignore
  const fireBasethings: Thing[] = useCollection(
    `lists/${listId}/things`,
    'createdAt'
  )

  if (fireBasethings.length > 0) {
    things = fireBasethings
  }

  const removeThing = (id: string): void => {
    db.collection(`lists/${listId}/things`)
      .doc(id)
      .delete()
  }
  const addThing = (thingLabel: string, rank: number = 0): void => {
    console.log(thingLabel)
    db.collection(`lists/${listId}/things`).add({
      label: thingLabel,
      rank,
      createdAt: new Date()
    })
  }
  //@ts-ignore
  return (
    <MakeListPage
      name={name}
      listId={listId}
      things={things}
      addThing={addThing}
      removeThing={removeThing}
    />
  )
}

MakeList.getInitialProps = async ({
  query
}: {
  query: { slug: string }
}): Promise<object> => {
  const listId = query.slug
  return db
    .collection(`lists/${listId}/things`)
    .get()
    .then(
      (snapshot): Promise<object> => {
        let things: Record<string, any>[] = []
        snapshot.forEach(doc => things.push({ ...doc.data(), id: doc.id }))
        return db
          .collection(`lists`)
          .doc(listId)
          .get()
          .then(
            (doc): object => {
              const list = doc.data()
              if (list !== undefined) {
                return { listId, things, name: list.name }
              } else {
                // doc.data() will be undefined in this case
                return {}
              }
            }
          )
      }
    )
}

export default MakeList
