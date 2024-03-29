import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { AppRegistry } from 'react-native'

// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: any) {
    AppRegistry.registerComponent('Main', () => Main)
    // @ts-ignore: react-native-web method
    const { getStyleElement } = AppRegistry.getApplication('Main')
    const page = renderPage()
    const styles = [
      <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement()
    ]
    return { ...page, styles: React.Children.toArray(styles) }
  }

  render() {
    return (
      <html style={{ height: '100%' }}>
        <Head>
          <link
            rel="icon"
            type="image/x-icon"
            href={require('../favicon.ico')}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body style={{ height: '100%', overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
