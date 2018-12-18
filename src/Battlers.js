import React from 'react'
import {
  BattlersStyled,
  EachBattler,
  AboveBar,
  InfoBar,
  RightInfo,
  LeftInfo,
  PercentBarFG,
  PercentBarBG,
  PercentNumber
} from './styled/Battlers'
import { importAll } from './helper'

const images = importAll(
  require.context('./images', false, /\.(png|jpe?g|svg)$/)
)

class Battlers extends React.Component {
  renderBattlers() {
    const { battlers } = this.props
    const toRender = battlers.map((battler, index) => (
      <EachBattler key={index}>
        <AboveBar>
          <span>{battler.rank}</span>
          <span>{battler.name}</span>
        </AboveBar>
        <InfoBar>
          <img
            src={images[`${battler.Job.toLowerCase()}.png`]}
            alt={battler.Job}
          />
          <LeftInfo>
            {battler.ENCHPS || 0}
            <span>HPS</span>
          </LeftInfo>
          <RightInfo>
            {battler.ENCDPS}
            <span>DPS</span>
          </RightInfo>
        </InfoBar>
        <div>
          <PercentBarBG>
            <PercentBarFG width={battler['damage%']} />
          </PercentBarBG>
          <PercentNumber>{battler['damage%']}</PercentNumber>
        </div>
      </EachBattler>
    ))
    return battlers.length > 0 && toRender
  }
  render() {
    console.log(this.props.battlers)
    return (
      <>
        <BattlersStyled>{this.renderBattlers()}</BattlersStyled>
      </>
    )
  }
}

export default Battlers
