import React, { Component } from 'react'
import { Link, browserHistory, Lifecycle } from 'react-router'
import { connect } from 'react-redux'
import Button from './button/button'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { AppBar, FlatButton, IconButton } from 'material-ui'

class App extends Component {
  componentWillMount() {
    if(this.props.userNumber === ''){
      browserHistory.push('/login');
    }
  }
  routerWillLeave(nextLocation) {
    if(this.props.userNumber !== '' && nextLocation ==='/login'){
      if (!this.state.isSaved) {
        return '确认要注销吗?'
      }
    }
  }
  render(){
    const {
      children
    } = this.props;
    return (
      <div>
        <AppBar 
          iconElementLeft={
            <p style={{margin: 0,color: '#FFF', lineHeight: '48px'}}>
              紫金考试系统
            </p>}
          iconElementRight={
            <span style={{color: '#FFF', lineHeight: '48px'}}>
              <FlatButton label="Home" style={{color: '#FFF'}}></FlatButton>
            </span>}>
        </AppBar>
        <div style={{ marginTop: '1.5em' }}>
          <Button width= '20%' onClick={()=>browserHistory.push('/home')}>跳转</Button>
          {children}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ ...state.user })
)(App)