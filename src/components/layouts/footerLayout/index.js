import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
export const FooterLayout = () => {
  return (
    <React.Fragment>
      <Footer
        style={{
          textAlign: "center",
          background: "#E8F5FF",
        }}
      >
        CryptoMarket ©2022 Created by ♥
      </Footer>
    </React.Fragment>
  );
};

export default FooterLayout;
