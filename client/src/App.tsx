import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage";
import Auth from "./hoc/auth";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const Content = styled.div`
  padding-top: 69px;
  min-height: calc(100vh - 80px);
`;

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <Router>
        <Content>
          <Switch>
            <Route exact path='/' component={Auth(LandingPage, null)} />
            <Route exact path='/login' component={Auth(LoginPage, null)} />
            <Route
              exact
              path='/register'
              component={Auth(RegisterPage, null)}
            />
            <Route
              exact
              path='/product/upload'
              component={Auth(UploadProductPage, null)}
            />
          </Switch>
        </Content>
      </Router>
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <Footer />
    </React.Suspense>
  );
};

export default App;
