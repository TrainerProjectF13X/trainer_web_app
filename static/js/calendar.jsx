var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('underscore');
var clndr = require('clndr')
var moment = require('moment')

export default class Calendar extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

   }
   componentDidMount(){
      $('.parent-element').clndr();

   }
   render(){


    return (
         <div className="container">
            <h2 className="center light">Calendar</h2>
            <div className="parent-element white card-panel"></div>
         </div>
      );
   }
}
