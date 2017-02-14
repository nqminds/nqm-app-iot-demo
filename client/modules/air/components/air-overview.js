import React from "react";
import {Table, Tr, Thead, Th, Td} from "reactable";

const AirOverview = ({currentvalue, metadata}) => (
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
        <Td className="tg-b7b8" column="Property" data="Site Code" />
        <Td className="tg-b7b8" column="Value" data={metadata.SiteCode} />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="Local Authority Name" />
        <Td className="tg-yw4l" column="Value" data={metadata.LocalAuthorityName} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Site Type" />
        <Td className="tg-b7b8" column="Value" data={metadata.SiteType} />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="Sensor Value" />
        <Td className="tg-b7b8" column="Value" data={JSON.stringify(currentvalue)} />
      </Tr>
    </Table>
  </div>
);

AirOverview.propTypes = {
  currentvalue: React.PropTypes.object,
  metadata: React.PropTypes.object,
};

export default AirOverview;
