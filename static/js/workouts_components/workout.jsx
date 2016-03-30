/**
 * Created by SeedZ on 3/29/16.
 */
var React = require('react')
var ReactDOM = require('react-dom')

import Activity from "./activities.jsx"
export default class Workout extends React.Component {
    constructor(props) {
        super(props);
        $('.collapsible').collapsible({accordion: false});
        $('.modal-trigger').leanModal();


    }

    componentDidMount() {
     $('.collapsible').collapsible({ accordion : false });
        $('.modal-trigger').leanModal();
    }
    render() {
        let activities = this.props.activities;


        let saved_activities = activities.map(function (act, i) {

            return (
                <div className="logical child" key={i}>
                    <Activity activity={act}/>
                </div>

            )
        }, this);
        return (

            <div className="collapsible-body">
                <ul className="collection">
                    <li className="collection-item">40 <span className="light grey-text">march steps</span>
                    </li>
                    {saved_activities};

                </ul>
            </div>

        );


    }
}
