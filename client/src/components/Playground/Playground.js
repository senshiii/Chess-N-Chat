import React, { useEffect, useContext, Fragment, useState } from "react";
import io from "socket.io-client";

import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Hidden,
  Tooltip,
  Menu,
  MenuItem,
  Snackbar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  GroupAddOutlined,
  ExitToAppRounded,
  CloseSharp,
  MoreVertSharp,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../../context/socket-context";
import Chessboard from "../Chessboard/Chessboard";

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: theme.mixins.toolbar.minHeight,
    background: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  toolbar: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    marginTop: theme.mixins.toolbar.minHeight,
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    padding: "0",
    overflow: "hidden",
  },
  videoBoxes: {
    background: "#f4f4f4",
    width: "25vw",
    height: "100%",
  },
  chessArea: {
    width: "45vw",
    height: "100%",
    background: theme.palette.primary.light
  },
  matchDetails: {
    background: "#eee",
    width: "30vw",
    height: "100%",
  },
  title: {
    flexGrow: "1",
  },
  exitButton: {
    color: theme.palette.error.dark,
  },
  error: {
    color: theme.palette.error.dark,
  },
  success: {
    color: theme.palette.success.main,
  },
  errorBg: {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  successBg: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  playerDisplay: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  timeDisplay: {
    padding: ".35rem 1rem",
    backgroundColor: "#000",
    borderRadius: "6px",
    color: "#eee",
  },
  playerName: {
    fontWeight: "500",
    color: "#fff",
    flexGrow: "1",
  },
  chessboard:{
    position: 'relative',
    width: '100%',
    height: '80%'
  }
}));

const Playground = (props) => {
  console.log(props);
  const classes = useStyles();
  const roomId = props.match.params.roomId;

  const { socket, setSocket, setRoomId, msg, setMsg } = useContext(
    SocketContext
  );
  // USE STATES
  const [anchorEl, setAnchorEl] = useState(false);

  console.log(`Message: ${msg}`);

  // USE EFFECTS
  useEffect(() => {
    setSocket((prevSocket) => io("localhost:8000"));
    setRoomId(roomId);
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="body1" color="initial" className={classes.title}>
            Room : {roomId}
          </Typography>
          <Hidden mdDown>
            <Button color="inherit" startIcon={<GroupAddOutlined />}>
              Invite Others
            </Button>
            <Tooltip title="Leave Room">
              <IconButton edge="end" className={classes.exitButton}>
                <ExitToAppRounded />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              edge="end"
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MoreVertSharp />
            </IconButton>
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>
                <ListItemIcon>
                  <GroupAddOutlined />
                </ListItemIcon>
                <ListItemText>Invite Others</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ExitToAppRounded className={classes.exitButton} />
                </ListItemIcon>
                <ListItemText className={classes.exitButton}>
                  Leave Room
                </ListItemText>
              </MenuItem>
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Container className={classes.content} maxWidth="xl">
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={msg.length > 0}
          autoHideDuration={6000}
          onClose={() => setMsg("")}
          message={msg}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setMsg("")}
              >
                <CloseSharp fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <Box
          display="flex"
          justifyContent="flex-start"
          width="100%"
          height="100%"
        >
          <Box className={classes.videoBoxes}>
            <Typography variant="h5">Video Chat Boxes</Typography>
          </Box>
          <Box className={classes.chessArea}>
            <Box
              height="10%"
              width="100%"
              className={classes.playerDisplay}
              p={1}
            >
              <Typography variant="h5" className={classes.playerName}>
                anupam
              </Typography>
              <Typography variant="h4" className={classes.timeDisplay}>
                -:--
              </Typography>
            </Box>
            <Box className={classes.chessboard}>
              <Chessboard />
            </Box>
            <Box
              height="10%"
              width="100%"
              className={classes.playerDisplay}
              p={1}
            >
              <Typography variant="h5" className={classes.playerName}>
                senshiii
              </Typography>
              <Typography variant="h4" className={classes.timeDisplay}>
                -:--
              </Typography>
            </Box>
          </Box>
          <Box className={classes.matchDetails}>
            <h1>Match Details</h1>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Playground;
