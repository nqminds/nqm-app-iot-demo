import React from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerCluster from "./marker-cluster";
import ParkingDetails from "./parking-details";

const MK_COORDINATES = [52.0295016, -0.7766588];

const ParkingMap = ({parkingMetadata, data, clickMarker, style, currentParkingID, constants, showDetail, activeDetail}) => {
  const markerComponent = (
    <MarkerCluster
      parkingMetadata={parkingMetadata}
      data={data}
      handleClickMarker={clickMarker}
    />);
  let centreCoordinates = MK_COORDINATES;
  let zoom = 12;
  let content;

  // Add the centre coordinates of the parking space
  // Set the zoom level
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
        <ParkingDetails activeDetail={activeDetail} showDetail={showDetail} />
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

ParkingMap.propTypes = {
  clickMarker: React.PropTypes.func.isRequired,
  currentParkingID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  parkingMetadata: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};

export default ParkingMap;
