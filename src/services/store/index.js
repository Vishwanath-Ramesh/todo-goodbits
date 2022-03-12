import { createStore } from 'redux'

import rootReducer from './reducers/index'

const store = createStore(rootReducer)

store.subscribe(() => {
  const { todos } = store.getState()

  localStorage.setItem('sessionData', JSON.stringify(todos))
})

export default store
