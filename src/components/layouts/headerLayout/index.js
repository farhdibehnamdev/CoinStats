import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import Complete from "../searchBarLayout";
import SearchBar from "./style";
import "../switchLayout/styles.css";
const { Header } = Layout;
export const HeaderLayout = () => {
  return (
    <Header
      className="header"
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        background: "#fff",
      }}
    >
      <Link to="/">
        <div className="logo" />
      </Link>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Prices</Link>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <Link to="/marketcapof">Market Cap Of</Link>
        </Menu.Item> */}
      </Menu>
      <SearchBar>
        <Complete />
      </SearchBar>
    </Header>
  );
};

export default HeaderLayout;
