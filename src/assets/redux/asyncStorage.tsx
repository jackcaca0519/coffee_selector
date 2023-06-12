import AsyncStorage from '@react-native-community/async-storage';
import Coffee from '../models/Coffee'

export const storeFavorite = async (Favorite: Array<Coffee>) => {
    try {
        const jsonValue = JSON.stringify(Favorite)
        await AsyncStorage.setItem('coffee', jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getFavorite = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('coffee')
        return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (error) {
        // error reading value
        // console.log(error)
        return []
    }
}