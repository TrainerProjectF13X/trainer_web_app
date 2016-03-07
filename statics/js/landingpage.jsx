var React = require('react')
var ReactDOM = require('react-dom')


import Content from './content.jsx'
import SideBarEle from './sidebarele.jsx'

export default class LandingPage extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
      super(props);
      this.state = { curUser : props.profile_info.data,
                    curElement : 0,
                    sideBarContents : (props.profile_info.data.level === "TRAINER") ?
                    ["My Profile", "My Trainees", "Calendar","Saved Workouts", "Trainee Nearby", "Settings"] :
                    ["My Profile", "Calendar","Saved Workouts", "Settings"]};

    }
    onSideBarClick(index){
        this.setState({curElement : index});
    }
    render(){
        var sideBarEle = this.state.sideBarContents.map(function(ele, i){
            var boundClick = this.onSideBarClick.bind(this,i);
            return(<SideBarEle text={ele} onClick={boundClick} curElement={this.state.curElement} key={i} eleIndex ={i}/>);
        },this);
        var contentDisplay = <Content curContent={this.state.sideBarContents[this.state.curElement]} curUser={this.state.curUser}/>
        return (
            <div>
                <div className="side-bar-parent">
                    {sideBarEle}
                </div>
                <div className="content-panel-parent">
                    {contentDisplay}
                </div>
            </div>
        );
    }
}

//ReactDOM.render(<Hello />, document.getElementById('container'));
/*
var backgrounds = this.props.image_paths.map(function(image_path, i) {
  var divStyle = {backgroundImage: 'url(' + image_path + ')'};
  return(
    <div className = "ImageWrapper" key={i} style={divStyle}> &nbsp;
      <InfoBoxText id_num={i} pages={this.props.image_paths.length} />
    </div>
  )
},this);
var navbar = this.props.nav_elements.map(function(nav_ele, i) {
  return <Navbar data={nav_ele} key={i}  />;
},this);

<div>
    <SideBar />
</div>
<div>
    {cur_page}
</div>


if(this.props.profile_info.data.level === "TRAINER"){
    this.state = { sideBarContents : ["My Profile", "My Trainees", "Calendar","Save Workouts", "Trainee Nearby", "Settings"] };
}
else{
    this.state = { sideBarContents : ["My Profile", "Calendar","Save Workouts", "Trainee Nearby", "Settings"]};
}

*/
