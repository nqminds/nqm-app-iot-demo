import React from "react";
import framework from "nqm-app-framework";

import AirOverview from "./air-overview";
import AirStats from "../containers/air-stats";

import * as _ from "lodash";

const StickyDetails = framework.ui.StickyDetails;
const StickyDetail = framework.ui.StickyDetail;

const AirDetails = ({activeDetail, showDetail, topOffset, currentAirID, markerData, airMetadata}) => {
  let species = {};
  if (!_.isEmpty(markerData[currentAirID]))
    species = markerData[currentAirID].Species;

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
      <AirOverview metadata={airMetadata[currentAirID]} currentvalue={species} />
    </StickyDetail>
    <StickyDetail
      title="Statistics"
      icon="equalizer"
      value="statistics"
    >
      <AirStats />
    </StickyDetail>
  </StickyDetails>);
};

AirDetails.propTypes = {
  activeDetail: React.PropTypes.string,
  airMetadata: React.PropTypes.object,
  currentAirID: React.PropTypes.string,
  markerData: React.PropTypes.object,
  sheet: React.PropTypes.object,
  showDetail: React.PropTypes.func,
  topOffset: React.PropTypes.number,
};

export default AirDetails;
