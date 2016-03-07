var React = require('react');
var ReactDOM = require('react-dom');
import LandingPage from './landingpage'

window.MyApp={
    init: function (data){
        ReactDOM.render(<LandingPage profile_info={data}/>, document.getElementById("landing-page"));
    }
};
