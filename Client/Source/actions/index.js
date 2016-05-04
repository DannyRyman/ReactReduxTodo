import fetch from 'isomorphic-fetch'

const createInitialDataRetrievedAction = (initialData) => {
	return {
		type: 'INITIAL_DATA_RETRIEVED',
		todos: initialData
	}
}

const createAddTodoAction = (newTodo) => {
	return {
		type: 'ADD_TODO',
		newTodo: newTodo
	}
}

const createTodoStatusChangeAction = (todoId, isCompleted) => {
	return {
		type: 'TODO_STATUS_CHANGE',
		todoId: todoId,
		isCompleted: isCompleted
	}
}

export const loadInitialTodos = () => {
	return function (dispatch) {
		// todo add to configuration
		return fetch('http://localhost:38892/api/todo')
			.then(response => response.json())
			.then(json => dispatch(createInitialDataRetrievedAction(json)));
	}
}

export const completeTodo = (todoId, isCompleted) => {
	return function (dispatch) {
		// todo add to configuration
		return fetch('http://localhost:38892/api/todo/' + todoId, {
			method: 'patch',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify([{ "op": "replace", "path":"/completed", "value":isCompleted }])})
			.then(response => dispatch(createTodoStatusChangeAction(todoId, isCompleted)));
	}
}

export const toggleShowCompleted = () => {
	return {
		type: 'TOGGLE_SHOW_COMPLETE'
	}
}

export const enterAddState = () => {
	return {
		type: 'ENTER_ADD_STATE'
	}
}

export const addTodo = (todoText) => {
	return function (dispatch) {
		// todo add to configuration
		return fetch('http://localhost:38892/api/todo', {
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				description: todoText,
				completed: false
			})})
			.then(response => response.json())
			.then(newTodo => dispatch(createAddTodoAction(newTodo)));
	}
}