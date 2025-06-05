"use client";

import {
  Layout,
  Menu as AntMenu,
  Button,
  Space,
  Dropdown,
  Avatar,
  Drawer,
} from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/app/context/AuthContext";
import type { MenuProps } from "antd";

const { Header } = Layout;

export default function Menu() {
  const pathname = usePathname();
  const { user, logout, isLoggedIn } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const items = [
    {
      label: (
        <Link href="/" style={{ color: "white" }}>
          <HomeOutlined style={{ marginRight: 8 }} />
          Accueil
        </Link>
      ),
      key: "/",
    },
    {
      label: (
        <Link href="/diary" style={{ color: "white" }}>
          <BookOutlined style={{ marginRight: 8 }} />
          Journal Intime
        </Link>
      ),
      key: "/diary",
    },
  ];

  const mobileMenuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: (
        <Link href="/" onClick={() => setDrawerVisible(false)}>
          Accueil
        </Link>
      ),
    },
    {
      key: "/diary",
      icon: <BookOutlined />,
      label: (
        <Link href="/diary" onClick={() => setDrawerVisible(false)}>
          Journal Intime
        </Link>
      ),
    },
    ...(isLoggedIn
      ? [
          {
            type: "divider" as const,
          },
          {
            key: "profile",
            icon: <UserOutlined />,
            label: (
              <Link href="/profil" onClick={() => setDrawerVisible(false)}>
                Mon Profil
              </Link>
            ),
          },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Déconnexion",
            onClick: () => {
              logout();
              setDrawerVisible(false);
            },
          },
        ]
      : [
          {
            type: "divider" as const,
          },
          {
            key: "login",
            icon: <LoginOutlined />,
            label: (
              <Link href="/login" onClick={() => setDrawerVisible(false)}>
                Connexion
              </Link>
            ),
          },
          {
            key: "register",
            icon: <UserAddOutlined />,
            label: (
              <Link href="/register" onClick={() => setDrawerVisible(false)}>
                S'inscrire
              </Link>
            ),
          },
        ]),
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/profil">Mon Profil</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Déconnexion",
      onClick: logout,
    },
  ];

  return (
    <>
      <Header
        style={{
          backgroundColor: "#895cf5",
          padding: "0 clamp(16px, 4vw, 24px)", // Responsive padding
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1000,
        }}
      >
        {/* Logo et titre */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: "0 0 auto",
            minWidth: "140px", // Assure un minimum pour le logo
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              alt="MoodMate"
              src="/logo.jpg"
              style={{
                height: "clamp(36px, 8vw, 46px)", // Logo responsive
                cursor: "pointer",
                borderRadius: "50%",
                marginRight: "clamp(8px, 2vw, 15px)",
              }}
            />
            <h2
              style={{
                color: "white",
                margin: 0,
                fontWeight: "bold",
                fontSize: "clamp(16px, 4vw, 20px)", // Taille responsive
                whiteSpace: "nowrap",
              }}
            >
              MoodMate
            </h2>
          </Link>
        </div>

        {/* Menu desktop - masqué sur mobile */}
        <div
          style={{
            display: "flex",
            flex: 1,
          }}
          className="desktop-menu"
        >
          <AntMenu
            mode="horizontal"
            items={items}
            selectedKeys={[pathname]}
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              flex: 1,
              maxWidth: "400px",
              overflow: "visible",
              whiteSpace: "nowrap",
              borderBottom: "none",
            }}
            disabledOverflow={true}
            className="white-menu-items"
            theme="light"
          />
        </div>

        {/* Actions utilisateur desktop - masquées sur mobile */}
        <Space size="large" className="desktop-menu">
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  color: "white",
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  whiteSpace: "nowrap",
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Bonjour, {user?.prenom}
              </span>
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Avatar
                  style={{
                    backgroundColor: "white",
                    color: "#895cf5",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  size="large"
                >
                  {user?.prenom?.[0]?.toUpperCase()}
                  {user?.nom?.[0]?.toUpperCase()}
                </Avatar>
              </Dropdown>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "clamp(14px, 3vw, 16px)",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 0",
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <LoginOutlined />
                Connexion
              </Link>

              <Link
                href="/register"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "clamp(14px, 3vw, 16px)",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 0",
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <UserAddOutlined />
                S&apos;inscrire
              </Link>
            </>
          )}
        </Space>

        {/* Bouton menu mobile */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{
            color: "white",
            border: "none",
            fontSize: "18px",
            padding: "4px 8px",
          }}
          className="mobile-menu-button"
        />
      </Header>

      {/* Drawer pour mobile */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              alt="MoodMate"
              src="/logo.jpg"
              style={{
                height: 32,
                borderRadius: "50%",
                marginRight: "12px",
              }}
            />
            <span style={{ color: "#895cf5", fontWeight: "bold" }}>
              MoodMate
            </span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        styles={{
          header: {
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: "16px",
          },
        }}
      >
        {isLoggedIn && (
          <div
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#895cf5",
                color: "white",
                marginBottom: "8px",
              }}
              size={64}
            >
              {user?.prenom?.[0]?.toUpperCase()}
              {user?.nom?.[0]?.toUpperCase()}
            </Avatar>
            <div style={{ fontSize: "16px", fontWeight: "500" }}>
              {user?.prenom} {user?.nom}
            </div>
            <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
              {user?.email}
            </div>
          </div>
        )}

        <AntMenu
          mode="vertical"
          items={mobileMenuItems}
          selectedKeys={[pathname]}
          style={{
            border: "none",
          }}
        />
      </Drawer>

      {/* CSS pour la responsivité */}
      <style jsx global>{`
        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .ant-layout-header {
            padding: 0 12px !important;
          }
        }

        .white-menu-items .ant-menu-item,
        .white-menu-items .ant-menu-submenu-title {
          color: white !important;
        }

        .white-menu-items .ant-menu-item:hover,
        .white-menu-items .ant-menu-submenu-title:hover {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .white-menu-items .ant-menu-item-selected {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }

        .white-menu-items::after {
          border-bottom: none !important;
        }
      `}</style>
    </>
  );
}
