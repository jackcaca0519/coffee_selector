import React, { useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, } from 'react-native';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const FavoriteScreen = () => {
    const navigation = useNavigation()
    const allCoffee = useSelector((state: RootStateType) => state.allCoffee)

    const favoriteList = useMemo(() => allCoffee.filter((coffee) => coffee.isFavorite), allCoffee)

    const Item = ({ Coffee }: ItemProps) => (
        <View style={styles.item}>
            <Text style={styles.title}>{Coffee.title}</Text>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Detail', { item: Coffee })}
            >
                <FastImage style={styles.itemImg} source={{ uri: Coffee.imgLink }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteList}
                renderItem={({ item }) => <Item Coffee={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    itemImg: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    title: {
        fontSize: 32,
        textAlign: 'center'
    },
});

export default FavoriteScreen;