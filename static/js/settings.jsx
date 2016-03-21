var React = require('react')
var ReactDOM = require('react-dom')

export default class Settings extends React.Component {
   constructor(props) {
      super(props);
   }
   regularUserSettings(){
      return(<h3>Regular User Settings</h3>);
   }
   trainerSettings(){
      return(<h3>Trainer Settings</h3>);
   }
   render(){
      var settings = this.props.userLevel === "Trainer" ? this.trainerSettings(): this.regularUserSettings();
      return (
         <h1>User settings</h1>
      );
   }
}
