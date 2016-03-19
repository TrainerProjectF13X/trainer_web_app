var React = require('react')
var ReactDOM = require('react-dom')

export default class Profile extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }

    render(){
        var level = this.props.profile_info.level
        var profile_pic = <img src="" alt="Profile Pic"></img>
        var profile = <p>{this.props.profile_info.profile}this is supposed to be profile</p>
        if(level === "TRAINER"){
            var pastExperience = <p>{this.props.profile_info.past_experience} this is supposed to be past experience</p>
            return (

                <div>
                    {profile_pic}
                    {profile}
                    {pastExperience}
                </div>
            );
        }
        else{
            var goal = <p>{this.props.profile_info.goal} this is supposed to be goal</p>
            return (
                <div>
                    {profile_pic}
                    {profile}
                    {goal}
                </div>
            );
        }


    }
}
