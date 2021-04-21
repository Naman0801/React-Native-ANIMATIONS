import * as React from 'react';
import { Image, Animated, Text, View, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import faker from 'faker';
const { width, height } = Dimensions.get('screen');

const images = [
    'https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1698394/pexels-photo-1698394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

faker.seed(10);

const DATA = [...Array(images.length).keys()].map((_, i) => {
    return {
        key: faker.datatype.uuid(),
        image: images[i],
        title: faker.commerce.productName(),
        subtitle: faker.company.bs(),
        price: faker.finance.amount(80, 200, 0),
    };
});

const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const SPACING = 20;

const Content = ({ item }) => {
    return (
        <>
            <Text style={styles.contentTitle} numberOfLines={1} adjustsFontSizeToFit>
                {item.title}
            </Text>
            <Text style={{ fontSize: 12, opacity: 0.4 }}>{item.subtitle}</Text>
            <View style={{ flexDirection: 'row', marginTop: SPACING }}>
                <Text style={styles.contentPrice}>{item.price}</Text>
                <Text style={styles.contentCurrency}>USD</Text>
            </View>
        </>
    );
};

export default ThreeDCarouselAnimation = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const progress = Animated.modulo(Animated.divide(scrollX, width), width);
    const [index, setIndex] = React.useState(0);
    const ref = React.useRef();

    return (
        <View style={{ backgroundColor: '#A5F1FA', flex: 1 }}>
            <StatusBar hidden />
            <SafeAreaView style={{ marginTop: SPACING * 4 }}>
                <View style={{ height: IMAGE_HEIGHT * 2.1 }}>
                    <Animated.FlatList
                        ref={ref}
                        data={DATA}
                        keyExtractor={(item) => item.key}
                        horizontal
                        pagingEnabled
                        bounces={false}
                        style={{ flexGrow: 0, zIndex: 999 }}
                        contentContainerStyle={{ height: IMAGE_HEIGHT + SPACING * 2, paddingHorizontal: SPACING * 2 }}
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        onMomentumScrollEnd={e => setIndex(Math.floor(e.nativeEvent.contentOffset.x / width))}
                        renderItem={({ item, index }) => {
                            const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0]
                            })
                            const translateY = scrollX.interpolate({
                                inputRange,
                                outputRange: [50, 0, 20]
                            })
                            return (
                                <Animated.View style={{ width, paddingVertical: SPACING, opacity, transform: [{ translateY }] }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.flatListImg}
                                    />
                                </Animated.View>
                            );
                        }}
                    />
                    <View style={styles.contentCont}>
                        {DATA.map((item, index) => {
                            const inputRange = [(index - .5) * width, index * width, (index + .5) * width]
                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0]
                            })
                            const rotateY = scrollX.interpolate({
                                inputRange,
                                outputRange: ['90deg', '0deg', '90deg']
                            })
                            return (
                                <Animated.View
                                    key={item.key}
                                    style={{ position: 'absolute', opacity, transform: [{ perspective: IMAGE_WIDTH * 4 }, { rotateY }] }}
                                >
                                    <Content item={item} />
                                </Animated.View>
                            )
                        })}
                    </View>
                    <Animated.View
                        style={{
                            width: IMAGE_WIDTH + SPACING * 2,
                            position: 'absolute',
                            backgroundColor: 'white',
                            backfaceVisibility: true,
                            zIndex: -1,
                            top: SPACING * 2,
                            left: SPACING,
                            bottom: 0,
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            shadowRadius: 24,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            transform: [
                                { perspective: IMAGE_WIDTH * 4 },
                                {
                                    rotateY: progress.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: ['0deg', '90deg', '180deg']
                                    })
                                }
                            ]
                        }}
                    />
                </View>

                <View style={styles.btnCont}>
                    <TouchableOpacity
                        disabled={index === 0}
                        style={{ opacity: index === 0 ? 0.2 : 1 }}
                        onPress={() => {
                            ref?.current?.scrollToOffset({
                                offset: (index - 1) * width,
                                animated: true,
                            })
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name='swapleft' size={42} color='black' />
                            <Text style={{ fontSize: 12, fontWeight: '800' }}>PREV</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={index === DATA.length - 1}
                        style={{ opacity: DATA.length - 1 === index ? 0.2 : 1 }}
                        onPress={() => {
                            ref?.current?.scrollToOffset({
                                offset: (index + 1) * width,
                                animated: true,
                            })
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: '800' }}>NEXT</Text>
                            <AntDesign name='swapright' size={42} color='black' />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    contentTitle: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    contentPrice: {
        fontSize: 42,
        letterSpacing: 3,
        fontWeight: '900',
        marginRight: 8,
    },
    contentCurrency: {
        fontSize: 16,
        lineHeight: 36,
        fontWeight: '800',
        alignSelf: 'flex-end',
    },
    flatListImg: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        resizeMode: 'cover'
    },
    contentCont: {
        width: IMAGE_WIDTH,
        alignItems: 'center',
        paddingHorizontal: SPACING * 2,
        marginLeft: SPACING * 2,
        zIndex: 999
    },
    btnCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: IMAGE_WIDTH + SPACING * 4,
        paddingHorizontal: SPACING,
        paddingVertical: SPACING,
    }
})