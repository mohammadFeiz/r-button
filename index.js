import React,{Component,Fragment,createRef,createContext} from 'react'; 
import $ from 'jquery'
const dpContext = createContext();
class DropableButton extends Component {
    constructor(props){
      super(props);
      this.state = {
          opened:this.props.opened || false
      }
      this.dom = createRef();
    }
    close(){
      this.setState({opened:false});
    }
    open(){
      this.setState({opened:true});
    }
    getClassName(className){
      var {text = '',disabled = false} = this.props;
      return `r-button${disabled?' disabled':''}${text === ''?' r-button-icon':''}${className?' ' + className:''}`;
    }
    getValue(value){
      if(typeof value === 'function'){return value(this.props);}
      return value;
    }
    mouseDown(e){
      if(!$(e.target).hasClass('r-button') && !$(e.target).hasClass('main-icon')){return;}
      var {items,callback = function(){},type = 'list'} = this.props;
      if(type === 'filter' || type === 'sort'){
        this.open();
      }
      else{
        if(items&&items.length > 0){this.open();}
        else{callback(this.props);}
      }
      
    }
    componentDidMount(){
      var dom = $(this.dom.current);
      var position = dom.css('position');
      position = position === 'static'?'relative':position;
      dom.css('position',position);
    }
    render(){
        var {disabled,iconClass,style,items = [],type = 'list',text = '',rtl=false,className} = this.props;
        var {opened} = this.state;
        var contextValue = {...this.props};
        contextValue.close = this.close.bind(this);
        var props = {
          className:this.getClassName(this.getValue(className)),
          style:$.extend({},{
            direction:rtl?'rtl':'ltr',
          },this.getValue(style)),
          ref:this.dom,disabled
        }
        
          
        return (
          <dpContext.Provider value={contextValue}>
            <button {...props}
              onMouseDown={this.mouseDown.bind(this)} 
              disabled={disabled}
            >
              {iconClass && <div className={'icon main-icon ' + this.getValue(iconClass)}></div>}
              {text}
              {type === 'list' && opened && items.length > 0 && <Popup />}
              {type === 'filter' && opened && <Popup />}
              {type === 'sort' && opened && <Popup />}
            </button>
          </dpContext.Provider>
        );
    }    
}
class Popup extends Component{
  static contextType = dpContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  update(){
    var {rtl} = this.context;
    var popup = $(this.dom.current);
    var popupWidth = popup.width();
    var bodyWidth = window.innerWidth;
    var popupLeft = popup.offset().left;
    var popupRight = popupLeft + popupWidth;
    if(rtl && popupLeft < 0){
      popup.css('right',popupLeft - 2);
    }
    else if(!rtl && popupRight > bodyWidth){
      popup.css('left', bodyWidth - popupRight - 2);
    }
  }
  componentDidMount(){
    this.update();
  }
  componentDidUpdate(){
    this.update();
  }
  getStyle(style){
    var {rtl} = this.context;
    return $.extend({},{
      position: 'absolute',
      zIndex:1000,
      top:'100%',
      direction:rtl?'rtl':'ltr',
      [rtl?'right':'left']:0,
    },style);
  }
  getBackDropStyle(){
    return {
      height:'100%',width:'100%',right:0,top:0,position:'fixed'
    }
  }
  render(){
    var {close,popupStyle = {}} = this.context;
    return(
      <div className="r-button-popup" ref={this.dom} style={this.getStyle(popupStyle)}>
        <div className='back-drop' onMouseDown={close} style={this.getBackDropStyle()}></div> 
        <ForDrop />
      </div>
    );
  }
}

class ForDrop extends Component{
  static contextType = dpContext;
  add(){
    var {items,onchange,operators,targets,value,type} = this.context;
    var obj = {[operators.field]:operators.default,[targets.field]:targets.default};
    if(type === 'filter'){obj[value.field] = '';}
    items.push(obj);
    onchange(items,this.context);
  }
  render(){
    var {items,type,addText,rtl} = this.context;
    var selective = type === 'filter' || type === 'sort';
    const Items = items.map((item, i)=>{
      var props = {key:i,item,index:i};
      if(selective){
        return (
          <SelectiveItem {...props}/>
        )
      }
      else{
        return (
          <Fragment key={i}><ListItem {...props}/><br /></Fragment>
        )
      }
    })
    return(
      <div className="for-drop">
            {Items}
            {
              selective && 
                <div key={346546334}onMouseDown={this.add.bind(this)} style={{margin:'0 27px',padding:'0 12px',color:'#fff',background:'blue',borderRadius:'4px',fontSize:'12px',float:rtl?'right':'left',height:'24px',lineHeight:'24px',cursor:'pointer'}}>{addText}</div>
              
            }
      </div>
    );
  }
}

