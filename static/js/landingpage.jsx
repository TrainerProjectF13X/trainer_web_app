var React = require('react');
var ReactDOM = require('react-dom');

import Content from './content.jsx'
import SideBarEle from './sidebarele.jsx'

require('./materialize/materialize.js')

import logo_white from '../img/f13x_logo_white_lg.png';
import logo_black from '../img/f13x_logo_black_lg.png';

export default class LandingPage extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props);
        this.getUserInfo();
    }
    refreshUserInfo(){
        $.ajax
        ({
            type : "GET",
            url : "/api/get_user",
            dataType: 'json',
            success : function( recv_data ){
                this.setState({ curUser : recv_data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error( status, err.toString());
            }.bind(this)
        });
    }
    getUserInfo() {
        $.ajax
        ({
            type: "GET",
            url: "/api/get_user",
            dataType: 'json',
            async: false,
            success: function (recv_data) {
                this.state = {
                    curUser: recv_data,
                    curElement: 0,
                    sideBarContents: (recv_data.level === "TRAINER") ?
                    ["My Profile", "My Trainees", "Calendar", "Saved Workouts", "Trainee Nearby", "Settings"] :
                    ["My Profile", "Calendar", "Saved Workouts", "Progress", "Settings"]
                };
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)

        });
    }
    onSideBarClick(index){
        this.setState({curElement : index});
        this.refreshUserInfo();
    }
    componentDidMount(){
        $(".button-collapse").sideNav();
    }
    render(){
        let sideBarEle = this.state.sideBarContents.map(function(ele, i){
            let boundClick = this.onSideBarClick.bind(this,i);
            return(<SideBarEle text={ele} onClick={boundClick} curElement={this.state.curElement} key={i} eleIndex ={i}/>);
        },this);
        let contentDisplay = <Content curContent={this.state.sideBarContents[this.state.curElement]} curUser={this.state.curUser}/>
        return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper grey darken-4">
                            <a id="logo-container" href="#" className="brand-logo center"><img className="logo_nav landing" src={logo_white}/></a>
                            <a className="right" href="/users/logout_user">LOGOUT</a>
                            <a href="#" data-activates="mobile-view" className="button-collapse"><i className="material-icons">menu</i></a>
                            <ul className="side-nav fixed">
                                <li className="logo"><a id="logo-container" href="#" className="brand-logo">
                                    <object id="front-page-logo" className="logo_sidenav center" type="image/png" data={logo_black}>Your browser does not support SVG</object>
                                </a></li>
                                <div className="divider"></div>
                                {sideBarEle}
                            </ul>
                            <ul className="side-nav" id="mobile-view">
                                {sideBarEle}
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="content-panel-parent">
                    <main>
                        <div className="container">
                            <div className="row">
                                {contentDisplay}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}
