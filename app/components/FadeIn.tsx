import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
export const FadeIn = ({
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
