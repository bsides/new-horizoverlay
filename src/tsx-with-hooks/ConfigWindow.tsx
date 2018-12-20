import React, { useState, useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom'

type ConfigWindowProps = {
  closePopupWindow(): void
  children: ReactNode
}

function ConfigWindow(props: ConfigWindowProps) {
  const [containerEl] = useState(document.createElement('div'))
  let externalWindow: Window | null = null

  const initWindow = () => {
    externalWindow = window.open(
      '',
      '',
      `width=600,height=400,left=200,top=200`
    )
    if (externalWindow !== null) {
      externalWindow.document.body.appendChild(containerEl)
      externalWindow.addEventListener('beforeunload', () => {
        props.closePopupWindow()
      })
    }
    console.log('Created Popup Window')
    return function cleaupInitWindow() {
      console.log('Cleaning up Popup Window')
      if (externalWindow !== null) externalWindow.close()
    }
  }

  useEffect(initWindow, [])
  return ReactDOM.createPortal(props.children, containerEl)
}

export default ConfigWindow
