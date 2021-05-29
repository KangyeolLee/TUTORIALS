import React from "react";
import { Icon, List, Avatar } from "antd";

const Message = ({ uniq, who, text }) => {
  const avatarSrc =
    who === "bot" ? (
      <Icon type="robot" />
    ) : (
      <Icon style={{ color: "#bef9fe" }} type="smile" />
    );
  return (
    <List.Item key={uniq} style={{ padding: "1rem" }}>
      <List.Item.Meta
        avatar={<Avatar icon={avatarSrc} />}
        title={who}
        description={text}
      />
    </List.Item>
  );
};

export default Message;
