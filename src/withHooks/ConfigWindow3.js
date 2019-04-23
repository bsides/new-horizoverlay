import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const ConfigWindow = props => {
  // const config = null
  const containerEl = document.createElement('div')
  let containerElRef = useRef(containerEl)
  let externalWindow = null

  useEffect(
    () => {
      externalWindow = window.open(
        '',
        '',
        `width=600,height=400,left=200,top=200`
      )
      externalWindow.document.body.appendChild(containerElRef.current)
      externalWindow.addEventListener('beforeunload', () => {
        props.closeConfigWindow()
      })
      console.log('Created')
      return function cleanup() {
        console.log('Cleaned up')
        externalWindow.close()
        externalWindow = null
      }
    },
    // Only re-renders this component if the variable changes
    []
  )

  return ReactDOM.createPortal(props.children, containerElRef.current)
}

export default ConfigWindow
