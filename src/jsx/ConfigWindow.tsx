import React from 'react'
import ReactDOM from 'react-dom'

type ConfigWindowProps = {
  closePopupWindow(): void
}

class ConfigWindow extends React.Component<ConfigWindowProps, {}> {
  containerEl = document.createElement('div')
  externalWindow: Window | null = null
  componentDidMount() {
    this.externalWindow = window.open(
      '',
      '',
      `width=600,height=400,left=200,top=200`
    )
    if (this.externalWindow !== null) {
      this.externalWindow.document.body.appendChild(this.containerEl)
      this.externalWindow.addEventListener('beforeunload', () => {
        this.props.closePopupWindow()
      })
    }
    console.log('Created Popup Window')
  }
  componentWillUnmount() {
    console.log('Cleaning up Popup Window')
    if (this.externalWindow !== null) this.externalWindow.close()
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.containerEl)
  }
}

export default ConfigWindow
