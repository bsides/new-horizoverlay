import React, { Component } from 'react'
import Battlers from './Battlers'
import Encounter from '../Encounter'
import ConfigWindow from '../ConfigWindow'
import Config from '../Config'

// The ACT Plugin fire custom events
// and we need to tell typescript to f* off <any>
// OR we can just merge with default event map ;)
// which looks very good and declared and made me do
// a 5 line of comment in a simple thing!
declare global {
  interface DocumentEventMap {
    // - onOverlayDataUpdate
    // This event occurs on every new data from ACT
    onOverlayDataUpdate: CustomEvent
    // - onOverlayStateUpdate
    // This event occurs when the overlay setting has changed.
    onOverlayStateUpdate: CustomEvent
  }
}

type AppState = {
  data: {
    Encounter: {}
    battlers: Array<{}> // From ACT "Combatant"
    isActive: boolean
  }
  isLocked: boolean
  isConfigWindowOpen: boolean
}

class App extends Component<{}, AppState> {
  state = {
    data: {
      Encounter: {},
      battlers: [], // From ACT "Combatant"
      isActive: false
    },
    isLocked: false,
    isConfigWindowOpen: false
  }

  toggleConfigWindow = () => {
    this.setState(prevState => ({
      isConfigWindowOpen: !prevState.isConfigWindowOpen
    }))
  }

  closeConfigWindow = () => this.setState({ isConfigWindowOpen: false })

  setACTPluginData = (evt: CustomEvent) => {
    let arrBattlers: Array<{}> = []
    const { Combatant: combatant } = evt.detail
    for (let battler in combatant) {
      const newCombatant = {
        name: battler,
        ...combatant[battler]
      }
      arrBattlers.push(newCombatant)
    }
    this.setState(prevState => ({
      data: { ...prevState.data, battlers: arrBattlers }
    }))
  }

  toggleResizeWindowImage = (evt: CustomEvent) => {
    this.setState({ isLocked: evt.detail.isLocked })
    this.state.isLocked
      ? document.documentElement.classList.remove('resizable')
      : document.documentElement.classList.add('resizable')
  }

  componentDidMount() {
    document.addEventListener('onOverlayDataUpdate', this.setACTPluginData)

    document.addEventListener(
      'onOverlayStateUpdate',
      this.toggleResizeWindowImage
    )
  }
  componentWillUnmount() {
    document.removeEventListener(
      'onOverlayDataUpdate',
      this.setACTPluginData,
      false
    )
    document.removeEventListener(
      'onOverlayStateUpdate',
      this.toggleResizeWindowImage
    )
    document.addEventListener('beforeunload', this.closeConfigWindow)
  }

  render() {
    console.log(this.state.data)
    const {
      isConfigWindowOpen,
      data: { Encounter: encounter, battlers }
    } = this.state

    return (
      <div onContextMenu={this.toggleConfigWindow}>
        <Battlers battlers={battlers} encounter={encounter} />
        <Encounter encounter={encounter} />
        {isConfigWindowOpen && (
          <ConfigWindow closePopupWindow={this.closeConfigWindow}>
            <Config />
          </ConfigWindow>
        )}
      </div>
    )
  }
}

export default App
