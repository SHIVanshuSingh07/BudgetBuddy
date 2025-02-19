import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, PieChart, Receipt, User } from "lucide-react";

export function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">Budget Buddy</span>
          </Link>
        </div>

        <div className="flex items-center space-x-6 mx-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Home size={20} />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Link href="/transactions">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Receipt size={20} />
              <span>Transactions</span>
            </Button>
          </Link>
          <Link href="/budget">
            <Button variant="ghost" className="flex items-center space-x-2">
              <PieChart size={20} />
              <span>Budget</span>
            </Button>
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User size={20} />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => logoutMutation.mutate()}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
