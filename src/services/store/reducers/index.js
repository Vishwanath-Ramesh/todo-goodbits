import { combineReducers } from 'redux'

import tagsReducer from './tags'
import todosReducer from './todos'
import notificationReducer from './notification'

const rootReducer = combineReducers({
  notification: notificationReducer,
  todos: todosReducer,
  tags: tagsReducer,
})

export default rootReducer
