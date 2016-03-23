var React = require('react')
var ReactDOM = require('react-dom')

export default class UserProgress extends React.Component {
    constructor(props) {
      super(props);

    }

    render(){
        return (
            <div className="container">
                <h2 className="center light">User Progress</h2>

                    <div className="valign-wrapper">
                      <p className="valign grey-text center">You have made no progress. Sad.</p>
                    </div>
            </div>
        );
    }
}
