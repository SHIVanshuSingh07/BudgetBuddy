import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  content: string;
  sender: "user" | "seri";
}

const financialResponses = {
  "budget": "To create a budget, start by tracking your income and expenses. Categorize your spending and set realistic limits for each category. The 50/30/20 rule suggests using 50% for needs, 30% for wants, and 20% for savings.",
  "save": "Here are some effective saving tips:\n1. Set automatic transfers to savings\n2. Cut unnecessary subscriptions\n3. Use the 24-hour rule for large purchases\n4. Look for better deals on regular expenses\n5. Cook meals at home more often",
  "invest": "For beginners, consider starting with:\n1. Emergency fund in a high-yield savings account\n2. Employer-sponsored retirement plans\n3. Low-cost index funds\n4. Diversified portfolio across different asset classes",
  "debt": "To manage debt effectively:\n1. List all debts with interest rates\n2. Consider the snowball or avalanche method\n3. Avoid taking on new debt\n4. Look into debt consolidation\n5. Make more than minimum payments when possible",
  "default": "I'm Seri, your financial assistant! I can help you with budgeting, saving, investing, and debt management. What would you like to know about?"
};

function getResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("budget") || lowerQuery.includes("spending")) {
    return financialResponses.budget;
  }
  if (lowerQuery.includes("save") || lowerQuery.includes("saving")) {
    return financialResponses.save;
  }
  if (lowerQuery.includes("invest") || lowerQuery.includes("investing")) {
    return financialResponses.invest;
  }
  if (lowerQuery.includes("debt") || lowerQuery.includes("loan")) {
    return financialResponses.debt;
  }
  
  return financialResponses.default;
}

export function SeriChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hi! I'm Seri, your financial assistant. How can I help you today?", sender: "seri" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { content: input, sender: "user" as const };
    const seriResponse = { content: getResponse(input), sender: "seri" as const };
    
    setMessages(prev => [...prev, userMessage, seriResponse]);
    setInput("");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full p-4 h-12 w-12"
        variant="default"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat with Seri
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-[400px]">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2 mt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about budgeting, saving, or investing..."
                className="flex-1"
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
