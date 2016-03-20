var React = require('react')
var ReactDOM = require('react-dom')

export default class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value : "" };
    }
    inputChanged(){
      this.setState({value : this.refs.searchInput.value});
      /*Set state does not actually guarentee an update will occur*/
      this.props.onUserInput(this.refs.searchInput.value);
   }
   render(){
      return (
           <input type="text" ref="searchInput"  value={this.state.value} onChange={this.inputChanged.bind(this)} />
        );
    }
}
