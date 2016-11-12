import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { AutoComplete, Paper, Avatar, TextField, RaisedButton } from 'material-ui';
import Person from 'material-ui/svg-icons/Social/Person';
import { fetch_login } from '../actions/fetch'

const styles = {
  backdrop:{
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'Changa !important'
  },
  main: {
    flexDirection: 'column',
    width: 354,
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign:'center',
  },
  paper: {
    flex:1,
    flexDirection: 'column',
    maxWidth: 354,
    height: 400,
    padding: 40,
    textAlign: 'center',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f7f7f7',
    boxShadow: '0px 2px 1px #999999'
  }
};
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userNumber: '15951932500',
      password: '123456',
    };
  }
  componentWillMount() {
    if(this.props.userNumber !== ''){
      browserHistory.push('/');
    }
  }
  handleUpdateInput(event) {
    const value = event.target.value;
    event.target.value = value.trim();
    this.setState({
      userNumber:value.trim(),
    });
  }

  handleUpdatePassword(event) {
    const value = event.target.value;
    event.target.value = value.trim();
    this.setState({
      password:value.trim(),
    })
  }

  submit() {
    const userNumber = this.state.userNumber;
    const password = this.state.password;
    const { dispatch } = this.props
    if(userNumber && password)
      dispatch(fetch_login(userNumber, password));
  }
  render(){
    return (
      <div style={styles.backdrop}>
        <div style={styles.main}>
        <p style={{fontSize:18}}>登录紫金考试系统</p>
          <Paper style={styles.paper} zDepth={0} rounded={true}>
            <div style={{flex: 1, marginTop: 20, width: '100%'}}>
              <TextField
                hintText="在此处输入你的学号"
                floatingLabelText="学号"
                onChange={this.handleUpdateInput.bind(this)}
                fullWidth={true}
                type="number"
                value={this.state.userNumber}/>
            </div>
            <div style={{flex: 1, marginTop:20, width: '100%'}}>
              <TextField
                hintText="在此处输入你的密码"
                floatingLabelText="密码"
                type="password"
                onChange={this.handleUpdatePassword.bind(this)}
                value={this.state.password}
                fullWidth={true}/>
            </div>
            <div style={{flex: 2, margin:20, width: '100%'}}>
              <RaisedButton
                label="登录"
                primary={true}
                fullWidth={true}
                onClick={this.submit.bind(this)}/>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ ...state.user}),
)(Login)