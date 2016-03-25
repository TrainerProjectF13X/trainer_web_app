

var React = require('react')
var ReactDOM = require('react-dom')

export default class Workouts extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }
    componentDidMount(){
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
         url : "/workout_api/get_workouts",
         dataType: 'json',
         success : function( data ){
           console.log("success", data);
         }.bind(this),
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
   }

    render(){
        return (
            <h1>Your Workouts</h1>
        );
    }
}


