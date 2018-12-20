import styled from 'styled-components/macro'

const BattlersStyled = styled.div`
  text-align: center;
  justify-content: center;
  font-size: 1.3rem;
  display: flex;
`
const EachBattler = styled.div`
  flex: 1 1;
  margin: 0 0.6rem;
  max-width: 14rem;
  & > div {
    margin: 0 auto;
    padding: 0 0 1px;
  }
`
const AboveBar = styled.div`
  margin: 0 auto;
  padding: 0 0 0.1rem;
`
const InfoBar = styled.div<{ bg?: string }>`
  display: flex;
  position: relative;
  color: #000000;
  img {
    width: 2rem;
    position: absolute;
    top: -0.5rem;
    left: 5.9rem;
    z-index: 1;
  }
  &:before {
    background: ${props => props.bg || 'rgba(255, 255, 255, 0.8)'};
    transform: skew(-30deg);
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 96%;
  }
  & > div {
    z-index: 1;
    flex: 1 1;
  }
  & > div > span {
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 0 0.3rem;
  }
`
const RightInfo = styled.div`
  text-align: right;
  padding-right: 1rem;
`
const LeftInfo = styled.div`
  text-align: left;
  padding-left: 1rem;
`
const PercentBarBG = styled.div<{ bg?: string }>`
  background: ${props => props.bg || 'rgba(255, 255, 255, 0.5)'};
  height: 2px;
  transform: skew(-30deg);
  margin: 0;
  position: relative;
  left: -8px;
`
const PercentBarFG = styled.div<{ width?: string }>`
  background: #ffffff;
  height: 2px;
  transform: skew(-30deg);
  margin: 0;
  width: ${props => props.width || '0%'};
`
const PercentNumber = styled.div`
  position: relative;
  text-align: right;
  width: 100%;
  font-size: 7px;
  top: -2px;
  right: 10px;
`

export {
  BattlersStyled,
  EachBattler,
  AboveBar,
  InfoBar,
  RightInfo,
  LeftInfo,
  PercentBarFG,
  PercentBarBG,
  PercentNumber
}
