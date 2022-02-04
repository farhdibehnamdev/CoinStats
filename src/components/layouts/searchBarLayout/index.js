import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

import { AutoComplete } from "antd";
import { getRequest } from "utils/api/index";
import { RoundSearchBar } from "./styles.js";
import "./styles.css";
const renderTitle = (title) => <span>{title}</span>;
const renderItem = (name, id, icon) => ({
  value: name,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>
        <Link to={`coins/${name}`} state={{ id }}>
          {name}
        </Link>
      </span>
      <span>
        <Avatar src={icon} />
      </span>
    </div>
  ),
});

export const Complete = () => {
  const [querySuggest, setQuerySuggest] = useState("");
  const [coinSearched, setCoinSearched] = useState([]);
  const handleSearch = (value) => {
    setQuerySuggest(value);
  };

  useEffect(() => {
    const getCoins = async () => {
      await getRequest(`v2/search-suggestions?query=${querySuggest}`)
        .then((response) => {
          console.log(querySuggest);

          const { coins } = response.data.data;
          const selectedCoins = coins.map((c) => {
            return {
              id: c.uuid,
              icon: c.iconUrl,
              name: c.name,
            };
          });
          setCoinSearched(selectedCoins);
        })
        .catch((error) => console.log(error));
    };
    getCoins();
  }, [querySuggest]);
  const options = [
    {
      label: renderTitle("Coins"),
      // options: [renderItem("AntDesign"), renderItem("AntDesign UI")],
      options: coinSearched.map((coin) => {
        return renderItem(coin.name, coin.id, coin.icon);
      }),
    },
  ];

  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: 250 }}
      options={options}
      onChange={handleSearch}
    >
      <RoundSearchBar size="large" placeholder="Search..." />
    </AutoComplete>
  );
};

export default Complete;
