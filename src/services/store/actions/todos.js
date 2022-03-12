import todoActionTypes from '../actionTypes/todos'

function addTodo(data) {
  return {
    type: todoActionTypes.ADD_TODO,
    payload: data,
  }
}

function deleteTodo(todoId) {
  return {
    type: todoActionTypes.DELETE_TODO,
    payload: todoId,
  }
}

function updateStatus(checked, id) {
  return {
    type: todoActionTypes.UPDATE_STATUS,
    payload: { checked, id },
  }
}

export default {
  deleteTodo,
  updateStatus,
  addTodo,
}
