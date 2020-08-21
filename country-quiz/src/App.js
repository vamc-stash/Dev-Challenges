import React from 'react';
import './App.css';
import Init from './components/Init';
import styled from "styled-components";

const Footer = styled.footer`
  color: white;
  margin-top: -2em;
  text-align: center;
`

function App() {
  return (
    <div>
      <Init/>
      <Footer>
        Made by{" "}
        <a
          href="https://github.com/vamc-stash"
          target="_blank"
          rel="noopener noreferrer"
        >
        <span style={{color: "#f9a826"}}>vamsi</span>
        </a>{" "}
        @
        <a href="https://devchallenges.io/" 
        target="_blank"
        rel="noopener noreferrer"
        >
        <span style={{color: "#f9a826"}}>devchallenges.io</span>
        </a>
      </Footer>
    </div>
  );
}

export default App;
