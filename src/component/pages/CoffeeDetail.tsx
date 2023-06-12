import React, { useMemo } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { renewData } from '../../assets/redux/coffee/action'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const CoffeeDetail = ({ route }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const allCoffee = useSelector((state: RootStateType) => state.allCoffee)

    const Coffee = useMemo(() => {
        for (let i = 0; i < allCoffee.length; i += 1) {
            if (allCoffee[i].id === route.params.item.id) {
                return allCoffee[i]
            }
        }
        return route.params.item
    }, allCoffee)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.itemLabel}>{Coffee.title}</Text>
            <TouchableOpacity activeOpacity={1}>
                <Ionicons
                    style={{ color: 'tomato' }}
                    name={Coffee.isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    onPress={() => {
                        const CoffeeCopy = { ...Coffee }
                        CoffeeCopy.isFavorite = !CoffeeCopy.isFavorite
                        dispatch(renewData(CoffeeCopy))
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('WebPage', { Coffee })}
            >
                <FastImage style={styles.itemImg} source={{ uri: Coffee.imgLink }} />
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    itemImg: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    itemLabel: {
        fontSize: 24,
    },
});

export default CoffeeDetail;