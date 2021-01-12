import React, { useContext, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../../context/socket/socket-context";

import JoinImg from "../../assets/join/chess4.jpg";

const useStyles = makeStyles((theme) => ({
  joinForm: {
    width: "40vw",
    height: "100%",
  },
  joinImg: {
    width: "60vw",
    height: "100%",
    backgroundImage: `url(${JoinImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  proceed: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    color: "#fff",
    margin: ".5rem 0",
    width: "40%",
  },
}));

const Join = (props) => {
  const classes = useStyles();
  const { name, setName, roomId } = useContext(SocketContext);

  return (
    <Container
      maxWidth="xl"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        padding: "0",
      }}
    >
      <Box
        className={classes.joinForm}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        p={2}
      >
        <Typography variant="h3" style={{ margin: "1rem", color: "#000" }}>
          Join
        </Typography>
        <TextField
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          size="small"
          color="primary"
          style={{ width: "80%", color: "#000" }}
          label="Name"
          helperText="You must enter a name to continue. You will be identified using this name in the room."
        />
        <Button
          variant="contained"
          className={classes.proceed}
          disabled={name.length <= 0}
          onClick={() => props.history.replace(`/${roomId}`)}
        >
          Join Room
        </Button>
        {/* <Button  */}
      </Box>
      <Box className={classes.joinImg} />
    </Container>
  );
};

export default Join;
