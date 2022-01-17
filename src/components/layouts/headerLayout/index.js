import React from "react";
import { Layout, Menu } from "antd";
import Complete from "../searchBarLayout";
import "../switchLayout/styles.css";

const { Header } = Layout;
export const HeaderLayout = () => {
  return (
    <React.Fragment>
      <Header
        className="header"
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#fff",
        }}
      >
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Prices</Menu.Item>
          <Menu.Item key="2">Watchlist</Menu.Item>
          <Menu.Item key="3">Exchanges</Menu.Item>
          <Menu.Item key="4">Market Cap Of</Menu.Item>
        </Menu>

        <div className="searchBar">
          <Complete />
        </div>
      </Header>
    </React.Fragment>
  );
};

export default HeaderLayout;
