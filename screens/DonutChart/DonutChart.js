import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Donut from './components/Donut'

const DonutChart = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Donut />
        </SafeAreaView>
    )
}

export default DonutChart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});