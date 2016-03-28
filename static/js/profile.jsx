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

            <footer className="page-footer white z-depth-1">
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
             <footer className="page-footer white z-depth-1">
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
