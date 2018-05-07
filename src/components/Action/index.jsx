import React, {Component} from 'react';

export default function WizActionButton(props){
  const { direction='',
          actionState={},
          text,
          primary,
          onClick=()=>{} }=props;

  function actionStateClasses(_actionState){
    let classes = '';
    if(_actionState.disabled){
      classes += ' wizard-action--disabled';
    }
    if(!_actionState.visible){
      classes += ' wizard-action--hidden';
    }
    return classes;
  }

  return(
      <span onClick={actionState.disabled ?()=>{} :onClick}
            className={`wizard-action ${actionStateClasses(actionState)} wizard-action-${direction || 'button'} ${primary ? 'wizard-action--primary' : ''}`}>
        <ActionIcon direction={direction==='backward' && direction}/>
        <span className='wizard-action-text'>
          {
            !direction
            ? text
            : direction==='backward'
              ? (actionState.label || text)
              : (actionState.label || text)
          }
        </span>
        <ActionIcon direction={direction === 'forward' && direction}/>
      </span>
  )
}
// Arrow Icon Component in the Wizard actionigation Component
function ActionIcon({direction}){
  return(
    direction
    ? <span className={`wizard-action-icon wizard-action-icon-${direction}`}>
        <i className={`icofont ${direction==='backward' ?'icofont-simple-left' :'icofont-simple-right'}`}></i>
      </span>
    : null
  )
}
