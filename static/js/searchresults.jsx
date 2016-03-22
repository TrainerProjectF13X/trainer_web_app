var React = require('react')
var ReactDOM = require('react-dom')

import ProfileCard from './profilecard'

export default class SearchResults extends React.Component {
   constructor(props) {
      super(props);

   }
   addPotentialClient(userName){
      $.ajax
      ({
         type : "POST",
         url : "/api/training_request",
         dataType: 'text',
         data: {'username' : userName},
         beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'));
         },
         success : function(){

         },
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
   }
   render(){
      console.log(this.props.results);
      var content =  this.props.results.map(function(ele, i){
         let boundClick = this.addPotentialClient.bind(this, ele.user.username);
         return(
            <div className="col s12 m6 l4" key={i} >
                <div className="card">
                <ProfileCard user={ele} eleIndex ={i} searchUserLevel={this.props.searchUserLevel}/>
                <div className="card-action">
                <button className="btn waves-effect waves-light orange" type="submit" name="action" onClick={boundClick} >Add<i className="material-icons right">add</i></button>
                </div>
                </div>
            </div>);
      },this);
      return (
         <div className="row">
            {content}
         </div>
      );
   }
}
