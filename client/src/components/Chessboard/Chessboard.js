import React, { createRef, useEffect, useCallback } from "react";

import Chess from "chess.js";

const Board = () => {
  const board = createRef();
  const game = createRef();
  const boardRef = createRef();

  const onSnapEnd = useCallback(() => {
    board.current.position(game.current.fen());
    console.log(game.current.pgn());
  }, []);

  const onDragStart = useCallback((source, piece, position, orientation) => {
    // do not pick up pieces if the game is over
    if (game.current.game_over()) return false;

    // only pick up pieces for the side to move
    if (
      (game.current.turn() === "w" && piece.search(/^b/) !== -1) ||
      (game.current.turn() === "b" && piece.search(/^w/) !== -1)
    ) {
      return false;
    }
  }, []);

  const onDrop = useCallback((source, target) => {
    // see if the move is legal
    var move = game.current.move({
      from: source,
      to: target,
      promotion: "q", // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return "snapback";
    // updateStatus();
  }, []);

  const updateStatus = useCallback(() => {
    var status = "";

    var moveColor = "White";
    if (game.turn() === "b") {
      moveColor = "Black";
    }

    // checkmate?
    if (game.in_checkmate()) {
      status = "Game over, " + moveColor + " is in checkmate.";
    }

    // draw?
    else if (game.in_draw()) {
      status = "Game over, drawn position";
    }

    // game still on
    else {
      status = moveColor + " to move";

      // check?
      if (game.in_check()) {
        status += ", " + moveColor + " is in check";
      }
    }

    // $status.html(status);
    // $fen.html(game.fen());
    // $pgn.html(game.pgn());
  }, []);

  useEffect(() => {
    const boardConfig = {
      pieceTheme: `${process.env.PUBLIC_URL}/assets/chesspieces/alpha/{piece}.png`,
      position: "start",
      draggable: true,
      dragOffBoard: "snapback",
      sparePieces: false,
      appearSpeed: "fast",
      moveSpeed: "fast",
      snapbackSpeed: "fast",
      snapSpeed: "fast",
      onDragStart,
      onDrop,
      onSnapEnd,
    };
    board.current = window.ChessBoard("board1", boardConfig);
    game.current = new Chess();
  }, []);

  return (
    <div
      id="board1"
      style={{
        width: "70%",
        margin: ".5rem 0",
      }}
      ref={boardRef}
    />
  );
};

export default Board;
