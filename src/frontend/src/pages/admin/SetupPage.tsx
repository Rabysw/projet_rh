import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useCompanyConfig } from '@/contexts/CompanyConfigContext';
import { 
  Building2, 
  Users, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  X, 
  DollarSign, 
  Briefcase, 
  Bell, 
  FileText, 
  Globe, 
  Clock,
  ShieldAlert,
  Settings,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const ALL_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { refreshConfig } = useCompanyConfig();

  const prefillICES = () => {
    setFormData({
      ...formData,
      company_name: 'ICES International',
      legal_structure: 'SAS',
      fiscal_id: '3202112345678',
      primary_color: '#1e40af',
      departments: [
        'Direction Technique & Ingénierie',
        'Conseil & Stratégie',
        'Capital Humain (RH)',
        'Finance & Administration',
        'Support Client & Maintenance'
      ],
      job_titles: [
        'Ingénieur de Projet Senior',
        'Consultant Business Analyst',
        'Responsable des Opérations',
        'Chargé de Recrutement',
        'Expert en Transformation Digitale'
      ],
      leave_types: [
        'Congé payé',
        'Maladie',
        'RTT (Récupération)',
        'Formation',
        'Évènement Familial',
        'Sans solde'
      ],
      working_hours_start: '08:00',
      working_hours_end: '18:00',
      break_duration_minutes: 60,
    });
    toast.success("Données ICES pré-remplies !");
  };

  const [formData, setFormData] = useState({
    // Étape 1 — Entreprise
    company_name: '',
    company_logo_url: '',
    primary_color: '#3b82f6',
    country: 'Bénin',
    currency: 'XOF',
    phone_prefix: '+229',
    timezone: 'Africa/Porto-Novo',
    fiscal_id: '', // IFU au Bénin
    legal_structure: 'SARL',

    // Étape 2 — Structure
    departments: ['Direction Générale', 'Ressources Humaines', 'Finance & Comptabilité', 'Informatique & Digital', 'Opérations'],
    job_titles: ['Directeur Général', 'Responsable RH', 'Comptable', 'Développeur', 'Consultant'],
    dept_input: '',
    job_input: '',

    // Étape 3 — Calendrier
    working_days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    working_hours_start: '08:00',
    working_hours_end: '17:00',
    break_duration_minutes: 60,

    // Étape 4 — Politiques RH
    leave_days_per_year: 24,
    leave_carry_over_max: 5,
    probation_duration_days: 90,
    contract_alert_days: 30,
    late_alert_threshold_minutes: 15,
    late_count_alert_per_month: 3,
    id_expiry_alert_days: 60,
    medical_alert_days: 30,
    overtime_threshold_hours: 8,
    leave_types: ['Congé payé', 'Maladie', 'Sans solde', 'Maternité', 'Paternité', 'Exceptionnel', 'Deuil', 'Mariage'],
    
    // Étape 5 - Jours fériés
    holidays_input_date: '',
    holidays_input_name: '',
    public_holidays: [
      { date: '2026-01-01', name: 'Nouvel An' },
      { date: '2026-01-10', name: 'Fête du Vodoun' },
      { date: '2026-04-06', name: 'Lundi de Pâques' },
      { date: '2026-05-01', name: 'Fête du Travail' },
      { date: '2026-08-01', name: 'Fête de l\'Indépendance' },
      { date: '2026-12-25', name: 'Noël' },
    ] as {date: string, name: string}[],
  });

  const update = (key: string, value: unknown) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const toggleDay = (day: string) => {
    const days = formData.working_days.includes(day)
      ? formData.working_days.filter(d => d !== day)
      : [...formData.working_days, day];
    update('working_days', days);
  };

  const addItem = (listKey: 'departments' | 'job_titles', inputKey: 'dept_input' | 'job_input') => {
    const val = formData[inputKey].trim();
    if (!val) return;
    if (!(formData[listKey] as string[]).includes(val)) {
      update(listKey, [...(formData[listKey] as string[]), val]);
    }
    update(inputKey, '');
  };

  const addHoliday = () => {
    const date = formData.holidays_input_date;
    const name = formData.holidays_input_name.trim();
    if (!date || !name) return;
    
    const exists = formData.public_holidays.some(h => h.date === date);
    if (!exists) {
      update('public_holidays', [...formData.public_holidays, { date, name }]);
    }
    update('holidays_input_date', '');
    update('holidays_input_name', '');
  };

  const removeHoliday = (dateToRemove: string) => {
    update('public_holidays', formData.public_holidays.filter(h => h.date !== dateToRemove));
  };

  const removeItem = (listKey: 'departments' | 'job_titles', item: string) =>
    update(listKey, (formData[listKey] as string[]).filter(i => i !== item));

  const canContinue = () => {
    if (step === 1) return formData.company_name.trim() !== '';
    if (step === 3) return formData.working_days.length > 0;
    return true;
  };

  const handleComplete = async () => {
    const token = localStorage.getItem('ices_token');
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/v1/admin/company-config/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          company_name: formData.company_name,
          company_logo_url: formData.company_logo_url,
          primary_color: formData.primary_color,
          country: formData.country,
          currency: formData.currency,
          phone_prefix: formData.phone_prefix,
          timezone: formData.timezone,
          fiscal_id: formData.fiscal_id,
          legal_structure: formData.legal_structure,
          working_days: formData.working_days,
          working_hours_start: formData.working_hours_start + ':00',
          working_hours_end: formData.working_hours_end + ':00',
          break_duration_minutes: formData.break_duration_minutes,
          leave_days_per_year: formData.leave_days_per_year,
          leave_carry_over_max: formData.leave_carry_over_max,
          leave_types: formData.leave_types,
          probation_duration_days: formData.probation_duration_days,
          contract_alert_days: formData.contract_alert_days,
          id_expiry_alert_days: formData.id_expiry_alert_days,
          medical_alert_days: formData.medical_alert_days,
          overtime_threshold_hours: formData.overtime_threshold_hours,
          late_alert_threshold_minutes: formData.late_alert_threshold_minutes,
          late_count_alert_per_month: formData.late_count_alert_per_month,
          departments: formData.departments,
          job_titles: formData.job_titles,
          public_holidays: formData.public_holidays,
        })
      });

      if (response.ok) {
        localStorage.removeItem('force_setup'); // On retire le flag une fois terminé
        await refreshConfig();
        navigate({ to: '/' });
      } else {
        const data = await response.json();
        setError(data.detail || 'Erreur lors de la sauvegarde.');
      }
    } catch {
      setError('Erreur réseau. Vérifiez que le backend est démarré.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Entreprise', icon: <Building2 className="w-5 h-5" /> },
    { id: 2, title: 'Structure', icon: <Users className="w-5 h-5" /> },
    { id: 3, title: 'Calendrier', icon: <Calendar className="w-5 h-5" /> },
    { id: 4, title: 'Politiques', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 5, title: 'Jours Fériés', icon: <Calendar className="w-5 h-5" /> },
    { id: 6, title: 'Résumé', icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl border-none">
        <CardHeader className="bg-white border-b text-center">
          <div className="flex justify-between items-center mb-8 px-4">
            {steps.map(s => (
              <div key={s.id} className="flex flex-col items-center flex-1 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 transition-colors ${step >= s.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {s.icon}
                </div>
                <span className={`text-xs font-medium ${step >= s.id ? 'text-blue-600' : 'text-gray-400'}`}>{s.title}</span>
              </div>
            ))}
          </div>
          <CardTitle className="text-2xl">Configuration du Système RH</CardTitle>
          <CardDescription>Initialisez votre environnement de travail</CardDescription>
        </CardHeader>

        <CardContent className="p-10">
          <div className="min-h-[320px]">

            {/* ÉTAPE 1 — Entreprise */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900">Configuration Rapide</p>
                      <p className="text-xs text-blue-700">Remplir avec les standards ICES International</p>
                    </div>
                  </div>
                  <Button type="button" onClick={prefillICES} variant="outline" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50">
                    Appliquer l'idée ICES
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Nom officiel de l'entité *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input className="h-10 pl-10" value={formData.company_name}
                        onChange={e => update('company_name', e.target.value)}
                        placeholder="ex: ICES International" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Identifiant Fiscal (IFU/NIF)</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input className="h-10 pl-10" value={formData.fiscal_id}
                        onChange={e => update('fiscal_id', e.target.value)}
                        placeholder="ex: 1234567890123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Forme Juridique</label>
                    <select 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={formData.legal_structure}
                      onChange={e => update('legal_structure', e.target.value)}
                    >
                      <option value="SARL">SARL</option>
                      <option value="SAS">SAS</option>
                      <option value="SA">SA</option>
                      <option value="ETS">ETS / Entreprise Individuelle</option>
                      <option value="NGO">ONG / Association</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Pays</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input className="h-10 pl-10" value={formData.country} onChange={e => update('country', e.target.value)} placeholder="Bénin" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Devise</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input className="h-10 pl-10" value={formData.currency} onChange={e => update('currency', e.target.value)} placeholder="XOF" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Logo URL (Optionnel)</label>
                    <Input className="h-10" value={formData.company_logo_url}
                      onChange={e => update('company_logo_url', e.target.value)}
                      placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Couleur principale</label>
                    <div className="flex gap-2">
                      <Input type="color" className="w-12 h-10 p-1" value={formData.primary_color}
                        onChange={e => update('primary_color', e.target.value)} />
                      <Input className="h-10" value={formData.primary_color}
                        onChange={e => update('primary_color', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 — Structure */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 mb-4">
                  Définissez l'ossature de votre entreprise. Ces départements et postes seront utilisés pour classer vos collaborateurs.
                </div>
                {/* Départements */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Départements
                  </label>
                  <div className="flex gap-2">
                    <Input value={formData.dept_input}
                      onChange={e => update('dept_input', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addItem('departments', 'dept_input')}
                      placeholder="ex: Ressources Humaines" />
                    <Button type="button" variant="outline" onClick={() => addItem('departments', 'dept_input')}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.departments.map(d => (
                      <span key={d} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                        {d}
                        <button onClick={() => removeItem('departments', d)} className="hover:text-blue-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Postes */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Postes / Titres
                  </label>
                  <div className="flex gap-2">
                    <Input value={formData.job_input}
                      onChange={e => update('job_input', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addItem('job_titles', 'job_input')}
                      placeholder="ex: Développeur, Comptable..." />
                    <Button type="button" variant="outline" onClick={() => addItem('job_titles', 'job_input')}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.job_titles.map(j => (
                      <span key={j} className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                        {j}
                        <button onClick={() => removeItem('job_titles', j)} className="hover:text-green-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 — Calendrier */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Jours travaillés *
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {ALL_DAYS.map(day => (
                      <button key={day} type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                          formData.working_days.includes(day)
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                        }`}>
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Début
                    </label>
                    <Input type="time" value={formData.working_hours_start}
                      onChange={e => update('working_hours_start', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Fin
                    </label>
                    <Input type="time" value={formData.working_hours_end}
                      onChange={e => update('working_hours_end', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Pause (min)</label>
                    <Input type="number" value={formData.break_duration_minutes}
                      onChange={e => update('break_duration_minutes', Number(e.target.value))} />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-semibold text-gray-700">Fuseau horaire</label>
                  <Input value={formData.timezone} onChange={e => update('timezone', e.target.value)} placeholder="Africa/Porto-Novo" />
                </div>
              </div>
            )}

            {/* ÉTAPE 4 — Politiques RH */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Section Congés */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider border-b pb-1">Gestion des Congés</h4>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Jours de congé / an</label>
                      <Input type="number" value={formData.leave_days_per_year}
                        onChange={e => update('leave_days_per_year', Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Report max de congés (N-1)</label>
                      <Input type="number" value={formData.leave_carry_over_max}
                        onChange={e => update('leave_carry_over_max', Number(e.target.value))} />
                    </div>
                  </div>

                  {/* Section Alertes */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider border-b pb-1 flex items-center gap-2">
                      <Bell className="w-4 h-4" /> Alertes & Sécurité
                    </h4>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Alerte fin de contrat (jours)</label>
                      <Input type="number" value={formData.contract_alert_days}
                        onChange={e => update('contract_alert_days', Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Alerte expiration pièce (jours)</label>
                      <Input type="number" value={formData.id_expiry_alert_days}
                        onChange={e => update('id_expiry_alert_days', Number(e.target.value))} />
                    </div>
                  </div>

                  {/* Section Discipline */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider border-b pb-1 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" /> Discipline
                    </h4>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Seuil retard (minutes)</label>
                      <Input type="number" value={formData.late_alert_threshold_minutes}
                        onChange={e => update('late_alert_threshold_minutes', Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Retards max / mois avant alerte</label>
                      <Input type="number" value={formData.late_count_alert_per_month}
                        onChange={e => update('late_count_alert_per_month', Number(e.target.value))} />
                    </div>
                  </div>

                  {/* Section Finance */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider border-b pb-1 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Finance
                    </h4>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Seuil Heures Sup (h/jour)</label>
                      <Input type="number" value={formData.overtime_threshold_hours}
                        onChange={e => update('overtime_threshold_hours', Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600">Période d'essai (jours)</label>
                      <Input type="number" value={formData.probation_duration_days}
                        onChange={e => update('probation_duration_days', Number(e.target.value))} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 5 — Jours fériés */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-700 mb-4">
                  Ajoutez les jours fériés légaux de votre pays pour un calcul précis des temps de travail.
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Ajouter un jour férié</label>
                  <div className="flex gap-2">
                    <Input 
                      type="date"
                      value={formData.holidays_input_date}
                      onChange={e => update('holidays_input_date', e.target.value)}
                    />
                    <Input 
                      value={formData.holidays_input_name}
                      onChange={e => update('holidays_input_name', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addHoliday()}
                      placeholder="ex: Fête du Travail" 
                    />
                    <Button type="button" variant="outline" onClick={addHoliday}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 max-h-56 overflow-y-auto pr-2">
                    {formData.public_holidays.sort((a, b) => a.date.localeCompare(b.date)).map(h => (
                      <div key={h.date} className="flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-purple-600 uppercase tracking-tighter">
                            {new Date(h.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                          </span>
                          <span className="text-sm font-medium text-gray-800">{h.name}</span>
                        </div>
                        <button onClick={() => removeHoliday(h.date)} className="text-gray-400 hover:text-red-500 p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 6 — Résumé */}
            {step === 6 && (
              <div className="space-y-6 animate-in zoom-in-95">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <h4 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-blue-600" /> Profil Entreprise
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Nom</span><span className="font-semibold">{formData.company_name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Forme</span><span className="font-semibold">{formData.legal_structure}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">IFU</span><span className="font-semibold">{formData.fiscal_id || '—'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Localisation</span><span className="font-semibold">{formData.country} ({formData.timezone})</span></div>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <h4 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" /> Temps de Travail
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Horaires</span><span className="font-semibold">{formData.working_hours_start} — {formData.working_hours_end}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Pause</span><span className="font-semibold">{formData.break_duration_minutes} min</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Jours travaillés</span><span className="font-semibold">{formData.working_days.length} jours/sem</span></div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-blue-600 rounded-xl text-white shadow-lg space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Validation Finale
                  </h4>
                  <p className="text-sm opacity-90">
                    Votre système RH est prêt. En cliquant sur "Terminer", nous allons configurer {formData.departments.length} départements, {formData.job_titles.length} postes types et vos politiques de congés.
                  </p>
                </div>

                {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">{error}</div>}
              </div>
            )}
          </div>

          <div className="flex justify-between mt-10 pt-6 border-t">
            <Button variant="ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>Précédent</Button>
            {step < 6 ? (
              <Button className="px-8 bg-blue-600 hover:bg-blue-700"
                disabled={!canContinue()}
                onClick={() => setStep(step + 1)}>
                Continuer
              </Button>
            ) : (
              <Button className="px-8 bg-green-600 hover:bg-green-700"
                disabled={loading}
                onClick={handleComplete}>
                {loading ? 'Enregistrement...' : 'Terminer'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}