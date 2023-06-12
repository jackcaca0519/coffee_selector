import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, Platform, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCoffeeBegin } from '../../assets/redux/coffee/action';

import Coffee from '../../assets/models/Coffee'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const SearchingScreen = () => {
    const [input, setInput] = useState<string>('')
    const [keyClick, setKeyClick] = useState<string>('')
    const navigation = useNavigation()
    const allCoffee = useSelector((state: RootStateType) => state.allCoffee)

    const typeList = useMemo(() => {
        const result: Array<string> = []
        const log: { [index: string]: boolean } = {}
        allCoffee.forEach(({ type }) => {
            for (let i = 0; i < type.length; i++) {
                if (!log[type[i]] && type[i].length > 0) {
                    log[type[i]] = true
                    result.push(type[i])
                }
            }
        })
        return result
    }, allCoffee);

    const searchResult = useMemo(() => {
        const result: Array<Coffee> = []

        if (input) {
            allCoffee.forEach((coffee) => {
                if (coffee.title.indexOf(input) !== -1) {
                    result.push(coffee)
                }
            });
        } else if (keyClick) {
            allCoffee.forEach((coffee) => {
                coffee.type.forEach((type) => {
                    if (type === keyClick) {
                        result.push(coffee)
                    }
                });
            });
        } else {
            allCoffee.forEach((coffee) => {
                result.push(coffee)
            })
        }

        return result
    }, [input, keyClick]);

    const onChangeHandler = (text: string) => {
        setKeyClick('')
        setInput(text)
    }
    const onPressHandler = (text: string) => {
        setInput('')
        if (keyClick === text) {
            setKeyClick('')
        } else {
            setKeyClick(text)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchArea}>
                <TextInput
                    onChangeText={onChangeHandler}
                    style={styles.input}
                    value={input}
                    placeholder='請輸入咖啡名稱'
                ></TextInput>
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-search-sharp' : 'search-sharp'}
                    size={24}
                    style={{ marginLeft: 5 }} />
            </View>
            <View style={styles.typeArea}>
                {typeList.map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.type, keyClick === type ? styles.active : '']}
                        onPress={() => { onPressHandler(type) }}
                    >
                        <Text style={keyClick === type ? { color: 'white' } : ''}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.imgArea}>
                {searchResult.map((coffee) => (
                    <TouchableOpacity
                        key={coffee.id}
                        onPress={() => navigation.navigate('Detail', { item: coffee })}
                    >
                        <FastImage
                            style={styles.itemImg}
                            source={{
                                uri: coffee.imgLink,
                                priority: FastImage.priority.normal
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        alignItems: 'center'
    },
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        width: ITEM_WIDTH,
        height: 50,
    },
    typeArea: {
        flexDirection: 'row',
        padding: 5,
    },
    type: {
        margin: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    active: {
        backgroundColor: 'gray',
    },
    imgArea: {
        flex: 1,
    },
    itemImg: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
});

export default SearchingScreen;