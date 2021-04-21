import React, { useRef } from 'react'
import { Dimensions, StyleSheet, Text, View, Image, StatusBar, ImageBackground, Animated } from 'react-native'
import faker from 'faker'


const BG_IMG = 'https://images.unsplash.com/photo-1514810771018-276192729582?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FybXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'

const SPACING = 20;
const AVT = 70;
const ITEM_SIZE = AVT + SPACING * 3;
const FlatListAnimation = () => {
    const scrollY = useRef(new Animated.Value(0)).current

    const { width, height } = Dimensions.get('screen');
    faker.seed(10);

    const DATA = [...Array(30).keys()].map((_, i) => {
        return {
            key: faker.random.uuid(),
            image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
            name: faker.name.findName(),
            jobTitle: faker.name.jobTitle(),
            email: faker.internet.email(),
        };
    });

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ImageBackground source={{ uri: BG_IMG }} style={{ flex: 1 }} blurRadius={80} >
                <Animated.FlatList
                    data={DATA}
                    keyExtractor={item => item.key}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 42 }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    renderItem={({ item, index }) => {
                        const scaleInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]
                        const scale = scrollY.interpolate({
                            inputRange: scaleInputRange,
                            outputRange: [1, 1, 1, 0]
                        })

                        const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]
                        const opacity = scrollY.interpolate({
                            inputRange: opacityInputRange,
                            outputRange: [1, 1, 1, 0]
                        })

                        return (
                            <Animated.View style={[styles.cardCont, { opacity, transform: [{ scale }] }]} >
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: AVT, height: AVT, borderRadius: AVT, marginRight: SPACING / 2 }}
                                />
                                <View>
                                    <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 18, opacity: .7 }}>{item.jobTitle}</Text>
                                    <Text style={{ fontSize: 14, color: '#0099cc', opacity: .8 }} >{item.email}</Text>
                                </View>
                            </Animated.View>
                        )
                    }}
                />
            </ImageBackground>
        </View>
    )
}

export default FlatListAnimation

const styles = StyleSheet.create({
    cardCont: {
        overflow: 'hidden',
        flexDirection: 'row',
        padding: SPACING,
        marginBottom: SPACING,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: .3,
        shadowRadius: 20
    }
})
