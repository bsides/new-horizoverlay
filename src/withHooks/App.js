import React, { useState, useEffect } from 'react'
import Encounter from './Encounter'
import Unit from './Unit'
import ConfigWindow from './ConfigWindow3'
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

const App = () => {
  let data = {
    something: 600,
    other: 200
  }
  let [dataState, setDataState] = useState(data)
  useEffect(() => {
    let interval = setInterval(() => {
      setDataState(replaceWithRandom(dataState))
      const event = new CustomEvent('onOverlayDataUpdate', {
        detail: dataState
      })
      document.dispatchEvent(event)
    }, 5000)
    return function clear() {
      clearInterval(interval)
    }
  }, [])
  useEffect(
    function getData() {
      document.addEventListener('onOverlayDataUpdate', e => {
        setDataState(replaceWithRandom(e.detail))
      })
      return function cleanup() {
        document.removeEventListener('onOverlayDataUpdate', document)
      }
    },
    [dataState]
  )
  console.log(dataState)
  const { Encounter: encounter, Combatant: unit } = dataState

  // State handling
  const [isConfigWindowOpen, setIsConfigWindowOpen] = useState(false)
  const toggleConfigWindow = () => setIsConfigWindowOpen(!isConfigWindowOpen)
  const closeConfigWindow = () => setIsConfigWindowOpen(false)

  // Side Effect
  useEffect(() =>
    window.addEventListener('beforeunload', () => {
      closeConfigWindow()
    })
  )
  return (
    <div>
      <button type="buton" onClick={toggleConfigWindow}>
        Toggle
      </button>
      <Encounter {...encounter} />
      <Unit {...unit} />
      {isConfigWindowOpen && (
        <ConfigWindow closeConfigWindow={closeConfigWindow}>
          <Config defaultConfig={defaultConfig} />
          <div>wtf is going on here</div>
        </ConfigWindow>
      )}
    </div>
  )
}

export default App
