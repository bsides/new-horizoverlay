import { createGlobalStyle } from 'styled-components'
import ResizeImage from './images/handle.png'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html, body {
    background-color: transparent;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    color: #ffffff;
    font-size: 10px;
    line-height: 1.5;
  }
  .resizable {
    background-image: url(${ResizeImage});
    background-position: bottom right;
    background-repeat: no-repeat;
  }
`

export default GlobalStyle
