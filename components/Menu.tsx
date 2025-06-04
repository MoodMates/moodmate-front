"use client";

import { Layout, Menu as AntMenu, Button, Space, Dropdown, Avatar } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/app/context/AuthContext";
import type { MenuProps } from "antd";

const { Header } = Layout;

export default function Menu() {
  const pathname = usePathname();
  const { user, logout, isLoggedIn } = useAuth();

  const items = [
    {
      label: (
        <Link href="/" style={{ color: "white" }}>
          Accueil
        </Link>
      ),
      key: "/",
    },
    {
      label: (
        <Link href="/diary" style={{ color: "white" }}>
          Journal Intime
        </Link>
      ),
      key: "/diary",
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Mon Profil",
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
    <Header
      style={{
        backgroundColor: "#895cf5",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <img
            alt="MoodMate"
            src="/logo.jpg"
            style={{
              height: 46,
              cursor: "pointer",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          />
          <h2
            style={{
              color: "white",
              margin: 0,
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            MoodMate
          </h2>
        </Link>

        <AntMenu
          mode="horizontal"
          items={items}
          selectedKeys={[pathname]}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
            flex: 1,
            minWidth: "280px",
            overflow: "visible",
            whiteSpace: "nowrap",
            borderBottom: "none",
          }}
          disabledOverflow={true}
          className="white-menu-items"
          theme="light"
        />
      </div>

      <Space size="large">
        {isLoggedIn ? (
          // Utilisateur connecté
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "white", fontSize: "14px" }}>
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
                fontSize: "16px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 0",
                transition: "opacity 0.2s",
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
                fontSize: "16px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 0",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <UserAddOutlined />
              S'inscrire
            </Link>
          </>
        )}
      </Space>
    </Header>
  );
}
