var React = require('react')
var ReactDOM = require('react-dom')

export default class Settings extends React.Component {
   constructor(props) {
      super(props);
      this.state = {curUser : this.props.curUser};
   }
   searchableOnChange(){
      tempUser = this.state.curUser;
      tempUser.is_searchable = false
      this.setState({curUser : tempUser});
   }
   regularUserSettings(){
      var switchInputSetting = this.state.curUser.is_searchable === true ?
         <input type="checkbox" checked="checked" onChange={this.searchableOnChange.bind(this)} />  :
         <input type="checkbox" onChange={this.searchableOnChange.bind(this)} /> ;

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
      console.log(this.state.curUser);
      var settings = this.state.curUser.level === "Trainer" ? this.trainerSettings(): this.regularUserSettings();
      console.log(settings);
      return (
         <div>
            <h1>User settings</h1>
            {settings}
         </div>
      );
   }
}
