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
        router.push("/diary");
      } else {
        message.error("Cet email est déjà utilisé");
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
      className="register-container"
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
        className="register-left-section"
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
        className="register-form-section"
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
              Inscription
            </Title>
            <p
              style={{
                color: "#666",
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                margin: 0,
              }}
            >
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
            {/* Nom et Prénom - Stack sur mobile */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                flexDirection: "row", // Par défaut côte à côte
              }}
              className="name-fields"
            >
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
                    height: "clamp(45px, 8vw, 50px)",
                    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
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
                    height: "clamp(45px, 8vw, 50px)",
                    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
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
                  height: "clamp(45px, 8vw, 50px)",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  borderRadius: "8px",
                }}
              />
            </Form.Item>

            {/* Âge et Genre - Stack sur mobile */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                flexDirection: "row", // Par défaut côte à côte
              }}
              className="age-gender-fields"
            >
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
                    height: "clamp(45px, 8vw, 50px)",
                    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
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
                    height: "clamp(45px, 8vw, 50px)",
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
                  height: "clamp(45px, 8vw, 50px)",
                  fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                  fontWeight: "600",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(137, 92, 245, 0.3)",
                }}
              >
                S&apos;inscrire
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

      {/* CSS pour la responsivité */}
      <style jsx global>{`
        /* Mobile Portrait */
        @media (max-width: 768px) {
          .register-container {
            flex-direction: column !important;
          }

          .register-left-section {
            min-height: 200px !important;
            flex: 0 0 auto !important;
          }

          .register-form-section {
            flex: 1 !important;
          }

          .register-welcome h1 {
            font-size: 1.5rem !important;
          }

          .register-welcome p {
            font-size: 0.9rem !important;
          }
        }

        /* Mobile Landscape et petites tablettes */
        @media (max-width: 768px) and (orientation: landscape) {
          .register-left-section {
            min-height: 120px !important;
          }

          .register-welcome {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
            text-align: left !important;
          }

          .register-welcome div:first-child {
            font-size: 2rem !important;
            margin-bottom: 0 !important;
          }
        }

        /* Très petits écrans */
        @media (max-width: 480px) {
          .name-fields,
          .age-gender-fields {
            flex-direction: column !important;
            gap: 0 !important;
          }

          .register-container {
            min-height: 100vh !important;
          }

          .register-left-section {
            display: none !important;
          }

          .register-form-section {
            padding: 1rem !important;
          }
        }

        /* Tablettes */
        @media (min-width: 769px) and (max-width: 1024px) {
          .register-container {
            flex-direction: row !important;
          }
        }

        /* Grands écrans */
        @media (min-width: 1400px) {
          .register-container {
            max-width: 1400px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}
