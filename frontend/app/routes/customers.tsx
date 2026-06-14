import { Header } from "../components/Header";

export default function CustomersPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        {/* Left — Customer List */}
        <div className="w-1/2 border-r overflow-y-auto">
          <p className="p-4 text-muted-foreground">Customer list here</p>
        </div>

        {/* Right — Customer Detail */}
        <div className="w-1/2 overflow-y-auto">
          <p className="p-4 text-muted-foreground">Customer detail here</p>
        </div>
      </main>
    </div>
  );
}