import React, { Fragment, useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  DialogTitle,
  IconButton,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import { FilterNoneSharp } from "@material-ui/icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import Short from "shortid";

import ChessImg from "../../assets/home/chess1.jpg";
import ChessImgMobile from "../../assets/home/chess2.jpg";

const useStyles = makeStyles((theme) => ({
  navbarbg: {
    background: "#1d1d1d",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      "& > div": {
        display: "flex",
        justifyContent: "center",
      },
    },
    paddingLeft: theme.spacing(8),
  },
  button: {
    borderColor: "#ff5e15",
    color: "#fff",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "#ff5e15",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  container: {
    marginTop: "64px",
    paddingTop: "1rem",
    height: "calc(100vh - 64px)",
    background: "#fff",
    [theme.breakpoints.down("md")]: {
      marginTop: "56px",
      height: "calc(100vh - 56px)",
      background: `url(${ChessImgMobile})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      textAlign: "center",
      padding: "0",
      "& h3": {
        fontSize: "1.7rem",
      },
      "&>div": {
        flexDirection: "column-reverse",
        "& div": {
          width: "100%",
        },
      },
    },
  },
  actionArea: {
    margin: "1rem",
    [theme.breakpoints.down("md")]: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      margin: "0",
      background: "rgba(0,0,0,0.2)",
      color: "#fff",
    },
  },
  linkGen: {
    "&>button": {
      width: "40%",
      margin: "0 10px",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      "& p": {
        color: "#fff !important",
      },
      flexDirection: "column",
      justifyContent: "center",
      "&>*": {
        width: "100% !important",
      },
      "&>div>div>input": {
        color: "#fff",
      },
    },
  },
  onlyDesktop: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  roomInput: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      marginRight: "1rem",
    },
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
}));

const Home = (props) => {
  const classes = useStyles();

  // USE STATES
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState("");
  const [roomLink, setRoomLink] = useState("");

  const roomId = useRef(null);

  const createRoom = () => {
    props.history.replace(`/${roomId.current}`);
  };

  const joinRoom = () => {
    let linkParts = roomLink.split("/");
    let id = linkParts[linkParts.length - 1];
    props.history.replace(`/${id}`);
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText(`http://localhost:5000/${roomId.current}`)
      .then((value) => console.log(value))
      .catch((err) => console.log(`Could not copy text to clipboard: ${err}`));
  };

  return (
    <Fragment>
      {/* APBPBAR */}
      <AppBar className={classes.navbarbg}>
        <Toolbar>
          <Typography variant="h5">
            <Icon icon="chess-board" /> Chess N Chat
          </Typography>
          <Button className={classes.button} variant="outlined" size="small">
            <Icon icon="plus-square" />
            &nbsp;Create Room
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container} maxWidth="xl">
        {/* ROOM DETAILS DIALOG  */}
        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle>Room</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name by which you wil be identified in the room. Share the
              given link to invite others to join this room.
            </DialogContentText>
            <TextField
              defaultValue={`http://localhost:5000/${roomId.current}`}
              variant="standard"
              label="Invite Link"
              fullWidth
              color="primary"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy Invite Link">
                      <IconButton edge="end" color="inherit" onClick={copyLink}>
                        <FilterNoneSharp />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase())}
              fullWidth
              variant="outlined"
              color="primary"
              label="Name"
              size="small"
              margin="normal"
              helperText="You must enter a name to continue. You will be identified using this name in the room."
            />
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.success}
              onClick={createRoom}
              disabled={name.length <= 0}
            >
              Proceed
            </Button>
            <Button
              className={classes.errorBg}
              onClick={() => {
                setDialog(false);
                setName("");
                roomId.current = "";
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          height="100%"
        >
          <Box component="div" width="50%" className={classes.actionArea}>
            <Typography variant="h3">
              <Icon icon="chess" /> Chess feels better when played with humans.
            </Typography>
            <Typography variant="h3" style={{ marginTop: ".5rem" }}>
              Especially friends
            </Typography>
            <Typography variant="h6" style={{ marginTop: ".8rem" }}>
              Connect with friends over some chess. Made for chess lovers.
            </Typography>
            <Box
              component="div"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              className={classes.linkGen}
            >
              <Hidden mdUp>
                <TextField
                  label="Enter Room Code or Paste Link"
                  variant="standard"
                  margin="normal"
                  value={roomLink}
                  onChange={(e) => setRoomLink(e.target.value)}
                  className={classes.roomInput}
                  size="small"
                />
              </Hidden>
              <Hidden mdDown>
                <TextField
                  label="Enter Room Code or Paste Link"
                  variant="outlined"
                  margin="normal"
                  value={roomLink}
                  fullWidth
                  onChange={(e) => setRoomLink(e.target.value)}
                  className={classes.roomInput}
                  size="small"
                />
              </Hidden>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={joinRoom}
              >
                Join Room
              </Button>
              <Typography variant="body1" style={{ color: "#aaa" }}>
                {" "}
                OR{" "}
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => {
                  roomId.current = Short.generate();
                  setDialog(true);
                }}
              >
                Create
              </Button>
            </Box>
          </Box>
          <Box component="div" width="50%" className={classes.onlyDesktop}>
            <img
              src={ChessImg}
              alt="Chess Banner Img"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Home;
