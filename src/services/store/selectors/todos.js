import { createSelector } from 'reselect'
import { groupBy } from 'lodash'

const selectTodos = (state) => state.todos

const selectGroupedTodos = (state) => groupBy(state.todos, 'dateAdded')

const selectPendingTodos = createSelector(selectTodos, (todos) =>
  todos.filter((todo) => todo.status === 'pending')
)

const selectCompletedTodos = createSelector(selectTodos, (todos) =>
  todos.filter((todo) => todo.status === 'completed')
)

export default {
  selectTodos,
  selectGroupedTodos,
  selectPendingTodos,
  selectCompletedTodos,
}
