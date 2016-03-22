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
      if(this.refs.searchInput.value.length === 0){
         this.props.resetScreen();
         return;
      }
      this.props.onUserInput(this.refs.searchInput.value);
   }
   render(){
      return (
        <div>
            <form>
            <div className="input-field">
              <i className="material-icons prefix">search</i>
              <input id="search" type="text" placeholder="Search for user by email or username"ref="searchInput" value={this.state.value} onChange={this.inputChanged.bind(this)}/>

            </div>
          </form>
        </div>
        );
   }
}
