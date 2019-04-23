import { useEffect } from 'react'
import ReactDOM from 'react-dom'

const ConfigWindow = props => {
  // const config = null
  const containerEl = document.createElement('div')
  let externalWindow = null

  useEffect(
    () => {
      externalWindow = window.open(
        '',
        '',
        `width=600,height=400,left=200,top=200`
      )
      externalWindow.document.body.appendChild(containerEl)
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

  return ReactDOM.createPortal(props.children, containerEl)
}

export default ConfigWindow
