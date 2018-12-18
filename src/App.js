import React, { Component } from 'react'
import Battlers from './Battlers'
import Encounter from './Encounter'
import ConfigWindow from './ConfigWindow'
import Config from './Config'

class App extends Component {
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

  parseACTData(evt) {
    let arrBattlers = []
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
  componentDidMount() {
    document.addEventListener('onOverlayDataUpdate', evt =>
      this.parseACTData(evt)
    )
    // - onOverlayStateUpdate
    // This event occurs when the overlay setting has changed.
    document.addEventListener('onOverlayStateUpdate', evt => {
      this.setState({ isLocked: evt.detail.isLocked })
      this.state.isLocked
        ? document.documentElement.classList.remove('resizable')
        : document.documentElement.classList.add('resizable')
    })
  }
  componentWillUnmount() {
    document.removeEventListener('onOverlayDataUpdate', document)
    document.removeEventListener('onOverlayStateUpdate', document)
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
