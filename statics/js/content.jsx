var React = require('react')
var ReactDOM = require('react-dom')

import Profile from './profile'
import Calendar from './calendar'
import CurrentTrainees from './mytrainees'
import Workouts from './workouts'
import Finder from './finder'
import Settings from './settings'


export default class Content extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }

    render(){
        var display;
        if(this.props.curContent === "My Profile"){
            display = <Profile />;
        }
        else if (this.props.curContent == "My Trainees"){
            var clients = this.props.curUser.clients;
            var token = this.props.curUser.auth_token;
            display = <CurrentTrainees curClients={clients} token={token} pollInterval={6000}/>;
        }
        else if(this.props.curContent == "Calendar"){
            display = <Calendar />;
        }
        else if(this.props.curContent == "Saved Workouts"){
            display = <Workouts />;
        }
        else if(this.props.curContent == "Trainee Nearby"){
            display = <Finder />;
        }
        else{
            display = <Settings />;
        }
        return (
            <div className="content-parent">
                {display}
            </div>
        );
    }
}
