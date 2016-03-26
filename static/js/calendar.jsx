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
     // $('.calendar').clndr();
        var currentMonth = moment().format('YYYY-MM');
        var nextMonth    = moment().add('month', 1).format('YYYY-MM');
        var events = [
          { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
          { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
          { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
          { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
        ];

        $('#mini-clndr').clndr({
          events: events,
          clickEvents: {
            click: function(target) {
              if(target.events.length) {
                var daysContainer = $('#mini-clndr').find('.days-container');
                daysContainer.toggleClass('show-events', true);
                $('#mini-clndr').find('.x-button').click( function() {
                  daysContainer.toggleClass('show-events', false);
                });
              }
            }
          },
          adjacentDaysChangeMonth: true
        });

   }
   render(){
        return (
             <div className="container">
                <h2 className="center light">Calendar</h2>
                <div className="section white">
                    <div id="mini-clndr">
                        <div className="controls">
                            <div className="clndr-previous-button">{'<'}</div>
                            <div className="month">{this.month}</div>
                            <div className="clndr-next-button">{'>'}</div>
                        </div>

                        <div className="days-container">
                            <div className="days">
                                <div className="headers">
                                { _.each(this.daysOfTheWeek, function(day) { return '<div className="day-header">' + day + '</div>' }) }
                                </div>
                                { _.each(this.days, function(day) { return '<div className="'+ day.classes + '" id="' + day.id + '">'+ day.day + '</div>' }) }
                            </div>
                        </div>
                    </div>
                </div>

            </div>

          );
        }
}
