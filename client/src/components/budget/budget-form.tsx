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
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface BudgetFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BudgetForm({ open, onOpenChange }: BudgetFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(
      insertBudgetSchema.extend({
        amount: insertBudgetSchema.shape.amount.transform((val) =>
          val.toString()
        ),
      })
    ),
    defaultValues: {
      amount: "0",
      category: transactionCategories[0],
    },
  });

  const createBudget = useMutation({
    mutationFn: async (data: Omit<InsertBudget, "userId">) => {
      if (!user) throw new Error("User not authenticated");
      if (!data.amount || Number(data.amount) <= 0) {
        throw new Error("Please enter a valid amount greater than 0");
      }

      const res = await apiRequest("POST", "/api/budgets", {
        ...data,
        userId: user.id,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/budgets"] });
      onOpenChange(false);
      form.reset();
      toast({
        title: "Success",
        description: "Budget created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
            {form.formState.errors.category && (
              <p className="text-sm text-red-500">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label>Monthly Budget Amount</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              {...form.register("amount", { 
                valueAsNumber: true,
                min: { value: 0, message: "Amount must be greater than 0" }
              })}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={createBudget.isPending}
          >
            {createBudget.isPending ? "Creating..." : "Create Budget"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}