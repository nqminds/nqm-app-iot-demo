import React from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import * as _ from "lodash";
import MarkerCluster from "./marker-cluster";

const MK_COORDINATES = [52.0295016, -0.7766588];

const ParkingMap = ({parkingMetadata, data, clickMarker, style}) => {
  const markerComponent = (
    <MarkerCluster
      parkingMetadata={parkingMetadata}
      data={data}
      handleClickMarker={clickMarker}
    />);

  const map = (
    <Map center={MK_COORDINATES} zoom={12} >
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
  data: React.PropTypes.array.isRequired,
  parkingMetadata: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};

export default ParkingMap;
