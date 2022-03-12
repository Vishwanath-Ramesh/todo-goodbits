import utils from '../../../utils'
import tagsActionTypes from '../actionTypes/tags'

const initialState = [
  { id: 0, label: 'Home' },
  { id: 1, label: 'Work' },
  { id: 2, label: 'Music' },
  { id: 3, label: 'Learning' },
  { id: 4, label: 'Play' },
]

function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case tagsActionTypes.ADD_TAG:
      return {
        ...state,
        tags: state.tags.concat([
          {
            label: action.payload,
            id: utils.generateGUID(),
          },
        ]),
      }

    default:
      return state
  }
}

export default tagsReducer
