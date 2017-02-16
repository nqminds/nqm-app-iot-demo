import React from "react";
import {Table, Tr, Thead, Th, Td} from "reactable";
import * as _ from "lodash";

const AirOverview = ({currentvalue, metadata}) => {
  const tdlist = _.map(currentvalue, (val, key) => (
    <Tr key={key}>
      <Td className="tg-b7b8" column="Property" data={key} />
      <Td className="tg-b7b8" column="Value" data={val} />
    </Tr>
  ));
  return (
    <div style={{margin: 8}}>
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
        {tdlist}
      </Table>
    </div>);
};

AirOverview.propTypes = {
  currentvalue: React.PropTypes.object,
  metadata: React.PropTypes.object,
};

export default AirOverview;
