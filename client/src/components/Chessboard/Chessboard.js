import React, { createRef, useEffect } from 'react';

const Board = () => {
	const board = createRef();
	const boardRef = createRef();

	const boardConfig = {
		pieceTheme: `${process.env.PUBLIC_URL}/assets/chesspieces/alpha/{piece}.png`,
		position: 'start',
		draggable: true,
		dragOffBoard: 'snapback',
		sparePieces: false,
		appearSpeed: 'fast',
		moveSpeed: 'fast',
		snapbackSpeed: 'fast',
		snapSpeed: 'fast'
	}
	
	useEffect(() => {
		board.current = window.ChessBoard('board1', boardConfig);
	}, [])

	return (
		<div>
			<div id="board1" style={{ width: '80%', margin: '10% auto' }} ref={boardRef} />
		</div>
	);
};

export default Board;
