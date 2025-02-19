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
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Budget Planner</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Create Budget
          </button>
        </div>

        {budgets?.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No budgets created yet. Click "Create Budget" to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgets?.map((budget) => (
              <Card key={budget.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span className="capitalize">{budget.category}</span>
                    <span className="text-muted-foreground">
                      ${Number(budget.spent).toFixed(2)} / ${Number(budget.amount).toFixed(2)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(Number(budget.spent) / Number(budget.amount)) * 100}
                    className="h-2"
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