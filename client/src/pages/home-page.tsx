import { Navbar } from "@/components/layout/navbar";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CardDisplay } from "@/components/dashboard/card-display";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BalanceCard />
          <div className="md:col-span-2">
            <ExpenseChart />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Cards & Passbooks</h2>
          <CardDisplay />
        </div>
        <div className="mt-6">
          <RecentTransactions />
        </div>
      </main>
    </div>
  );
}