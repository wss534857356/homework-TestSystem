import React, { Component } from 'react'
import Shadow from './shadow'
import { findDOMNode } from 'react-dom'

const style = {
  box: {
    display:'block',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    marginTop: '20px',
    borderRadius: '2px',
    height: '36px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    width: '20%'
  },
  button: {
    width: '100%',
    padding: 0,
    margin: 0,
    textDecoration: 'none',
    height: 'inherit',
    textAlgin: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 'inherit',
    border: '10px',
    boxSizing: 'border-box',
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: '#FFF',
    position: 'relative',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
  fontBox: {
    height: 'inherit',
    borderRadius: 'inherit',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    top: 0
  },
  fontStyle: {
    position: 'relative',
    color: 'rgb(255, 255, 255)',
    userSelect: 'none',
    paddingLeft: '0',
    paddingRight: '0',
    margin: 0,
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: '14px',
    opactiy: 1,
    letterSpacing: 0
  },
  shadowBox: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  }
}
class Button extends Component {
  style = {...style};
  constructor(props) {
    super(props);
    this.componentStyle();
    this.state = {
      event: [],
      shadow: []
    };
  }
  componentStyle() {
    const _props = this.props;
    const boxStyle = {...this.style.box};
    const buttonStyle = {...this.style.button};
    const fontStyle = {...this.style.fontStyle}

    boxStyle.width = _props.width? _props.width: '100%';
    boxStyle.height = _props.height? _props.height: '36px';
    boxStyle.borderRadius = _props.radius? _props.radius: '2px';

    buttonStyle.backgroundColor = _props.bgColor? _props.bgColor: '#2196F3';

    fontStyle.color = _props.fontColor? _props.fontColor: 'rgb(255, 255, 255)';
    fontStyle.fontSize = _props.fontSize? _props.fontSize: '14px';

    this.style.box = boxStyle;
    this.style.button = buttonStyle;
    this.style.fontStyle = fontStyle;

  }
  mouseDown(event) {
    let dom = findDOMNode(this.refs.button);
    let shadow = {
      key: this.state.shadow.length,
      event: {
        clientX: event.nativeEvent.clientX,
        clientY: event.nativeEvent.clientY,
      },
      target: {
        offsetWidth: dom.offsetWidth,
        offsetHeight: dom.offsetHeight,
        offsetTop: dom.offsetTop,
        offsetLeft: dom.offsetLeft,
      }
    };
    this.setState({
      shadow: this.state.shadow.concat(shadow)
    });
    dom.style.boxShadow = 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
  }
  removeSelect(event) {
    let dom = findDOMNode(this.refs.button);

    dom.style.boxShadow = 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
  }
  render() {
    let shadowList = this.state.shadow.map(function(shadow) {
      return <Shadow {...shadow} type="click"></Shadow>;
    });
    return (
      <div style={this.style.box} ref='button'>
        <button
          style={this.style.button}
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.removeSelect.bind(this)}
          onMouseOut={this.removeSelect.bind(this)}
          onClick={this.props.onClick}>
          <div>
            <span style={this.style.shadowBox} ref="shadow">
              {shadowList}
            </span>
            <div style={this.style.fontBox}>
              <span style={this.style.fontStyle}>
                {this.props.children}
              </span>
            </div>
          </div>
        </button>
      </div>
    )
  }
}

export default Button