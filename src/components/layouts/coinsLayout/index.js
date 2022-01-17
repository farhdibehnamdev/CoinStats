import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Skeleton, Card, Avatar, Row, Col, Divider, Radio, Button } from "antd";
import { Line } from "@ant-design/plots";
import { getRequest } from "utils/api";
import {
  justUnixTimeStampConvert,
  convertTimeStampToDate,
} from "utils/convertTimestampToDate";
import "./styles.css";
import commaSeparator from "utils/table/commaSeparator";
import NotFound from "screens/errors";
const { Meta } = Card;

export const CoinsLayout = () => {
  const [coinData, setCoinData] = useState({});
  const [totalData, setTotalData] = useState("");
  const [circulatingData, setCirculatingData] = useState("");
  const [chartData, setChartData] = useState([]);
  const [timePeriodHistory, setTimePeriodHistory] = useState("1y");
  const [coinFounded, setCoinFounded] = useState(true);
  const location = useLocation();
  const { name } = useParams();
  const [id, setId] = useState(location.state?.id);
  const [loading, setLoading] = useState(true);
  const handleTimePeriodHistory = (time) => {
    setTimePeriodHistory(time);
  };

  const getCoin = async () => {
    getRequest(`v2/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl`)
      .then((response) => {
        const { coin } = response.data.data;
        setTotalData(coin.supply.total);
        setCirculatingData(coin.supply.circulating);
        setCoinData(coin);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const getCoins = async () => {
    getRequest("v2/coins")
      .then((response) => {
        const { coins } = response.data.data;
        console.log(coins);
        const coinFound = coins.find((coin) => coin.name === name);
        if (!coinFound) {
          setCoinFounded(false);
          setLoading(false);
        } else {
          setId(coinFound.uuid);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if ((typeof id !== undefined) & (id !== null) & (id !== "")) {
      setCoinFounded(true);
      getCoin();
    } else {
      getCoins();
    }
  }, [id]);

  useEffect(() => {
    if ((typeof id !== "undefined") & (id !== null) & (id !== "")) {
      setCoinFounded(true);
      const getHistoryPrice = async () => {
        await getRequest(
          `v2/coin/${id}/history?timePeriod=${timePeriodHistory}`
        )
          .then((response) => {
            const { data } = response.data;
            const result = convertTimeStampToDate(data.history);
            setChartData(result);
          })
          .catch((error) => console.log(error));
      };
      getHistoryPrice();
    } else {
      getCoins();
    }
  }, [timePeriodHistory, id]);

  const config = {
    data: chartData,
    padding: "auto",
    xField: "date",
    yField: "price",
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
  };
  if (coinFounded === false) {
    console.log("not found coind");
    return <NotFound />;
  } else {
    return (
      <div className="site-card-wrapper">
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row key={id}>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Skeleton loading={loading} avatar active>
              <Card
                style={{
                  margin: "5px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                title="Price Information"
                bordered={true}
              >
                <Meta
                  title={coinData.name + ` Price (${coinData.symbol})`}
                  avatar={<Avatar src={coinData.iconUrl} />}
                  description={<h2>{commaSeparator(coinData.price)}</h2>}
                ></Meta>
              </Card>
            </Skeleton>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6 }}>
            <Skeleton loading={loading} avatar active>
              <Card
                style={{
                  margin: "5px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                title="Market Cap & Ciruculating Supply"
                bordered={true}
              >
                <Row>
                  <Col span={8}>
                    <h3>Market Cap</h3>
                    <h3>{commaSeparator(coinData.marketCap)} </h3>
                  </Col>
                  <Col span={8} offset={4}>
                    <h3>Circulating Supply</h3>
                    <h3>{commaSeparator(circulatingData)} </h3>
                  </Col>
                </Row>
              </Card>
            </Skeleton>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6 }}>
            <Skeleton loading={loading} avatar active>
              <Card
                style={{
                  margin: "5px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                title="Volume & Total Supply"
                bordered={true}
              >
                <Row>
                  <Col span={8}>
                    <h3>Volume 24h</h3>
                    <h3>{commaSeparator(coinData["24hVolume"])} </h3>
                  </Col>
                  <Col span={8} offset={4}>
                    <h3>Total Supply</h3>
                    <h3>{commaSeparator(totalData)} </h3>
                  </Col>
                </Row>
              </Card>
            </Skeleton>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Divider orientation="center">
          <h2>Charts Data</h2>
        </Divider>
        <Row>
          <Col span={6} offset={2}>
            <div>
              <h1>{coinData.name + ` Price (USD)`}</h1>
            </div>
          </Col>
          <Col span={6} offset={5}>
            <Radio.Group defaultValue="1y" buttonStyle="solid">
              <Radio.Button
                onClick={() => handleTimePeriodHistory("24h")}
                value="24h"
              >
                24h
              </Radio.Button>
              <Radio.Button
                onClick={() => handleTimePeriodHistory("7d")}
                value="7d"
              >
                7d
              </Radio.Button>
              <Radio.Button
                onClick={() => handleTimePeriodHistory("30d")}
                value="30d"
              >
                30d
              </Radio.Button>
              <Radio.Button
                onClick={() => handleTimePeriodHistory("1y")}
                value="1y"
              >
                1y
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              style={{
                marginTop: "15px",
                marginLeft: "100px",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "40px",
              }}
              span={8}
              offset={2}
            >
              <Line {...config} />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                margin: "5px",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "15px",
              }}
              title="Coin Info"
              bordered={true}
            >
              <div>
                <Button type="primary" size="large">
                  WebSite
                </Button>
                <Button
                  style={{ marginLeft: "10px", fontWeight: "bold" }}
                  orientation="center"
                  type="primary"
                  ghost
                >
                  {coinData.websiteUrl}
                </Button>
              </div>
              <Divider></Divider>

              <div>
                <Button type="primary" size="large">
                  {coinData.name} Rank
                </Button>

                <Button
                  style={{ marginLeft: "10px", fontWeight: "bold" }}
                  orientation="center"
                  type="primary"
                  ghost
                >
                  {coinData.rank}
                </Button>
              </div>

              <Divider></Divider>
              <div>
                <div>
                  <Button type="primary" size="large">
                    AllTimeHigh
                  </Button>

                  <Button
                    style={{ marginLeft: "10px", fontWeight: "bold" }}
                    orientation="center"
                    type="primary"
                    ghost
                  >
                    {commaSeparator(coinData.allTimeHigh?.price)}
                  </Button>
                </div>
                <br />
                <div>
                  <Button type="primary" size="large">
                    Date
                  </Button>

                  <Button
                    style={{ marginLeft: "10px", fontWeight: "bold" }}
                    type="primary"
                    danger
                    ghost
                  >
                    {justUnixTimeStampConvert(coinData.allTimeHigh?.timestamp)}
                  </Button>
                </div>
              </div>
              <Divider></Divider>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default CoinsLayout;
