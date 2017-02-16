import React from "react";
import ReactDOM from "react-dom";
import {Map, TileLayer} from "react-leaflet";
import MarkerCluster from "./marker-cluster";
import ParkingDetails from "../containers/parking-details";

const MK_COORDINATES = [52.0295016, -0.7766588];

class ParkingMap extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const markerComponent = (
      <MarkerCluster
        parkingMetadata={this.props.parkingMetadata}
        data={this.props.data}
        handleClickMarker={this.props.clickMarker}
      />);
    let centreCoordinates = MK_COORDINATES;
    let zoom = 12;
    let content;

    // Add the centre coordinates of the parking space
    // Set the zoom level
    if (this.props.currentParkingID) {
      zoom = 18;
      centreCoordinates = [this.props.parkingMetadata[this.props.currentParkingID].Latitude, this.props.parkingMetadata[this.props.currentParkingID].Longitude];
    }

    const map = (
      <Map center={centreCoordinates} zoom={zoom} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> \
        contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery © <a href="http://mapbox.com">Mapbox</a>'
        />
        {markerComponent}
      </Map>
    );

    if (this.props.activeDetail) {
      const detailStyles = {
        content: {
        // In detail mode, only use the left and top layout values, not the positioning (to support scrolling).
          marginLeft: this.props.style.left,
          paddingTop: this.props.style.top,
        },
        map: {
        // When showing details, set the map height to half the window height
          height: (window.innerHeight - this.props.constants.ui.titleBarHeight) / 2,
        },
      };

      content = (
        <div style={detailStyles.content}>
          <div style={detailStyles.map}>
            {map}
          </div>
          <ParkingDetails activeDetail={this.props.activeDetail} showDetail={this.props.showDetail} />
        </div>
    );
    } else {
    // Use the content style given to us by the layout.
      content = (
        <div style={this.props.style}>
          {map}
        </div>);
    }

    return content;
  }
}

ParkingMap.propTypes = {
  activeDetail: React.PropTypes.string.isRequired,
  clickMarker: React.PropTypes.func.isRequired,
  constants: React.PropTypes.object.isRequired,
  currentParkingID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  parkingMetadata: React.PropTypes.object.isRequired,
  showDetail: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};

export default ParkingMap;
