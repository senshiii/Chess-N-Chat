import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChessBoard, faPlusSquare, faChess } from '@fortawesome/free-solid-svg-icons';

// Component Imports
import Home from './components/Home/Home';
import Playground from './components/Playground/Playground';
import SocketProvider from './context/socket-context';

library.add(faChessBoard, faPlusSquare, faChess);

const App = () => {
	return (
		<SocketProvider>
			<CssBaseline />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/:roomId" component={Playground} />
			</Switch>
		</SocketProvider>
	);
};

export default App;
