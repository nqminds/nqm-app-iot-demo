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
    const color = "blue";
    const mtext = "";
    const icontype = "plain";
    this.leafletElement = L.markerClusterGroup();

    if (!_.isEmpty(this.props.airMetadata)) {
      markers = _.map(this.props.airMetadata, (val, key) => {
        // The index of the markers array is a string
        this.markers[val.SiteCode] = L.marker(new L.LatLng(val.Latitude, val.Longitude), {
          title: val.LocalAuthorityName,
          icon: new L.TextIcon({
            icontype: icontype,
            text: mtext,
            color: color,
            id: val.SiteCode,
          }),
        });

        this.markers[val.SiteCode]
            .bindPopup(`<b>Local authority name: </b>${val.LocalAuthorityName}<br><b>Site code: </b>${val.SiteCode}<br><b>Local authority code: </b>${val.LocalAuthorityCode}<br><b>Site type:</b>${val.SiteType}`)
            .on("click", (event) => (self.props.handleClickMarker(event.target.options.icon.options.id)));
        return this.markers[val.SiteCode];
      });
      this.leafletElement.addLayers(markers);
    }
  }

  componentWillReceiveProps(nextProps) {
    _.forEach(nextProps.data, (val) => {
      let color = "blue";
      let mtext = "";
      let icontype = "plain";

      if (val.Species[nextProps.moleculeType] !== undefined) {
        icontype = "number";
        mtext = val.Species[nextProps.moleculeType].toString();
        if (val.Species[nextProps.moleculeType] > 5)
          color = "red";
      }

      if (!_.isEmpty(this.markers[val.SiteCode]))
        this.markers[val.SiteCode].options.icon.setType(icontype, color, mtext);
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.leafletElement.clearLayers();
  }

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  airMetadata: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
  handleClickMarker: React.PropTypes.func.isRequired,
  moleculeType: React.PropTypes.string.isRequired,
};

export default MarkerCluster;
