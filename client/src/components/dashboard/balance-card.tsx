import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Transaction } from "@shared/schema";

export function BalanceCard() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const balance = transactions?.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + Number(transaction.amount)
      : acc - Number(transaction.amount);
  }, 0);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-[100px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[150px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          ${balance?.toFixed(2) ?? "0.00"}
        </div>
      </CardContent>
    </Card>
  );
}
