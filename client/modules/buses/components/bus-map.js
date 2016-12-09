import React from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import * as _ from "lodash";
const MK_COORDINATES = [52.0295016, -0.7766588];

// Create your own class, extending from the Marker class.
class ExtendedMarker extends Marker {
  constructor() {
    super();
  }

	// "Hijack" the component lifecycle.
  componentDidMount() {
    // Call the Marker class componentDidMount (to make sure everything behaves as normal)
    super.componentDidMount();

    // Access the marker element and open the popup.
    if (this.props.open)
      this.leafletElement.openPopup();
  }
}

ExtendedMarker.propTypes = {
  open: React.PropTypes.bool.isRequired,
};

const BusMap = ({busMetadata, data, currentBusID, style}) => {
  let center = MK_COORDINATES;
  let open;

  const listMarker = _.map(data, (val) => {
    if (currentBusID === val.ID) {
      center = [val.lat, val.lon];
      open = true;
    } else
      open = false;

    return (
      <ExtendedMarker
        open={open}
        key={val.ID}
        position={[val.lat, val.lon]}
        clickable="true"
        title={busMetadata[val.ID].Title}
        draggable="false"
      >
        <Popup>
          <span>{busMetadata[val.ID].Title}</span>
        </Popup>
      </ExtendedMarker>);
  });

  const map = (
    <Map center={center} zoom={12} >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> \
        contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery © <a href="http://mapbox.com">Mapbox</a>'
      />
      {listMarker}
    </Map>
  );

  return (
    <div style={style}>
      {map}
    </div>);
};

BusMap.propTypes = {
  busMetadata: React.PropTypes.object.isRequired,
  currentBusID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};

export default BusMap;
