import React from "react";
import {Meteor} from "meteor/meteor";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
// import {StickyContainer, Sticky} from "react-sticky";

import MapDetails from "./map-details";

const LeafletMap = ({style, showDetail, activeDetail, constants}) => {
  const leafletUsername = Meteor.settings.public.mapUsername || "nqmivan.12id4bh0";
  const leafletPassword = Meteor.settings.public.mapPassword ||
    "pk.eyJ1IjoibnFtaXZhbiIsImEiOiJjaXJsendoMHMwMDM3aGtuaGh2bWt5OXRvIn0.6iCk2i96NUucsyDlbnVtiA";
  const url = `https://api.tiles.mapbox.com/v4/${leafletUsername}/{z}/{x}/{y}.png?access_token=${leafletPassword}`;

  const map = (
    <Map center={[54.251186, -4.463196]} zoom={6} >
      <TileLayer
        url={url}
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

  let content;
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
        <MapDetails activeDetail={activeDetail} showDetail={showDetail} />
      </div>
    );
  } else {
    // Use the content style given to us by the layout.
    content = (
      <div style={style}>
        {map}
      </div>
    );
  }

  return content;
};

LeafletMap.propTypes = {
  style: React.PropTypes.object,
};

export default LeafletMap;
