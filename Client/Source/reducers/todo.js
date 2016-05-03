import Immutable from 'immutable'

const initialState = Immutable.fromJS({
	todos: [{"id":"5b27888f-62c7-41f7-a4c0-2ecf6d3ed01f","description":"Call john about stuff","completed":false},
	 {"id":"1b27888f-62c7-41f7-a4c0-2ecf6d3ed01f","description":"Complete Timesheet","completed":true}],
	 ui: {
	 	showCompleted:false,
	 	state:'DEFAULT'	
	 }	 
});

function todoApp(state = initialState, action) {
	switch (action.type) {
		case 'TODO_STATUS_CHANGE':			
			return state.update('todos', (todoList) => {
				let index = todoList.findIndex((item) => item.get('id') === action.todoId);
				return todoList.update(index, (item) => item.set('completed', action.isCompleted));
			});
		case 'TOGGLE_SHOW_COMPLETE':
			return state.update('ui', (t) => t.set('showCompleted', !state.get('ui').get('showCompleted')))
		case 'ENTER_ADD_STATE':
			return state.update('ui', (t) => t.set('state', 'ADDING_ITEM'))
		case 'ADD_TODO':
			let newState = state.update('todos', (todoList) => {				
				var todoItem = Immutable.Map({"id":"123", "description": action.text, "completed": false});				
				return todoList.push(todoItem);
			});
			return newState.update('ui', (t) => t.set('state', 'DEFAULT'));
		default:
			return state;
	}
}

export default todoApp;