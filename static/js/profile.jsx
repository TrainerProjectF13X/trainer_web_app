var React = require('react')
var ReactDOM = require('react-dom')
require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');
require('materialize-css/js/init.js');

export default class Profile extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }

    render(){
        let level = this.props.profile_info.level
        let profile_pic = <img className="profile_image" src="http://www.fmantra.in/upload/tips/default-prof.png" alt="Profile Pic"></img>
        let profile = <p>{this.props.profile_info.profile}this is supposed to be profile</p>
        if(level === "TRAINER"){
            let pastExperience = <p>{this.props.profile_info.past_experience} this is supposed to be past experience</p>
            return (
		<div className="container center">
                <div className="section">
                    {profile_pic}
                    <h3>{profile}</h3>
                    <h4>{pastExperience}</h4>
                </div>
		</div>
            );
        }
        else{
            let goal = <p>{this.props.profile_info.goal} this is supposed to be goal</p>
            return (
		<div className="container center">
                <div className="section">
                    {profile_pic}
                    {profile}
                    {goal}
                </div>
		</div>
            );
        }


    }
}
