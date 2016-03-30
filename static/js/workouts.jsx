var React = require('react')
var ReactDOM = require('react-dom')
import Workout from './workouts_components/workout.jsx'
export default class Workouts extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props);

        this.getWorkouts();
    }

    componentDidMount() {
        $('.collapsible').collapsible({ accordion : false });
        $('.modal-trigger').leanModal();
    }

    componentWillUnmount() {
        clearInterval(this.internval);
    }

    getWorkouts() {

        $.ajax
        ({
            type: "GET",
            url: "/workout_api/get_userwithworkouts",
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log("workout data", data.workouts);
                this.state = {
                    workouts: data.workouts
                };
                //  console.log("State after initial" , this.state.workouts);

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    updateWorkouts() {
        /*headers: {"Authorization" : "Token " + this.state.token},*/
        $.ajax
        ({
            type: "GET",
            url: "/workout_api/get_userwithworkouts",
            dataType: 'json',
            success: function (data) {
                this.setState({workouts: data.workouts});

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {


        let saved_workouts = this.state.workouts.map(function (ele, i) {
            //console.log("activities in parent",ele.activities)
            return (

                <div className="each child" key={i}>
                    <ul className="collapsible white" data-collapsible="expandable">
                        <li>
                            <div className="collapsible-header">
                                <h4>{ele.overview} <span className="red-text">abs</span></h4>
                                <h6>LEVEL I <span className="light grey-text"> 3 sets </span>
                                    LEVEL II <span className="light grey-text"> 5 sets </span>
                                    LEVEL III <span className="light grey-text"> 7 sets </span>
                                    REST <span className="light grey-text"> upto 2 minutes </span>
                                </h6>
                            </div>
                            <div className="individual_workout">
                                <Workout activities={ele.activities} eleIndex={i}/>
                            </div>
                        </li>

                        <li className="collapsible-header">
                            <div className="chip">a5bs</div>
                            <div className="chip">morning</div>
                            <div className="chip">daily</div>
                        </li>
                    </ul>
                </div>
            )
        }, this);
        return (
            <div className="container">
                <h2 className="center light">Saved Workouts</h2>
                    {saved_workouts};

            </div>
        );
    }
}