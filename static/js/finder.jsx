var React = require('react')
var ReactDOM = require('react-dom')

import SearchBar from './searchbar'

export default class Finder extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);
      this.state ={searchResultData : []};
   }
   searchForUser(searchString){
      
   }
   render(){
      return (
         <div>
            <SearchBar onUserInput={this.searchForUser.bind(this)} />
         </div>
      );
    }
}
