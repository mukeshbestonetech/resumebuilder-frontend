import LandingFooter from "../components/layout/landingPage/Footer";
import LandingHeader from "../components/layout/landingPage/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <div className="flex-grow bg-white">
        {children}
      </div>
      <LandingFooter />
    </div>
  );
}