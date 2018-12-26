import React from 'react'
import styled from 'styled-components'

const TitleStyled = styled.div`
  color: #ffffff;
  position: relative;
  display: flex;
  font-size: 1.4rem;
  &:before {
    background: rgba(0, 0, 0, 0.3);
    transform: skew(-30deg);
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  & > div {
    z-index: 1;
  }
`

type EncounterProps = {
  encounter: {
    title?: string
    CurrentZoneName?: string
    duration?: string
    ENCDPS?: string
  }
}

const Encounter = (props: EncounterProps) => {
  // console.log(props.encounter)
  const { title, CurrentZoneName, duration, ENCDPS } = props.encounter
  return (
    <>
      <TitleStyled>
        <div>{title && CurrentZoneName && `${title} @ ${CurrentZoneName}`}</div>
        <div>{ENCDPS} DPS</div>
        <div>{duration}</div>
      </TitleStyled>
    </>
  )
}

export default Encounter
