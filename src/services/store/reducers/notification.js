import notificationActionTypes from '../actionTypes/notification'

const initialState = {
  show: false,
  type: '',
  message: '',
}

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case notificationActionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      }
    case notificationActionTypes.HIDE_NOTIFICATION:
      return {
        show: false,
        type: '',
        message: '',
      }
    default:
      return {
        ...state,
      }
  }
}

export default commonReducer
