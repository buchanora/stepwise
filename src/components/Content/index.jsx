import React, {Component} from 'react';

export default class View extends Component{
  componentWillMount(){
    this.props.setMax && this.props.setMax(this.props.index)
  }
  render(){
    const{ children, activeView, index} = this.props;
    
    return(
      activeView === index
      ? <div key={`view-${activeView}`} className='wizard-body'>{children}</div>
      : null
    )
  }
}