import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
