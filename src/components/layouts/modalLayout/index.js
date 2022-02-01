import React, { useRef, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Checkbox,
  Input,
  InputNumber,
  Radio,
  Divider,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";

function ModalLayout({
  openModal,
  exitModal,
  renderPage,
  marketCapFilterON,
  modalOnChange,
  marketCapFrom,
  marketCapTo,
  priceFilterON,
  isModalVisible,
  handlePriceFrom,
  handlePriceTo,
  handleMarketCapFrom,
  handleMarketCapTo,
  handleOk,
  // handleButtonValue,
}) {
  const marketCapButtonValue = useRef();
  const marketCapButtonValue1BTo10B = useRef();
  const marketCapButtonValue100MTo1B = useRef();
  const marketCapButtonValue10MTo100M = useRef();

  const priceButtonValue0To1 = useRef(0);
  const priceButtonValue1To100 = useRef(0);
  const priceButtonValue101To1000 = useRef(0);
  const priceButtonValue1000Plus = useRef(0);
  const [marketCapFromm] = useState(0);
  const [marketCapToo] = useState(0);
  const [priceFromm] = useState(0);
  const [priceToo] = useState(0);
  const [form] = Form.useForm();

  function showMoadlHandler() {
    openModal(true);
  }

  function cancelModalHandler() {
    exitModal(false);
  }
  ///TODO : Maybe I change this function by useEffect, I must think about it.
  function renderHandler() {
    renderPage(true);
  }

  function onChangeHandler(e) {
    modalOnChange(e);
  }

  function priceFromHandler(e) {
    handlePriceFrom(e);
  }

  function priceToHandler(e) {
    handlePriceTo(e);
  }
  function marketCapFromHandler(e) {
    handleMarketCapFrom(e);
  }
  function marketCapToHandler(e) {
    handleMarketCapTo(e);
  }
  function okHandler() {
    handleOk();
  }

  function radioButtonValueHandler(e) {
    if (e.target.defaultValue === "10B") {
      marketCapValueHandler(marketCapButtonValue.current.props.value);
    } else if (e.target.defaultValue === "1B - 10B") {
      marketCapValueHandler(marketCapButtonValue1BTo10B.current.props.value);
    } else if (e.target.defaultValue === "100M - 1B") {
      marketCapValueHandler(marketCapButtonValue100MTo1B.current.props.value);
    } else if (e.target.defaultValue === "10M - 100M") {
      marketCapValueHandler(marketCapButtonValue10MTo100M.current.props.value);
    } else if (e.target.defaultValue === "0 - 1") {
      priceValueHandler(priceButtonValue0To1.current.props.value);
    } else if (e.target.defaultValue === "1 - 100") {
      priceValueHandler(priceButtonValue1To100.current.props.value);
    } else if (e.target.defaultValue === "101 - 1000") {
      priceValueHandler(priceButtonValue101To1000.current.props.value);
    } else if (e.target.defaultValue === "1000") {
      priceValueHandler(priceButtonValue1000Plus.current.props.value);
    }
  }
  const marketCapValueHandler = (value) => {
    if (value === "10B") {
      form.setFieldsValue({ marketCapFrom: 10000000000, marketCapTo: 0 });
    } else if (value === "1B - 10B") {
      form.setFieldsValue({
        marketCapFrom: 1000000000,
        marketCapTo: 10000000000,
      });
      handleMarketCapFrom(1000000000);
      handleMarketCapTo(10000000000);
    } else if (value === "100M - 1B") {
      form.setFieldsValue({
        marketCapFrom: 100000000,
        marketCapTo: 1000000000,
      });
      handleMarketCapFrom(100000000);
      handleMarketCapTo(1000000000);
    } else if (value === "10M - 100M") {
      form.setFieldsValue({ marketCapFrom: 10000000, marketCapTo: 100000000 });
      handleMarketCapFrom(10000000);
      handleMarketCapTo(100000000);
    }
  };
  function priceValueHandler(value) {
    if (value === "0 - 1") {
      form.setFieldsValue({ priceFromm: 0, priceToo: 1 });
      handlePriceFrom(0);
      handlePriceTo(1);
    } else if (value === "1 - 100") {
      form.setFieldsValue({ priceFromm: 1, priceToo: 100 });
      handlePriceFrom(1);
      handlePriceTo(100);
    } else if (value === "101 - 1000") {
      form.setFieldsValue({ priceFromm: 101, priceToo: 1000 });
      handlePriceFrom(101);
      handlePriceTo(1000);
    } else if (value === "1000") {
      form.setFieldsValue({ priceFromm: 1000, priceToo: 0 });
      handlePriceFrom(1000);
      handlePriceTo(0);
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col span={6} offset={10}>
          <Button
            type="primary"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              borderRadius: "10px",
            }}
            size="large"
            onClick={showMoadlHandler}
          >
            +Add Filtters
          </Button>
          <Button
            onClick={renderHandler}
            type="primary"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              borderRadius: "10px",
              marginLeft: "5px",
            }}
            size="large"
          >
            <ReloadOutlined /> Reload
          </Button>
        </Col>
        <Col span={2}></Col>
      </Row>
      <Modal
        title="More Filters"
        visible={isModalVisible}
        onOk={okHandler}
        okText="Apply Filter"
        onCancel={cancelModalHandler}
      >
        <Form form={form} layout="vertical" name="userForm">
          <Checkbox name="marketCap" onChange={onChangeHandler}>
            <h1>Market Cap</h1>
          </Checkbox>
          <Input.Group size="large">
            <Row gutter={8}>
              <Col>
                <Form.Item
                  name="marketCapFrom"
                  rules={[
                    {
                      required: true,
                      message: "Please input right number.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue("marketCapFrom") > 0) {
                          return Promise.resolve();
                        } else if (
                          getFieldValue("marketCapFrom") < 0 ||
                          getFieldValue("marketCapFrom") === null
                        ) {
                          return Promise.reject(
                            new Error("Not null or negative value.")
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    size="large"
                    style={{ width: "200px" }}
                    onChange={marketCapFromHandler}
                    defaultValue={marketCapFromm}
                    value={marketCapFromm}
                    name="marketCapFromm"
                    disabled={marketCapFilterON}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col span={2} style={{ textAlign: "center", lineHeight: "2.5" }}>
                <span>To</span>
              </Col>
              <Col>
                <Form.Item
                  name="marketCapTo"
                  rules={[
                    {
                      required: true,
                      message: "Please input right number.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue("marketCapTo") > 0) {
                          return Promise.resolve();
                        } else if (
                          getFieldValue("marketCapTo") < 0 ||
                          getFieldValue("marketCapTo") === null
                        ) {
                          return Promise.reject(
                            new Error("Not null or negative value.")
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    disabled={marketCapFilterON}
                    size="large"
                    style={{ width: "200px" }}
                    onChange={marketCapToHandler}
                    name="marketCapToo"
                    value={marketCapToo}
                    defaultValue={marketCapToo}
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
              <Radio.Group defaultValue="10B" buttonStyle="solid" size="large">
                <Radio.Button
                  disabled={marketCapFilterON}
                  value="10B"
                  ref={marketCapButtonValue}
                  onClick={radioButtonValueHandler} //TODO change prices by click
                >
                  {">"}$10B
                </Radio.Button>
                <Radio.Button
                  onClick={radioButtonValueHandler} //TODO change prices by click
                  disabled={marketCapFilterON}
                  value="1B - 10B"
                  ref={marketCapButtonValue1BTo10B}
                >
                  $1B - $10B
                </Radio.Button>
                <Radio.Button
                  onClick={radioButtonValueHandler}
                  ref={marketCapButtonValue100MTo1B}
                  disabled={marketCapFilterON}
                  value="100M - 1B"
                >
                  $100M - $1B
                </Radio.Button>
                <Radio.Button
                  onClick={radioButtonValueHandler}
                  ref={marketCapButtonValue10MTo100M}
                  disabled={marketCapFilterON}
                  value="10M - 100M"
                >
                  $10M - $100M
                </Radio.Button>
              </Radio.Group>
            </Row>
          </Input.Group>
          <Divider></Divider>
          <Checkbox name="price" onChange={onChangeHandler}>
            <h1>Price</h1>
          </Checkbox>
          <Input.Group size="large">
            <Row gutter={8}>
              <Col>
                <Form.Item
                  name="priceFromm"
                  rules={[
                    {
                      required: true,
                      message: "Please input right number.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue("priceFrom") > 0) {
                          return Promise.resolve();
                        } else if (
                          getFieldValue("priceFrom") < 0 ||
                          getFieldValue("priceFrom") === null
                        ) {
                          return Promise.reject(
                            new Error("Not null or negative value.")
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    onChange={priceFromHandler}
                    size="large"
                    style={{ width: "150px" }}
                    name="priceFromm"
                    defaultValue={priceFromm}
                    disabled={priceFilterON}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col span={2} style={{ textAlign: "center", lineHeight: "2.5" }}>
                <span>To</span>
              </Col>
              <Col>
                <Form.Item
                  name="priceToo"
                  rules={[
                    {
                      required: true,
                      message: "Please input right number.",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue("priceTo") > 0) {
                          return Promise.resolve();
                        } else if (
                          getFieldValue("priceTo") < 0 ||
                          getFieldValue("priceTo") === null
                        ) {
                          return Promise.reject(
                            new Error("Not null or negative value.")
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    size="large"
                    style={{ width: "150px" }}
                    onChange={priceToHandler}
                    name="priceToo"
                    defaultValue={priceToo}
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
                <Radio.Button
                  onClick={radioButtonValueHandler}
                  ref={priceButtonValue0To1}
                  disabled={priceFilterON}
                  value="0 - 1"
                  defaultValue="0 - 1"
                >
                  $0 - $1
                </Radio.Button>
                <Radio.Button
                  onClick={radioButtonValueHandler}
                  ref={priceButtonValue1To100}
                  disabled={priceFilterON}
                  value="1 - 100"
                  defaultValue="1 - 100"
                >
                  $1 - $100
                </Radio.Button>
                <Radio.Button
                  onClick={radioButtonValueHandler}
                  ref={priceButtonValue101To1000}
                  disabled={priceFilterON}
                  value="101 - 1000"
                  defaultValue="101 - 1000"
                >
                  $101 - $1,000
                </Radio.Button>
                <Radio.Button
                  onClick={radioButtonValueHandler}
                  ref={priceButtonValue1000Plus}
                  disabled={priceFilterON}
                  value="1000"
                  defaultValue="1000"
                >
                  $1,000+
                </Radio.Button>
              </Radio.Group>
            </Row>
          </Input.Group>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default ModalLayout;
