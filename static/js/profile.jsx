var React = require('react')
var ReactDOM = require('react-dom')

import profile_default from '../img/profile_default.png';

export default class Profile extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

   }

   render(){
      let level = this.props.profile_info.level
      let profile_pic = <img className="profile_image responsive-img z-depth-2" src={profile_default} alt="Profile Pic"></img>
      let profile = <p>{this.props.profile_info.profile} This is my profile information. I am very interesting. I like to workout.</p>
      if(level === "TRAINER"){
         let pastExperience = <p>{this.props.profile_info.past_experience}: I have much experience in working out because I workout a lot</p>
         return (
            <div className="profile_container">
                <h2 className="light center">My Profile</h2>
            <div className="center profile_main">
               <div className="container section">
                   <div className="row">
                       <div className="col s12 m6 l6">{profile_pic}</div>
                      <div className="left-align valign-wrapper col s12 m6 l6">
                          <div className="valign">
                              <h5>Test Trainer</h5>
                              <p className="light grey-text">trainer@test.test</p>
                              <p>{profile}</p>
                              <p>{pastExperience}</p>
                          </div>
                      </div>
                  </div>
               </div>
            </div>
        </div>
         );
      }
      else{
         let goal = <p>{this.props.profile_info.goal}: My goal is to workout. I like working out. So it would be good to workout.</p>
         return (
             <div className="profile_container">
                 <h2 className="light center">My Profile</h2>
             <div className="center profile_main">
                <div className="container section">
                    <div className="row">
                        <div className="col s12 m6 l6">{profile_pic}</div>
                       <div className="left-align valign-wrapper col s12 m6 l6">
                           <div className="valign">
                               <h5>Test Trainee</h5>
                               <p className="light grey-text">trainee@test.test</p>
                               <p>{profile}</p>
                               <p>{goal}</p>
                           </div>
                       </div>
                   </div>
                </div>
             </div>
         </div>
         );
      }
   }
}
