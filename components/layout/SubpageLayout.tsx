import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";

export default function SubpageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fffcf8]">
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
      <Footer />
    </div>
  );
}
