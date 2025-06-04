"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Button,
  List,
  Typography,
  Layout,
  Card,
  message,
  Modal,
  Spin,
  Badge,
  Divider,
} from "antd";
import {
  SendOutlined,
  BarChartOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Sider, Content } = Layout;

interface JournalEntry {
  id: string;
  text: string;
  timestamp: Date;
  date: string;
}

interface AnalysisResult {
  mood: string;
  emotions: string[];
  summary: string;
  suggestions: string[];
}

export default function DiaryPage() {
  const [inputText, setInputText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isAnalysisModalVisible, setIsAnalysisModalVisible] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      const entriesWithDates = parsedEntries.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      }));
      setEntries(entriesWithDates);
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    localStorage.setItem("journalEntries", JSON.stringify(newEntries));
  };

  const addEntry = () => {
    if (inputText.trim() !== "") {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        text: inputText,
        timestamp: new Date(),
        date: dayjs().format("YYYY-MM-DD"),
      };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      saveEntries(updatedEntries);
      setInputText("");
      message.success("Entrée ajoutée au journal !");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addEntry();
    }
  };

  const getEntriesForDate = (date: string) => {
    return entries.filter((entry) => entry.date === date);
  };

  const getEntriesByDate = () => {
    const entriesByDate: { [key: string]: JournalEntry[] } = {};
    entries.forEach((entry) => {
      if (!entriesByDate[entry.date]) {
        entriesByDate[entry.date] = [];
      }
      entriesByDate[entry.date].push(entry);
    });
    return entriesByDate;
  };

  const getDatesWithEntries = () => {
    const dates = Array.from(new Set(entries.map((entry) => entry.date)));
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  const analyzeJournal = async () => {
    if (entries.length === 0) {
      message.warning("Aucune entrée à analyser !");
      return;
    }

    setIsAnalyzing(true);

    try {
      const journalText = entries
        .map(
          (entry) =>
            `${entry.date} - ${entry.timestamp.toLocaleTimeString()}: ${
              entry.text
            }`
        )
        .join("\n\n");

      const response = await fetch("/api/analyze-journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ journalText }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const analysisData = await response.json();

      if (analysisData.error) {
        throw new Error(analysisData.error);
      }

      setAnalysisResult(analysisData);
      setIsAnalysisModalVisible(true);
      message.success("Analyse terminée !");
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
      message.error("Erreur lors de l'analyse du journal");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentDateEntries = getEntriesForDate(selectedDate);
  const datesWithEntries = getDatesWithEntries();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "34px",
          borderBottom: "1px solid #f0f0f0",
          background: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          <BookOutlined style={{ marginRight: "10px", color: "#895cf5" }} />
          Mon Journal Intime
        </Title>
        <Button
          type="primary"
          icon={<BarChartOutlined />}
          onClick={analyzeJournal}
          loading={isAnalyzing}
          size="large"
          style={{
            background: "#895cf5",
            borderColor: "#895cf5",
            height: "auto",
            padding: "10px 20px",
          }}
        >
          {isAnalyzing ? "Analyse en cours..." : "Analyser mon journal"}
        </Button>
      </div>

      <Layout style={{ flex: 1, background: "white" }}>
        <Sider
          width={300}
          style={{
            background: "#fafafa",
            borderRight: "1px solid #f0f0f0",
            overflow: "auto",
          }}
        >
          <div style={{ padding: "20px" }}>
            <Title level={4} style={{ marginBottom: "15px" }}>
              <ClockCircleOutlined style={{ marginRight: "8px" }} />
              Historique
            </Title>

            <div style={{ marginBottom: "20px" }}>
              <Text strong>Total d'entrées: {entries.length}</Text>
              <br />
              <Text type="secondary">
                Jours avec entrées: {datesWithEntries.length}
              </Text>
            </div>

            <List
              dataSource={datesWithEntries}
              renderItem={(date) => {
                const dateEntries = getEntriesForDate(date);
                const isSelected = date === selectedDate;
                return (
                  <List.Item
                    style={{
                      cursor: "pointer",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      background: isSelected ? "#e6f7ff" : "white",
                      border: isSelected
                        ? "1px solid #1890ff"
                        : "1px solid #f0f0f0",
                    }}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          strong
                          style={{ color: isSelected ? "#1890ff" : "#333" }}
                        >
                          {dayjs(date).format("DD/MM/YYYY")}
                        </Text>
                        <Badge
                          count={dateEntries.length}
                          style={{ backgroundColor: "#895cf5" }}
                        />
                      </div>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {dayjs(date).format("dddd")}
                      </Text>
                    </div>
                  </List.Item>
                );
              }}
            />
          </div>
        </Sider>

        <Content
          style={{
            padding: "20px",
            overflow: "auto",
            paddingBottom: "120px",
          }}
        >
          <Card
            title={`Journal du ${dayjs(selectedDate).format("DD/MM/YYYY")}`}
            style={{ marginBottom: "20px" }}
          >
            <List
              itemLayout="vertical"
              dataSource={currentDateEntries}
              locale={{ emptyText: "Aucune entrée pour cette date" }}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Card
                    size="small"
                    style={{
                      background: "#f9f9f9",
                      border: "1px solid #e8e8e8",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ marginBottom: "8px" }}>
                      <Text type="secondary">
                        {item.timestamp.toLocaleTimeString()}
                      </Text>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                      {item.text}
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Content>
      </Layout>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 300,
          right: 0,
          padding: "20px",
          background: "white",
          borderTop: "1px solid #f0f0f0",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Écrivez vos pensées, sentiments ou événements de la journée..."
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ flex: 1, borderRadius: "8px" }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={addEntry}
            disabled={!inputText.trim()}
            style={{
              background: "#895cf5",
              borderColor: "#895cf5",
              height: "auto",
              padding: "12px 20px",
              alignSelf: "flex-end",
              color: "white",
            }}
          >
            Ajouter
          </Button>
        </div>
      </div>

      <Modal
        title={
          <span>
            <BarChartOutlined
              style={{ marginRight: "8px", color: "#895cf5" }}
            />
            Analyse de votre journal
          </span>
        }
        open={isAnalysisModalVisible}
        onCancel={() => setIsAnalysisModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsAnalysisModalVisible(false)}>
            Fermer
          </Button>,
        ]}
        width={700}
      >
        {analysisResult ? (
          <div>
            <Card
              title="État d'esprit général"
              style={{ marginBottom: "15px" }}
            >
              <Text>{analysisResult.mood}</Text>
            </Card>

            <Card title="Émotions identifiées" style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {analysisResult.emotions.map((emotion, index) => (
                  <Badge key={index} color="#895cf5" text={emotion} />
                ))}
              </div>
            </Card>

            <Card title="Résumé" style={{ marginBottom: "15px" }}>
              <Text>{analysisResult.summary}</Text>
            </Card>

            <Card title="Suggestions">
              <ul>
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    <Text>{suggestion}</Text>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
            <div style={{ marginTop: "20px" }}>
              <Text>Analyse en cours...</Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
