import "@ant-design/v5-patch-for-react-19";
import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="auth-layout" style={{ minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
