import { Navbar } from "@/components/layout/navbar";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CardDisplay } from "@/components/dashboard/card-display";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a8a] via-[#312e81] to-[#4c1d95] text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        {/* Top Section: Balance + Expense Chart */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BalanceCard />
          <div className="md:col-span-2 bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-white">💰 Expense Overview</h2>
            <ExpenseChart />
          </div>
        </div>

        {/* Cards & Passbooks Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-white">💳 Cards & Passbooks</h2>
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:shadow-2xl">
            <CardDisplay />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-white">🔄 Recent Transactions</h2>
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:shadow-2xl">
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  );
}
