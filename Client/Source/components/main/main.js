import React, {Component} from 'react'
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import TodoList from './todolist';
import { toggleShowCompleted, loadInitialTodos } from '../../actions'

class main extends Component {
	
	componentWillMount() {
		const {loadInitialTodos} = this.props;
		loadInitialTodos();
	}

	render() {		
		return this.props.isInitialised ? this.renderMainScreen() : this.renderLoading();
	}

	renderMainScreen() {
		const {showCompleted, activeTodos, completedTodos, toggleShowCompleted} = this.props;
		
		return (						
			<div>
				<AppBar title="TODO List"></AppBar>

				<TodoList items={activeTodos} includeAddRow={true} />

				{ completedTodos.size > 0 ? (
					<FlatButton label={showCompleted ? 'Hide Completed' : 'Show Completed'} primary={true} onClick={toggleShowCompleted}></FlatButton>
					): null}

				{showCompleted ? (
					<TodoList items={completedTodos} />
				) : null}
			</div>			
		);
	}

	renderLoading() {
		return (<div>Loading...</div>);
	}
}

const mapStateToProps = (state) => {
	return {		
		showCompleted: state.get('ui').get('showCompleted'),
		isInitialised: state.get('ui').get('isInitialised'),
		activeTodos: state.get('todos').filter((todo) => todo.get('completed') !== true),
		completedTodos: state.get('todos').filter((todo) => todo.get('completed') === true)
	}
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleShowCompleted: () => {							
			dispatch(toggleShowCompleted())
		},
		loadInitialTodos: () => {
			dispatch(loadInitialTodos());
		}
	}
}

main = connect(mapStateToProps, mapDispatchToProps)(main);

export default main;