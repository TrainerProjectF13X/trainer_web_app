var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var clndr = require('clndr');
var moment = require('moment');

export default class Calendar extends React.Component {
   constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

   }
   componenetWillMount(){

   };
   componentDidMount(){
       $('ul.tabs').tabs();

       var currentMonth = moment().format('YYYY-MM');
       var nextMonth    = moment().add(1, 'month').format('YYYY-MM');
       var events = [
         { date: currentMonth + '-' + '10', title: 'Spring Group Workout', location: 'West Hall' },
         { date: currentMonth + '-' + '19', title: 'Private: John Doe', location: 'Main Fitness Room' },
         { date: currentMonth + '-' + '23', title: 'Private: Chris Ogle', location: 'Main Fitness Room' },
         { date: currentMonth + '-' + '30', title: 'Private: Chris Ogle', location: 'Main Fitness Room' },
         { date: nextMonth + '-' + '07',    title: 'Trainers Group', location: 'Meeting Room' }
       ];
       _.templateSettings = {
             escape: /\{\{\-(.+?)\}\}/g,
             evaluate: /\{\{(.+?)\}\}/g,
             interpolate: /\{\{\=(.+?)\}\}/g,
        };

       var myCalendar = $('#full-clndr').clndr({
           template: $('#full-clndr-template').html(),
           events: events,
           forceSixRows: true,
       });

   }
   render(){
       let day_classes = '{{= day.classes }}';
       let day_id = '{{= day.id }}';
        return (
            <div className="Calendar">
                <div className="no_container">
                    <h2 className="center light">Calendar</h2>
                    <div className="section">
                        <div className="row">
                            <div className="col s12 l3 push-l9">
                                <div className="section white card-panel">
                                    <h6>{'Date Range'}</h6>
                                    <div className="row">
                                        <div className="input-field col s6">
                                          <input placeholder="Start" id="start_date" type="text" className="validate"/>
                                        </div>
                                        <div className="input-field col s6">
                                          <input placeholder="End" id="end_date" type="text" className="validate"/>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <h6>Filter</h6>
                                        <p>
                                          <input type="checkbox" className="filled-in checkbox-orange" id="filled-in-box" checked="checked" />
                                          <label for="filled-in-box">Private</label>
                                        </p>
                                        <p>
                                          <input type="checkbox" className="filled-in checkbox-orange" id="filled-in-box" checked="checked" />
                                          <label for="filled-in-box">Group</label>
                                        </p>
                                        <p>
                                          <input type="checkbox" className="filled-in checkbox-orange" id="filled-in-box" checked="checked" />
                                          <label for="filled-in-box">Other</label>
                                        </p>
                                    <div className="divider"></div>
                                    <h6>Event Search</h6>
                                        <div className="row">
                                        <div className="input-field col s12">
                                          <input placeholder="search" id="search" type="text" className="validate"/>
                                        </div>
                                        </div>
                                </div>
                            </div>
                            <div className="col s12 l9 pull-l3">
                                <div id="full-clndr" className="clearfix card-panel"></div>
                            </div>

                        </div>
                    </div>
                </div>


                <script type="text/template" id="full-clndr-template">
                    <div className="clndr-template">
                        <div className="clndr-controls">
              <div className="clndr-previous-button"><i className="material-icons small">keyboard_arrow_left</i></div>
              <div className="clndr-next-button"><i className="material-icons small">keyboard_arrow_right</i></div>
              <div className="current-month"><h6 className="">{'{{= month }}'} {'{{= year }}'}</h6></div>

            </div>
            <div className="clndr-grid">
              <div className="days-of-the-week clearfix">
                {'{{ _.each(daysOfTheWeek, function(day) { }}'}
                  <div className="header-day">{'{{= day }}'}</div>
                {'{{ }); }}'}
              </div>
              <div className="days">
                {'{{ _.each(days, function(day) { }}'}
                  <div className={day_classes} id={day_id}><span className="day-number">{'{{= day.day }}'}</span></div>
                {'{{ }); }}'}
              </div>
            </div>
            <div className="event-listing">
              <div className="event-listing-title">MY SCHEDULE</div>
              <div className="event-container">
             {'{{ _.each(eventsThisMonth, function(event) { }}'}
                  <div className="event-item">
                    <div className="event-item-name">{'{{= event.title }}'}</div>
                    <div className="event-item-date">{'{{= event.date }}'}</div>
                    <div className="event-item-location">{'{{= event.location }}'}</div>
                  </div>
                {'{{ }); }}'}
            </div>
            </div>


                    </div>
                </script>
            </div>
          );
        }
}
