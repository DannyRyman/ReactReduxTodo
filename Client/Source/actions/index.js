import fetch from 'isomorphic-fetch'

const createInitialDataRetrievedAction = (initialData) => {
	return {
		type: 'INITIAL_DATA_RETRIEVED',
		todos: initialData
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
	return {
		type: 'TODO_STATUS_CHANGE',
		todoId: todoId,
		isCompleted: isCompleted
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
	return {
		type: 'ADD_TODO',
		text: todoText
	}
}