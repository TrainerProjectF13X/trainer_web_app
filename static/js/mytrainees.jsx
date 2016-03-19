var React = require('react')
var ReactDOM = require('react-dom')

export default class CurrentTrainees extends React.Component {
    constructor(props) {
      super(props);
      this.state = {curClients: this.props.curClients,
                    token: this.props.token};

    }
    componentDidMount(){
        this.internval = setInterval(this.updateClients.bind(this), this.props.pollInterval);
    }
    componentWillUnmount(){
        clearInterval(this.internval);
    }
    updateClients()
    {
        $.ajax
        ({
            type : "GET",
            url : "/api/get_trainees",
            dataType: 'json',
            headers: {"Authorization" : "Token " + this.state.token},
            success : function( recv_data ){
                this.setState({curClients: recv_data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error( status, err.toString());
            }.bind(this)
        });
    }
    render(){
        return (
            <h1>Current Trainees</h1>
        );
    }
}
