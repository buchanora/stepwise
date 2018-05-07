import React, {Component} from 'react';

export function StepHeading(props){
  const {label, index, last, first, count, isActive, isDone} = props;
  const isLastStep = last? last :count==index+1;
  const isFirstStep = first? first :index === 0

  return(
    <span className={`wizard-step ${isLastStep? 'wizard-step--last': ''} ${isFirstStep? 'wizard-step--first': ''} ${isDone? 'wizard-step--done' : ''} ${isActive? 'wizard-step--active' : ''}`}>
      {
        isFirstStep
        || <span className='wizard-step-divider'/>
      }

      <span className={`wizard-step-countWrapper`}>
        {
          <span className='wizard-step-count'>
            { Number(index)+1 || '1' }
          </span>
        }
      </span>
      {
        label
        &&  <span className='wizard-step-label'>
              {label}
            </span>
      }
    </span>
  )
}
