import React from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerCluster from "./marker-cluster";
import AirDetails from "../containers/air-details";

const LONDON_COORDINATES = [52.008778, -0.771088];

const AirMap = ({airMetadata, data, clickMarker, style, currentAirID, constants, showDetail, activeDetail}) => {
  const markerComponent = (
    <MarkerCluster
      airMetadata={airMetadata}
      data={data}
      handleClickMarker={clickMarker}
      moleculeType="All"
    />);
  let centreCoordinates = LONDON_COORDINATES;
  let zoom = 12;
  let content;

  // Add the centre coordinates of the air space
  // Set the zoom level
  if (currentAirID) {
    zoom = 18;
    centreCoordinates = [airMetadata[currentAirID].Latitude, airMetadata[currentAirID].Longitude];
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

  if (activeDetail) {
    const detailStyles = {
      content: {
        // In detail mode, only use the left and top layout values, not the positioning (to support scrolling).
        marginLeft: style.left,
        paddingTop: style.top,
      },
      map: {
        // When showing details, set the map height to half the window height
        height: (window.innerHeight - constants.ui.titleBarHeight) / 2,
      },
    };

    content = (
      <div style={detailStyles.content}>
        <div style={detailStyles.map}>
          {map}
        </div>
        <AirDetails activeDetail={activeDetail} showDetail={showDetail} />
      </div>
    );
  } else {
    // Use the content style given to us by the layout.
    content = (
      <div style={style}>
        {map}
      </div>);
  }

  return content;
};

AirMap.propTypes = {
  airMetadata: React.PropTypes.object.isRequired,
  clickMarker: React.PropTypes.func.isRequired,
  currentAirID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

export default AirMap;
