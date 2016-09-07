import React from 'react';
import ReactDOM from 'react-dom';
 import App from './app.jsx'
class Second extends React.Component {
  render() {
    return (<div>{this.props.artist}{this.props.pop}</div>)
  }
}
 
ReactDOM.render(<Second/>, document.getElementById('second'));