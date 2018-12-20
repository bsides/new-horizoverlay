import React, { FunctionComponent, useState, useEffect } from 'react'
import Battlers from './Battlers'
import Encounter from './Encounter'
import ConfigWindow from './ConfigWindow'
import Config from './Config'

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

// interface AppState {
//   Encounter: {}
//   battlers: Array<{}> // From ACT "Combatant"
//   isActive: boolean
// }

const App = () => {
  // const [data, setData] = useState<AppState>({
  //   Encounter: {},
  //   battlers: [],
  //   isActive: false
  // })
  const [encounter, setEncounter] = useState({})
  const [battlers, setBattlers] = useState([] as Array<{}>)
  const [isActive, setIsActive] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [isConfigWindowOpen, setIsConfigWindowOpen] = useState(false)
  function toggleConfigWindow() {
    setIsConfigWindowOpen(prevValue => !prevValue)
  }
  function closeConfigWindow() {
    setIsLocked(false)
  }
  function toggleResizeWindowImage(evt: CustomEvent) {
    setIsLocked(evt.detail.isLocked)
    isLocked
      ? document.documentElement.classList.remove('resizable')
      : document.documentElement.classList.add('resizable')
  }
  function setACTPluginData(evt: CustomEvent) {
    let arrBattlers: Array<{}> = []
    const { Combatant: combatant } = evt.detail
    for (let battler in combatant) {
      const newCombatant = {
        name: battler,
        ...combatant[battler]
      }
      arrBattlers.push(newCombatant)
    }
    // setData(prevValue => ({ ...prevValue, battlers: arrBattlers }))
    setBattlers(arrBattlers)
    setEncounter(evt.detail.Encounter)
    setIsActive(evt.detail.isActive)
  }
  function initEventListeners() {
    document.addEventListener('onOverlayDataUpdate', setACTPluginData)
    document.addEventListener('onOverlayStateUpdate', toggleResizeWindowImage)
    return function cleanupEventListeners() {
      document.removeEventListener('onOverlayDataUpdate', setACTPluginData)
      document.removeEventListener(
        'onOverlayStateUpdate',
        toggleResizeWindowImage
      )
      document.addEventListener('beforeunload', closeConfigWindow)
    }
  }

  useEffect(initEventListeners, [])

  // console.log('encounter: ', encounter)
  // console.log('battlers: ', battlers)
  // console.table(battlers)
  // console.log('isActive: ', isActive)
  return (
    <div onContextMenu={toggleConfigWindow}>
      <Battlers battlers={battlers} encounter={encounter} />
      <Encounter encounter={encounter} />
      {isConfigWindowOpen && (
        <ConfigWindow closePopupWindow={closeConfigWindow}>
          <Config />
        </ConfigWindow>
      )}
    </div>
  )
}

export default App
