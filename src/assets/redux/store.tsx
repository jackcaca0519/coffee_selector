import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import coffeeReducer from './coffee/reducer'
import rootSaga from './saga'

// 創建middleware
const sagaMiddleware = createSagaMiddleware()

// 創建store，並且加入reducer及middleware
const store = createStore(
    coffeeReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)
// 執行訂閱事件的saga
sagaMiddleware.run(rootSaga)

export default store