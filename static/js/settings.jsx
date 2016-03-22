var React = require('react')
var ReactDOM = require('react-dom')

export default class Settings extends React.Component {
   constructor(props) {
      super(props);
      this.state = {curUser : this.props.curUser};
   }
   refreshUserInfo(){
      $.ajax
      ({
         type : "GET",
         url : "/api/get_user",
         dataType: 'json',
         async: false,
         success : function( recv_data ){
            this.setState({ curUser : recv_data});
         }.bind(this),
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
   }
   searchableOnChange(){
      $.ajax
      ({
         type : "POST",
         url : "/api/update_searchability",
         dataType: 'text',
         async: false,
         beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'));
         },
         success : function(){

         },
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
      this.refreshUserInfo();
   }
   regularUserSettings(){
      let switchInputSetting = this.state.curUser.is_searchable === true ?
      <input type="checkbox" checked="checked" onChange={this.searchableOnChange.bind(this)} />
      : <input type="checkbox" onChange={this.searchableOnChange.bind(this)} /> ;

      return(
         <div>
            <h5>Searchable</h5>
            <div className="switch">
               <label>
                  Off
                  {switchInputSetting}
                  <span className="lever"></span>
                  On
               </label>
            </div>
         </div>);
   }
   trainerSettings(){
      return(<h3>Trainer Settings</h3>);
   }
   render(){
      let settings = (this.state.curUser.level === "TRAINER" ? this.trainerSettings(): this.regularUserSettings());
      return (
         <div>
            <h1>User settings</h1>
            {settings}
         </div>
      );
   }
}
