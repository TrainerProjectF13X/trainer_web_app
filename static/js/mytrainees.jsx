var React = require('react')
var ReactDOM = require('react-dom')

export default class CurrentTrainees extends React.Component {
   constructor(props) {
      super(props);
      this.state = {curClients: this.props.curClients};

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
         return (<ProfileCard  user={ele} searchUserLevel="TRAINER" key={i} eleIndex={i}/>);
      }, this);
      return (
         <div>
            <h1>Current Trainees</h1>
            {clients}
         </div>
      );
   }
}
