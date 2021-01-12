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
  Tabs,
  Tab,
  TextField,
} from "@material-ui/core";
import {
  GroupAddOutlined,
  ExitToAppRounded,
  CloseSharp,
  MoreVertSharp,
  VideoCallOutlined,
  SendSharp,
  ChatBubbleOutline,
  ChatSharp,
  AddCircle,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../../context/socket/socket-context";
// import Chessboard from "../Chessboard/Chessboard";
import Chessarea from "../Chessarea/Chessarea";

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
  bgPrimary: {
    background: theme.palette.primary.main,
  },
  bgSecondary: {
    background: theme.palette.secondary.main,
  },
  videoBoxes: {
    background: "#f4f4f4",
    width: "30vw",
    height: "100%",
  },
  chessArea: {
    width: "69.99vw",
    height: "100%",
  },
  matchDetails: {
    background: "#eee",
    width: "25vw",
    height: "100%",
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
  tabPanel: {
    height: `calc(100% - 48px)`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  bgDark: {
    background: "#212121",
  },
  whiteText: {
    color: theme.palette.common.white,
    "& input": {
      color: theme.palette.common.white,
    },
  },
  chatBubble: {
    width: "60%",
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    borderRadius: "4px",
    paddingTop: theme.spacing(0.3),
    paddingBottom: theme.spacing(0.3),
    background: theme.palette.secondary.main,
    margin: ".5rem 0",
    "& *": {
      color: theme.palette.common.white,
    },
  },
}));

const Playground = (props) => {
  // console.log(props);
  const classes = useStyles();

  const {
    socket,
    setSocket,
    info,
    setInfo,
    events,
    roomId,
    name,
    setRoomId,
    msgs,
  } = useContext(SocketContext);

  // USE STATES
  const [anchorEl, setAnchorEl] = useState(false);
  const [msg, setMsg] = useState("");

  // USE EFFECTS
  useEffect(() => {
    if (!socket) {
      setSocket((prevSocket) => io("localhost:8000"));
    } else {
      if (roomId) {
        console.log("RoomId: ", roomId);
        events.joinRoom();
      } else {
        setRoomId(props.match.params.roomId);
      }
    }
  }, [socket, roomId]);

  return (
    <Fragment>
      <CssBaseline />
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="body1" color="initial">
            {roomId}
          </Typography>
          <Typography
            variant="h5"
            color="initial"
            style={{
              flexGrow: "2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {name ? name : "name"}
          </Typography>
          {/* Desktop View */}
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
          {/* Mobile View */}
          <Hidden lgUp>
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
          open={info.length > 0}
          autoHideDuration={6000}
          onClose={() => setInfo("")}
          message={info}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setInfo("")}
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
          {/* <Typography
              variant="h4"
              style={{ textAlign: "center", color: "#aaa" }}
            >
              No Match is currently being played.
            </Typography>
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                color: "#aaa",
                display: "flex",
                alignItems: "center",
                margintTop: "5px",
              }}
            >
              Click the &nbsp;
              <AddCircle />
              &nbsp; icon to raise a match.
            </Typography> */}

          {/* CHESS AREA */}
          <Box className={classes.chessArea}>
            <Chessarea />
          </Box>

          {/* VIDEO CHAT */}
          <Box className={classes.videoBoxes}>
            <AppBar position="static" color="default">
              <Tabs
                value={1}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tooltip title="Video Call">
                  <Tab
                    style={{ width: "50% !important" }}
                    icon={<VideoCallOutlined />}
                  />
                </Tooltip>
                <Tooltip title="Chat">
                  <Tab
                    style={{ width: "50% !important" }}
                    icon={<ChatBubbleOutline />}
                  />
                </Tooltip>
              </Tabs>
            </AppBar>
            <Box className={classes.tabPanel}>
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                flexGrow="1"
                width="100%"
                px={1}
                style={{ overFlowY: "scroll" }}
                className={classes.bgDark}
              >
                {/* MESSAGES GO HERE. */}
                {msgs.length === 0 ? (
                  <Typography
                    variant="body2"
                    style={{
                      margin: "10px 5px",
                      color: "#aaa",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ChatSharp /> &nbsp; This is the room chat. Please be nice
                    to others.
                  </Typography>
                ) : (
                  msgs.map((msg) => (
                    <Box
                      className={classes.chatBubble}
                      alignSelf={
                        msg.sender === name ? "flex-end" : "flex-start"
                      }
                    >
                      <Typography variant="body1">{msg.sender}</Typography>
                      <Typography variant="body2">{msg.msg}</Typography>
                    </Box>
                  ))
                )}
              </Box>
              <Box
                px={1}
                display="flex"
                width="100%"
                className={classes.bgDark}
                borderTop={1}
                borderColor="primary.main"
                pt={1}
              >
                <TextField
                  color="primary"
                  style={{ flexGrow: "1" }}
                  className={classes.whiteText}
                  placeholder="Type a message"
                  value={msg}
                  size="small"
                  onChange={(e) => setMsg(e.target.value)}
                />
                <IconButton
                  edge="end"
                  color="primary"
                  disabled={msg.length <= 0}
                  onClick={() => {
                    events.sendMessage(msg);
                    setMsg("");
                  }}
                >
                  <SendSharp />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Playground;
