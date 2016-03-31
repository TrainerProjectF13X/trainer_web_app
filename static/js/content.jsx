/*
This is our routing page that is used in order to deliver the user to the
correct sub-page that they wish to go to. It is in charge of handling those
clicks that come from the side bar.
*/


var React = require('react')
var ReactDOM = require('react-dom')

import Profile from './profile'
import Calendar from './calendar'
import CurrentTrainees from './mytrainees'
import Workouts from './workouts'
import Finder from './finder'
import Settings from './settings'
import UserProgress from './userprogress'

export default class Content extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);


   }


   render(){
      var display;
      if(this.props.curContent === "My Profile"){
         display = <Profile profile_info={this.props.curUser}/>;
      }
      else if (this.props.curContent === "My Trainees"){
         var clients = this.props.curUser.clients;
         display = <CurrentTrainees curClients={clients} pollInterval={4000}/>;
      }
      else if(this.props.curContent === "Calendar"){
         display = <Calendar />;
      }
      else if(this.props.curContent === "Saved Workouts"){
         display = <Workouts  />;
      }
      else if(this.props.curContent === "Trainees Nearby" || this.props.curContent === "Trainers Nearby"){
         display = <Finder userLevel={this.props.curUser.level} />;
      }
      else if(this.props.curContent === "Progress"){
         display = <UserProgress />;
      }
      else{
         display = <Settings curUser={this.props.curUser} />;
      }
      return (
         <div className="content-parent">
            {display}
         </div>
      );
   }
}
