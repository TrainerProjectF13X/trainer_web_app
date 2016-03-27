var React = require('react')
var ReactDOM = require('react-dom')

export default class SideBarEle extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);


    }

    render(){
        var iconArray = {
            "My Profile"        : <i className="material-icons left">face</i>,
            "Calendar"          : <i className="material-icons left">event</i>,
            "Saved Workouts"    : <i className="material-icons left">storage</i>,
            "Progress"          : <i className="material-icons left">equalizer</i>,
            "My Trainees"       : <i className="material-icons left">contacts</i>,
            "Trainees Nearby"   : <i className="material-icons left">near_me</i>,
            "Trainers Nearby"   : <i className="material-icons left">near_me</i>,
            "Settings"          : <i className="material-icons left">settings</i>
        };

        let eleClass = "";
        let eleIcon = "";
        let icon = iconArray[this.props.text];

        if(this.props.eleIndex === this.props.curElement){
            eleClass = "active bold";
        }
        else{
            eleClass = "navbar-ele bold";
        }

        return (
            <li className={eleClass}><a onClick={this.props.onClick}>{icon}{this.props.text}</a></li>
        );
    }
}
