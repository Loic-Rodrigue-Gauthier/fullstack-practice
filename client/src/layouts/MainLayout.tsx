import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main className="m-auto max-w-334 px-6 py-8 md:py-12">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
