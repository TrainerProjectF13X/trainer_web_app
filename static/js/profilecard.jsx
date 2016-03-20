var React = require('react')
var ReactDOM = require('react-dom')

export default class ProfileCard extends React.Component {
    constructor(props) {
      super(props);

    }

    render(){
      var curUser = this.props.user;
      console.log(curUser);
      return (
         <div>
            <img src={curUser.profile_pic} alt="Temp pic" height="42" width="42"/>
            <p>{curUser.user.username}</p>
            <p>{curUser.user.email}</p>
            <p>Goals: {curUser.goal}</p>
         </div>
      );
    }
}
