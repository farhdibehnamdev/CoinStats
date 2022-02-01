import React from "react";
import { Link } from "react-router-dom";
import { TinyArea } from "@ant-design/charts";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
const config = {
  height: 30,
  width: 120,
  autoFit: false,
  smooth: true,
};
export const columns = [
  {
    title: "#",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => {
      const name = text;
      return (
        <React.Fragment>
          <img width="30" height="30" src={record.icon} alt={text} />
          <span>
            <Link to={`/coins/${name}`} state={{ id: record.id }}>
              {name}
            </Link>
          </span>
          <span>{record.symbol}</span>
        </React.Fragment>
      );
    },
  },
  {
    title: "3h %",
    key: "Last1h",
    dataIndex: "Last1h",
    render: (text, record) => {
      return (
        <React.Fragment>
          {Number(record["3h"]) > 0 ? (
            <strong style={{ color: "#16c784" }}>
              <CaretUpOutlined twoToneColor="#16c784" />
              {Number(record["3h"]) + "%"}
            </strong>
          ) : (
            <strong style={{ color: "#ea3943" }}>
              <CaretDownOutlined twoToneColor="#ea3943" />
              {Number(record["3h"]) + "%"}
            </strong>
          )}
        </React.Fragment>
      );
    },
  },
  {
    title: "24h %",
    key: "Last24h",
    dataIndex: "Last24h",
    render: (text, record) => {
      return (
        <React.Fragment>
          {Number(record["24h"]) > 0 ? (
            <strong style={{ color: "#16c784" }}>
              <CaretUpOutlined twoToneColor="#16c784" />
              {Number(record["24h"]) + "%"}
            </strong>
          ) : (
            <strong style={{ color: "#ea3943" }}>
              <CaretDownOutlined twoToneColor="#ea3943" />
              {Number(record["24h"]) + "%"}
            </strong>
          )}
        </React.Fragment>
      );
    },
  },
  {
    title: "7d %",
    key: "Last7d",
    dataIndex: "Last7d",
    render: (text, record) => {
      return (
        <React.Fragment>
          {Number(record["7d"]) > 0 ? (
            <strong style={{ color: "#16c784" }}>
              <CaretUpOutlined twoToneColor="#16c784" />
              {Number(record["7d"]) + "%"}
            </strong>
          ) : (
            <strong style={{ color: "#ea3943" }}>
              <CaretDownOutlined twoToneColor="#ea3943" />
              {Number(record["7d"]) + "%"}
            </strong>
          )}
        </React.Fragment>
      );
    },
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "Market Cap",
    key: "marketCap",
    dataIndex: "marketCap",
  },
  {
    title: "Last 7 Days",
    key: "last7Day",
    dataIndex: "last7Day",
    responsive: ["lg", "sm", "xs", "xl"],
    render: (text, record) => {
      return (
        <React.Fragment>
          <TinyArea {...config} data={record.sparkline} />
        </React.Fragment>
      );
    },
  },
];

export default columns;
