import { Card, Icon } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";

const CardComponent = ({ uniq, cardinfo }) => {
  return (
    <Card
      key={uniq}
      style={{ width: 300 }}
      cover={
        <img
          alt={cardinfo.fields.description.stringValue}
          src={cardinfo.fields.image.stringValue}
        />
      }
      actions={[
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={cardinfo.fields.link.stringValue}
        >
          <Icon type="ellipsis" key="ellipsis" />
        </a>,
      ]}
    >
      <Meta
        title={cardinfo.fields.stack.stringValue}
        description={cardinfo.fields.description.stringValue}
      />
    </Card>
  );
};

export default CardComponent;
