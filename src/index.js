import React from 'react'
import ReactDOM from 'react-dom'
import App from './tsx-with-hooks/App'
import GlobalStyle from './tsx-with-hooks/styled/GlobalStyle'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
