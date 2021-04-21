import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const Donut = ({
    precentage = 75,
    radius = 40,
    strokeWidth = 10,
    duration = 20,
    color = 'tomato',
    delay = 0,
    textColor,
    max = 1000,
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const circleRef = useRef();
    const halfCircle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius

    const maxPercentage = 100 * precentage / max
    const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100
    useEffect(() => {
    }, [])

    const animation = () => {
        // return Animated.timing
    }

    return (
        <View>
            <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`} >
                <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`} >
                    <Circle
                        cx="50"
                        cy="50"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        strokeOpacity={0.2}
                        fill='transparent'
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx="50"
                        cy="50"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap='round'
                    />
                </G>
            </Svg>
        </View>
    )
}

export default Donut

const styles = StyleSheet.create({

})
