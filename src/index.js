import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";

const breakPoints = {
  laptop: "1200px",
  tablet: "1000px",
  miniTablet: "900px",
  mobile: "768px",
};
const darkTheme = {
  breakPoints,
  colors: {
    main: "#191B1F",
    off: "#2C2F36",
    text: "white",
    highlight: "#00ff5f",
  },
  themeType: "dark",
};

const lightTheme = {
  breakPoints,
  colors: {
    main: "white",
    off: "#EDEFF2",
    text: "black",
    highlight: "#00ff5f",
  },
  themeType: "light",
};
class CryptoApp extends React.Component {
  state = {
    isDarkTheme: true,
  };
  componentDidMount() {
    const localIsDarkTheme = localStorage.getItem("isDarkTheme");
    if (this.state.isDarkTheme !== localIsDarkTheme) {
      this.setState({ isDarkTheme: localIsDarkTheme });
    }
  }

  toggleTheme = () => {
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
    localStorage.setItem("isDarkTheme", this.state.isDarkTheme);
  };
  render() {
    return (
      <React.StrictMode>
        <ThemeProvider theme={this.state.isDarkTheme ? darkTheme : lightTheme}>
          <App toggleTheme={this.toggleTheme} />
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}
ReactDOM.render(
  <CryptoApp />,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
