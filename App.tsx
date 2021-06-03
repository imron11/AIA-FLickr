import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

import SigninComponent from "./src/main/signin/signin.component";
import HomeComponent from "./src/main/home/home.component";

const App = () => {
  return (
    <>
      <Router>
        <Stack
          key={'root'}
        >
          <Scene
            key={'SigninPage'}
            component={SigninComponent}
            hideNavBar
          />
          <Scene
            key={'HomePage'}
            component={HomeComponent}
            hideNavBar
          />
        </Stack>
      </Router>
    </>
  )
}

export default App;