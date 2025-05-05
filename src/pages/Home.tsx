import { useState } from "react";
import { Input, Button, List, Avatar, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Container from "../components/Container";

const { TextArea } = Input;
const { Title } = Typography;

interface Message {
  id: number;
  text: string;
  timestamp: Date;
}

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);


  const sendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container>
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Journal
      </Title>

      <List
        itemLayout="horizontal"
        dataSource={messages}
        locale={{ emptyText: "Aucune citation n'a été ajoutée" }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: "#895cf5" }}>
                  {item.id}
                </Avatar>
              }
              title={
                <span>
                  {item.timestamp.toLocaleDateString()} à{" "}
                  {item.timestamp.toLocaleTimeString()}
                </span>
              }
              description={
                <div style={{ whiteSpace: "pre-wrap" }}>{item.text}</div>
              }
            />
          </List.Item>
        )}
        style={{ marginBottom: 100 }}
      />

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "20px 150px",
          background: "white",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
          display: "flex",
          alignItems: "flex-start",
          zIndex: 1000,
        }}
      >
        <TextArea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Écrivez votre citation ici..."
          autoSize={{ minRows: 1, maxRows: 6 }}
          style={{ flex: 1, marginRight: 15, borderRadius: 6 }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={sendMessage}
          style={{ 
        background: "#895cf5", 
        height: "auto", 
        padding: "8px 15px",
        alignSelf: "flex-end" 
          }}
        >
          Envoyer
        </Button>
      </div>
    </Container>
  );
};

export default Home;
