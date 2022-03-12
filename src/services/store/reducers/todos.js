import { isEmpty } from 'lodash'
import utils from '../../../utils'
import todosActionTypes from '../actionTypes/todos'

const sessionData = localStorage.getItem('sessionData') || null

const defaultState = [
  {
    id: 1,
    status: 'pending',
    description: 'Eat',
    dateAdded: '03/12/2022',
    tags: [1, 2],
  },
  {
    id: 2,
    status: 'pending',
    description: 'Eat',
    dateAdded: '03/12/2022',
    tags: [3],
  },
  {
    id: 3,
    status: 'pending',
    description: 'Eat',
    dateAdded: '03/13/2022',
    tags: [0, 3],
  },
  {
    id: 4,
    status: 'completed',
    description: 'Eat',
    dateAdded: '03/13/2022',
    tags: [1, 2],
  },
  {
    id: 5,
    status: 'completed',
    description: 'Eat',
    dateAdded: '03/14/2022',
    tags: [1, 2],
  },
  {
    id: 6,
    status: 'completed',
    description: 'Eat',
    dateAdded: '03/14/2022',
  },
]

const initialState = isEmpty(sessionData)
  ? defaultState
  : JSON.parse(sessionData)

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case todosActionTypes.ADD_TODO:
      return state.concat({
        ...action.payload,
        status: 'pending',
        id: utils.generateGUID(),
      })
    case todosActionTypes.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload)
    case todosActionTypes.UPDATE_STATUS:
      return state.map((todo) => {
        if (todo.id === action.payload.id)
          return {
            ...todo,
            status: action.payload.checked ? 'completed' : 'pending',
          }

        return todo
      })
    default:
      return state
  }
}

export default todosReducer
