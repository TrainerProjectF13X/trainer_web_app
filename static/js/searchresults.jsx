var React = require('react')
var ReactDOM = require('react-dom')

import ProfileCard from './profilecard'

export default class SearchResults extends React.Component {
   constructor(props) {
      super(props);
   }
   addPotentialClient = (userName) =>{
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
            let removeVar = "#" + userName+"_card";
            $(removeVar).fadeOut(750, function(){
               $(this).remove();
            });
         }.bind(this),
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
   }
   render(){
      console.log(this.props.searchResult);
      let content =  this.props.searchResult.map((ele, i) => {
         let card_id = ele.user.username + "_card";
         return(
            <div className="col s12 m6 l4" key={i} id={card_id}>
               <div className="card hoverable">
                  <ProfileCard user={ele} eleIndex ={i} searchUserLevel={this.props.searchUserLevel}/>
                  <div className="card-action">
                     <button className="btn waves-effect waves-light orange"
                             type="submit" name="action" onClick={ () => {this.addPotentialClient(ele.user.username)} } >
                        Add<i className="material-icons right">add</i>
                     </button>
               </div>
            </div>
         </div>);
      });
      return (
         <div className="row">
            {content}
         </div>
      );
   }
}
