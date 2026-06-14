import { CustomerList } from "../components/CustomerList/CustomerList";
import { CustomerDetail } from "../components/CustomerDetails/CustomerDetail";
import { Header } from "../components/Header";

export default function CustomersPage() {
    
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r overflow-y-auto">
          <CustomerList />
        </div>
        <div className="w-1/2 overflow-y-auto">
          <CustomerDetail />
        </div>
      </main>
    </div>
  );
}