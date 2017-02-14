import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class AirSettings extends React.Component {
  constructor(props) {
    super(props);

    this.handleMoleculePicker = this.handleMoleculePicker.bind(this);
    this.handlePlotPicker = this.handlePlotPicker.bind(this);
  }

  handleMoleculePicker(event, index, value) {
    this.props.setMoleculeType(value);
  }

  handlePlotPicker(event, index, value) {
    this.props.setPlotType(value);
  }

  render() {
    const moleculePicker = (
      <SelectField
        floatingLabelText="Molecule Type"
        value={this.props.moleculeType}
        onChange={this.handleMoleculePicker}
      >
        <MenuItem value={"All"} primaryText="All" />
        <MenuItem value={"NO2"} primaryText="NO2" />
        <MenuItem value={"SO2"} primaryText="SO2" />
        <MenuItem value={"PM10"} primaryText="PM10" />
        <MenuItem value={"PM25"} primaryText="PM25" />
        <MenuItem value={"O3"} primaryText="O3" />
      </SelectField>
    );

    const plotPicker = (
      <SelectField
        floatingLabelText="Plot Type"
        value={this.props.plotType}
        onChange={this.handlePlotPicker}
      >
        <MenuItem value={"Sensors"} primaryText="Sensor Map" />
        <MenuItem value={"Heat"} primaryText="Heat Map" />
      </SelectField>
    );

    return (
      <div>
        {moleculePicker}{plotPicker}
      </div>
    );
  }
}

AirSettings.propTypes = {
  moleculeType: React.PropTypes.string.isRequired,
  plotType: React.PropTypes.string.isRequired,
  setMoleculeType: React.PropTypes.func.isRequired,
  setPlotType: React.PropTypes.func.isRequired,
};

export default AirSettings;
