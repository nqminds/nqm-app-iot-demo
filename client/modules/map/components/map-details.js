import React from "react";
import framework from "nqm-app-framework";

import MapDetailOverview from "./map-detail-overview";
import MapDetailSchools from "./map-detail-schools";
import MapDetailHousing from "./map-detail-housing";
import MapDetailParking from "./map-detail-parking";

const StickyDetails = framework.ui.StickyDetails;
const StickyDetail = framework.ui.StickyDetail;

const MapDetails = ({activeDetail, showDetail, topOffset}) => (
  <StickyDetails
    activeDetail={activeDetail}
    iconModes={["narrow"]}
    onDetail={(item) => (showDetail(item))}
    stickyTop={topOffset}
  >
    <StickyDetail
      title="overview"
      icon="subject"
      value="overview"
    >
      <MapDetailOverview />
    </StickyDetail>
    <StickyDetail
      title="schools"
      icon="school"
      value="schools"
    >
      <MapDetailSchools />
    </StickyDetail>
    <StickyDetail
      title="housing"
      icon="home"
      value="housing"
    >
      <MapDetailHousing />
    </StickyDetail>
    <StickyDetail
      title="parking"
      icon="local_parking"
      value="parking"
    >
      <MapDetailParking />
    </StickyDetail>
  </StickyDetails>
);

MapDetails.propTypes = {
  activeDetail: React.PropTypes.string,
  sheet: React.PropTypes.object,
  showDetail: React.PropTypes.func,
  topOffset: React.PropTypes.number,
};

export default MapDetails;
