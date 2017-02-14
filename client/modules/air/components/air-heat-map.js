import React from "react";
import {MapLayer} from "react-leaflet";
import * as _ from "lodash";
import "leaflet.heat";

const maxIntensity = 11;
const defaultRadius = 125;

class AirHeatMap extends MapLayer {
  constructor(props) {
    super(props);
  }

  _updateLatLon(props) {
    const latlngData = [];
    let lat;
    let lon;

    _.forEach(props.data, (val) => {
      if (val.Species[props.moleculeType] !== undefined) {
        if (props.airMetadata[val.SiteCode] !== undefined) {
          lat = props.airMetadata[val.SiteCode].Latitude;
          lon = props.airMetadata[val.SiteCode].Longitude;

          latlngData.push([lat, lon, val.Species[props.moleculeType] + 1]);
        }
      }
    });

    if (!latlngData.length) {
      _.forEach(props.airMetadata, (val, key) => {
        if (val.Latitude !== null && val.Longitude !== null)
          latlngData.push([val.Latitude, val.Longitude, maxIntensity]);
      });
    }

    return latlngData;
  }

  componentWillMount() {
    this.leafletElement = L.heatLayer(this._updateLatLon(this.props), {radius: defaultRadius, max: maxIntensity}).addTo(this.context.map);
  }

  componentWillReceiveProps(nextProps) {
    this.leafletElement.setLatLngs(this._updateLatLon(nextProps));
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.context.map.removeLayer(this.leafletElement);
  }

  render() {
    return null;
  }
}

AirHeatMap.propTypes = {
  airMetadata: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
  moleculeType: React.PropTypes.string.isRequired,
};

export default AirHeatMap;
