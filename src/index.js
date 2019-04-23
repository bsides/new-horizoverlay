import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import './test-data'
import * as serviceWorker from './serviceWorker'
import './index.css'

// document.addEventListener('onOverlayDataUpdate', function(e) {
//   update(e.detail)
// })
// function update(detail) {
//   ReactDOM.render(<App {...detail} />, document.getElementById('root'))
// }

ReactDOM.render(<App />, document.getElementById('root'))

document.addEventListener('onOverlayStateUpdate', function(e) {
  if (!e.detail.isLocked) {
    document.documentElement.classList.add('resizable')
  } else {
    document.documentElement.classList.remove('resizable')
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
