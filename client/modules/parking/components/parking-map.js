import React from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerCluster from "./marker-cluster";

const MK_COORDINATES = [52.0295016, -0.7766588];

const ParkingMap = ({parkingMetadata, data, clickMarker, style, currentParkingID}) => {
  const markerComponent = (
    <MarkerCluster
      parkingMetadata={parkingMetadata}
      data={data}
      handleClickMarker={clickMarker}
    />);
  let centreCoordinates = MK_COORDINATES;
  let zoom = 12;

  // Add the centre coordinates of the parking space
  if (currentParkingID) {
    zoom = 18;
    centreCoordinates = [parkingMetadata[currentParkingID].Latitude, parkingMetadata[currentParkingID].Longitude];
  }

  const map = (
    <Map center={centreCoordinates} zoom={zoom} >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> \
        contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery © <a href="http://mapbox.com">Mapbox</a>'
      />
      {markerComponent}
    </Map>
  );

  return (
    <div style={style}>
      {map}
    </div>);
};

ParkingMap.propTypes = {
  clickMarker: React.PropTypes.func.isRequired,
  currentParkingID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  parkingMetadata: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};

export default ParkingMap;
