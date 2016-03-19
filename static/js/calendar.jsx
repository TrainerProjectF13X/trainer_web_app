var React = require('react')
var ReactDOM = require('react-dom')

export default class Calendar extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }

    render(){
        return (
            <h1>Calendar</h1>
        );
    }
}
