const initialState = {
	todos: [{"id":"5b27888f-62c7-41f7-a4c0-2ecf6d3ed01f","description":"Call john about stuff","completed":false},
	 {"id":"1b27888f-62c7-41f7-a4c0-2ecf6d3ed01f","description":"Complete Timesheet","completed":true}],
	 ui: {
	 	showCompleted:false,
	 	state:'DEFAULT'	
	 }
	 
}

function todoApp(state = initialState, action) {
	switch (action.type) {
		case 'TODO_STATUS_CHANGE':			
			return {
				...state,
				todos: state.todos.map(t => {
					if (t.id === action.todoId) {
						return {
							...t,
							completed:action.isCompleted
						}	
					}
					return t;					
				})
			}
		case 'TOGGLE_SHOW_COMPLETE':
			return  {...state, 
				ui: {
					...state.ui,
					showCompleted:!state.ui.showCompleted}	
				}
		case 'ENTER_ADD_STATE':
			return  {...state, 
				ui: {
					...state.ui,
					state:'ADDING_ITEM'}	
				}
		default:
			return state;
	}
}

export default todoApp;