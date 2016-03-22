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
            <div key={i} >
               <ProfileCard user={ele} eleIndex ={i} searchUserLevel={this.props.searchUserLevel}/>
               <button className="btn waves-effect waves-light" type="submit"
                  name="action" onClick={boundClick} >Add
                  <i className="material-icons">add</i>
               </button>
            </div>);
      },this);
      return (
         <div>
            <h1>Search Results</h1>
            {content}
         </div>
      );
   }
}
