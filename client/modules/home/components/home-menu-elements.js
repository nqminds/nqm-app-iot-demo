import React from "react";

import BusList from "../../buses/containers/bus-list";
import ParkingList from "../../parking/containers/parking-list";
import MapDetailOverview from "../../map/components/map-detail-overview";
import MapDetailHousing from "../../map/components/map-detail-housing";

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
  content: <MapDetailOverview showClose={true} />,
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
  content: <MapDetailHousing showClose={true} />,
},
];

export default homeMenuElements;
