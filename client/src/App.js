import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import PasswordResetFormFirst from "./components/PasswordResetFormFirst";
import PasswordResetFormSecond from "./components/PasswordResetFormSecond";
import { Route, Switch } from "react-router-dom";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOverlayClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSidedrawerNavbarLinkClick = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuClick={handleMenuClick}
        onSidedrawerNavbarLinkClick={handleSidedrawerNavbarLinkClick}
        onOverlayClick={handleOverlayClick}
      />
      <Switch>
        <Route
          path="/account/reset/:token"
          component={PasswordResetFormSecond}
        />
        <Route path="/account/forgot" component={PasswordResetFormFirst} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/registerLogin" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
};

export default App;
