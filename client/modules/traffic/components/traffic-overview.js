import React from "react";
import {Table, Tr, Thead, Th, Td} from "reactable";

const TrafficOverview = ({currentvalue, metadata}) => (
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
        <Td className="tg-b7b8" column="Value" data={metadata.Title} />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="Entry Congestion Level" />
        <Td className="tg-yw4l" column="Value" data={currentvalue.EntryCongestionLevel} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Exit Congestion Level" />
        <Td className="tg-b7b8" column="Value" data={currentvalue.ExitCongestionLevel} />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="Roundabout Entry" />
        <Td className="tg-yw4l" column="Value" data={currentvalue.RoundaboutEntry} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Roundabout Entry Speed" />
        <Td className="tg-b7b8" column="Value" data={currentvalue.RoundaboutEntrySpeed} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Roundabout Exit" />
        <Td className="tg-b7b8" column="Value" data={currentvalue.RoundaboutExit} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Roundabout Exit Speed" />
        <Td className="tg-b7b8" column="Value" data={currentvalue.RoundaboutExitSpeed} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Roundabout Inside" />
        <Td className="tg-b7b8" column="Value" data={currentvalue.RoundaboutInside} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Roundabout Inside Speed" />
        <Td className="tg-b7b8" column="Value" data={currentvalue.RoundaboutInsideSpeed} />
      </Tr>
    </Table>
  </div>
);

TrafficOverview.propTypes = {
  currentvalue: React.PropTypes.object,
  metadata: React.PropTypes.object,
};

export default TrafficOverview;
