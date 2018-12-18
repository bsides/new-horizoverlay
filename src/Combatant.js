import React from 'react'
import styled from 'styled-components'

const CombatantStyled = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.4rem;
`
const ColumnStyled = styled.div`
  flex: 1 1;
  text-shadow: 0 0 0.8rem #000;
  margin: 0 0.6rem;
  max-width: 14rem;
  &:before {
    background-color: #ffffff;
    width: 100%;
    height: 2rem;
    transform: skew(-30deg);
    position: absolute;
    z-index: 0;
    content: '';
  }
  & > span {
    text-transform: uppercase;
    font-size: 1rem;
    padding-left: 0.3rem;
  }
`

class Combatant extends React.Component {
  render() {
    const { battlers } = this.props
    console.log(battlers)
    return (
      <>
        <CombatantStyled>
          {battlers.map((battler, index) => (
            <ColumnStyled key={index}>
              {battler.ENCDPS}
              <span>DPS</span>
            </ColumnStyled>
          ))}
        </CombatantStyled>
      </>
    )
  }
}

export default Combatant
