import React from "react";
import framework from "nqm-app-framework";

import TrafficOverview from "./traffic-overview";
import TrafficStats from "../containers/traffic-stats";

const StickyDetails = framework.ui.StickyDetails;
const StickyDetail = framework.ui.StickyDetail;

const TrafficDetails = ({activeDetail, showDetail, topOffset, currentTrafficID, markerData, trafficMetadata}) => {
  return (<StickyDetails
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
      <TrafficOverview metadata={trafficMetadata[currentTrafficID]} currentvalue={markerData[currentTrafficID]} />
    </StickyDetail>
    <StickyDetail
      title="Statistics"
      icon="equalizer"
      value="statistics"
    >
      <TrafficStats />
    </StickyDetail>
  </StickyDetails>);
};

TrafficDetails.propTypes = {
  activeDetail: React.PropTypes.string,
  currentTrafficID: React.PropTypes.number,
  markerData: React.PropTypes.object,
  sheet: React.PropTypes.object,
  showDetail: React.PropTypes.func,
  topOffset: React.PropTypes.number,
  trafficMetadata: React.PropTypes.object,
};

export default TrafficDetails;
