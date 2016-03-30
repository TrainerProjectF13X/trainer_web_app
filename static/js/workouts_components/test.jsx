var React = require('react')
var ReactDOM = require('react-dom')

export default class Workouts extends React.Component {
    constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props);

    }

    componentDidMount() {
        $('.collapsible').collapsible({accordion: false});
        $('.modal-trigger').leanModal();
    }

    render() {
        return (

            <div className="container">
                <h2 className="center light">My Workouts</h2>
                <div className="fixed-action-btn horizontal">

                    <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal1"><i
                        className="material-icons">add</i></a>
                </div>
                <div id="modal1" className="modal">
                    <div className="modal-content container">
                        <h5 className="center">New Routine</h5>
                        <div className="divider"></div>
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="routine_name" type="text" className="validate"/>
                                        <label for="routine_name">Name</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <input className="with-gap" name="group1" type="radio" id="radio1"/>
                                    <label for="radio1">Public</label>
                                    <input className="with-gap" name="group1" type="radio" id="radio1"/>
                                    <label for="radio1">Private</label>
                                </div>
                                <div className="row">
                                    <div className="col s4">
                                        <label>Number <input id="number" type="number" className="validate"/></label>
                                    </div>
                                    <div className="col s8">
                                        <label>Workout
                                            <select className="browser-default" value="">
                                                <option value="" disabled>Choose workouts to add</option>
                                                <option value="1">Option 1</option>
                                                <option value="2">Option 2</option>
                                                <option value="3">Option 3</option>
                                            </select>

                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Add</a>
                        </div>
                    </div>
                </div>
                <br></br>

                <ul className="collapsible white" data-collapsible="expandable">
                    <li>
                        <div className="collapsible-header">
                            <h4>Good. morning, <span className="red-text">abs</span></h4>
                            <h6>LEVEL I <span className="light grey-text"> 3 sets </span>
                                LEVEL II <span className="light grey-text"> 5 sets </span>
                                LEVEL III <span className="light grey-text"> 7 sets </span>
                                REST <span className="light grey-text"> upto 2 minutes </span>
                            </h6>
                        </div>
                        <div className="collapsible-body">
                            <ul className="collection">
                                <li className="collection-item">10 <span
                                    className="light grey-text">high crunches</span></li>
                                <li className="collection-item">10 <span className="light grey-text">leg raises</span>
                                </li>
                                <li className="collection-item">10 <span
                                    className="light grey-text">raised leg circles</span></li>
                                <li className="collection-item">10<span className="light grey-text">-count raised leg hold</span>
                                </li>
                                <li className="collection-item">10 <span
                                    className="light grey-text">flutter kicks</span></li>
                                <li className="collection-item">10 <span className="light grey-text">scissors</span>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="collapsible-header">
                        <div className="chip">abs</div>
                        <div className="chip">morning</div>
                        <div className="chip">daily</div>
                    </li>
                </ul>

                <ul className="collapsible white" data-collapsible="expandable">
                    <li>
                        <div className="collapsible-header">
                            <h4>DAMAGE CONTROL</h4>
                            <h6>LEVEL I <span className="light grey-text"> 3 sets </span>
                                LEVEL II <span className="light grey-text"> 5 sets </span>
                                LEVEL III <span className="light grey-text"> 7 sets </span>
                                REST <span className="light grey-text"> upto 2 minutes </span>
                            </h6>
                        </div>
                        <div className="collapsible-body">
                            <ul className="collection">
                                <li className="collection-item"><h5 className="red-text">3combos</h5></li>
                                <li className="collection-item">10sec <span
                                    className="light grey-text">high knees</span></li>
                                <li className="collection-item">10sec <span
                                    className="light grey-text">march step</span></li>
                                <li className="collection-item"><h5 className="red-text">3combos</h5></li>
                                <li className="collection-item">10sec <span
                                    className="light grey-text">jumping jacks</span></li>
                                <li className="collection-item">10sec <span
                                    className="light grey-text">step jacks</span></li>
                                <li className="collection-item"><h5 className="red-text">3combos</h5></li>
                                <li className="collection-item">10sec <span
                                    className="light grey-text">hops on the spot</span></li>
                                <li className="collection-item">10sec <span className="light grey-text">side-to-side steps</span>
                                </li>
                            </ul>
                        </div>

                    </li>

                    <li className="collapsible-header">
                        <div className="chip">hit</div>
                        <div className="chip">seconds</div>
                        <div className="chip">cardio</div>
                        <div className="chip">combos</div>
                    </li>
                </ul>

                <ul className="collapsible white" data-collapsible="expandable">
                    <li>
                        <div className="collapsible-header">
                            <h4>Hightail</h4>
                            <h6>LEVEL I <span className="light grey-text"> 3 sets </span>
                                LEVEL II <span className="light grey-text"> 5 sets </span>
                                LEVEL III <span className="light grey-text"> 7 sets </span>
                                REST <span className="light grey-text"> upto 2 minutes </span>
                            </h6>
                        </div>
                        <div className="collapsible-body">
                            <ul className="collection">
                                <li className="collection-item">40 <span className="light grey-text">march steps</span>
                                </li>
                                <li className="collection-item">40 <span className="light grey-text">high knees</span>
                                </li>
                                <li className="collection-item">10 <span className="light grey-text">jump squats</span>
                                </li>
                                <li className="collection-item">40 <span className="light grey-text">march steps</span>
                                </li>
                                <li className="collection-item">40 <span className="light grey-text">high knees</span>
                                </li>
                                <li className="collection-item">10 <span
                                    className="light grey-text">jumping lunges</span></li>
                                <li className="collection-item">40 <span className="light grey-text">march steps</span>
                                </li>
                                <li className="collection-item">40 <span className="light grey-text">high knees</span>
                                </li>
                                <li className="collection-item">10 <span
                                    className="light grey-text">jump knee tucks</span></li>
                            </ul>
                        </div>
                    </li>

                    <li className="collapsible-header">
                        <div className="chip">lunge</div>
                        <div className="chip">jump</div>
                    </li>
                </ul>

                <ul className="collapsible white" data-collapsible="expandable">
                    <li>
                        <div className="collapsible-header">
                            <h4>SLAM <span className="red-text">DUNK</span></h4>
                            <h6>LEVEL I <span className="light grey-text"> 3 sets </span>
                                LEVEL II <span className="light grey-text"> 5 sets </span>
                                LEVEL III <span className="light grey-text"> 7 sets </span>
                                REST <span className="light grey-text"> upto 2 minutes </span>
                            </h6>
                        </div>
                        <div className="collapsible-body">
                            <ul className="collection">
                                <li className="collection-item">40 <span className="light grey-text">squats</span></li>
                                <li className="collection-item">10 <span className="light grey-text">calf raises</span>
                                </li>
                                <li className="collection-item">20 <span className="light grey-text">jump squats</span>
                                </li>
                                <li className="collection-item">40 <span className="light grey-text">high knees</span>
                                </li>
                                <li className="collection-item">10 <span className="light grey-text">deep lunges</span>
                                </li>
                                <li className="collection-item">20 <span
                                    className="light grey-text">jumping lunges</span></li>
                            </ul>
                        </div>
                    </li>

                    <li className="collapsible-header">
                        <div className="chip">jump</div>
                        <div className="chip">higher</div>
                        <div className="chip">squats</div>
                        <div className="chip">lunges</div>
                    </li>
                </ul>

            </div>
        );
    }
}