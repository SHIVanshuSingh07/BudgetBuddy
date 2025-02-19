import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { SeriChat } from "@/components/chat/seri-chat";

import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import BudgetPage from "@/pages/budget-page";
import TransactionsPage from "@/pages/transactions-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/budget" component={BudgetPage} />
      <ProtectedRoute path="/transactions" component={TransactionsPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <SeriChat />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}