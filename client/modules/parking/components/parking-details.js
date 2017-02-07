import React from "react";
import framework from "nqm-app-framework";

import ParkingOverview from "./parking-overview";

const StickyDetails = framework.ui.StickyDetails;
const StickyDetail = framework.ui.StickyDetail;

const ParkingDetails = ({activeDetail, showDetail, topOffset}) => (
  <StickyDetails
    activeDetail={activeDetail}
    iconModes={["narrow"]}
    onDetail={(item) => (showDetail(item))}
    stickyTop={topOffset}
  >
    <StickyDetail
      title="Overview"
      icon="subject"
      value="overview"
    >
      <ParkingOverview />
    </StickyDetail>
    <StickyDetail
      title="Statistics"
      icon="equalizer"
      value="statistics"
    >
      <ParkingOverview />
    </StickyDetail>
  </StickyDetails>
);

ParkingDetails.propTypes = {
  activeDetail: React.PropTypes.string,
  sheet: React.PropTypes.object,
  showDetail: React.PropTypes.func,
  topOffset: React.PropTypes.number,
};

export default ParkingDetails;
