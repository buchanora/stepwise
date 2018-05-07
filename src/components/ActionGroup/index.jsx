import React, {Component} from 'react';

export default function ActionGroup(props){
  const{ children, activeView, moveTo, goBack, render} = props;

  let actions;

  if(render){
    actions = render({activeView, moveTo, goBack})
  }else{
    actions = React.Children.map(children, (child, index)=>{
      let childProps = {key: 'action' + index,};
      const count = React.Children.count(children);
      const direction = index === 0 
        ? 'backward' 
        : index === count-1 
          ? 'forward' 
          : '';

      if(child.type.name === 'WizActionButton'){
        childProps = {
          ...childProps,
          activeView,
          text: child.props.text || (direction === 'forward' 
                                      ? 'Next' 
                                      : direction === 'backward' 
                                        ?'Back' 
                                        :'Action'),
          onClick: child.props.onClick ?child.props.onClick.bind(null, {moveTo, goBack}, activeView) :_handleActionClick.bind(null, index, direction),
          actionState: child.props.actionState || {
            disabled: false,
            visible: activeView === 0 && index === 0 ? false :true,
          },
          direction: direction
        }
      }

      return React.cloneElement(child, childProps)
    });
  }
  return (
    <footer className='wizard-actions'>
      {actions}
    </footer>
  )
  function _handleActionClick(index, _direction){
    if(_direction === 'forward'){
      moveTo(activeView + 1)
    }
    if(_direction === 'backward'){
      goBack()
    }
  }
}