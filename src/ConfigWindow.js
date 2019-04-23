import React from 'react'
import ReactDOM from 'react-dom'

class ConfigWindow extends React.Component {
  containerEl = document.createElement('div')
  externalWindow = null
  componentDidMount() {
    this.externalWindow = window.open(
      '',
      '',
      `width=600,height=400,left=200,top=200`
    )
    this.externalWindow.document.body.appendChild(this.containerEl)
    this.externalWindow.addEventListener('beforeunload', () => {
      this.props.closeConfigWindow()
    })
  }
  componentWillUnmount() {
    this.externalWindow.close()
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.containerEl)
  }
}

export default ConfigWindow
