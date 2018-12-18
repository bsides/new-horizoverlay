import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

let evtListener: null | any = null

class App extends Component {
  state = { data: {} }
  componentDidMount() {
    evtListener = document.addEventListener(
      'onOverlayDataUpdate',
      (evt: any) => {
        this.setState({
          data: evt.detail
        })
      }
    )
  }
  componentWillUnmount() {
    evtListener = document.removeEventListener(
      'onOverlayDataUpdate',
      evtListener
    )
  }
  render() {
    console.log(this.state.data)
    const { data } = this.state
    return <div>DPS: ?</div>
    // return <div>DPS: {data.Combatant.YOU.ENCDPS}</div>
  }
}

export default App
