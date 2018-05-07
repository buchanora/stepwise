import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import LoadingPage from '../LoadingPage/';

export default function ViewGroup(props){
  const{ children, activeView, loading, render, moveTo, goBack, setMax} = props;
  let views;
  if(render){
    views = render({activeView, loading})
  }else{
    const count = React.Children.count(children);
    views = React.Children.map(children, (child, index)=>{
      let _childProps = {key: 'view' + index,};
      
      if(child.type.name === 'WizView'){
        
        _childProps = {
          ..._childProps,
          activeView: activeView < count ? activeView : count-1,
          index,
          moveTo,
          goBack,
          loading,
          setMax,
        }
        return React.cloneElement(child, _childProps)
      }

      return null;

    });
  }
  
  return(
          <CSSTransitionGroup transitionName="wizard-step"
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={300}>
            {
              props.loading
              ? <LoadingPage/>
              : views
            }
          </CSSTransitionGroup>
  );
}