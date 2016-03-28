var React = require('react')
var ReactDOM = require('react-dom')

import profile_default from '../img/profile_default.png';

export default class Profile extends React.Component {
   constructor(props) {
      super(props);
      this.state = {sentRequest : [], recievedRequest : []};
      this.getTokenInfo();
   }

   getTokenInfo = () => {
      $.ajax
      ({
         type : "GET",
         url : "/api/get_pending_tokens",
         dataType: 'json',
         success : function(recv_data){
            this.setState({sentRequest : recv_data.sent,
                           recievedRequest : recv_data.recieved});
         }.bind(this),
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
   }

   confirmToken = (tokenId, idName) => {
      $.ajax
      ({
         type : "POST",
         url : "/api/add_client_to_trainer",
         dataType: 'text',
         data: {'token_id' : tokenId},
         beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'));
         },
         success : function(){
            let removeVar = "#" + idName;
            $(removeVar).fadeOut(750, function(){
               $(this).remove();
            });
         }.bind(this),
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });

   }

   render(){
      let level = this.props.profile_info.level;
      let profile_pic = <img className="profile_image responsive-img z-depth-2" src={profile_default} alt="Profile Pic"></img>
      let profile = <p>{this.props.profile_info.profile} This is my profile information. I am very interesting. I like to workout.</p>
      let prog_70 = {width: '70%'};
      let recievedRequestContent = this.state.recievedRequest.map((ele, i) => {
         let userObj = ele.user_account.user;
         let tokenId = ele.id;
         let idName = userObj.username + "_request_" + ele.id;
         return(
                  <div key={i} id={idName}>
                     <p>Request from {userObj.first_name} {userObj.last_name}({userObj.username})</p>
                     <p>
                        <button className="btn waves-effect waves-light green" type="submit" onClick={ () => {this.confirmToken(tokenId, idName)} }> Add </button>
                        {"  "}
                        <button className="btn waves-effect waves-light orange" type="submit"> Reject </button>
                     </p>
                     <button className="btn waves-effect waves-light red" type="submit">Reject and Block</button>
                  </div>
               );
      });
      let sentRequestContent = this.state.sentRequest.map((ele, i) => {
         //onClick={ () => {this.()
         let user_obj = ele.user_account.user;
         return(<p>Awaiting response from {user_obj.first_name} {user_obj.last_name}({user_obj.username})</p>);
      });
      if(level === "TRAINER"){
         let pastExperience = <p>{this.props.profile_info.past_experience}: I have much experience in working out because I workout a lot</p>
         return (
            <div className="profile_container">
                <h2 className="light center">My Profile</h2>
            <div className="center profile_main">
               <div className="container">
                   <div className="row">
                       <div className="col s12 m6 l6">{profile_pic}</div>
                      <div className="left-align valign-wrapper col s12 m6 l6">
                          <div className="valign">
                              <h5>Test Trainer</h5>
                              <p className="light grey-text">trainer@test.test</p>
                              {profile}
                              {pastExperience}
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            <div id="work-collections">
                        <div className="row">
                            <div className="col s12 m12 l6">
                                <ul id="projects-collection" className="collection">
                                    <li className="collection-item avatar">
                                        <i className="mdi-file-folder circle light-blue darken-2"></i>
                                        <span className="collection-header">Projects</span>
                                        <p>Your Favorites</p>
                                        <a href="#" className="secondary-content"><i className="mdi-action-grade"></i></a>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s6">
                                                <p className="collections-title">Web App</p>
                                                <p className="collections-content">AEC Company</p>
                                            </div>
                                            <div className="col s3">
                                                <span className="task-cat cyan">Development</span>
                                            </div>
                                            <div className="col s3">
                                                <div id="project-line-1"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s6">
                                                <p className="collections-title">Mobile App for Social</p>
                                                <p className="collections-content">iSocial App</p>
                                            </div>
                                            <div className="col s3">
                                                <span className="task-cat grey darken-3">UI/UX</span>
                                            </div>
                                            <div className="col s3">
                                                <div id="project-line-2"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s6">
                                                <p className="collections-title">Website</p>
                                                <p className="collections-content">MediTab</p>
                                            </div>
                                            <div className="col s3">
                                                <span className="task-cat teal">Marketing</span>
                                            </div>
                                            <div className="col s3">
                                                <div id="project-line-3"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s6">
                                                <p className="collections-title">AdWord campaign</p>
                                                <p className="collections-content">True Line</p>
                                            </div>
                                            <div className="col s3">
                                                <span className="task-cat green">SEO</span>
                                            </div>
                                            <div className="col s3">
                                                <div id="project-line-4"></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col s12 m12 l6">
                                <ul id="issues-collection" className="collection">
                                    <li className="collection-item avatar">
                                        <i className="mdi-action-bug-report circle red darken-2"></i>
                                        <span className="collection-header">Issues</span>
                                        <p>Assigned to you</p>
                                        <a href="#" className="secondary-content"><i className="mdi-action-grade"></i></a>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s7">
                                                <p className="collections-title"><strong>#102</strong> Home Page</p>
                                                <p className="collections-content">Web Project</p>
                                            </div>
                                            <div className="col s2">
                                                <span className="task-cat pink accent-2">P1</span>
                                            </div>
                                            <div className="col s3">
                                                <div className="progress">
                                                     <div className="determinate" style={prog_70}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s7">
                                                <p className="collections-title"><strong>#108</strong> API Fix</p>
                                                <p className="collections-content">API Project </p>
                                            </div>
                                            <div className="col s2">
                                                <span className="task-cat yellow darken-4">P2</span>
                                            </div>
                                            <div className="col s3">
                                                <div className="progress">
                                                    <div className="determinate" style={{width: '40%'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s7">
                                                <p className="collections-title"><strong>#205</strong> Profile page css</p>
                                                <p className="collections-content">New Project </p>
                                            </div>
                                            <div className="col s2">
                                                <span className="task-cat light-green darken-3">P3</span>
                                            </div>
                                            <div className="col s3">
                                                <div className="progress">
                                                    <div className="determinate" style={{width: '95%'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="collection-item">
                                        <div className="row">
                                            <div className="col s7">
                                                <p className="collections-title"><strong>#188</strong> SAP Changes</p>
                                                <p className="collections-content">SAP Project</p>
                                            </div>
                                            <div className="col s2">
                                                <span className="task-cat pink accent-2">P1</span>
                                            </div>
                                            <div className="col s3">
                                                <div className="progress">
                                                     <div className="determinate" style={{width: '10%'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

            <footer className="page-footer white z-depth-2">
            <div className="section">
               <div className="row container">
                   <div className="col s12 m6">
                       <h4>Request to Train</h4>
                       <p>{recievedRequestContent}</p>
                   </div>
                   <div className="col s12 m6">
                       <h4>Sent Request</h4>
                       <p>{sentRequestContent}</p>
                   </div>
               </div>
            </div>
            </footer>
        </div>
         );
      }
      else{
         let goal = <p>{this.props.profile_info.goal}: My goal is to workout. I like working out. So it would be good to workout.</p>
         return (
             <div className="profile_container">
                 <h2 className="light center">My Profile</h2>
             <div className="center profile_main">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6 l6">{profile_pic}</div>
                       <div className="left-align valign-wrapper col s12 m6 l6">
                           <div className="valign">
                               <h5>Test Trainee</h5>
                               <p className="light grey-text">trainee@test.test</p>
                               {profile}
                               {goal}
                           </div>
                       </div>
                   </div>
                </div>
             </div>
             <footer className="page-footer white z-depth-2">
             <div className="section">
                <div className="row container">
                    <div className="col s12 m6">
                        <h4>Request to Train</h4>
                        <p>{recievedRequestContent}</p>
                    </div>
                    <div className="col s12 m6">
                        <h4>Sent Request</h4>
                        <p>{sentRequestContent}</p>
                    </div>
                </div>
             </div>
         </footer>
         </div>
         );
      }
   }
}
