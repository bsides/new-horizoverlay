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

// TODO: Discover this thing's type
const images: any = importAll(
  require.context('../images', false, /\.(png|jpe?g|svg)$/)
)

interface BattlerType {
  rank?: string
  name?: string
  Job?: string
  ENCHPS?: string
  ENCDPS?: string
  'damage%'?: string
}
type BattlersProps = {
  // battlers: {} // I really dont know much of its contents
  // Well, I can declare what I use though!
  battlers: BattlerType[]
  encounter: {}
}

const Battlers = (props: BattlersProps) => {
  function renderBattlers() {
    const { battlers } = props
    const toRender = battlers.map((battler, index) => {
      const jobImage =
        battler.Job !== undefined ? `${battler.Job!.toLowerCase()}.png` : ''
      return (
        <EachBattler key={index}>
          <AboveBar>
            <span>{battler.rank}</span>
            <span>{battler.name}</span>
          </AboveBar>
          <InfoBar>
            <img src={images(jobImage)} alt={battler.Job} />
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
      )
    })
    return battlers.length > 0 && toRender
  }
  console.log(props.battlers)
  return (
    <>
      <BattlersStyled>{renderBattlers()}</BattlersStyled>
    </>
  )
}

export default Battlers
