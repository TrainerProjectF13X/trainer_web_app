/*
This is currently our finder class and its associated methods.
*/


var React = require('react')
var ReactDOM = require('react-dom')

import SearchBar from './searchbar'
import SearchResults from './searchresults'

export default class Finder extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);
      this.state ={searchResultData : []};
   }
   clearSearchResultData = () =>{
      this.setState({searchResultData : []});
   }
   searchForUser = (searchString) =>{
      let searchQuery = this.props.userLevel === "TRAINER" ? "TRAINEE": "TRAINEER";
      $.ajax
      ({
         type : "GET",
         url : "/api/find_users",
         dataType: 'json',
         data: {search_for : searchQuery, search_string : searchString},
         success : function( recv_data ){
            this.setState({searchResultData : recv_data});
         }.bind(this),
         error: function(xhr, status, err) {
            console.error( status, err.toString());
         }.bind(this)
      });
   }

   render(){
      let word = this.props.userLevel === "TRAINER" ? "Trainees": "Trainer";
      return (
         <div className="container">
            <h2 className="center light">Search for {word}</h2>
            <SearchBar onUserInput={this.searchForUser}  resetScreen={this.clearSearchResultData} />
            <SearchResults searchResult={this.state.searchResultData} searchUserLevel={this.props.userLevel}/>
         </div>
      );
   }
}
