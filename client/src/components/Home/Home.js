import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
} from "@material-ui/core";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

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
		margin: '1rem',
    [theme.breakpoints.down("md")]: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "1rem",
			paddingRight: "1rem",
			margin: '0',
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
			'& p': {
				color: '#fff !important'
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
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Fragment>
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
              <TextField
                label="Room Code"
                fullWidth
                variant="outlined"
                placeholder="Enter Room Code or Paste the Link"
                margin="normal"
                style={{
                  padding: ".5rem 0",
                  marginRight: "1rem",
                }}
              />
              <Button variant="contained" size="large" color="primary">
                Join Room
              </Button>
							<Typography variant="body1" style={{color: '#aaa'}} > OR </Typography>
              <Button
                variant="contained"
                size="large"
                style={{ background: "#ff5e15" }}
              >
                Create Room
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
