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

function ui(ui, action) {
	switch (action.type) {	
		case 'INITIAL_DATA_RETRIEVED':						
			return ui.set('isInitialised', true);						
		case 'TOGGLE_SHOW_COMPLETE':
			return ui.set('showCompleted', !ui.get('showCompleted'));
		case 'ENTER_ADD_STATE':
			return ui.set('state', 'ADDING_ITEM');
		case 'ADD_TODO':
			return ui.set('state', 'DEFAULT');
		default:
			return ui;
	}
}

function todo(todos, action) {	
	switch (action.type) {	
		case 'INITIAL_DATA_RETRIEVED':						
			return Immutable.fromJS(action.todos);
		case 'TODO_STATUS_CHANGE':						
			let index = todos.findIndex((item) => item.get('id') === action.todoId);
			return todos.update(index, (item) => item.set('completed', action.isCompleted));			
		case 'ADD_TODO':
			var todoItem = Immutable.Map(action.newTodo);				
			return todos.push(todoItem);			
		default:
			return todos;
	}
}

function todoApp(state = initialState, action) {
	return Immutable.fromJS({
		todos: todo(state.get('todos'), action),
		ui: ui(state.get('ui'), action)
	});
}

export default todoApp;