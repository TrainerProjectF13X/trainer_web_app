var React = require('react')
var ReactDOM = require('react-dom')

import SearchBar from './searchbar'
import SearchResults from './searchresults'

export default class Finder extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);
      this.state ={searchResultData : []};
   }
   searchForUser(searchString){
      $.ajax
     ({
          type : "GET",
          url : "/api/find_users",
          dataType: 'json',
          data: {search_for : 'TRAINEE', search_string : searchString},
          success : function( recv_data ){
             this.setState({searchResultData : recv_data});
          }.bind(this),
          error: function(xhr, status, err) {
             console.error( status, err.toString());
          }.bind(this)
     });
   }
   render(){
      return (
         <div>
            <SearchBar onUserInput={this.searchForUser.bind(this)} />
            <SearchResults results={this.searchResultData} />
         </div>
      );
    }
}
