import React from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";


const BusMap = ({busMetadata, data, style}) => {
  const map = (
    <Map center={[54.251186, -4.463196]} zoom={6} >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> \
        contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery © <a href="http://mapbox.com">Mapbox</a>'
      />
      <Marker position={[54.251186, -4.463196]} onClick={() => (showDetail("overview"))}>
        <Popup>
          <span>
            You are here
          </span>
        </Popup>
      </Marker>
    </Map>
  );

  console.log(data);
  return (
    <div style={style}>
      {map}
    </div>);
};

BusMap.propTypes = {
  busMetadata: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

export default BusMap;
