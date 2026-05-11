import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/Badge";
import { 
  Building2, 
  Settings2, 
  CalendarDays, 
  Users, 
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  Palette,
  Globe,
  Coins,
  Clock,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from '@/hooks/use-api';
import { useCompanyConfig } from '@/contexts/CompanyConfigContext';

export default function SetupPage() {
  const navigate = useNavigate();
  const { refreshConfig } = useCompanyConfig();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company_name: '',
    company_logo_url: '',
    primary_color: '#3b82f6',
    country: 'Bénin',
    currency: 'FCFA',
    phone_prefix: '+229',
    timezone: 'Africa/Porto-Novo',
    working_days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    working_hours_start: '08:00',
    working_hours_end: '18:00',
    overtime_threshold_hours: 8.0,
    leave_days_per_year: 24.0,
    leave_carry_over_max: 5.0,
    probation_duration_days: 90,
    contract_alert_days: 30,
    id_expiry_alert_days: 60,
    medical_alert_days: 30,
    late_alert_threshold_minutes: 15,
    late_count_alert_per_month: 3,
    public_holidays: [] as Array<{ date: string; label: string }>,
    departments: [] as string[],
    job_titles: [] as string[],
    leave_types: ['Congé payé', 'Maladie', 'Maternité', 'Paternité', 'Exceptionnel']
  });

  // Helpers for dynamic lists
  const [newDept, setNewDept] = useState('');
  const [newJob, setNewJob] = useState('');
  const [newHoliday, setNewHoliday] = useState({ date: '', label: '' });

  const countries = ["Bénin", "Togo", "Sénégal", "Côte d'Ivoire", "France"];
  const timezones = [
    "Africa/Porto-Novo",
    "Africa/Abidjan",
    "Africa/Dakar",
    "Europe/Paris",
  ];

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 5));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const validateStep = (current: number) => {
    if (current === 1) {
      if (!formData.company_name.trim()) return toastError("Le nom de l'entreprise est obligatoire");
      if (!formData.primary_color.trim()) return toastError("La couleur principale est obligatoire");
      if (!formData.country.trim()) return toastError("Le pays est obligatoire");
      if (!formData.currency.trim()) return toastError("La devise est obligatoire");
      if (!formData.phone_prefix.trim()) return toastError("Le préfixe téléphone est obligatoire");
      if (!formData.timezone.trim()) return toastError("Le fuseau horaire est obligatoire");
    }
    if (current === 2) {
      if (formData.working_days.length === 0) return toastError("Sélectionnez au moins un jour ouvré");
      if (!formData.working_hours_start) return toastError("L'heure de début est obligatoire");
      if (!formData.working_hours_end) return toastError("L'heure de fin est obligatoire");
      if (!Number.isFinite(formData.overtime_threshold_hours)) return toastError("Le seuil des heures supplémentaires est obligatoire");
      if (!Number.isFinite(formData.late_alert_threshold_minutes)) return toastError("La tolérance retard est obligatoire");
      if (!Number.isFinite(formData.late_count_alert_per_month)) return toastError("Le nombre de retards mensuels avant alerte est obligatoire");
      if (!Number.isFinite(formData.probation_duration_days)) return toastError("La durée de période d'essai est obligatoire");
    }
    if (current === 3) {
      if (!Number.isFinite(formData.leave_days_per_year)) return toastError("Les jours de congé par an sont obligatoires");
      if (!Number.isFinite(formData.leave_carry_over_max)) return toastError("Le report max N-1 est obligatoire");
      if (formData.leave_types.length === 0) return toastError("Sélectionnez au moins un type de congé");
      if (!Number.isFinite(formData.contract_alert_days)) return toastError("Le délai alerte fin de contrat est obligatoire");
      if (!Number.isFinite(formData.id_expiry_alert_days)) return toastError("Le délai alerte pièce d'identité est obligatoire");
      if (!Number.isFinite(formData.medical_alert_days)) return toastError("Le délai alerte visite médicale est obligatoire");
    }
    if (current === 4) {
      if (formData.departments.length < 1) return toastError("Ajoutez au moins un département");
      if (formData.job_titles.length < 1) return toastError("Ajoutez au moins un poste");
    }
    return true;
  };

  const toastError = (message: string) => {
    toast.error(message);
    return false;
  };

  const handleFinish = async () => {
    if (!validateStep(5)) return;
    if (!formData.company_name || formData.departments.length === 0 || formData.job_titles.length === 0) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiFetch("/admin/company-config", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      await refreshConfig();
      toast.success("Configuration enregistrée. Bienvenue !");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur de configuration");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadBeninHolidays = () => {
    const holidays = [
      { date: '2026-01-01', label: 'Nouvel An' },
      { date: '2026-01-10', label: 'Fête du Vodoun' },
      { date: '2026-04-06', label: 'Lundi de Pâques' },
      { date: '2026-05-01', label: 'Fête du Travail' },
      { date: '2026-08-01', label: 'Fête de l\'Indépendance' },
      { date: '2026-08-15', label: 'Assomption' },
      { date: '2026-11-01', label: 'Toussaint' },
      { date: '2026-12-25', label: 'Noël' }
    ];
    setFormData(prev => ({ ...prev, public_holidays: holidays }));
    toast.info("Jours fériés du Bénin chargés");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Configuration ICES</h1>
          <p className="text-muted-foreground">Initialisez les paramètres de votre entreprise en quelques étapes.</p>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500 rounded-full" 
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  step >= s ? 'bg-primary border-primary text-primary-foreground shadow-lg' : 'bg-background border-muted text-muted-foreground'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-none shadow-xl bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              {step === 1 && <Building2 className="text-primary" />}
              {step === 2 && <Settings2 className="text-primary" />}
              {step === 3 && <CalendarDays className="text-primary" />}
              {step === 4 && <Users className="text-primary" />}
              {step === 5 && <CalendarCheck className="text-primary" />}
              {step === 1 && "Identité de l'entreprise"}
              {step === 2 && "Règles de travail"}
              {step === 3 && "Règles congés & alertes"}
              {step === 4 && "Structure de l'entreprise"}
              {step === 5 && "Jours fériés"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Informations générales et personnalisation visuelle."}
              {step === 2 && "Définition des horaires et politiques de présence."}
              {step === 3 && "Paramétrage des droits aux congés et délais d'alerte."}
              {step === 4 && "Organisation des départements et des postes."}
              {step === 5 && "Calendrier des jours non travaillés."}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="min-h-[400px]">
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Nom de l'entreprise *</label>
                    <Input 
                      placeholder="Ex: ICES Bénin" 
                      value={formData.company_name}
                      onChange={e => setFormData({...formData, company_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Logo (JPG/PNG, max 2Mo)</label>
                    <Input
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const isImage = ["image/png", "image/jpeg"].includes(file.type);
                        if (!isImage) {
                          toast.error("Le logo doit être en JPG ou PNG");
                          return;
                        }
                        if (file.size > 2 * 1024 * 1024) {
                          toast.error("Le logo doit faire moins de 2Mo");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData({ ...formData, company_logo_url: String(reader.result || "") });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Palette className="w-4 h-4" /> Couleur principale *
                    </label>
                    <div className="flex gap-3">
                      <Input 
                        type="color" 
                        className="w-12 h-10 p-1 cursor-pointer"
                        value={formData.primary_color}
                        onChange={e => setFormData({...formData, primary_color: e.target.value})}
                      />
                      <Input 
                        value={formData.primary_color}
                        onChange={e => setFormData({...formData, primary_color: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Pays *
                    </label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.country}
                      onChange={e => setFormData({...formData, country: e.target.value})}
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Coins className="w-4 h-4" /> Devise *
                    </label>
                    <Input 
                      placeholder="Ex: FCFA" 
                      value={formData.currency}
                      onChange={e => setFormData({...formData, currency: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Préfixe téléphone *</label>
                    <Input 
                      placeholder="Ex: +229" 
                      value={formData.phone_prefix}
                      onChange={e => setFormData({...formData, phone_prefix: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Fuseau horaire *
                    </label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.timezone}
                      onChange={e => setFormData({...formData, timezone: e.target.value})}
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold">Jours ouvrés</label>
                    <div className="flex flex-wrap gap-3">
                      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(day => (
                        <Button
                          key={day}
                          variant={formData.working_days.includes(day) ? "default" : "outline"}
                          onClick={() => {
                            const days = formData.working_days.includes(day)
                              ? formData.working_days.filter(d => d !== day)
                              : [...formData.working_days, day];
                            setFormData({...formData, working_days: days});
                          }}
                          className="rounded-full"
                          size="sm"
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Heure de début *</label>
                      <Input 
                        type="time" 
                        value={formData.working_hours_start}
                        onChange={e => setFormData({...formData, working_hours_start: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Heure de fin *</label>
                      <Input 
                        type="time" 
                        value={formData.working_hours_end}
                        onChange={e => setFormData({...formData, working_hours_end: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Seuil Heures Sup. (h/jour) *</label>
                      <Input 
                        type="number" 
                        value={formData.overtime_threshold_hours}
                        onChange={e => setFormData({...formData, overtime_threshold_hours: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Tolérance retard (minutes) *</label>
                      <Input 
                        type="number" 
                        value={formData.late_alert_threshold_minutes}
                        onChange={e => setFormData({...formData, late_alert_threshold_minutes: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Retards/mois avant alerte *</label>
                      <Input 
                        type="number" 
                        value={formData.late_count_alert_per_month}
                        onChange={e => setFormData({...formData, late_count_alert_per_month: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Période d'essai (jours) *</label>
                      <Input 
                        type="number" 
                        value={formData.probation_duration_days}
                        onChange={e => setFormData({...formData, probation_duration_days: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Congés payés par an (jours) *</label>
                    <Input 
                      type="number" 
                      value={formData.leave_days_per_year}
                      onChange={e => setFormData({...formData, leave_days_per_year: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Report max N-1 (jours) *</label>
                    <Input 
                      type="number" 
                      value={formData.leave_carry_over_max}
                      onChange={e => setFormData({...formData, leave_carry_over_max: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Alerte fin de contrat (jours) *</label>
                    <Input 
                      type="number" 
                      value={formData.contract_alert_days}
                      onChange={e => setFormData({...formData, contract_alert_days: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Alerte ID expire (jours) *</label>
                    <Input 
                      type="number" 
                      value={formData.id_expiry_alert_days}
                      onChange={e => setFormData({...formData, id_expiry_alert_days: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Alerte visite médicale (jours) *</label>
                    <Input 
                      type="number" 
                      value={formData.medical_alert_days}
                      onChange={e => setFormData({...formData, medical_alert_days: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="col-span-full space-y-4 pt-4 border-t border-border">
                    <label className="text-sm font-semibold">Types de congés actifs</label>
                    <div className="flex flex-wrap gap-3">
                      {['Congé payé', 'Maladie', 'Sans solde', 'Maternité', 'Paternité', 'Exceptionnel'].map(type => (
                        <label key={type} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg cursor-pointer border border-border/50 hover:bg-muted/40 transition-colors">
                          <input 
                            type="checkbox"
                            checked={formData.leave_types.includes(type)}
                            onChange={() => {
                              const types = formData.leave_types.includes(type)
                                ? formData.leave_types.filter(t => t !== type)
                                : [...formData.leave_types, type];
                              setFormData({...formData, leave_types: types});
                            }}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <Building2 className="w-4 h-4" /> Départements *
                      </label>
                      <Badge variant="secondary">{formData.departments.length}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Ex: Ressources Humaines" 
                        value={newDept}
                        onChange={e => setNewDept(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddDept())}
                      />
                      <Button onClick={handleAddDept} size="icon"><Plus size={18} /></Button>
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {formData.departments.map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50 group hover:border-primary/50 transition-colors">
                          <span className="text-sm">{d}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setFormData({...formData, departments: formData.departments.filter((_, idx) => idx !== i)})}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> Postes *
                      </label>
                      <Badge variant="secondary">{formData.job_titles.length}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Ex: Analyste Financier" 
                        value={newJob}
                        onChange={e => setNewJob(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddJob())}
                      />
                      <Button onClick={handleAddJob} size="icon"><Plus size={18} /></Button>
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {formData.job_titles.map((j, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50 group hover:border-primary/50 transition-colors">
                          <span className="text-sm">{j}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setFormData({...formData, job_titles: formData.job_titles.filter((_, idx) => idx !== i)})}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-center bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Globe className="text-primary" />
                      <div>
                        <p className="text-sm font-bold">Chargement rapide</p>
                        <p className="text-xs text-muted-foreground">Importez les jours fériés officiels du Bénin pour 2026.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={loadBeninHolidays}>Charger</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input 
                      type="date" 
                      value={newHoliday.date}
                      onChange={e => setNewHoliday({...newHoliday, date: e.target.value})}
                    />
                    <Input 
                      placeholder="Libellé (ex: Noël)" 
                      value={newHoliday.label}
                      onChange={e => setNewHoliday({...newHoliday, label: e.target.value})}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddHoliday())}
                    />
                    <Button onClick={handleAddHoliday} className="gap-2">
                      <Plus size={18} /> Ajouter
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData.public_holidays.map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded border border-border/50 group">
                        <div>
                          <p className="text-sm font-bold">{h.label}</p>
                          <p className="text-xs text-muted-foreground">{h.date}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setFormData({...formData, public_holidays: formData.public_holidays.filter((_, idx) => idx !== i)})}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-12 pt-6 border-t border-border">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                disabled={step === 1 || isSubmitting}
                className="gap-2"
              >
                <ChevronLeft size={18} /> Précédent
              </Button>
              
              {step < 5 ? (
                <Button onClick={nextStep} className="gap-2 px-8">
                  Suivant <ChevronRight size={18} />
                </Button>
              ) : (
                <Button 
                  onClick={handleFinish} 
                  disabled={isSubmitting}
                  className="gap-2 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Configuration...
                    </>
                  ) : (
                    <>
                      Terminer <CheckCircle2 size={18} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  function handleAddDept() {
    if (newDept.trim()) {
      setFormData(prev => ({ ...prev, departments: [...prev.departments, newDept.trim()] }));
      setNewDept('');
    }
  }

  function handleAddJob() {
    if (newJob.trim()) {
      setFormData(prev => ({ ...prev, job_titles: [...prev.job_titles, newJob.trim()] }));
      setNewJob('');
    }
  }

  function handleAddHoliday() {
    if (newHoliday.date && newHoliday.label.trim()) {
      setFormData(prev => ({ ...prev, public_holidays: [...prev.public_holidays, { ...newHoliday }] }));
      setNewHoliday({ date: '', label: '' });
    }
  }
}
