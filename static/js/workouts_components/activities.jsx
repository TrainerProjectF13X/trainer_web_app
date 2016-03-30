/**
 * Created by SeedZ on 3/29/16.
 */
var React = require('react')
var ReactDOM = require('react-dom')


export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        $('.collapsible').collapsible({accordion: false});
        $('.modal-trigger').leanModal();
    }

    render() {


        let activity = this.props.activity;
        console.log("In activity child", activity.detail);
        return (

            <div >
                <li className="collection-item">10 <span className="light grey-text"> {activity.detail}</span></li>
                <li className="collection-item">10<span className="light grey-text">-count raised leg hold</span></li>
            </div>
        );


    }
}
