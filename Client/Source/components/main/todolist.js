import React from 'react';
import { connect } from 'react-redux';
import { completeTodo, enterAddState } from '../../actions'
import { Checkbox, TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add'
import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } from 'material-ui/Table';
import styles from './todolist.scss';

let todolist = ({onSelected, enterAddState, items, uiState, includeAddRow=false}) => {
	return (	
		<Table selectable={false} onCellClick={enterAddState}>		    
		    <TableBody displayRowCheckbox={false}>
		    	{ includeAddRow ? (
		    		<TableRow>
			    		<TableRowColumn className={styles.actionCol}><AddIcon /></TableRowColumn>
		              	<TableRowColumn className={styles.addColumn}>
		              		{uiState==='ADDING_ITEM' ? (
		              			<TextField />
		              			) : (<div>Add a new to-do entry...</div>)}
		              	</TableRowColumn>	
		    		</TableRow>
		    		) : null
		    	}
		    	
		       {items.map(todo => 
		      	<TableRow key={todo.id}>	       
		      	  <TableRowColumn className={styles.actionCol}><Checkbox checked={todo.completed} onCheck={onSelected.bind(this,todo.id)}></Checkbox></TableRowColumn>
	              <TableRowColumn>{todo.description}</TableRowColumn>	              
	      	    </TableRow>
		       )}
		    </TableBody>
		</Table>
		);		
};

const mapStateToProps = (state) => {
	return {
		uiState: state.ui.state
	}
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSelected: (id, obj, isChecked) => {			
			dispatch(completeTodo(id, isChecked))
		},
		enterAddState: () => {
			dispatch(enterAddState())
		}
	}
}

todolist = connect(mapStateToProps, mapDispatchToProps)(todolist);

export default todolist;