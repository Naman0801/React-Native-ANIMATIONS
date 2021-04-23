import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
const { height, width } = Dimensions.get('screen');

const Inicator = ({ measures, scrollX }) => {
    const inputRange = data.map((_, i) => i * width);
    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(m => m.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(m => m.x)
    })

    return (
        <Animated.View
            style={{
                position: 'absolute', height: 4, backgroundColor: '#fff', bottom: -10, borderRadius: 2,
                width: indicatorWidth,
                transform: [{ translateX }]
            }}
        />
    )
}

const Tabs = ({ scrollX, data, onItemPress }) => {
    const [measures, setMeasure] = React.useState([]);
    const tabContainerRef = React.useRef();

    React.useEffect(() => {
        const m = [];
        data.forEach(item => {
            item.ref.current.measureLayout(
                tabContainerRef.current, (x, y, width, height) => {
                    // console.log(item.title, '>>>>', x, y, width, height)
                    m.push({ x, y, width, height })
                    if (m.length === data.length) setMeasure(m);
                }
            )
        });
    }, [measures.length])

    return (
        <View ref={tabContainerRef} style={{ position: 'absolute', width, top: 100 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {data.map((item, i) => (
                    <TouchableOpacity activeOpacity={0.5} onPress={() => onItemPress(i)} key={item.key}>
                        <View ref={item.ref}>
                            <Text style={[styles.tabHeader, { fontSize: 80 / data.length }]}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            {measures.length > 0 && <Inicator measures={measures} scrollX={scrollX} />}
        </View>
    )
}

const TabNavigatorCarousel = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current
    const ref = React.useRef();
    const onItemPress = React.useCallback(itemIndex => {
        console.log(itemIndex);
        ref?.current?.scrollToOffset({
            offset: itemIndex * width
        })
    })

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden />
            <Animated.FlatList
                ref={ref}
                data={data}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, height }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{ flex: 1, resizeMode: 'cover' }}
                            />
                            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0, 0, 0, 0.3)' }]} />
                        </View>
                    )
                }}
            />
            <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
        </View>
    )
}

export default TabNavigatorCarousel

const styles = StyleSheet.create({
    tabHeader: {
        color: '#fff',
        fontWeight: '800',
        textTransform: 'uppercase'
    }
})

const images = {
    man:
        'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    women:
        'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids:
        'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy:
        'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    help:
        'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
    ref: React.createRef()
}));