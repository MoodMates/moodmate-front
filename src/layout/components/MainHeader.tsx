import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import RightHeader from "./RightHeader";

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <Header
      style={{ paddingLeft: 20, paddingRight: 20, background: "#895cf5" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: 0,
          height: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img
            alt="MoodMate"
            src="/assets/logo.jpg"
            style={{
              float: "left",
              height: 46,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />

          <h2 style={{ color: "white" }}>MoodMate</h2>
        </div>

        <RightHeader />
      </div>
    </Header>
  );
};

export default MainHeader;
