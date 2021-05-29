import { Avatar, Icon, List } from "antd";
import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../_actions/message_actions";
import Message from "./Sections/Message";
import CardComponent from "./Sections/CardComponent";

const Chatbot = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);

  useEffect(() => {
    eventQuery("welcomeToMyWebSite");
  }, []);

  const textQuery = async (text) => {
    let conversation = {
      who: "user",
      content: {
        text: {
          text,
        },
      },
    };

    dispatch(saveMessage(conversation));

    const textQueryParams = {
      text,
    };

    try {
      const res = await Axios.post(
        `/api/dialogflow/textQuery`,
        textQueryParams
      );

      for (const content of res.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "삐비빕-_- 에러-_- 발생-_-",
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async (event) => {
    const eventQueryParams = {
      event,
    };

    try {
      const res = await Axios.post(
        `/api/dialogflow/eventQuery`,
        eventQueryParams
      );

      for (const content of res.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "삐비빕-_- 에러-_- 발생-_-",
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("내용을 입력하세요!");
      }

      textQuery(e.target.value);

      e.target.value = "";
    }
  };

  const renderCard = (cards) => {
    console.log(cards);
    return cards.map((card, i) => (
      <CardComponent uniq={i} cardinfo={card.structValue} />
    ));
  };

  const renderOneMessage = (msg, i) => {
    if (msg.content && msg.content.text && msg.content.text.text)
      return <Message uniq={i} who={msg.who} text={msg.content.text.text} />;
    else if (msg.content && msg.content.payload.fields.card) {
      const avatarSrc =
        msg.who === "bot" ? (
          <Icon type="robot" />
        ) : (
          <Icon style={{ color: "#bef9fe" }} type="smile" />
        );
      return (
        <List.Item style={{ padding: "1rem" }}>
          <List.Item.Meta
            avatar={<Avatar icon={avatarSrc} />}
            title={msg.who}
            description={renderCard(
              msg.content.payload.fields.card.listValue.values
            )}
          />
        </List.Item>
      );
    }
  };

  const renderMessage = (msgs) => {
    if (msgs) return msgs.map((msg, i) => renderOneMessage(msg, i));
    else return null;
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid #111",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {renderMessage(messages)}
      </div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={handleKeyPress}
        type="text"
      />
    </div>
  );
};

export default Chatbot;
