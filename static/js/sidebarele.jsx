var React = require('react')
var ReactDOM = require('react-dom')

export default class SideBarEle extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }
    render(){
        let eleClass = "";
        if(this.props.eleIndex === this.props.curElement){
            eleClass = "navbar-ele-active";
        }
        else{
            eleClass = "navbar-ele";
        }

        return (
            <li><a className={eleClass} onClick={this.props.onClick}>{this.props.text}</a></li>
        );
    }
}
