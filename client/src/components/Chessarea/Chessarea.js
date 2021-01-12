import React from "react";

import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Chessboard from "../Chessboard/Chessboard";

const useStyles = makeStyles((theme) => ({
  chessArea: {
    width: "100%",
    height: "100%",
    background: "#1d1d1d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playerDisplay: {
    height: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "6px",
  },
  timeDisplay: {
    padding: ".3rem 1rem",
    backgroundColor: "#000",
    borderRadius: "6px",
    color: "#eee",
  },
  playerName: {
    fontWeight: "500",
    color: "#fff",
    flexGrow: "1",
  },
  chessboard: {
    width: '60%',
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: '40%',
    height: '100%',
  }
}));

const Chessarea = () => {
  const classes = useStyles();
  return (
    <Box className={classes.chessArea}>
      <Box className={classes.details} >
        <h1>Match Details</h1>
      </Box>
      <Box className={classes.chessboard}>
        <Box width="75%" className={classes.playerDisplay} p={1}>
          <Typography variant="h5" className={classes.playerName}>
            anupam
          </Typography>
          <Typography variant="h6" className={classes.timeDisplay}>
            -:--
          </Typography>
        </Box>
        <Chessboard />
        <Box width="75%" className={classes.playerDisplay} p={1}>
          <Typography variant="h5" className={classes.playerName}>
            senshiii
          </Typography>
          <Typography variant="h6" className={classes.timeDisplay}>
            -:--
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Chessarea;
