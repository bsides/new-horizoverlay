import React, { useState, useEffect } from 'react'
import Encounter from './Encounter'
import Unit from './Unit'
import ConfigWindow from './ConfigWindow'
import Config from './Config'
import { defaultConfig } from './helpers'

function getRandom(min, max) {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  return Math.floor(Math.random() * (last - first + 1)) + first
}
function replaceWithRandom(someData) {
  let newData = {}
  for (let d in someData) {
    newData[d] = getRandom(someData[d], someData[d] + 500)
  }
  return newData
}

class App extends React.Component {
  state = {
    data: {
      something: 600,
      other: 200
    },
    isConfigWindowOpen: false
  }
  interval = () =>
    setInterval(() => {
      this.setState(replaceWithRandom(this.state.data))
      const event = new CustomEvent('onOverlayDataUpdate', {
        detail: this.state.data
      })
      document.dispatchEvent(event)
    }, 5000)
  componentDidMount() {
    document.addEventListener('onOverlayDataUpdate', e => {
      this.setState(replaceWithRandom(e.detail))
    })
    this.interval()
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    document.removeEventListener('onOverlayDataUpdate', document)
    window.addEventListener('beforeunload', () => {
      this.closeConfigWindow()
    })
  }
  toggleConfigWindow = () => {
    this.setState({ isConfigWindowOpen: !this.state.isConfigWindowOpen })
  }
  closeConfigWindow = () => {
    this.setState({ isConfigWindowOpen: false })
  }
  render() {
    console.log(replaceWithRandom(this.state.data))
    return (
      <div onContextMenu={this.toggleConfigWindow}>
        <button type="buton" onClick={this.toggleConfigWindow}>
          Toggle
        </button>
        {this.state.isConfigWindowOpen && (
          <ConfigWindow closeConfigWindow={this.closeConfigWindow}>
            <Config defaultConfig={defaultConfig} />
            <div>wtf is going on here</div>
          </ConfigWindow>
        )}
      </div>
    )
  }
}

export default App
