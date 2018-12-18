import React, { Component } from 'react'
import Combatant from './Combatant'
import Encounter from './Encounter'

class App extends Component {
  state = {
    data: {
      Encounter: {},
      Combatant: [],
      isActive: false
    },
    isLocked: false
  }
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
      data: { ...prevState.data, Combatant: arrBattlers }
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
  }
  render() {
    console.log(this.state.data)
    const {
      data: { Encounter: encounter, Combatant: battlers, isActive }
    } = this.state

    return (
      <>
        <Combatant battlers={battlers} encounter={encounter} />
        <Encounter encounter={encounter} />
      </>
    )
  }
}

export default App
