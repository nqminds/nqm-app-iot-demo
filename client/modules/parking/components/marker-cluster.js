import React from "react";
import {MapLayer} from "react-leaflet";
import "leaflet";
import "leaflet.markercluster";
import "../../components/leaflet-text-icon.js";
import * as _ from "lodash";

class MarkerCluster extends MapLayer {
  constructor(props) {
    super(props);

    this.markers = {};
  }

  componentWillMount() {
    let markers = [];
    const self = this;
    this.leafletElement = L.markerClusterGroup();

    if (!_.isEmpty(this.props.parkingMetadata)) {
      markers = _.map(this.props.parkingMetadata, (val, key) => {
        // The index of the markers array starts from 1
        this.markers[Number(val.LotCode)] = L.marker(new L.LatLng(val.Latitude, val.Longitude), {
          title: val.Street,
          icon: new L.TextIcon({
            icontype: "number",
            text: val.BayCount.toString(),
            color: "blue",
            id: Number(val.LotCode),
          }),
        });

        this.markers[Number(val.LotCode)].bindPopup(
                    `<b>Bay count:</b> ${val.BayCount}`).on("click", (event) => {
                      self.props.handleClickMarker(event.target.options.icon.options.id);
                    });
        return this.markers[Number(val.LotCode)];
      });
      this.leafletElement.addLayers(markers);
    }
  }

  componentWillReceiveProps(nextProps) {
    _.forEach(nextProps.data, (val) => {
      const color = Number(val.currentvalue) ? "blue" : "red";
      if (!_.isEmpty(this.markers[Number(val.ID)]))
        this.markers[Number(val.ID)].options.icon.setType("number", color, val.currentvalue.toString());
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  data: React.PropTypes.array.isRequired,
  handleClickMarker: React.PropTypes.func.isRequired,
  parkingMetadata: React.PropTypes.object.isRequired,
};

export default MarkerCluster;
