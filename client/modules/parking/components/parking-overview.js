import React from "react";
import {Table, Tr, Thead, Th, Td} from "reactable";

const ParkingOverview = () => (
  <div style={{paddingLeft: 8}}>
    <Table className="tg">
      <Thead>
        <Th className="tg-yw4l" column="Property" />
        <Th className="tg-yw4l" column="Value" />
      </Thead>
      <Tr>
        <Td className="tg-b7b8" column="Property">
          <b>Test</b>
        </Td>
        <Td className="tg-b7b8" column="Value" data="Haha" />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="" />
        <Td className="tg-yw4l" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="" />
        <Td className="tg-b7b8" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="" />
        <Td className="tg-yw4l" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="" />
        <Td className="tg-b7b8" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="" />
        <Td className="tg-yw4l" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="" />
        <Td className="tg-b7b8" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="" />
        <Td className="tg-yw4l" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="" />
        <Td className="tg-b7b8" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="" />
        <Td className="tg-yw4l" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-b7b8" column="Property" data="" />
        <Td className="tg-b7b8" column="Value" data="" />
      </Tr>
      <Tr>
        <Td className="tg-yw4l" column="Property" data="" />
        <Td className="tg-yw4l" column="Value" data="" />
      </Tr>
    </Table>
  </div>
);

export default ParkingOverview;
