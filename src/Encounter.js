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

class Encounter extends React.Component {
  render() {
    const { title, CurrentZoneName } = this.props.encounter
    return (
      <>
        <TitleStyled>
          <div>
            {title && CurrentZoneName && `${title} @ ${CurrentZoneName}`}
            {title && `${title}`}
            {CurrentZoneName && `${CurrentZoneName}`}
          </div>
        </TitleStyled>
      </>
    )
  }
}

export default Encounter
