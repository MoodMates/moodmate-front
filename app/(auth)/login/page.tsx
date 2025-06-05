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
        router.push("/diary");
      } else {
        message.error("Email ou mot de passe incorrect");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "row", // Desktop par défaut
      }}
      className="login-container"
    >
      {/* Section gauche - Image/Gradient */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(20px, 4vw, 40px)",
          position: "relative",
        }}
        className="login-left-section"
      ></div>

      {/* Section droite - Formulaire */}
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(20px, 4vw, 40px)",
          overflowY: "auto",
        }}
        className="login-form-section"
      >
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            padding: "0 clamp(10px, 2vw, 20px)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(20px, 5vw, 40px)",
            }}
          >
            <Title
              level={2}
              style={{
                color: "#333",
                fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
                marginBottom: "0.5rem",
              }}
            >
              Connexion
            </Title>
            <p
              style={{
                color: "#666",
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                margin: 0,
              }}
            >
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
                prefix={<UserOutlined style={{ color: "#895cf5" }} />}
                placeholder="Email"
                style={{
                  height: "clamp(45px, 8vw, 50px)",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
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
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#895cf5" }} />}
                placeholder="Mot de passe"
                style={{
                  height: "clamp(45px, 8vw, 50px)",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
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
                  height: "clamp(45px, 8vw, 50px)",
                  fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                  fontWeight: "600",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(137, 92, 245, 0.3)",
                }}
              >
                Se connecter
              </Button>
            </Form.Item>

            <div
              style={{
                textAlign: "center",
                marginTop: "clamp(15px, 3vw, 20px)",
              }}
            >
              <p
                style={{
                  color: "#666",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  margin: 0,
                }}
              >
                Vous n&apos;avez pas de compte ?{" "}
                <Link
                  href="/register"
                  style={{
                    color: "#895cf5",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  S&apos;inscrire
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>

      {/* CSS pour la responsivité */}
      <style jsx global>{`
        /* Mobile Portrait */
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column !important;
          }

          .login-left-section {
            min-height: 200px !important;
            flex: 0 0 auto !important;
          }

          .login-form-section {
            flex: 1 !important;
          }

          .login-welcome h1 {
            font-size: 1.5rem !important;
          }

          .login-welcome p {
            font-size: 0.9rem !important;
          }
        }

        /* Mobile Landscape et petites tablettes */
        @media (max-width: 768px) and (orientation: landscape) {
          .login-left-section {
            min-height: 120px !important;
          }

          .login-welcome {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
            text-align: left !important;
          }

          .login-welcome div:first-child {
            font-size: 2rem !important;
            margin-bottom: 0 !important;
          }
        }

        /* Très petits écrans */
        @media (max-width: 480px) {
          .login-container {
            min-height: 100vh !important;
          }

          .login-left-section {
            display: none !important;
          }

          .login-form-section {
            padding: 1rem !important;
          }
        }

        /* Tablettes */
        @media (min-width: 769px) and (max-width: 1024px) {
          .login-container {
            flex-direction: row !important;
          }
        }

        /* Grands écrans */
        @media (min-width: 1400px) {
          .login-container {
            max-width: 1400px !important;
            margin: 0 auto !important;
          }
        }

        /* Amélioration des focus states pour mobile */
        @media (max-width: 768px) {
          .ant-input-affix-wrapper:focus,
          .ant-input-affix-wrapper-focused {
            box-shadow: 0 0 0 2px rgba(137, 92, 245, 0.2) !important;
          }

          .ant-btn:focus,
          .ant-btn-primary:focus {
            box-shadow: 0 4px 12px rgba(137, 92, 245, 0.4) !important;
          }
        }
      `}</style>
    </div>
  );
}
