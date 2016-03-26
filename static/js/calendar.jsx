var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var clndr = require('clndr');
var moment = require('moment');
var fullCalendar = require('fullCalendar');

export default class Calendar extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

   }
   componenetWillMount(){
   };
   componentDidMount(){
        $('#calendar').fullCalendar({
        // put your options and callbacks here
        })

   }
   render(){
        return (
            <div className="container">
                <h2 className="center light">Calendar</h2>
                <div className="section white">
                    <h4 className="center">Full Calendar</h4>
                    <div id='calendar'></div>
                </div>

            </div>

          );
        }
}
