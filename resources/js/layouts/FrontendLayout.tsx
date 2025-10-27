import Navbar from "@/components/Navbar";

export default function FrontendLayout({ children, title }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      
      <main className="flex-1">

        <div className="container mx-auto px-4 py-10">{children}</div>
      </main>

    </div>
  );
}
