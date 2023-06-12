import { call, put, takeEvery } from 'redux-saga/effects';
import { Coffee } from '../../models/Coffee'
import { getFavorite } from '../asyncStorage'
import firestore from '@react-native-firebase/firestore';

export const GET_ALL_COFFEE_BEGIN = 'GET_ALL_COFFEE_BEGIN'
export const getAllCoffeeBegin = () => ({
    type: GET_ALL_COFFEE_BEGIN
})

export const GET_ALL_COFFEE_SUCCESS = 'GET_ALL_COFFEE_SUCCESS'
export const getAllCoffeeSuccess = (allCoffee: Array<Coffee>) => ({
    type: GET_ALL_COFFEE_SUCCESS,
    payload: {
        allCoffee
    }
})

export const RENEW_DATA = 'RENEW_DATA'
export const renewData = (Coffee: Coffee) => ({
    type: RENEW_DATA,
    payload: {
        Coffee
    }
})

function* getCoffee() {
    const coffeeCollection = firestore().collection('Coffees')
    const contentPromise = new Promise<Array<Coffee>>((resolve, _reject) => {
        // setTimeout(() => {
        //     const allCoffee: Array<Coffee> = []
        //     allCoffee.push(
        //         {
        //             title: '香草閃電泡芙風味咖啡',
        //             id: '香草閃電泡芙風味咖啡',
        //             type: ['香草香調', '穀物香調', '圓潤平衡'],
        //             imgLink: 'https://www.nespresso.com/ecom/medias/sys_master/public/14795069259806/-BARISTA-Vanilla-1000x1000.png',
        //             webLink: 'https://www.nespresso.com/tw/zh/order/capsules/original/vanilla-eclair-coffee-capsule',
        //             isFavorite: true,
        //         },
        //         {
        //             title: '松露巧克力風味咖啡',
        //             id: '松露巧克力風味咖啡',
        //             type: ['可可香調'],
        //             imgLink: 'https://www.nespresso.com/ecom/medias/sys_master/public/14795068440606/-BARISTA-Cocaa-1000x1000.png',
        //             webLink: 'https://www.nespresso.com/tw/zh/order/capsules/original/cocoa-truffle-coffee-capsule',
        //             isFavorite: false,
        //         })
        //     resolve(allCoffee)
        // }, 0)
        const allCoffee: Array<Coffee> = []
        function onResult(QuerySnapshot) {
            QuerySnapshot.forEach(documentSnapshot => {
                allCoffee.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
            });
        }
        function onError(error) {
            console.error(error);
        }
        coffeeCollection.onSnapshot(onResult, onError);
        resolve(allCoffee)
    })

    const data = yield call(() => contentPromise.then((result) => result))
    const favorite = yield call(() => getFavorite().then((result) => result))
    if (
        Array.isArray(data) &&
        data.length > 0 &&
        Array.isArray(favorite) &&
        favorite.length > 0
    ) {
        favorite.forEach((coffee) => {
            for (let i = 0; i < data.length; i += 1) {
                if (coffee.id === data[i].id) {
                    data[i].isFavorite = coffee.isFavorite
                    break
                }
            }
        })
    }

    yield put(getAllCoffeeSuccess(data))
}

function* CoffeeSaga() {
    yield takeEvery(GET_ALL_COFFEE_BEGIN, getCoffee)
}
// takeEvery使得接到GET_ALL_ANIMATE_BEGIN時觸發getAnime

export default CoffeeSaga