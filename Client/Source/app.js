import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom'
import React from 'react'
import styles from './app.scss';
import Main from './components/main/main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import rootReducer from './reducers/todo';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

const lightMuiTheme = getMuiTheme(lightBaseTheme);

let store = createStore(rootReducer,
	applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<MuiThemeProvider muiTheme={lightMuiTheme}>
	<Provider store={store}>
		<div>
			<Main></Main>			
		</div>
	</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
	);