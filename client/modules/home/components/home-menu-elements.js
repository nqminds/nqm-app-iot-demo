import React from "react";

import BusList from "../../buses/containers/bus-list";
import ParkingList from "../../parking/containers/parking-list";
import TrafficList from "../../traffic/containers/traffic-list";
import AirList from "../../air/containers/air-list";
import AirSettings from "../../air/containers/air-settings";

const homeMenuElements = [{
  route: "/buses",
  title: "Buses list",
  value: "menuBusesList",
  icon: "directions_bus",
  root: true,
  content: <BusList />,
}, {
  route: "/traffic",
  title: "Traffic list",
  value: "menuTrafficList",
  icon: "traffic",
  root: true,
  content: <TrafficList />,
}, {
  route: "/parking",
  title: "Parking list",
  value: "menuParkingList",
  icon: "local_parking",
  root: true,
  content: <ParkingList />,
}, {
  route: "/air",
  title: "Air list",
  value: "menuAirList",
  icon: "cloud",
  root: true,
  content: <AirList />,
}, {
  route: "/air",
  title: "Air settings",
  value: "menuAirOptions",
  icon: "settings",
  root: false,
  content: <AirSettings />,
},
];

export default homeMenuElements;
