import React, { useState, useReducer } from 'react'
import { ConfigStyled } from './styled/Config'
import { useLocalStorage } from './helpers'

const loc = {
  showSetup: 'Setup Mode'
}

const Config = props => {
  const [showSetup, setShowSetup] = useLocalStorage(
    'showSetup',
    props.showSetup
  )
  return (
    <ConfigStyled>
      <form>
        <label htmlFor="showSetup">
          <span>
            <input
              type="checkbox"
              name="showSetup"
              id="showSetup"
              checked={showSetup}
              onChange={e => setShowSetup(e.target.checked)}
            />
            {loc.showSetup}
          </span>
        </label>
      </form>
    </ConfigStyled>
  )
}

export default Config
