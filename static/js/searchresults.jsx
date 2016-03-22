var React = require('react')
var ReactDOM = require('react-dom')

import ProfileCard from './profilecard'

export default class SearchResults extends React.Component {
   constructor(props) {
      super(props);

   }

   render(){
      console.log(this.props.results);
      var content =  this.props.results.map(function(ele, i){
         return(<ProfileCard user={ele} key={i} eleIndex ={i} userLevel={this.props.userLevel}/>);
      },this);
      return (
         <div>
            <h1>Search Results</h1>
            {content}
         </div>
      );
   }
}
