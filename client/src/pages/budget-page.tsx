import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { BudgetForm } from "@/components/budget/budget-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Budget } from "@shared/schema";

export default function BudgetPage() {
  const [showForm, setShowForm] = useState(false);

  const { data: budgets } = useQuery<Budget[]>({
    queryKey: ["/api/budgets"],
  });

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgets?.map((budget) => (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span className="capitalize">{budget.category}</span>
                  <span className="text-muted-foreground">
                    ${budget.spent.toString()} / ${budget.amount.toString()}
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

        <BudgetForm open={showForm} onOpenChange={setShowForm} />
      </main>
    </div>
  );
}
