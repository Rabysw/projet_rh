import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Input } from "@/components/ui/input";
import { useApi, apiFetch } from "@/hooks/use-api";
import { 
  Users, 
  Search,
  Plus,
  Shield,
  Mail,
  Loader2,
  Trash2,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SystemUser {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  role: string;
  status: string;
}

interface RoleStat {
  role: string;
  count: number;
  color: string;
}

const ROLES = [
  { value: "collaborateur", label: "Collaborateur" },
  { value: "manager", label: "Manager" },
  { value: "resp_rh", label: "Responsable RH" },
  { value: "admin_rh", label: "Admin RH" },
  { value: "direction", label: "Direction" },
];

const CONTRACT_TYPES = ["CDI", "CDD", "Stage", "Freelance", "Consultant"];

const ROLE_COLORS: Record<string, string> = {
  admin_rh: "bg-red-100 text-red-700",
  resp_rh: "bg-blue-100 text-blue-700",
  direction: "bg-purple-100 text-purple-700",
  manager: "bg-green-100 text-green-700",
  collaborateur: "bg-gray-100 text-gray-700",
};

export default function UsersPage() {
  const { data: users, isLoading, refetch } = useApi<SystemUser[]>("/api/v1/admin-rh/users");
  const { data: roles, refetch: refetchRoles } = useApi<RoleStat[]>("/api/v1/admin-rh/roles");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    role: "collaborateur",
    password: "",
    contract_type: "CDI",
    hire_date: new Date().toISOString().split("T")[0],
  });

  const resetForm = () => {
    setForm({
      prenom: "",
      nom: "",
      email: "",
      role: "collaborateur",
      password: "",
      contract_type: "CDI",
      hire_date: new Date().toISOString().split("T")[0],
    });
    setShowPassword(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet utilisateur définitivement ?")) return;
    try {
      await apiFetch(`/api/v1/admin-rh/users/${id}`, { method: "DELETE" });
      toast.success("Utilisateur supprimé");
      refetch();
      refetchRoles();
    } catch (err: any) {
      toast.error(err.message || "Erreur de suppression");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.role || !form.password) {
      toast.error("Email, rôle et mot de passe sont obligatoires");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/admin-rh/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast.success(`Utilisateur ${form.prenom} ${form.nom} créé avec succès`);
      setShowModal(false);
      resetForm();
      refetch();
      refetchRoles();
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la création");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users?.filter(u =>
    `${u.prenom} ${u.nom}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Administrez les comptes et les rôles</p>
        </div>
        <Button className="gap-2" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Stats rôles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {roles?.map((r) => (
          <Card key={r.role}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{r.count}</p>
              <Badge className={`mt-1 ${r.color || ROLE_COLORS[r.role] || ""}`}>{r.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste utilisateurs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Utilisateurs ({filteredUsers?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Rechercher un utilisateur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              {filteredUsers?.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">Aucun utilisateur trouvé.</p>
              )}
              {filteredUsers?.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {user.prenom?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.prenom} {user.nom}</p>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${ROLE_COLORS[user.role] || "bg-gray-100 text-gray-700"}`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {user.role}
                    </Badge>
                    {user.status === "active" ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">Actif</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground text-xs">Inactif</Badge>
                    )}
                    <Button
                      size="icon" variant="ghost"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permissions par rôle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { module: "Dossiers personnel", roles: ["Admin RH", "Resp RH", "Manager"] },
              { module: "Contrats", roles: ["Admin RH", "Resp RH"] },
              { module: "Congés", roles: ["Admin RH", "Resp RH", "Manager", "Collab"] },
              { module: "Fiches de paie", roles: ["Admin RH", "Resp RH", "Collab"] },
              { module: "Admin système", roles: ["Admin RH"] },
            ].map((perm) => (
              <div key={perm.module} className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium">{perm.module}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {perm.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="text-[10px]">{role}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Modal création utilisateur ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-lg">
            {/* Header modal */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">Créer un utilisateur</h2>
                <p className="text-sm text-muted-foreground">Renseignez les informations du nouveau compte</p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => { setShowModal(false); resetForm(); }}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prénom</label>
                  <Input
                    placeholder="Jean"
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <Input
                    placeholder="Dupont"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email <span className="text-destructive">*</span></label>
                <Input
                  type="email"
                  placeholder="jean.dupont@ices.bj"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rôle <span className="text-destructive">*</span></label>
                <select
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              {["collaborateur", "manager", "resp_rh"].includes(form.role) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type de contrat</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                      value={form.contract_type}
                      onChange={(e) => setForm({ ...form, contract_type: e.target.value })}
                    >
                      {CONTRACT_TYPES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date d'embauche</label>
                    <Input
                      type="date"
                      value={form.hire_date}
                      onChange={(e) => setForm({ ...form, hire_date: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Mot de passe <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 6 caractères"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button" variant="outline" className="flex-1"
                  onClick={() => { setShowModal(false); resetForm(); }}
                >
                  Annuler
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Créer l'utilisateur
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}