import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { getRequest } from "utils/api";
const { Meta } = Card;
export const NewsLayout = () => {
  const [newData, setNewsData] = useState([]);
  let count = 0;
  const arrayImage = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
  ];
  const rows = [...Array(Math.ceil(newData.length / 3))];
  useEffect(() => {
    getRequest("/news")
      .then((response) => {
        const topTenNews = response.data?.slice(0, 10);
        const news = topTenNews.map((topNews, id) => {
          return {
            url: topNews.url,
            source: topNews.source,
            title: topNews.title,
            image: arrayImage[id],
          };
        });
        setNewsData(news);
      })
      .catch((error) => console.log(error));
  }, []);

  const newsRows = rows.map((row, idx) => newData.slice(idx * 4, idx * 4 + 4));

  const content = newsRows.map((row, idx) => (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {row.map((r, id) => (
        <Col
          style={{ marginTop: "20px" }}
          xxl={{ span: 3, offset: 2 }}
          xl={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 1 }}
          xs={{ span: 16, offset: 1 }}
          sm={{ span: 8, offset: 1 }}
        >
          <Card
            key={count}
            style={{
              width: 250,
              borderRadius: "10px",
              border: "solid 2px #e5e5e5",
            }}
            cover={
              <img
                width={200}
                height={200}
                alt="CryptoNews"
                src={
                  require(`assets/newsimages/${arrayImage[count++]}`).default
                }
              />
            }
          >
            <Meta
              title={<span style={{ fontSize: "13px" }}>{r.title}</span>}
              description={
                <div>
                  <Button type="link" block href={r.url}>
                    <div>
                      <span
                        style={{
                          fontSize: "12px",
                          marginRight: "30px",
                          color: "red",
                        }}
                      >
                        {r.source}
                      </span>
                      <span style={{ fontSize: "12px" }}>Read More</span>
                    </div>
                  </Button>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  ));
  return (
    <React.Fragment>
      <div
        style={{ marginBottom: "20px", marginLeft: "200px", marginTop: "20px" }}
      >
        {content}
      </div>
    </React.Fragment>
  );
};

export default NewsLayout;
