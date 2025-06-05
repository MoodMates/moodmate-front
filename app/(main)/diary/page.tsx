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
  Drawer,
} from "antd";
import {
  SendOutlined,
  BarChartOutlined,
  BookOutlined,
  ClockCircleOutlined,
  MenuOutlined,
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
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      const entriesWithDates = parsedEntries.map((entry: JournalEntry) => ({
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

  // Composant Sidebar pour la réutiliser
  const SidebarContent = () => (
    <div style={{ padding: "20px" }}>
      <Title level={4} style={{ marginBottom: "15px" }}>
        <ClockCircleOutlined style={{ marginRight: "8px" }} />
        Historique
      </Title>

      <div style={{ marginBottom: "20px" }}>
        <Text strong>Total d&apos;entrées: {entries.length}</Text>
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
                border: isSelected ? "1px solid #1890ff" : "1px solid #f0f0f0",
              }}
              onClick={() => {
                setSelectedDate(date);
                setDrawerVisible(false); // Fermer le drawer sur mobile
              }}
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
  );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      className="diary-container"
    >
      {/* Header responsive */}
      <div
        style={{
          padding: "clamp(16px, 4vw, 34px)",
          borderBottom: "1px solid #f0f0f0",
          background: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
        className="diary-header"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Bouton menu mobile pour historique */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{
              color: "#895cf5",
              fontSize: "18px",
              padding: "4px 8px",
            }}
            className="mobile-history-button"
          />

          <Title
            level={2}
            style={{
              margin: 0,
              fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
            }}
          >
            <BookOutlined style={{ marginRight: "10px", color: "#895cf5" }} />
            Mon Journal Intime
          </Title>
        </div>

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
            padding: "clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
          }}
          className="analyze-button"
        >
          {isAnalyzing ? "Analyse..." : "Analyser"}
        </Button>
      </div>

      <Layout style={{ flex: 1, background: "white" }} className="diary-layout">
        {/* Sidebar desktop */}
        <Sider
          width={300}
          style={{
            background: "#fafafa",
            borderRight: "1px solid #f0f0f0",
            overflow: "auto",
          }}
          className="desktop-sidebar"
        >
          <SidebarContent />
        </Sider>

        {/* Drawer mobile pour l'historique */}
        <Drawer
          title="Historique"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={280}
          className="mobile-history-drawer"
        >
          <SidebarContent />
        </Drawer>

        <Content
          style={{
            padding: "clamp(16px, 4vw, 20px)",
            overflow: "auto",
            paddingBottom: "clamp(100px, 20vw, 120px)", // Espace pour la zone de saisie
          }}
          className="diary-content"
        >
          <Card
            title={`Journal du ${dayjs(selectedDate).format("DD/MM/YYYY")}`}
            style={{
              marginBottom: "20px",
              borderRadius: "clamp(8px, 2vw, 12px)",
            }}
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
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ marginBottom: "8px" }}>
                      <Text type="secondary">
                        {item.timestamp.toLocaleTimeString()}
                      </Text>
                    </div>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.6",
                        fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                      }}
                    >
                      {item.text}
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Content>
      </Layout>

      {/* Zone de saisie responsive */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(12px, 3vw, 20px)",
          background: "white",
          borderTop: "1px solid #f0f0f0",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
        className="diary-input-area"
      >
        <div
          style={{
            display: "flex",
            gap: "clamp(8px, 2vw, 15px)",
            alignItems: "flex-start",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Écrivez vos pensées, sentiments ou événements de la journée..."
            autoSize={{ minRows: 2, maxRows: 4 }}
            style={{
              flex: 1,
              borderRadius: "8px",
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
            }}
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
              padding: "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)",
              alignSelf: "flex-end",
              color: "white",
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              borderRadius: "8px",
            }}
            className="add-entry-button"
          >
            <span className="button-text-desktop">Ajouter</span>
          </Button>
        </div>
      </div>

      {/* Modal d'analyse responsive */}
      <Modal
        title={
          <span style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>
            <BarChartOutlined
              style={{ marginRight: "8px", color: "#895cf5" }}
            />
            Analyse de votre journal
          </span>
        }
        open={isAnalysisModalVisible}
        onCancel={() => setIsAnalysisModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setIsAnalysisModalVisible(false)}
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)" }}
          >
            Fermer
          </Button>,
        ]}
        width="90%"
        style={{ maxWidth: "700px" }}
        className="analysis-modal"
      >
        {analysisResult ? (
          <div>
            <Card
              title="État d'esprit général"
              style={{
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <Text style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)" }}>
                {analysisResult.mood}
              </Text>
            </Card>

            <Card
              title="Émotions identifiées"
              style={{
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {analysisResult.emotions.map((emotion, index) => (
                  <Badge
                    key={index}
                    color="#895cf5"
                    text={emotion}
                    style={{ fontSize: "clamp(0.8rem, 2vw, 0.9rem)" }}
                  />
                ))}
              </div>
            </Card>

            <Card
              title="Résumé"
              style={{
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <Text style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)" }}>
                {analysisResult.summary}
              </Text>
            </Card>

            <Card title="Suggestions" style={{ borderRadius: "8px" }}>
              <ul style={{ paddingLeft: "clamp(16px, 4vw, 20px)" }}>
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    <Text style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)" }}>
                      {suggestion}
                    </Text>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
            <div style={{ marginTop: "20px" }}>
              <Text style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)" }}>
                Analyse en cours...
              </Text>
            </div>
          </div>
        )}
      </Modal>

      {/* CSS pour la responsivité */}
      <style jsx global>{`
        /* Mobile */
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }

          .mobile-history-button {
            display: flex !important;
          }

          .diary-input-area {
            left: 0 !important;
          }

          .button-text-desktop {
            display: none;
          }

          .button-text-mobile {
            display: inline;
          }

          .analyze-button .anticon + span {
            display: none;
          }
        }

        /* Desktop */
        @media (min-width: 769px) {
          .mobile-history-button {
            display: none !important;
          }

          .diary-input-area {
            left: 300px !important;
          }

          .button-text-desktop {
            display: inline;
          }

          .button-text-mobile {
            display: none;
          }
        }

        /* Très petits écrans */
        @media (max-width: 480px) {
          .diary-header {
            padding: 12px !important;
          }

          .diary-content {
            padding: 12px !important;
          }

          .diary-input-area {
            padding: 8px !important;
          }
        }

        /* Tablettes en mode paysage */
        @media (min-width: 769px) and (max-width: 1024px) {
          .desktop-sidebar {
            width: 250px !important;
          }

          .diary-input-area {
            left: 250px !important;
          }
        }

        /* Amélioration des zones tactiles sur mobile */
        @media (max-width: 768px) {
          .ant-list-item {
            min-height: 60px;
          }

          .ant-btn {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}
