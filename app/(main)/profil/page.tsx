"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  Select,
  message,
  Divider,
  Space,
  Tag,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CalendarOutlined,
  BookOutlined,
  SmileOutlined,
  TrophyOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;
const { Option } = Select;

interface UserStats {
  totalEntries: number;
  currentStreak: number;
  averageMood: number;
  joinDate: string;
}

export default function ProfilPage() {
  const { user, isLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    totalEntries: 0,
    currentStreak: 0,
    averageMood: 0,
    joinDate: "",
  });
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        age: user.age,
        genre: user.genre,
      });

      calculateUserStats();
    }
  }, [user, form]);

  const calculateUserStats = () => {
    if (!user) return;

    const journalKey = `moodmate_journal_${user.id}`;
    const journalEntries = JSON.parse(localStorage.getItem(journalKey) || "{}");

    let totalEntries = 0;
    let totalMoodRating = 0;
    let moodCount = 0;

    Object.keys(journalEntries).forEach((date) => {
      totalEntries += journalEntries[date].length;
    });

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const ratingKey = `mood_${user.id}_${dateStr}`;
      const rating = localStorage.getItem(ratingKey);

      if (rating) {
        totalMoodRating += parseInt(rating);
        moodCount++;
      }
    }

    let currentStreak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];

      if (journalEntries[dateStr] && journalEntries[dateStr].length > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    setUserStats({
      totalEntries,
      currentStreak,
      averageMood: moodCount > 0 ? Math.round(totalMoodRating / moodCount) : 0,
      joinDate: user.id
        ? new Date(parseInt(user.id)).toLocaleDateString()
        : "N/A",
    });
  };

  const onFinish = async (values: any) => {
    if (!user) return;

    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("moodmate_users") || "[]");

      const updatedUsers = users.map((u: any) =>
        u.id === user.id ? { ...u, ...values } : u
      );

      localStorage.setItem("moodmate_users", JSON.stringify(updatedUsers));

      const updatedUser = { ...user, ...values };
      localStorage.setItem("moodmate_user", JSON.stringify(updatedUser));

      message.success("Profil mis à jour avec succès !");
      setIsEditing(false);
    } catch (error) {
      message.error("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return "#52c41a";
    if (mood >= 6) return "#faad14";
    if (mood >= 4) return "#fa8c16";
    return "#f5222d";
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30)
      return { color: "gold", text: "🏆 Champion", level: "Légendaire" };
    if (streak >= 14)
      return { color: "purple", text: "🔥 En feu", level: "Expert" };
    if (streak >= 7)
      return { color: "blue", text: "⭐ Régulier", level: "Intermédiaire" };
    if (streak >= 3)
      return { color: "green", text: "🌱 Débutant", level: "Novice" };
    return { color: "default", text: "🎯 Nouveau", level: "Débutant" };
  };

  if (!isLoggedIn || !user) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={3}>
          Veuillez vous connecter pour accéder à votre profil
        </Title>
      </div>
    );
  }

  const streakBadge = getStreakBadge(userStats.currentStreak);

  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Title
          level={1}
          style={{
            marginBottom: "50px",
            color: "#895cf5",
            fontSize: "36px",
          }}
        >
          <UserOutlined style={{ marginRight: "15px", fontSize: "36px" }} />
          Mon Profil
        </Title>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={8}>
            <Card
              style={{
                textAlign: "center",
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "30px",
                borderRadius: "16px",
              }}
            >
              <Avatar
                size={150}
                style={{
                  backgroundColor: "white",
                  color: "#895cf5",
                  fontSize: "60px",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                {user.prenom?.[0]?.toUpperCase()}
                {user.nom?.[0]?.toUpperCase()}
              </Avatar>

              <Title
                level={2}
                style={{
                  color: "white",
                  marginBottom: "15px",
                  fontSize: "32px",
                }}
              >
                {user.prenom} {user.nom}
              </Title>

              <Text
                style={{ color: "rgba(255,255,255,0.8)", fontSize: "20px" }}
              >
                <MailOutlined
                  style={{ marginRight: "10px", fontSize: "20px" }}
                />
                {user.email}
              </Text>

              <Divider
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  margin: "30px 0",
                }}
              />

              <Space direction="vertical" size="large">
                <Tag
                  color={streakBadge.color}
                  style={{
                    fontSize: "18px",
                    padding: "8px 16px",
                    borderRadius: "20px",
                  }}
                >
                  {streakBadge.text}
                </Tag>
                <Text
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}
                >
                  <CalendarOutlined
                    style={{ marginRight: "8px", fontSize: "16px" }}
                  />
                  Membre depuis le {userStats.joinDate}
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Row gutter={[24, 24]}>
              <Col xs={12} md={6}>
                <Card style={{ padding: "20px", borderRadius: "12px" }}>
                  <Statistic
                    title={
                      <span style={{ fontSize: "16px", fontWeight: 600 }}>
                        Entrées totales
                      </span>
                    }
                    value={userStats.totalEntries}
                    prefix={
                      <BookOutlined
                        style={{ color: "#895cf5", fontSize: "24px" }}
                      />
                    }
                    valueStyle={{
                      color: "#895cf5",
                      fontSize: "32px",
                      fontWeight: "bold",
                    }}
                  />
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card style={{ padding: "20px", borderRadius: "12px" }}>
                  <Statistic
                    title={
                      <span style={{ fontSize: "16px", fontWeight: 600 }}>
                        Série actuelle
                      </span>
                    }
                    value={userStats.currentStreak}
                    suffix={<span style={{ fontSize: "18px" }}>jours</span>}
                    prefix={
                      <TrophyOutlined
                        style={{ color: "#52c41a", fontSize: "24px" }}
                      />
                    }
                    valueStyle={{
                      color: "#52c41a",
                      fontSize: "32px",
                      fontWeight: "bold",
                    }}
                  />
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card style={{ padding: "20px", borderRadius: "12px" }}>
                  <Statistic
                    title={
                      <span style={{ fontSize: "16px", fontWeight: 600 }}>
                        Humeur moyenne
                      </span>
                    }
                    value={userStats.averageMood}
                    suffix={<span style={{ fontSize: "18px" }}>/10</span>}
                    prefix={
                      <SmileOutlined
                        style={{
                          color: getMoodColor(userStats.averageMood),
                          fontSize: "24px",
                        }}
                      />
                    }
                    valueStyle={{
                      color: getMoodColor(userStats.averageMood),
                      fontSize: "32px",
                      fontWeight: "bold",
                    }}
                  />
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card style={{ padding: "20px", borderRadius: "12px" }}>
                  <div style={{ textAlign: "center" }}>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "15px",
                      }}
                    >
                      Progression du mois
                    </Text>
                    <Progress
                      type="circle"
                      percent={Math.min(
                        (userStats.currentStreak / 30) * 100,
                        100
                      )}
                      width={80}
                      strokeColor="#895cf5"
                      strokeWidth={8}
                      style={{ marginTop: "10px" }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Informations personnelles
                  </span>
                  <Button
                    type={isEditing ? "default" : "primary"}
                    icon={
                      isEditing ? (
                        <SaveOutlined style={{ fontSize: "18px" }} />
                      ) : (
                        <EditOutlined style={{ fontSize: "18px" }} />
                      )
                    }
                    onClick={() => {
                      if (isEditing) {
                        form.submit();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    loading={loading}
                    size="large"
                    style={{
                      backgroundColor: isEditing ? "#52c41a" : "#895cf5",
                      color: "white",
                      borderColor: isEditing ? "#52c41a" : "#895cf5",
                      fontSize: "16px",
                      height: "45px",
                      padding: "0 25px",
                      borderRadius: "8px",
                    }}
                  >
                    {isEditing ? "Sauvegarder" : "Modifier"}
                  </Button>
                </div>
              }
              style={{
                marginTop: "32px",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                disabled={!isEditing}
                size="large"
              >
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="prenom"
                      label={
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>
                          Prénom
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir votre prénom",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Prénom"
                        style={{
                          height: "45px",
                          fontSize: "16px",
                          borderRadius: "8px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="nom"
                      label={
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>
                          Nom
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir votre nom",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nom"
                        style={{
                          height: "45px",
                          fontSize: "16px",
                          borderRadius: "8px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label={
                    <span style={{ fontSize: "16px", fontWeight: 600 }}>
                      Email
                    </span>
                  }
                  rules={[
                    { required: true, message: "Veuillez saisir votre email" },
                    {
                      type: "email",
                      message: "Veuillez saisir un email valide",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    style={{
                      height: "45px",
                      fontSize: "16px",
                      borderRadius: "8px",
                    }}
                  />
                </Form.Item>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="age"
                      label={
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>
                          Âge
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir votre âge",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Âge"
                        min={13}
                        max={120}
                        style={{
                          height: "45px",
                          fontSize: "16px",
                          borderRadius: "8px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="genre"
                      label={
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>
                          Genre
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Veuillez sélectionner votre genre",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Genre"
                        style={{ height: "45px", fontSize: "16px" }}
                      >
                        <Option value="homme">Homme</Option>
                        <Option value="femme">Femme</Option>
                        <Option value="autre">Autre</Option>
                        <Option value="non-specifie">
                          Préfère ne pas dire
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
