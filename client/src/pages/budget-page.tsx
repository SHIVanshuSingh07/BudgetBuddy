import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { BudgetForm } from "@/components/budget/budget-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import type { Budget } from "@shared/schema";

export default function BudgetPage() {
  const [showForm, setShowForm] = useState(false);

  const { data: budgets, isLoading } = useQuery<Budget[]>({
    queryKey: ["/api/budgets"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#4c1d95] text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#4c1d95] text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            💰 Budget Planner
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all shadow-lg hover:shadow-2xl backdrop-blur-md"
          >
            Create Budget
          </button>
        </div>

        {budgets?.length === 0 ? (
          <Card className="bg-white/10 shadow-lg backdrop-blur-md border border-white/20">
            <CardContent className="pt-6">
              <p className="text-center text-gray-300">
                No budgets created yet. Click "Create Budget" to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgets?.map((budget) => (
              <Card
                key={budget.id}
                className="bg-white/10 shadow-lg backdrop-blur-md border border-white/20"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="capitalize flex items-center gap-2">
                      💳 {budget.category}
                    </span>
                    <span className="text-gray-300">
                      ${Number(budget.spent).toFixed(2)} / ${Number(budget.amount).toFixed(2)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(Number(budget.spent) / Number(budget.amount)) * 100}
                    className="h-2 bg-white/20"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <BudgetForm open={showForm} onOpenChange={setShowForm} />
      </main>
    </div>
  );
}
