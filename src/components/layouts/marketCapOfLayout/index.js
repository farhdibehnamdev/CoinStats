import React from "react";
import { Col, Row, Card } from "antd";
const MarketCapOfLayout = () => {
  return (
    <React.Fragment>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col>
          <Card
            style={{
              margin: "5px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
            title="Market Cap"
            bordered={true}
            className="card-green"
          >
            <h2>Comming Soon...</h2>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default MarketCapOfLayout;
