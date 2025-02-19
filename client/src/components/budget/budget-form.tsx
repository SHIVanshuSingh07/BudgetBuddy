import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertBudget } from "@shared/schema";
import { insertBudgetSchema, transactionCategories } from "@shared/schema";

interface BudgetFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BudgetForm({ open, onOpenChange }: BudgetFormProps) {
  const form = useForm({
    resolver: zodResolver(insertBudgetSchema),
    defaultValues: {
      amount: 0,
      category: transactionCategories[0],
    },
  });

  const createBudget = useMutation({
    mutationFn: async (data: InsertBudget) => {
      const res = await apiRequest("POST", "/api/budgets", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/budgets"] });
      onOpenChange(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit((data) => createBudget.mutate(data))}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label>Category</label>
            <Select
              onValueChange={(value) => form.setValue("category", value)}
              defaultValue={transactionCategories[0]}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {transactionCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Monthly Budget Amount</label>
            <Input
              type="number"
              step="0.01"
              {...form.register("amount", { valueAsNumber: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Create Budget
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
