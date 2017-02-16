import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import injectSheet from "react-jss";
import * as _ from "lodash";
import rd3 from "rd3";

const styles = {
  containerNoWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    flexFlow: "flex-start",
    alignItems: "flex-start",
  },
  containerWrap: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexFlow: "flex-start",
    alignItems: "flex-start",
  },
  plot: {
    margin: 8,
  },
};

class TrafficStats extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterDate = this.handleFilterDate.bind(this);
    this.fitToParentSize = this.fitToParentSize.bind(this);
    this.handleStatsPicker = this.handleStatsPicker.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.fitToParentSize);
    this.fitToParentSize();
  }

  componentWillReceiveProps() {
    this.fitToParentSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.fitToParentSize);
  }

  handleFilterDate(event, date) {
    this.props.setFilterDate(date.toString());
  }

  handleStatsPicker(event, index, value) {
    this.props.setStatsType(value);
  }
 
  fitToParentSize() {
    const elem = ReactDOM.findDOMNode(this);
    const screenSize = {width: elem.parentNode.offsetWidth, height: elem.parentNode.offsetHeight};

    if (!_.isEqual(screenSize, this.props.screenSize))
      this.props.setScreenSize(screenSize);
  }

  render() {
    const datePicker = (
      <DatePicker
        autoOk={true}
        floatingLabelText="Filter date"
        value={new Date(this.props.filterDate)}
        onChange={this.handleFilterDate.bind(this)}
      />);

    const statsPicker = (
      <SelectField
        floatingLabelText="Type"
        value={this.props.statsType}
        onChange={this.handleStatsPicker}
      >
        <MenuItem value={"EntryCongestionLevel"} primaryText="EntryCongestionLevel" />
        <MenuItem value={"ExitCongestionLevel"} primaryText="ExitCongestionLevel" />
        <MenuItem value={"RoundaboutInsideSpeed"} primaryText="RoundaboutInsideSpeed" />
        <MenuItem value={"RoundaboutExitSpeed"} primaryText="RoundaboutExitSpeed" />
        <MenuItem value={"RoundaboutEntrySpeed"} primaryText="RoundaboutEntrySpeed" />
        <MenuItem value={"RoundaboutInside"} primaryText="RoundaboutInside" />
        <MenuItem value={"RoundaboutExit"} primaryText="RoundaboutExit" />
        <MenuItem value={"RoundaboutEntry"} primaryText="RoundaboutEntry" />
      </SelectField>
    );
    const LineChart = rd3.LineChart;
    const lineData = [{name: "Bays", strokeWidth: 3, values: this.props.data}];

    const timeSeries = (
      <LineChart
        legend={false}
        data={lineData}
        width={this.props.screenSize.width}
        height={300}
        margin={10}
        yAxisLabel={this.props.statsType}
        xAxisLabel="Local Time (hour)"
        domain={{x: [], y: []}}
        gridHorizontal={true}
        gridVertical={true}
        interpolationType="basis"
        interpolate={true}
        gridHorizontalStroke={"#000"}
        gridVerticalStrokeDash={"1, 0"}
        xAccessor={(d) => {
          return new Date(d.x);
        }}
        xAxisTickInterval={{unit: "hour", interval: 4}}
        hoverAnimation={false}
        circleRadius={0}
      />
    );

    return (
      <div>
        <div style={styles.containerWrap}>
          {datePicker}{statsPicker}
        </div>
        <div style={styles.plot}>
          {timeSeries}
        </div>
      </div>
    );
  }
}

TrafficStats.propTypes = {
  currentTrafficID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  filterDate: React.PropTypes.string.isRequired,
  screenSize: React.PropTypes.object.isRequired,
  setFilterDate: React.PropTypes.func.isRequired,
  setScreenSize: React.PropTypes.func.isRequired,
  setStatsType: React.PropTypes.func.isRequired,
  statsType: React.PropTypes.string.isRequired,
};

export default injectSheet(styles)(TrafficStats);
