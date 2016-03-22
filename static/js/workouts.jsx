var React = require('react')
var ReactDOM = require('react-dom')

export default class Workouts extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }

    render(){
        return (
            <h2 className="center">My Workouts</h2>
        );
    }
}
