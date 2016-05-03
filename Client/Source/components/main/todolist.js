import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeTodo, enterAddState, addTodo } from '../../actions'
import { Checkbox, TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add'
import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } from 'material-ui/Table';
import styles from './todolist.scss';

let todolist = ({onSelected, enterAddState, addTodo, items, uiState, includeAddRow=false}) => {
	return (	
		<Table selectable={false} onCellClick={enterAddState.bind(this,includeAddRow)}>		    
		    <TableBody displayRowCheckbox={false}>
		    	{ includeAddRow ? (
		    		<TableRow>
			    		<TableRowColumn className={styles.actionCol}><AddIcon /></TableRowColumn>
		              	<TableRowColumn className={styles.addColumn}>
		              		{uiState==='ADDING_ITEM' ? (
		              			<TextField fullWidth={true} autoFocus={true} onBlur={addTodo.bind(this)} />
		              			) : (<div>Add a new to-do entry...</div>)}
		              	</TableRowColumn>	
		    		</TableRow>
		    		) : null
		    	}
		    	
		       {items.map(todo => 
		      	<TableRow key={todo.get('id')}>	       
		      	  <TableRowColumn className={styles.actionCol}><Checkbox checked={todo.get('completed')} onCheck={onSelected.bind(this,todo.get('id'))}></Checkbox></TableRowColumn>
	              <TableRowColumn>{todo.get('description')}</TableRowColumn>	              
	      	    </TableRow>
		       )}
		    </TableBody>
		</Table>
		);		
};

const mapStateToProps = (state) => {
	return {
		uiState: state.get('ui').get('state')
	}
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSelected: (id, obj, isChecked) => {			
			dispatch(completeTodo(id, isChecked));
		},
		enterAddState: (includeAddRow, row) => {
			if (row === 0 && includeAddRow)
			{				
				dispatch(enterAddState());	
			}
		},
		addTodo: (event) => {
			let todoText = event.currentTarget.value;
			dispatch(addTodo(todoText));
		}
	}
}

todolist = connect(mapStateToProps, mapDispatchToProps)(todolist);

export default todolist;