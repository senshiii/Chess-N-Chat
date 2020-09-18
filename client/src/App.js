import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChessBoard, faPlusSquare, faChess } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// Component Imports
import Home from './components/Home/Home';

library.add(faChessBoard, far, faPlusSquare, faChess);

function App() {
	return (
		<CssBaseline>
				<Home />
		</CssBaseline>
	);
}

export default App;
