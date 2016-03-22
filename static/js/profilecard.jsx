var React = require('react')
var ReactDOM = require('react-dom')


import profile_default from '../img/profile_default.png';

export default class ProfileCard extends React.Component {
    constructor(props) {
      super(props);

    }

    render(){
      let curUser = this.props.user;
      let goalsOrExp = this.props.searchUserLevel === "TRAINER" ? <p>Goals: {curUser.goal}</p> :  <p>Exp: {curUser.past_experience}</p>;
      return (
          <div>
              <div className="card-image">
                  <img src={profile_default}/>
                  <span className="card-title ">{curUser.user.username}</span>
              </div>
              <div className="card-content">
                  <p className="grey-text">{curUser.user.email}</p>
                  <p className="">{goalsOrExp}</p>
              </div>
          </div>
      );
    }
}
