"use client";

import { useState } from "react";
import { Typography, Card, Button, Slider, Statistic, Row, Col } from "antd";
import {
  BookOutlined,
  EditOutlined,
  LineChartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Area } from "@ant-design/plots";
import { useAuth } from "@/app/context/AuthContext";

const { Title, Paragraph } = Typography;

export default function Home() {
  const { user, isLoggedIn } = useAuth();

  const userName = user?.prenom || "Visiteur";

  const todayRating = 8;
  const quotes = [
    "La vie est comme un voyage imprévisible, rempli de hauts et de bas. Ce n'est pas la destination qui compte vraiment, mais plutôt la façon dont nous choisissons de parcourir le chemin et les leçons que nous apprenons en route.",
    "Les moments les plus sombres de notre vie peuvent souvent nous révéler une force intérieure que nous ne soupçonnions même pas. C'est dans l'adversité que nous découvrons véritablement qui nous sommes.",
    "Le bonheur n'est pas l'absence de problèmes, mais la capacité à les surmonter. Chaque défi est une opportunité déguisée, une chance de grandir et de devenir une meilleure version de soi-même.",
    "Prendre soin de sa santé mentale est aussi important que prendre soin de son corps. Accordez-vous la permission de vous reposer, de réfléchir et de vous régénérer quand vous en avez besoin.",
    "Notre perception façonne notre réalité. En changeant simplement la façon dont nous voyons les choses, nous pouvons transformer une expérience négative en une occasion d'apprentissage précieuse.",
  ];
  const currentQuote = quotes[0];

  const moodData = [
    { date: "01/05", rating: 7 },
    { date: "02/05", rating: 6 },
    { date: "03/05", rating: 8 },
    { date: "04/05", rating: 9 },
    { date: "05/05", rating: 7 },
    { date: "06/05", rating: 8 },
    { date: "07/05", rating: 10 },
  ];

  const [dayRating, setDayRating] = useState(todayRating);

  const config = {
    data: moodData,
    xField: "date",
    yField: "rating",
    smooth: true,
    areaStyle: {
      fill: "l(270) 0:#ffffff 0.5:#b894f6 1:#895cf5",
    },
    line: {
      color: "#895cf5",
    },
    yAxis: {
      min: 0,
      max: 10,
    },
  };

  const saveDayRating = () => {
    const today = new Date().toISOString().split("T")[0];
    const ratingKey = `mood_${user?.id || "guest"}_${today}`;
    localStorage.setItem(ratingKey, dayRating.toString());

    console.log(`Note sauvegardée: ${dayRating}/10 pour ${today}`);
  };

  return (
    <div
      style={{
        padding: "1rem",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #895cf5 0%, rgb(255, 255, 255) 50%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Title
            level={1}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "0.5rem",
              color: "white",
              padding: "0 1rem",
            }}
          >
            👋 Salut {userName} !!
            {!isLoggedIn && (
              <span
                style={{
                  fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
                  display: "block",
                  marginTop: "0.5rem",
                  opacity: 0.8,
                  padding: "0 1rem",
                }}
              >
                <Link
                  href="/login"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Connectez-vous
                </Link>{" "}
                pour personnaliser votre expérience
              </span>
            )}
          </Title>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card
              style={{
                height: "auto",
                minHeight: "280px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #eaeaea",
                borderRadius: "12px",
              }}
              bordered={false}
            >
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <Title
                  level={3}
                  style={{
                    color: "#895cf5",
                    marginBottom: "1rem",
                    background:
                      "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  }}
                >
                  <SmileOutlined style={{ marginRight: 8 }} />
                  Note ta journée
                </Title>
                <div style={{ padding: "0 1rem", marginBottom: "1rem" }}>
                  <Slider
                    value={dayRating}
                    min={1}
                    max={10}
                    onChange={(value) => setDayRating(value)}
                    tooltip={{ formatter: (value) => `${value}/10` }}
                    trackStyle={{
                      background:
                        "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                    }}
                    handleStyle={{
                      borderColor: "#895cf5",
                      backgroundColor: "#895cf5",
                    }}
                  />
                </div>
                <Statistic
                  value={dayRating}
                  suffix="/10"
                  valueStyle={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    background:
                      "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                />
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: "1rem",
                    background:
                      "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                    border: "none",
                    width: "auto",
                    minWidth: "120px",
                  }}
                  icon={<EditOutlined />}
                  onClick={saveDayRating}
                >
                  Sauvegarder
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Card
              style={{
                height: "auto",
                minHeight: "280px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #eaeaea",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  padding: "1rem 0",
                }}
              >
                <Title
                  level={3}
                  style={{
                    marginBottom: "1.5rem",
                    background:
                      "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  }}
                >
                  Citations
                </Title>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "120px",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 10,
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      color: "#a18cd1",
                      opacity: 0.3,
                      fontFamily: "Georgia, serif",
                      lineHeight: 1,
                    }}
                  >
                    &ldquo;
                  </span>
                  <Paragraph
                    style={{
                      fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)",
                      lineHeight: 1.6,
                      color: "rgba(144, 144, 144, 0.85)",
                      textAlign: "center",
                      padding: "0 2rem",
                      fontStyle: "italic",
                      margin: "0 auto",
                      position: "relative",
                      zIndex: 1,
                      maxWidth: "100%",
                    }}
                  >
                    {currentQuote}
                  </Paragraph>
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 10,
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      color: "#a18cd1",
                      opacity: 0.3,
                      fontFamily: "Georgia, serif",
                      lineHeight: 1,
                    }}
                  >
                    &rdquo;
                  </span>
                </div>
              </div>
            </Card>
          </Col>

          {/* Graphique - Prend toute la largeur sur mobile et tablette */}
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card
              title={
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  }}
                >
                  <LineChartOutlined /> Évolution de ton humeur
                </span>
              }
              style={{
                height: "auto",
                minHeight: "350px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #eaeaea",
                borderRadius: "12px",
              }}
            >
              <div style={{ height: "250px", width: "100%" }}>
                <Area
                  {...config}
                  height={250}
                  autoFit={true} // S'adapte automatiquement à la largeur du conteneur
                  style={{
                    fill: "l(270) 0:#ffffff 0.5:#c5a3ff 1:#7b47e5",
                  }}
                  line={{
                    color: "#6c3ad1",
                  }}
                />
              </div>
            </Card>
          </Col>

          {/* Journal Personnel */}
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              style={{
                height: "auto",
                minHeight: "350px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #eaeaea",
                borderRadius: "12px",
              }}
            >
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <BookOutlined
                  style={{
                    fontSize: "clamp(3rem, 8vw, 5rem)",
                    marginBottom: "1rem",
                    color: "#895cf5",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                />
                <Title
                  level={3}
                  style={{
                    marginBottom: "1.5rem",
                    background:
                      "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  }}
                >
                  Journal Personnel
                </Title>
                <Paragraph
                  style={{
                    marginBottom: "1.5rem",
                    color: "#444",
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    padding: "0 1rem",
                  }}
                >
                  {isLoggedIn
                    ? "Accède à ton journal pour suivre tes humeurs et réflexions quotidiennes."
                    : "Connecte-toi pour accéder à ton journal personnel."}
                </Paragraph>
                <Link href={isLoggedIn ? "/diary" : "/login"}>
                  <Button
                    size="large"
                    icon={<BookOutlined />}
                    style={{
                      background:
                        "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                      color: "white",
                      border: "none",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      height: "auto",
                      padding: "12px 24px",
                    }}
                  >
                    {isLoggedIn ? "Ouvrir le journal" : "Se connecter"}
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
