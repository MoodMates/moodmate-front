"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, Select, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const { Title } = Typography;
const { Option } = Select;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const onFinish = async (values: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    age: number;
    genre: string;
  }) => {
    setLoading(true);

    try {
      const success = await register(values);

      if (success) {
        message.success("Inscription réussie ! Vous êtes maintenant connecté.");
        router.push("/diary"); // Rediriger vers le journal
      } else {
        message.error("Cet email est déjà utilisé");
      }
    } catch (error) {
      message.error("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      ></div>

      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Title level={2} style={{ color: "#333", fontSize: "2.2rem" }}>
              Inscription
            </Title>
            <p style={{ color: "#666", fontSize: "1.1rem" }}>
              Créez votre compte MoodMate
            </p>
          </div>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            style={{ width: "100%" }}
          >
            <div style={{ display: "flex", gap: "15px" }}>
              <Form.Item
                name="prenom"
                label="Prénom"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir votre prénom",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#895cf5" }} />}
                  placeholder="Prénom"
                  style={{
                    height: "50px",
                    fontSize: "1rem",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="nom"
                label="Nom"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir votre nom",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#895cf5" }} />}
                  placeholder="Nom"
                  style={{
                    height: "50px",
                    fontSize: "1rem",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre email",
                },
                {
                  type: "email",
                  message: "Veuillez saisir un email valide",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#895cf5" }} />}
                placeholder="Email"
                style={{
                  height: "50px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mot de passe"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre mot de passe",
                },
                {
                  min: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#895cf5" }} />}
                placeholder="Mot de passe"
                style={{
                  height: "50px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                }}
              />
            </Form.Item>

            <div style={{ display: "flex", gap: "15px" }}>
              <Form.Item
                name="age"
                label="Âge"
                style={{ flex: 1 }}
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
                    height: "50px",
                    fontSize: "1rem",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="genre"
                label="Genre"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner votre genre",
                  },
                ]}
              >
                <Select
                  placeholder="Genre"
                  style={{
                    height: "50px",
                  }}
                >
                  <Option value="homme">Homme</Option>
                  <Option value="femme">Femme</Option>
                  <Option value="autre">Autre</Option>
                  <Option value="non-specifie">Préfère ne pas dire</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  background:
                    "linear-gradient(90deg, #a18cd1 0%, #895cf5 100%)",
                  border: "none",
                  width: "100%",
                  height: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(137, 92, 245, 0.3)",
                }}
              >
                S'inscrire
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ color: "#666", fontSize: "1rem" }}>
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/login"
                  style={{
                    color: "#895cf5",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
