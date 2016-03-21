var React = require('react')
var ReactDOM = require('react-dom')

export default class ProfileCard extends React.Component {
    constructor(props) {
      super(props);

    }

    render(){
      let curUser = this.props.user;
      let goalsOrExp = this.props.searchUserLevel === "TRAINER" ? <p>Goals: {curUser.goal}</p> :  <p>Exp: {curUser.past_experience}</p>;
      console.log(curUser);
      return (
         <div>
            <img src={curUser.profile_pic} alt="Temp pic" height="42" width="42"/>
            <p>{curUser.user.username}</p>
            <p>{curUser.user.email}</p>
            {goalsOrExp}
         </div>
      );
    }
}
