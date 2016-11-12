import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

const style = {
  shadow: {
    position: 'absolute',
    borderRadius: '50%',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  shadow_init: {
    position: 'absolute',
    borderRadius: '50%',
    transition: 'opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    opacity: 0.25,
    transform: 'scale(0)',
    backgroundColor: '#FFFFFF',
  }
}
class Shadow extends Component {
  constructor(props) {
    super(props);
    let shadow = this.click(this.props.event, this.props.target, this.props.type);
    this.state = {
      shadow_style: shadow,
    };

  }
  eventOrdinate(ev, type) {
    const event = {};
    switch(type){
      case 'click': 
      event.eventX = ev.clientX;
      event.eventY = ev.clientY;
      break;
      case 'touch':
      let touch = ev.changedTouches[0];
      event.eventX = Number(touch.pageX);
      event.eventY = Number(touch.pageY);
      break;
    }
    return event;
  }
  radius(ev, doc, type) {
    const setWidth = doc.offsetWidth;
    const setHeight = doc.offsetHeight;
    const setLeft = doc.offsetLeft;
    const setTop = doc.offsetTop;
    const tMax = setWidth > setHeight
    ? setWidth
    : setHeight;
    const event = this.eventOrdinate(ev, type);

    const mLeft = event.eventX - setLeft;
    const mTop = event.eventY - setTop;

    const mMax = setWidth > setHeight ? mLeft : mTop;
    const rWidth = mLeft > setWidth/2 
    ? mLeft 
    : setWidth - mLeft;
    const rHeight = mTop > setHeight/2 
    ? mTop 
    : setHeight-mTop;
    const radius = Math.sqrt( Math.pow( rWidth, 2 ) + Math.pow( rHeight, 2 ) );
    const rLeft = mLeft - radius;
    const rTop = mTop - radius;
    const diameter = radius * 2;
    return {
      top: rTop,
      left: rLeft,
      diameter: diameter
    }
  }
  click(event, parent, type){
    const radius = this.radius(event, parent, type);
    let shadow = {
      ...style.shadow_init,
      left: radius.left + 'px',
      top: radius.top + 'px',
      width: radius.diameter + 'px',
      height: radius.diameter + 'px'
    };
    return shadow;
  }
  componentDidMount() {
    let dom = findDOMNode(this);
    setTimeout(function () {
      dom.style.transform = 'scale(1)';
      dom.style.opacity = '0';
    }, 0);
    setTimeout(function () {
      dom.parentNode.removeChild(dom);
    }, 2000);
  }
  
  render(){
    return (
      <div style={this.state.shadow_style}></div>
    )
  }
}
export default Shadow