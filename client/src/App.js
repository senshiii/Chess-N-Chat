import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChessBoard,
  faPlusSquare,
  faChess,
} from "@fortawesome/free-solid-svg-icons";

// Component Imports
import Home from "./components/Home/Home";
import Playground from "./components/Playground/Playground";
import SocketProvider from "./context/socket-context";

library.add(faChessBoard, faPlusSquare, faChess);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff5e15",
    },
    secondary: {
      main: "#1976d2",
    },
  },
});

// import { roomId } from "./context/socket-context";

const App = () => {
  return (
    <SocketProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:roomId" exact component={Playground} />
          {/* <Route
          path="/:roomId/*"
          render={() =>
            roomId ? (
              <Redirect
                to={{
                  pathname: `/${roomId}`,
                }}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        /> */}
        </Switch>
      </ThemeProvider>
    </SocketProvider>
  );
};

export default App;
