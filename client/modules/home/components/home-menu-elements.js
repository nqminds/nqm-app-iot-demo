import React from "react";

import BusList from "../../buses/containers/bus-list";
import ParkingList from "../../parking/containers/parking-list";
import TrafficList from "../../traffic/containers/traffic-list";
import AirList from "../../air/containers/air-list";

const homeMenuElements = [{
  route: "/buses",
  title: "Buses",
  value: "menuBuses",
  icon: "directions_bus",
  content: <BusList />,
}, {
  route: "/traffic",
  title: "Traffic",
  value: "menuTraffic",
  icon: "traffic",
  content: <TrafficList />,
}, {
  route: "/parking",
  title: "Parking",
  value: "menuParking",
  icon: "local_parking",
  content: <ParkingList />,
}, {
  route: "/air",
  title: "Air",
  value: "menuAir",
  icon: "cloud",
  content: <AirList />,
},
];

export default homeMenuElements;
