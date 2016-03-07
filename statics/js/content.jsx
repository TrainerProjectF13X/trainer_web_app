var React = require('react')
var ReactDOM = require('react-dom')

export default class Content extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);

    }

    render(){
        var display;
        if(this.props.curContent === "My Profile"){

        }
        else if (this.props.curContent == "My Trainees"){

        }
        else if(this.props.curContent == "Calendar"){

        }
        else if(this.props.curContent == "Saved Workouts"){

        }
        else if(this.props.curContent == "Trainee Nearby"){

        }
        else{

        }
        return (
            <div className="content-parent">
                {display}
            </div>
        );
    }
}
/*["My Profile", "My Trainees", "Calendar","Save Workouts", "Trainee Nearby", "Settings"]*/
