import React from "react";
import Router from "./shared/Router";
import GlobalStyles from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <div className="overflow-hidden">
        <GlobalStyles />
        <Router />
      </div>
    </>
  );
}

export default App;
