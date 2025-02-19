import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CardDisplay() {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showPassbookForm, setShowPassbookForm] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Dialog open={showCardForm} onOpenChange={setShowCardForm}>
        <Card className="relative overflow-hidden group cursor-pointer" onClick={() => setShowCardForm(true)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40 bg-primary/5 rounded-lg">
              <CreditCard className="w-20 h-20 text-primary" />
            </div>
            <p className="mt-4 text-center font-medium">Add ATM Card</p>
          </CardContent>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New ATM Card</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="**** **** **** ****"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" maxLength={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="password" maxLength={3} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" />
            </div>
            <Button type="submit" className="w-full">Add Card</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showPassbookForm} onOpenChange={setShowPassbookForm}>
        <Card className="relative overflow-hidden group cursor-pointer" onClick={() => setShowPassbookForm(true)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40 bg-primary/5 rounded-lg">
              <Book className="w-20 h-20 text-primary" />
            </div>
            <p className="mt-4 text-center font-medium">Add Passbook</p>
          </CardContent>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Passbook</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input id="account-number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input id="branch" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input id="ifsc" />
            </div>
            <Button type="submit" className="w-full">Add Passbook</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
