import React from "react";
import {MapLayer} from "react-leaflet";
import "leaflet";
import "leaflet.markercluster";
import "./leaflet-text-icon.js";
import * as _ from "lodash";

class MarkerCluster extends MapLayer {
  constructor(props) {
    super(props);

    this.markers = {};
    this.markerClick = this.markerClick.bind(this);
  }

  componentWillMount() {
    let markers = [];
    const self = this;
    this.leafletElement = L.markerClusterGroup();

    if (!_.isEmpty(this.props.trafficMetadata)) {
      markers = _.map(this.props.trafficMetadata, (val, key) => {
        // The index of the markers array starts from 1
        this.markers[Number(val.ID)] = L.marker(new L.LatLng(val.Lat, val.Lon), {
          title: val.Street,
          icon: new L.TextIcon({
            text: val.Group.toString(),
            color: "blue",
            id: Number(val.ID),
          }),
        });

        this.markers[Number(val.ID)].bindPopup(
                    `<b>Street:</b> ${val.Title}`).on("click", (event) => {
                      self.markerClick(event.target.options.icon.options.id);
                    });
        return this.markers[Number(val.ID)];
      });
      this.leafletElement.addLayers(markers);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  markerClick(id) {
    this.props.handleClickMarker(id);
  }
  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  data: React.PropTypes.array.isRequired,
  handleClickMarker: React.PropTypes.func.isRequired,
  trafficMetadata: React.PropTypes.object.isRequired,
};

export default MarkerCluster;
