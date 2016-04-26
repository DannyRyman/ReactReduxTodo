import React from 'react'
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import TodoList from './todolist';
import { toggleShowCompleted } from '../../actions'

let main = ({showCompleted, activeTodos, completedTodos, toggleShowCompleted}) => {	

	return (			
			<div>
				<AppBar title="TODO List"></AppBar>

				<TodoList items={activeTodos} includeAddRow={true} />

				{ completedTodos.length > 0 ? (
					<FlatButton label={showCompleted ? 'Hide Completed' : 'Show Completed'} primary={true} onClick={toggleShowCompleted}></FlatButton>
					): null}

				{showCompleted ? (
					<TodoList items={completedTodos} />
				) : null}
			</div>			
		);
}

const mapStateToProps = (state) => {
	return {
		showCompleted: state.ui.showCompleted,
		activeTodos: state.todos.filter((todo) => todo.completed !== true),
		completedTodos: state.todos.filter((todo) => todo.completed === true)
	}
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleShowCompleted: () => {							
			dispatch(toggleShowCompleted())
		}
	}
}

//main = connect(mapStateToProps,mapDispatchToProps)(main);
main = connect(mapStateToProps, mapDispatchToProps)(main);

export default main;