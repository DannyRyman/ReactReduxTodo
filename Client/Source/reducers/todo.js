import Immutable from 'immutable'

// {"id":"5b27888f-62c7-41f7-a4c0-2ecf6d3ed01f","description":"Call john about stuff","completed":false}
const initialState = Immutable.fromJS({
	todos: [],
	 ui: {
	 	showCompleted:false,
	 	state:'DEFAULT',
	 	isInitialised: false	
	 }	 
});

function todoApp(state = initialState, action) {
	switch (action.type) {	
		case 'INITIAL_DATA_RETRIEVED':						
			return state.update('ui', (t) => t.set('isInitialised', true))
				.set('todos', Immutable.fromJS(action.todos));
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