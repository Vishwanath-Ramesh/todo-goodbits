import notificationActionTypes from '../actionTypes/notification'

function showNotification(data) {
  return {
    type: notificationActionTypes.SHOW_NOTIFICATION,
    payload: data,
  }
}

function hideNotification() {
  return {
    type: notificationActionTypes.HIDE_NOTIFICATION,
  }
}

export default {
  showNotification,
  hideNotification,
}
