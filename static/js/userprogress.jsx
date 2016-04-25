var React = require('react')
var ReactDOM = require('react-dom')
var Chartist = require('chartist');

//sketch
var currentWeight = 176;
var goalWeight = 170;
var chartW;
export default class UserProgress extends React.Component {
    constructor(props) {
      super(props);


    }
    componentWillMount(){

    }
    componentDidMount(){
        $('.modal-trigger').leanModal();
        var data = {
  labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
  series: [
    [182, 180, 180, 179, 176, 176]
    //[3, 2, 9, 5, 4, 6],
    //[2, 1, -3, -4, -2, 0]
  ]
};
        $('.current_submit').click(function(){
            currentWeight = Number($("#current").val());
            data.series[0].push(Number(currentWeight));
            console.log($("#current").val());
            console.log(data.series[0]);
            chartW.update();
        });
        $('.goal_submit').click(function(){
            goalWeight = Number($("#goal").val());
            console.log($("#goal").val());
        });



// We are setting a few options for our chart and override the defaults
var options = {
  // Don't draw the line chart points
  showPoint: true,
  // Disable line smoothing
  lineSmooth: false,
  // X-Axis specific configuration
  axisX: {
    // We can disable the grid for this axis
    showGrid: false,
    // and also don't show the label
    showLabel: false
  },
  // Y-Axis specific configuration
  axisY: {
    // Lets offset the chart a bit from the labels
    offset: 40,
    // The label interpolation function enables you to modify the values
    // used for the labels on each axis. Here we are converting the
    // values into million pound.
    labelInterpolationFnc: function(value) {
      return value + 'lbs';
    }
  }
};

// All you need to do is pass your configuration as third parameter to the chart function
chartW = new Chartist.Line('.ct-chart', data, options);
    }
    render(){

        return (
            <div className="container">
                <h2 className="center light">User Progress</h2>
                    <div className="center">
                      <p className="grey-text">Your progress towards your goals</p>
                    </div>
                    <div className="section container">
                        <h5>My Current Workout Regime Progress:</h5><span className="grey-text">0%</span>
                        <div className="progress">
                          <div className="determinate orange" styles="width: 70%"></div>
                        </div>
                        <h5>My Weight Progress:</h5>
                        <span className="grey-text">My Goal Weight is:</span><h5>{goalWeight}</h5>
                        <span className="grey-text">My Current Weight is:</span><h5>{currentWeight}</h5>
                        <div className="ct-chart "></div>
                    </div>

                    <div className="fixed-action-btn horizontal">

                        <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal1"><i
                            className="material-icons">add</i></a>
                    </div>
                    <div id="modal1" className="modal">
                        <div className="modal-content container">
                            <h5 className="center">Update My Progress/Goals</h5>
                            <div className="divider"></div>
                            <div className="row">
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="current" type="number" className="validate"/>
                                            <label htmlFor="current">Current Weight</label>
                                            <a className="waves-effect waves-light btn orange current_submit">Update</a>
                                        </div>
                                        <div className="input-field col s12">
                                            <input id="goal" type="number" className="validate"/>
                                            <label htmlFor="goal">Goal Weight</label>
                                            <a className="waves-effect waves-light btn orange goal_submit">Update</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
