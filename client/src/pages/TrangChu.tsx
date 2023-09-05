import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { PasswordInput } from "../components/PasswordInput";
export function TrangChu() {
  return (
    <>
      <PasswordInput />
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo"></img>
        <h4>This app is built by React</h4>
      </div>
    </>
  );
}
