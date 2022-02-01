import React, { useState, useEffect } from "react";
import { Col, Row, Card, Skeleton } from "antd";
import { commaSeparator } from "utils/table/commaSeparator";
import { getRequest } from "utils/api";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import "./styles.css";
export function CardsLayout({ data, btcPrice }) {
  const [dataStats, setDataStats] = useState({});
  const [loading, setLoading] = useState(true);
  const { threeData, twentyData, sevenData } = data;
  const threeDataNumber = Number(threeData);
  const twentyDataNumber = Number(twentyData);
  const sevenDataNumber = Number(sevenData);
  const marketCapCardColor = threeDataNumber > 0 ? "#eaf9ee" : "#ffeaea";
  const total24hVolumeCardColor = twentyDataNumber > 0 ? "#eaf9ee" : "#ffeaea";
  const priceCardColor = sevenDataNumber > 0 ? "#eaf9ee" : "#ffeaea";

  useEffect(() => {
    const getStats = async () => {
      await getRequest("v2/stats")
        .then((response) => {
          setDataStats(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    getStats();
  }, []);
  return (
    <div className="site-card-wrapper">
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.89474rem" }}>
          Best Coin Price Tracker in the Market
        </h1>
        <section>
          <p>
            With CryptoMarket, you can manage all your crypto assets from one
            interface.
          </p>
          <p>
            The global crypto market cap is $2.4T a 1.05% increase over the last
            day.
          </p>
        </section>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          xs={{ span: 18 }}
          sm={{ span: 18, offset: 4 }}
          lg={{ span: 18, offset: 4 }}
          xl={{ span: 18, offset: 4, fontSize: "15px" }}
          xxl={{ span: 6, offset: 1, fontSize: "10px" }}
        >
          <Skeleton loading={loading} avatar active>
            <Card
              style={{
                margin: "5px",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: marketCapCardColor,
              }}
              title="Market Cap"
              bordered={true}
              className="card-green"
              xs={{ span: 18 }}
              sm={{ span: 18, offset: 4 }}
              lg={{ span: 18, offset: 4 }}
              xl={{ span: 18, offset: 4 }}
              xxl={{ span: 6, offset: 1 }}
            >
              <strong>{commaSeparator(dataStats.totalMarketCap)}</strong>
              <span className="percent">
                {threeDataNumber > 0 ? (
                  <span
                    style={{
                      width: 60,
                      height: 30,
                      backgroundColor: "#D7F4DF",
                      borderRadius: "10px",
                      color: "#16c784",
                      padding: "10px",
                    }}
                  >
                    <CaretUpOutlined twoToneColor="#32D25A" />
                    {threeDataNumber}%
                  </span>
                ) : (
                  <span
                    style={{
                      width: 60,
                      height: 30,
                      backgroundColor: "rgb(254 195 195)",
                      borderRadius: "10px",
                      color: "#FF3535",
                      padding: "10px",
                    }}
                  >
                    <CaretDownOutlined twoToneColor="#FF3535" />
                    {threeDataNumber}%
                  </span>
                )}
              </span>
            </Card>
          </Skeleton>
        </Col>
        <Col
          xs={{ span: 18 }}
          sm={{ span: 18, offset: 4 }}
          lg={{ span: 18, offset: 4 }}
          xl={{ span: 18, offset: 4 }}
          xxl={{ span: 6, offset: 2 }}
        >
          <Skeleton loading={loading} avatar active>
            <Card
              style={{
                margin: "5px",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: total24hVolumeCardColor,
              }}
              title="Volume 24h"
              bordered={true}
            >
              <strong>{commaSeparator(dataStats.total24hVolume)}</strong>
              <span className="percent">
                {twentyDataNumber > 0 ? (
                  <span
                    style={{
                      width: 60,
                      height: 30,
                      backgroundColor: "#D7F4DF",
                      borderRadius: "10px",
                      color: "#16c784",
                      padding: "10px",
                    }}
                  >
                    <CaretUpOutlined twoToneColor="#32D25A" />
                    {twentyDataNumber}%
                  </span>
                ) : (
                  <span
                    style={{
                      width: 60,
                      height: 30,
                      backgroundColor: "rgb(254 195 195)",
                      borderRadius: "10px",
                      color: "#FF3535",
                      padding: "10px",
                    }}
                  >
                    <CaretDownOutlined twoToneColor="#FF3535" />
                    {twentyDataNumber}%
                  </span>
                )}
              </span>
            </Card>
          </Skeleton>
        </Col>
        <Col
          xs={{ span: 18 }}
          sm={{ span: 18, offset: 4 }}
          lg={{ span: 18, offset: 4 }}
          xl={{ span: 18, offset: 4 }}
          xxl={{ span: 6, offset: 2 }}
        >
          <Skeleton loading={loading} avatar active>
            <Card
              style={{
                margin: "5px",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: priceCardColor,
              }}
              title="BTC Price"
              bordered={true}
            >
              <strong>{btcPrice}</strong>
              <span className="percent">
                {sevenDataNumber > 0 ? (
                  <span
                    style={{
                      width: 60,
                      height: 30,
                      backgroundColor: "#D7F4DF",
                      borderRadius: "10px",
                      color: "#16c784",
                      padding: "10px",
                    }}
                  >
                    <CaretUpOutlined twoToneColor="#32D25A" />
                    {sevenDataNumber}%
                  </span>
                ) : (
                  <span
                    style={{
                      width: 60,
                      height: 30,
                      backgroundColor: "rgb(254 195 195)",
                      borderRadius: "10px",
                      color: "#FF3535",
                      padding: "10px",
                    }}
                  >
                    <CaretDownOutlined twoToneColor="#FF3535" />
                    {sevenDataNumber}%
                  </span>
                )}
              </span>
            </Card>
          </Skeleton>
        </Col>
      </Row>
    </div>
  );
}

export default CardsLayout;