class ListItem extends Component{
  static contextType = dpContext;
  mouseDown(){
    var {item} = this.props;
    var {close,callback} = this.context;
    if(item.disabled){return;}
    if(item.callback){item.callback(item,this.context);}
    else if(callback){callback(item,this.context);} 
    if(item.close !== false){close();}
  }
  render(){
    var {item} = this.props;
    var {checkIconClass,checkable,rtl} = this.context;
    var {callback:itemCallback,iconClass,disabled} = item;
    var Item = (
      <div
        onClick={itemCallback} 
        className={'list-item' + (disabled?' disabled':'')} 
        onMouseDown={this.mouseDown.bind(this)}
        style={{
          cursor:disabled?'not-allowed':'pointer',
          
          textAlign:rtl?'right':'left',
          float:'left',
        }}
      >
        {checkable &&<div className={'icon ' + checkIconClass} style={{opacity:item.checked?1:0}}></div>}
        {item.iconClass && <div className={'icon ' + iconClass}></div>}
        {item.text}
      </div>
    );
    return(
      <Fragment>
      {
        item.splitter &&
        <div className='splitter'>{item.splitter}</div>
      }
      {Item}
      </Fragment>
    );
  }
}

class SelectiveItem extends Component{
  static contextType = dpContext;
  constructor(props){
    super(props);
    this.state = {
      filterText:''
    }
  }
  
  getIconStyle(){
    var {rtl} = this.context;
    var {disabled} = this.props.item;
    return {
      height:'24px',
      width:'24px',
      color:disabled?'#ccc':undefined,
      lineHeight:'24px',
      float:rtl?'right':'left',
      textAlign:'center',
      cursor:disabled?'not-allowed':'pointer'
    }
  }
  
  change(e,field){
    var {onchange,items} = this.context;
    var {index} = this.props;
    if(items[index].disabled){return;}
    if(field === 'value'){
      var value = e.target.value;
      items[index][field] = value;
      this.setState({filtertext:value})
      clearTimeout(this.timeout);
      this.timeout = setTimeout(()=>{onchange(items,this.context);},800);
    }
    else if(field){
      items[index][field] = e.target.value;
      onchange(items,this.context);
    }
    else{
      items.splice(index,1);
      onchange(items,this.context);
    }
    
  }
  keydown (){
    clearTimeout(this.timer);
  }
  render(){
    var {item} = this.props;
    var {type,operators,targets,value} = this.context;
    return(
      <div className={'selective-item'}>
        <div className='fas fa-times' onMouseDown={(e)=>{this.change(e)}} style={this.getIconStyle()}></div>
            <Select 
              value={item[targets.field]} 
              onchange={(e)=>{this.change(e,targets.field)}} 
              options={targets.items} 
              disabled={item.disabled}
              
            />
            <Select 
              value={item[operators.field]} 
              onchange={(e)=>{this.change(e,operators.field)}} 
              options={operators.items}  
              disabled={item.disabled}
            />
            {type === 'filter' &&
              <input 
                type="text" 
                className="filter-value" 
                onChange={(e)=>{this.change(e,value.field)}} 
                onKeyDown={this.keydown.bind(this)} 
                value={item[value.field]} 
                disabled={item.disabled}
                style={{cursor:item.disabled?'not-allowed':'unset'}}
              />
            }
      </div>
    );
  }
}
class Select extends Component{
  render(){
    var {onchange,options,value,disabled} = this.props;
    return (
      <select disabled={disabled} value={value} onChange={onchange} style={{cursor:disabled?'not-allowed':'pointer'}}>
        {options.map((option,i)=>{return <option value={option.value} key={i}>{option.text}</option>})}
      </select>
    );
  }
}
export default DropableButton;