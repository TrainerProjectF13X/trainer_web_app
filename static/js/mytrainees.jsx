var React = require('react')
var ReactDOM = require('react-dom')

import ProfileCard from './profilecard.jsx'

export default class CurrentTrainees extends React.Component {
   constructor(props) {
      super(props);
      this.state = {curClients: this.props.curClients};
   }
   componentDidMount(){
      this.updateClients();
      this.internval = setInterval(this.updateClients.bind(this), this.props.pollInterval);
   }
   componentWillUnmount(){
      clearInterval(this.internval);
   }
   updateClients()
   {
      /*headers: {"Authorization" : "Token " + this.state.token},*/
      $.ajax
      ({
         type : "GET",
         url : "/api/get_trainees",
         dataType: 'json',
         success : function( recv_data ){
            this.setState({curClients: recv_data.clients});
         }.bind(this),
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
   }
   render(){
      let clients = this.state.curClients.map(function (ele, i) {
         return (
             <div className="col s12 m6 l4" key={i}>
                 <div className="card">
                     <ProfileCard user={ele} searchUserLevel="TRAINER"  eleIndex={i}/>
                </div>
            </div>
        );
      }, this);
      return (
         <div className="container">
            <h2 className="center light">Current Trainees</h2>
            <div className="row">
            {clients}
            </div>
         </div>
      );
   }
}
