import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import FastImage from 'react-native-fast-image'
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux'
import { getAllCoffeeBegin } from '../../assets/redux/coffee/action'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const TRANSLATE_VALUE = Math.round(SLIDER_WIDTH * 0.3 / 4);

export default HomeScreen = () => {
    const [active, setActive] = useState(0)
    const navigation = useNavigation()

    const dispatch = useDispatch()
    const allCoffee = useSelector((state: RootStateType) => state.allCoffee)
    useEffect(() => {
        dispatch(getAllCoffeeBegin())
    }, [])

    function scrollInterpolator(index, carouselProps) {
        const range = [1, 0, -1];
        const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
        const outputRange = range;

        return { inputRange, outputRange };
    }
    function animatedStyles(index, animatedValue, carouselProps) {
        const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';
        let animatedOpacity = {};
        let animatedTransform = {};

        if (carouselProps.inactiveSlideOpacity < 1) {
            animatedOpacity = {
                opacity: animatedValue.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [carouselProps.inactiveSlideOpacity, 1, carouselProps.inactiveSlideOpacity]
                })
            };
        }

        if (carouselProps.inactiveSlideScale < 1) {
            animatedTransform = {
                transform: [
                    {
                        scale: animatedValue.interpolate({
                            inputRange: [-1, 0, 1],
                            outputRange: [carouselProps.inactiveSlideScale, 1, carouselProps.inactiveSlideScale]
                        })
                    },
                    {
                        [translateProp]: animatedValue.interpolate({
                            inputRange: [-1, 0, 1],
                            outputRange: [
                                TRANSLATE_VALUE * carouselProps.inactiveSlideScale,
                                0,
                                -TRANSLATE_VALUE * carouselProps.inactiveSlideScale
                            ]
                        })
                    }
                ]
            };
        }

        return {
            ...animatedOpacity,
            ...animatedTransform,
            zIndex: active === index ? 1 : 0
        };
    }

    const renderItem = ({ item }: RenderItemProps) => {
        return (
            <View View style={styles.itemContainer} >
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ height: '100%', width: '100%' }}
                    onPress={() => navigation.navigate('Detail', { item })}>
                    <FastImage
                        style={styles.itemImg}
                        source={{
                            uri: item.imgLink
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <Carousel
                ref={ref => this.carousel = ref}
                data={allCoffee}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView={true}
                onSnapToItem={(index) => setActive(index)}
            />
            {/* <View style={styles.counter}>
                <Button
                    title="Go to Detail"
                    onPress={() => navigation.navigate('Detail')}
                />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
        marginTop: 50
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImg: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    itemLabel: {
        color: 'white',
        fontSize: 24
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    }
});