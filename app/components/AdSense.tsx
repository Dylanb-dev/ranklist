/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'

export class AdSense extends React.Component {
  componentDidMount() {
    const installGoogleAds = () => {
      const elem = document.createElement('script')
      elem.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      elem.async = true
      elem.defer = true
      document.body.insertBefore(elem, document.body.firstChild)
    }
    installGoogleAds()
    //@ts-ignore
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6452077522405100"
        data-ad-slot="12121212"
        data-ad-format="auto"
      />
    )
  }
}
