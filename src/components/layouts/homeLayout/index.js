import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Spin,
  Modal,
  Row,
  Col,
  Input,
  Radio,
  Divider,
  Checkbox,
  message,
  Form,
  InputNumber,
} from "antd";
import tableConfig from "./constants";
import CardsLayout from "../cardsLayout";

import { getRequest } from "utils/api";
import { commaSeparator } from "utils/table/commaSeparator";
import convertArrayToArrayObject from "utils/table/convertArrayToArrayOfObject";
import "./style.css";
import NewsLayout from "../newsLayout";

const { Content } = Layout;

function HomeLayout() {
  const [dataCoins, setDataCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marketCapChecked, setMarketCapChecked] = useState(false);
  const [priceChecked, setPriceChecked] = useState(false);
  const [timePeriodData, setTimePeriodData] = useState([]);
  const [cardsData, setCardsData] = useState({});
  const [btcPrice, setBTCPrice] = useState("");
  const [marketCapFrom, setMarketCapFrom] = useState(0);
  const [marketCapTo, setMarketCapTo] = useState(0);
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validationStatus, setValidationStatus] = useState("");
  const [marketCapFilterON, setMarketCapFilterON] = useState(true);
  const [priceFilterON, setPriceFilterON] = useState(true);

  const timePeriods = ["3h", "24h", "7d"];
  const mergedTimePeriodsData = [];
  const BTC_ID = "Qwsogvtv82FCd";
  const extractDataFromTimePeriodData = (id) => {
    try {
      const [threeHourData, twentyHourData, sevenDaysData] = timePeriodData;
      let three;
      let twenty;
      let seven;
      let btcPrice;
      if (id === BTC_ID) {
        three = threeHourData.find((th) => th.uuid === id);
        twenty = twentyHourData.find((tyh) => tyh.uuid === id);
        seven = sevenDaysData.find((sd) => sd.uuid === id);
        const threeData = three["3h"];
        const twentyData = twenty["24h"];
        const sevenData = seven["7d"];

        setCardsData({ threeData, twentyData, sevenData, btcPrice });
      } else {
        three = threeHourData.find((th) => th.uuid === id);
        twenty = twentyHourData.find((tyh) => tyh.uuid === id);
        seven = sevenDaysData.find((sd) => sd.uuid === id);
      }

      return {
        id,
        "3h": three["3h"],
        "24h": twenty["24h"],
        "7d": seven["7d"],
        sparkline: seven.sparkline,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getPriceChanges = async (coinsData) => {
    try {
      for (let i = 0; i < timePeriods.length; i++) {
        const timePeriod = timePeriods[i];
        await getRequest(`v2/coins?timePeriod=${timePeriod}`)
          .then((response) => {
            const { coins } = response.data.data;
            const result = coins.map((coin) => {
              if (coin.uuid === BTC_ID) {
                setBTCPrice(commaSeparator(coin.price));
              }
              if (timePeriod === "7d") {
                return {
                  uuid: coin.uuid,
                  [timePeriod]: coin.change,
                  sparkline: coin.sparkline,
                };
              } else {
                return {
                  uuid: coin.uuid,
                  [timePeriod]: coin.change,
                };
              }
            });
            setTimePeriodData(timePeriodData.push(result));
          })
          .catch((error) => {
            console.log(error);
          });
      }

      coinsData.forEach((cd) => {
        const result = extractDataFromTimePeriodData(cd.id);
        mergedTimePeriodsData.push(result);
      });

      const finalData = mergedTimePeriodsData.map((mt) => {
        const result = coinsData.find((cd) => cd.id === mt.id);
        result.sparkline = convertArrayToArrayObject(mt.sparkline);
        result["3h"] = mt["3h"];
        result["24h"] = mt["24h"];
        result["7d"] = mt["7d"];

        return result;
      });
      setDataCoins(finalData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (!marketCapFilterON && !priceFilterON) {
    } else {
      if (!marketCapFilterON) {
        if (
          marketCapFrom === null ||
          marketCapFrom < 0 ||
          marketCapFrom === 0 ||
          !isNaN(marketCapFrom) < !isNaN(marketCapTo)
        ) {
          setIsModalVisible(true);
        } else if (marketCapFrom !== null && marketCapFrom > 0) {
          if ((marketCapTo === null && marketCapTo < 0) || marketCapTo === 0) {
            const filteredByMarketCap = dataCoins.filter((data) => {
              const removedMarketCapCharacters = data.marketCap
                .substring(1, data.marketCap.length - 2)
                .replaceAll(",", "");
              return +removedMarketCapCharacters >= marketCapFrom;
            });
            setDataCoins(filteredByMarketCap);
            setIsModalVisible(false);
          } else if (marketCapTo !== null && marketCapTo > 0) {
            const filteredByMarketCap = dataCoins.filter((data) => {
              const removedMarketCapCharacters = data.marketCap
                .substring(1, data.marketCap.length - 2)
                .replaceAll(",", "");
              return (
                (+removedMarketCapCharacters >= marketCapFrom) &
                (+removedMarketCapCharacters <= marketCapTo)
              );
            });

            setDataCoins(filteredByMarketCap);
            setIsModalVisible(false);
          }
        }
      }

      if (!priceFilterON) {
        if (
          priceFrom === null ||
          priceFrom < 0 ||
          priceFrom === 0 ||
          !isNaN(priceFrom) < !isNaN(priceTo)
        ) {
          setIsModalVisible(true);
        } else if (priceFrom !== null && priceFrom > 0) {
          if ((priceTo === null && priceTo < 0) || priceTo === 0) {
            const filteredByPrice = dataCoins.filter((data) => {
              const purePrice = data.price
                .substring(1, data.price.length)
                .replaceAll(",", "");
              return +purePrice >= priceFrom;
            });
            setDataCoins(filteredByPrice);
            setIsModalVisible(false);
          } else if (priceTo !== null && priceTo > 0) {
            const filteredByPrice = dataCoins.filter((data) => {
              const purePrice = data.price
                .substring(1, data.price.length)
                .replaceAll(",", "");
              return (+purePrice >= priceFrom) & (+purePrice <= priceTo);
            });

            setDataCoins(filteredByPrice);
            setIsModalVisible(false);
          }
        }
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function onChange(e) {
    if (e.target.name === "marketCap" && e.target.checked) {
      setMarketCapFilterON(false);
    } else if (e.target.name === "marketCap" && !e.target.checked) {
      setMarketCapFilterON(true);
    }

    if (e.target.name === "price" && e.target.checked) {
      setPriceFilterON(false);
    } else if (e.target.name === "price" && !e.target.checked) {
      setPriceFilterON(true);
    }
  }

  useEffect(() => {
    const getAssets = async () => {
      setLoading(true);
      await getRequest("v2/coins")
        .then((response) => {
          const { coins } = response.data.data;
          const getCoins = coins.map((coin) => {
            return {
              id: coin.uuid,
              name: coin.name,
              symbol: coin.symbol,
              price: commaSeparator(coin.price),
              marketCap: commaSeparator(coin.marketCap.toString(), "marketCap"),
              icon: coin.iconUrl,
              rank: coin.rank,
              sparkline: {},
              "3h": {},
              "24h": {},
              "7d": {},
            };
          });

          getPriceChanges(getCoins);
        })

        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    getAssets();
  }, []);

  return (
    <Layout>
      {console.log(dataCoins)}
      <br />
      <br />
      <br />
      <br />
      <CardsLayout data={cardsData} btcPrice={btcPrice} />
      <Content
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background borderTable"
          style={{ padding: 24, minHeight: 380, borderRadius: "15px" }}
        >
          <Row>
            <Col span={6} offset={11}>
              <Button
                type="primary"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  borderRadius: "10px",
                }}
                size="large"
                onClick={showModal}
              >
                +Add Filtters
              </Button>
            </Col>
          </Row>
          <Modal
            title="More Filters"
            visible={isModalVisible}
            onOk={handleOk}
            okText="Apply Filter"
            onCancel={handleCancel}
          >
            <div>
              <Checkbox name="marketCap" onChange={onChange}>
                <h1>Market Cap</h1>
              </Checkbox>
              <Input.Group size="large">
                <Row gutter={8}>
                  <Col>
                    <Form.Item
                      rules={[
                        { required: true, message: "MarketCap is Required" },
                      ]}
                    >
                      <InputNumber
                        size="large"
                        style={{ width: "200px" }}
                        onChange={(event) => setMarketCapFrom(event)}
                        defaultValue={0}
                        name="marketCapFrom"
                        disabled={marketCapFilterON}
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    span={2}
                    style={{ textAlign: "center", lineHeight: "2.5" }}
                  >
                    <span>To</span>
                  </Col>
                  <Col>
                    <Form.Item
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (isNaN(value) || value < 0) {
                              setValidationStatus("error");
                            }
                          },
                        }),
                      ]}
                      validateStatus={validationStatus}
                    >
                      <InputNumber
                        disabled={marketCapFilterON}
                        size="large"
                        style={{ width: "200px" }}
                        onChange={(event) => setMarketCapTo(event)}
                        name="marketCapTo"
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        defaultValue={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Radio.Group
                    defaultValue="10B"
                    buttonStyle="solid"
                    size="large"
                  >
                    <Radio.Button disabled={marketCapFilterON} value="10B">
                      {">"}$10B
                    </Radio.Button>
                    <Radio.Button disabled={marketCapFilterON} value="1B - 10B">
                      $1B - $10B
                    </Radio.Button>
                    <Radio.Button
                      disabled={marketCapFilterON}
                      value="100M - 1B"
                    >
                      $100M - $1B
                    </Radio.Button>
                    <Radio.Button
                      disabled={marketCapFilterON}
                      value="10M - 100M"
                    >
                      $10M - $100M
                    </Radio.Button>
                  </Radio.Group>
                </Row>
              </Input.Group>
              <Divider></Divider>
              <Checkbox name="price" onChange={onChange}>
                <h1>Price</h1>
              </Checkbox>
              <Input.Group size="large">
                <Row gutter={8}>
                  <Col>
                    <Form.Item
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (isNaN(value) || value < 0) {
                              setValidationStatus("error");
                            }
                          },
                        }),
                      ]}
                      validateStatus={validationStatus}
                    >
                      <InputNumber
                        onChange={(event) => setPriceFrom(event)}
                        size="large"
                        style={{ width: "150px" }}
                        name="priceFrom"
                        defaultValue={0}
                        disabled={priceFilterON}
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    span={2}
                    style={{ textAlign: "center", lineHeight: "2.5" }}
                  >
                    <span>To</span>
                  </Col>
                  <Col>
                    <Form.Item
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (isNaN(value) || value < 0) {
                              setValidationStatus("error");
                            }
                          },
                        }),
                      ]}
                      validateStatus={validationStatus}
                    >
                      <InputNumber
                        size="large"
                        style={{ width: "150px" }}
                        onChange={(event) => setPriceTo(event)}
                        name="priceTo"
                        defaultValue={0}
                        disabled={priceFilterON}
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Radio.Group
                    defaultValue="0 - 1"
                    buttonStyle="solid"
                    size="large"
                  >
                    <Radio.Button disabled={priceFilterON} value="0 - 1">
                      $0 - $1
                    </Radio.Button>
                    <Radio.Button disabled={priceFilterON} value="1 - 100">
                      $1 - $100
                    </Radio.Button>
                    <Radio.Button disabled={priceFilterON} value="101 - 1000">
                      $101 - $1,000
                    </Radio.Button>
                    <Radio.Button disabled={priceFilterON} value="1001">
                      $1,000+
                    </Radio.Button>
                  </Radio.Group>
                </Row>
              </Input.Group>
            </div>
          </Modal>
          <br />

          <Table
            loading={{
              indicator: (
                <div>
                  <Spin />
                </div>
              ),
              spinning: loading,
            }}
            columns={tableConfig}
            dataSource={dataCoins}
            rowKey="id"
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "15", "20", "30", "40"],
            }}
          />
        </div>
      </Content>
      <Divider>
        <Button type="Primary" danger size="large">
          Top 10 Crypto News
        </Button>
      </Divider>
      <NewsLayout />
    </Layout>
  );
}

export default HomeLayout;
