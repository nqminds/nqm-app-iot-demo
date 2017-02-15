import React from "react";
import {Table, Tr, Thead, Th, Td} from "reactable";

const ParkingOverview = ({currentvalue, metadata}) => {
  return (
    <div style={{paddingLeft: 8}}>
      <Table className="tg">
        <Thead>
          <Th className="tg-yw4l" column="Property">
            <b>Property</b>
          </Th>
          <Th className="tg-yw4l" column="Value">
            <b>Value</b>
          </Th>
        </Thead>
        <Tr>
          <Td className="tg-b7b8" column="Property" data="Street" />
          <Td className="tg-b7b8" column="Value" data={metadata.Street} />
        </Tr>
        <Tr>
          <Td className="tg-yw4l" column="Property" data="Tariff Code" />
          <Td className="tg-yw4l" column="Value" data={metadata.TariffCode} />
        </Tr>
        <Tr>
          <Td className="tg-b7b8" column="Property" data="Bay Type" />
          <Td className="tg-b7b8" column="Value" data={metadata.BayType} />
        </Tr>
        <Tr>
          <Td className="tg-yw4l" column="Property" data="Bay Count" />
          <Td className="tg-yw4l" column="Value" data={metadata.BayCount} />
        </Tr>
        <Tr>
          <Td className="tg-b7b8" column="Property" data="Used Bays" />
          <Td className="tg-b7b8" column="Value" data={currentvalue} />
        </Tr>
      </Table>
    </div>);
};

ParkingOverview.propTypes = {
  currentvalue: React.PropTypes.number,
  metadata: React.PropTypes.object,
};

export default ParkingOverview;
