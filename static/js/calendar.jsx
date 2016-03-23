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

      var clndr = {};
      $( function() {
          var currentMonth = moment().format('YYYY-MM');
             var nextMonth    = moment().add('month', 1).format('YYYY-MM');

             var events = [
               { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
               { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
               { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
               { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
             ];

             clndr = $('#full-clndr').clndr({
               template: $('#full-clndr-template').html(),
               events: events,
               forceSixRows: true
             });
      });
   }
   render(){
       var el_daysOfTheWeek = function(ele, i){
           return(
               _.each(daysOfTheWeek, function(day) {
                   <div class="header-day">{day}</div>
               });
            );
       };

       var el_days =  function(ele, i){
          return(
             _.each(days, function(day) {
               <div class={day.classes} id={day.id}><span class="day-number">{day.day}</span></div>
              });
         );
       };

       var el_eventsThisMonth =  function(ele, i){
          return(
             _.each(eventsThisMonth, function(event) {
                   <div class="event-item">
                     <div class="event-item-name">{event.title}</div>
                     <div class="event-item-location">{event.location}</div>
                   </div>
            });
         );
       };

    return (
         <div className="container">
            <h2 className="center light">Calendar</h2>
            <div className="parent-element white card-panel"></div>

            <div id="full-clndr" class="clearfix">
            <script type="text/template" id="full-clndr-template">
            <div class="clndr-controls">
                <div class="clndr-previous-button"> < </div>
                <div class="clndr-next-button"> > </div>
                <div class="current-month">{month} {year}</div>
            </div>
            <div class="clndr-grid">
                <div class="days-of-the-week clearfix">{el_daysOfTheWeek}</div>
                <div class="days">{el_days}</div>
            </div>
            <div class="event-listing">
                <div class="event-listing-title">EVENTS THIS MONTH</div>
                {el_eventsThisMonth}
            </div>
            </script>
            </div>
         </div>
      );
   }
}
