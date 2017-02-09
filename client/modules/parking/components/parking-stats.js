import React from "react";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import DatePicker from "material-ui/DatePicker";
import injectSheet from "react-jss";
import * as _ from "lodash";

const styles = {
  containerNoWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    flexFlow: "flex-start",
    alignItems: "flex-start",
  },
  containerWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexFlow: "flex-start",
    alignItems: "flex-start",
  },
};

class ParkingStats extends React.Component {
  constructor(props) {
    super(props);

    this.handleTimePlotButton = this.handleTimePlotButton.bind(this);
    this.handleBarPlotButton = this.handleBarPlotButton.bind(this);
    this.handleFilterDate = this.handleFilterDate.bind(this);
  }

  handleTimePlotButton() {

  }

  handleBarPlotButton() {

  }

  handleFilterDate(event, date) {
    this.props.setFilterDate(date.toString());
  }

  render() {
    const datePicker = (
      <DatePicker
        hintText="Filter date"
        value={new Date(this.props.filterDate)}
        onChange={this.handleFilterDate.bind(this)}
      />);
    const timePlotButton = (
      <FlatButton
        icon={<FontIcon className="material-icons">timeline</FontIcon>}
        primary={true}
        label="Plot"
        labelPosition="before"
        onTouchTap={this.handleTimePlotButton}
      />);
    const barPlotButton = (
      <FlatButton
        icon={<FontIcon className="material-icons">equalizer</FontIcon>}
        primary={true}
        label="Bar"
        labelPosition="before"
        onTouchTap={this.handleBarPlotButton}
      />);
    return (
      <div>
        <div style={styles.containerWrap}>
          {datePicker}
          <div style={styles.containerNoWrap}>
            {timePlotButton}{barPlotButton}
          </div>
        </div>
      </div>
    );
  }
}

ParkingStats.propTypes = {
  currentParkingID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  filterDate: React.PropTypes.string.isRequired,
  setFilterDate: React.PropTypes.func.isRequired,
};

export default injectSheet(styles)(ParkingStats);
