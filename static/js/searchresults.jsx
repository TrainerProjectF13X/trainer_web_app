var React = require('react')
var ReactDOM = require('react-dom')

import ProfileCard from './profilecard'

export default class SearchResults extends React.Component {
    constructor(props) {
      super(props);

    }

    render(){
      var content =  this.props.results.map(function(ele, i){
          return(<ProfileCard user={ele} key={i} eleIndex ={i}/>);
      },this);
      return (
         <div>
            <h1>Search Results</h1>
            {content}
         </div>
      );
    }
}
