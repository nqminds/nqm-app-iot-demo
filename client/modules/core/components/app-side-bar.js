import React from "react";
import framework from "nqm-app-framework";
import _ from "lodash";

// Side bar panels
import HomeMenu from "../../home/containers/home-menu";
import homeMenuElements from "../../home/components/home-menu-elements";

// Sidebar framework
const SideBarContent = framework.ui.SideBarContent;
const SideBarPanel = framework.ui.SideBarPanel;

const AppSideBar = () => {
  const sidebarPanelComponent = _.map(homeMenuElements, (val) => {
    return (
      <SideBarPanel
        key={val.value}
        title={val.title}
        value={val.value}
        icon={val.icon}
        route={val.route}
      >
        {val.content}
      </SideBarPanel>);
  });

  return (
    <SideBarContent>
      <SideBarPanel
        title="menu"
        value="menu"
        icon="apps"
      >
        <HomeMenu />
      </SideBarPanel>
    </SideBarContent>
  );
};

export default AppSideBar;
