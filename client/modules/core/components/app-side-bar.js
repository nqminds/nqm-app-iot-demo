import React from "react";
import framework from "nqm-app-framework";
import _ from "lodash";

// Side bar panels
import MapMenu from "../../map/containers/map-menu";
import MapDetailOverview from "../../map/components/map-detail-overview";
import MapDetailSchools from "../../map/components/map-detail-schools";
import MapDetailHousing from "../../map/components/map-detail-housing";

// Sidebar framework
const SideBarContent = framework.ui.SideBarContent;
const SideBarPanel = framework.ui.SideBarPanel;
const routes = ["/", "/buses", "/traffic", "/parking", "/air"];
const sidebarElements = [
  {title: "Buses", value: "menuBuses", icon: "directions_bus", content: <MapMenu />},
  {title: "Traffic", value: "menuTraffic", icon: "traffic", content: <MapDetailOverview showClose={true} />},
  {title: "Parking", value: "menuParking", icon: "local_parking", content: <MapDetailOverview showClose={true} />},
  {title: "Air", value: "menuAir", icon: "cloud", content: <MapDetailOverview showClose={true} />},
];

const AppSideBar = () => {
  const sidebarPanelComponent = [];
  _.forEach(routes, (valRoutes) => {
    _.forEach(sidebarElements, (val) => {
      sidebarPanelComponent.push(
        <SideBarPanel
          key={val.value + valRoutes}
          title={val.title}
          value={val.value + valRoutes}
          icon={val.icon}
          route={valRoutes}
        >
          {val.content}
        </SideBarPanel>);
    });
  });

  return (
    <SideBarContent>
      {sidebarPanelComponent}
    </SideBarContent>
  );
};

export default AppSideBar;
