import React from 'react'
import { ScrollView } from 'react-native'

interface AutoScrollViewProps {
  children: React.ReactChild[] | React.ReactChild
  style?: any
}
export class AutoScrollView extends React.Component<AutoScrollViewProps> {
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
