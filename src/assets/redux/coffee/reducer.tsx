import * as coffeeActions from './action';
import { Coffee } from '../../models/Coffee'
import { storeFavorite } from '../asyncStorage'

const initState: { allCoffee: Array<Coffee> } = { allCoffee: [] }

const coffeeReducer = (state = initState, action: coffeeActions.CoffeeAction) => {
    const allCoffeeCopy = [...state.allCoffee]
    const Favorite: Array<Coffee> = []

    switch (action.type) {
        case coffeeActions.GET_ALL_COFFEE_SUCCESS:
            return { allCoffee: action.payload?.allCoffee }
        case coffeeActions.RENEW_DATA:
            for (let i = 0; i < allCoffeeCopy.length; i += 1) {
                if (action.payload!.Coffee!.id === allCoffeeCopy[i].id) {
                    allCoffeeCopy[i] = action.payload!.Coffee!
                }

                // 挑出開啟提醒或加入我的最愛的資料
                if (allCoffeeCopy[i].isFavorite) {
                    Favorite.push(allCoffeeCopy[i])
                }
            }
            // 儲存至我的最愛
            storeFavorite(Favorite)

            return { allCoffee: allCoffeeCopy }
        default:
            return state
    }
}

export default coffeeReducer