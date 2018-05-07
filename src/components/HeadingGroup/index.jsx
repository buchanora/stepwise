import React, {Component} from 'react';

export function StepHeadingGroup(props){
  const{ children, activeView, done=[], render} = props;
  let steps;
  if(render){
    steps = render({activeView, done})
  }else{
    const count = React.Children.count(children);
    steps = React.Children.map(children, (child, index)=>(
      React.cloneElement(child, {
        key: 'step' + index,
        index: index,
        isDone: done[index],
        isActive: activeView === index,
        count: count
      })
    ));
  }
  
  return (
    <header className='wizard-steps'>
      {steps}
    </header>
  )
}