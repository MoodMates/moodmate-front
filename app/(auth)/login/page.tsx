"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const { Title } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);

    try {
      const success = await login(values.username, values.password);

      if (success) {
        message.success("Connexion réussie !");
        router.push("/diary"); // Rediriger vers le journal
      } else {
        message.error("Email ou mot de passe incorrect");
      }
    } catch (error) {
      message.error("Erreur lors de la connexion");
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
        }}
      >
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Title level={2} style={{ color: "#333", fontSize: "2.2rem" }}>
              Connexion
            </Title>
            <p style={{ color: "#666", fontSize: "1.1rem" }}>
              Bienvenue ! Connectez-vous à votre compte
            </p>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            style={{ width: "100%" }}
            initialValues={{
              username: "",
              password: "",
            }}
          >
            <Form.Item
              name="username"
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
                prefix={<UserOutlined style={{ color: "#895cf5" }} />}
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
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre mot de passe",
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
                Se connecter
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ color: "#666", fontSize: "1rem" }}>
                Vous n'avez pas de compte ?{" "}
                <Link
                  href="/register"
                  style={{
                    color: "#895cf5",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  S'inscrire
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
