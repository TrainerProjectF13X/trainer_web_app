var React = require('react');
var ReactDOM = require('react-dom');
require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');
require('materialize-css/js/init.js');

import Content from './content.jsx'
import SideBarEle from './sidebarele.jsx'

require('./materialize/materialize.js')

export default class LandingPage extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);
      this.getUserInfo();
   }

   getUserInfo() {
      $.ajax
      ({
         type: "GET",
         url: "/api/get_user",
         dataType: 'json',
         async: false,
         success: function (recv_data) {
            this.state = {
               curUser: recv_data,
               curElement: 0,
               sideBarContents: (recv_data.level === "TRAINER") ?
               ["My Profile", "My Trainees", "Calendar", "Saved Workouts", "Trainee Nearby", "Settings"] :
               ["My Profile", "Calendar", "Saved Workouts", "Progress", "Settings"]
            };
         }.bind(this),
         error: function (xhr, status, err) {
            console.error(status, err.toString());
         }.bind(this)

      });
   }
   onSideBarClick(index){
      this.setState({curElement : index});
      this.refreshUserInfo();
   }
   componentDidMount(){
      $(".button-collapse").sideNav();
   }
   render(){
      let sideBarEle = this.state.sideBarContents.map(function(ele, i){
         let boundClick = this.onSideBarClick.bind(this,i);
         return(<SideBarEle text={ele} onClick={boundClick} curElement={this.state.curElement} key={i} eleIndex ={i}/>);
      },this);
      let contentDisplay = <Content curContent={this.state.sideBarContents[this.state.curElement]} curUser={this.state.curUser}/>
      return (
         <div>
            <div className="navbar-fixed">
               <nav>
                  <div className="nav-wrapper grey darken-4">
                     <a href="#" className="brand-logo right">F13X</a>
                     <a href="#" data-activates="mobile-view" className="button-collapse"><i className="material-icons">menu</i></a>
                     <ul className="side-nav fixed">
                        {sideBarEle}
                        <li><a href="/users/logout_user left">Logout</a></li>
                     </ul>
                     <ul className="side-nav" id="mobile-view">
                        {sideBarEle}
                        <li><a href="/users/logout_user left">Logout</a></li>
                     </ul>
                  </div>
               </nav>
            </div>
            <div className="content-panel-parent">
               <main>
                  <div className="container">
                     <div className="row">
                        {contentDisplay}
                     </div>
                  </div>
               </main>
            </div>
         </div>
      );
   }
}
