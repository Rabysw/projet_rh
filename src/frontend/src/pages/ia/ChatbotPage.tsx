import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          Assistant IA RH
        </h1>
        <p className="text-muted-foreground">Posez vos questions sur la gestion du personnel, les congés ou le droit du travail.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-2 border-primary/10">
        <CardContent className="flex-1 p-6 overflow-y-auto space-y-6 bg-muted/5">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white border rounded-2xl p-4 shadow-sm max-w-[80%]">
              <p className="text-sm">Bonjour ! Je suis votre assistant IA spécialisé en ressources humaines. Comment puis-je vous aider aujourd'hui ?</p>
            </div>
          </div>

          <div className="flex gap-4 items-start flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="bg-primary text-white rounded-2xl p-4 shadow-sm max-w-[80%]">
              <p className="text-sm">Combien de jours de congés reste-t-il à Jean Dupont ?</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white border rounded-2xl p-4 shadow-sm max-w-[80%]">
              <p className="text-sm italic flex items-center gap-2">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Analyse des données en cours...
              </p>
            </div>
          </div>
        </CardContent>
        
        <div className="p-4 border-t bg-white">
          <div className="flex gap-3">
            <Input placeholder="Tapez votre question ici..." className="flex-1" />
            <Button className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2 italic">
            Note: L'IA peut faire des erreurs. Vérifiez toujours les informations critiques.
          </p>
        </div>
      </Card>
    </div>
  );
}
