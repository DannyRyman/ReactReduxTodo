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