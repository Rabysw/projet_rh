import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sécurité & Audit</h1>
        <p className="text-muted-foreground">Contrôle des accès et intégrité du système</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Politique de mots de passe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Longueur minimale (8 car.)</span>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Caractères spéciaux requis</span>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Double authentification (2FA)</span>
              <Button size="sm" variant="outline">Activer</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              État de la sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="font-bold">Système sécurisé</p>
            <p className="text-sm text-muted-foreground mt-1">Aucune vulnérabilité détectée</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alertes récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">Aucune alerte de sécurité récente</p>
        </CardContent>
      </Card>
    </div>
  );
}
