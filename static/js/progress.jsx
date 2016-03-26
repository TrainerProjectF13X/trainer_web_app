var React = require('react')
var ReactDOM = require('react-dom')

export default class Progress extends React.Component {
    constructor(props) {
      super(props);

    }

    render(){
        return (
            <div className="container">
                <h2 className="center light">Progress</h2>

                    <div className="valign-wrapper">
                      <p className="valign grey-text center">There is no progress. Sad.</p>
                    </div>
            </div>

        );
    }
}
