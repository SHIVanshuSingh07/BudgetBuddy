import { Navbar } from "@/components/layout/navbar";
import { TransactionList } from "@/components/transactions/transaction-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#4c1d95] text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        {/* Transactions Card */}
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-2xl font-bold flex items-center gap-2">
              🔄 Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList />
          </CardContent>
        </div>
      </main>
    </div>
  );
}
