import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import LoadingPage from '../LoadingPage/';

export default class StepWise extends Component{
  constructor(props){

    super(props);

    this.state = {
      activeView: 0,
      loading: false,
      done: [],
      max: 0,
    }

    this._handleBackClick = this._handleBackClick.bind(this);
    this._handleForwardClick = this._handleForwardClick.bind(this);
    this._handleMoveTo = this._handleMoveTo.bind(this)
    this._handleDone = this._handleDone.bind(this)
    this._setLoading = this._setLoading.bind(this)
    this._setMax = this._setMax.bind(this)
     
  }

  render(){
    const { active, render} = this.props;
    const {loading, activeView, done, max} = this.state;

    const moveTo = this._handleMoveTo;
    const goBack = this._handleBackClick;
    const markAsDone = this._handleDone;
    const setMax = this._setMax;

    let children;
    if(render){
      children = render({activeView, moveTo, goBack, loading, done, markAsDone})
    }else{
      children = React.Children.map(this.props.children, (child, index)=>(
        React.cloneElement(child, {
          key: 'wiz-el' + index,
          activeView,
          moveTo,
          goBack,
          loading,
          done,
          setMax,
          markAsDone
        })
      ))
    }

    return (
      <div className='wizard-wrapper' onSubmit={this._handleForwardClick}>
        {children}
        <input type='submit' className='submitTrigger'/>
      </div>
    )
  }
  _setMax(max){
    // To stop moveForward from incrementing activeView beyond the actual number of WizViews available.
    this.setState({
      max
    })
  }
  _handleBackClick(){
    this.setState((curState)=>{
      if (curState.activeView!==0)
      return {
        activeView: curState.activeView-1
      }
      return {
        activeView: curState.activeView
      }
    });
    this.props.onBack && this.props.onBack(this.state.activeStage)
  }
  _handleForwardClick(view, e){
    e.preventDefault();
    this._handleMoveTo(this.state.activeView + 1)
  }
  _handleMoveTo(activeView){
    this.setState(cur=>{
      const nowActive = !this.props.render
                        ? activeView <= cur.max 
                          ? activeView
                          : cur.max
                        : activeView;
      return {activeView: nowActive}
    }); 
  }
  _handleDone(index){
    this.setState(cur=>{
      const done = [].fill(false, 0, index).map((d, i)=>i===index ? true :cur.done[i])
      return{done}
    })
  }
  _setLoading(loading){
    this.setState({loading})
  }
}