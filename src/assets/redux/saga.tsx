import { all } from 'redux-saga/effects'
import CoffeeSaga from './coffee/action'

function* rootSaga() {
    yield all([CoffeeSaga()])
}

export default rootSaga