"""
Utility for Benin-specific payroll calculations
Based on General Tax Code (CGI) and Labor Code of Benin
"""

def calculate_cnss_employee(gross_salary: float) -> float:
    """CNSS Part Ouvrière : 3.6% au Bénin"""
    return gross_salary * 0.036

def calculate_cnss_employer(gross_salary: float) -> float:
    """CNSS Part Patronale : 16.4% + 1% (Accidents) + 4% (Prestations Familiales) = 21.4%"""
    return gross_salary * 0.214

def calculate_vps(gross_salary: float) -> float:
    """Versement Patronal sur Salaires : 4%"""
    return gross_salary * 0.04

def calculate_irpp(taxable_income: float, children_count: int = 0) -> float:
    """
    Simplified IRPP calculation (Benin progressive brackets)
    Brackets:
    0 - 60,000: 0%
    60,001 - 150,000: 10%
    150,001 - 300,000: 15%
    300,001 - 500,000: 20%
    Over 500,000: 30%
    """
    # Abattements pour charge de famille (Example values)
    reductions = {0: 0, 1: 0.05, 2: 0.10, 3: 0.15, 4: 0.20, 5: 0.23, 6: 0.26}
    reduction_pct = reductions.get(min(children_count, 6), 0)
    
    tax = 0
    if taxable_income > 500000:
        tax += (taxable_income - 500000) * 0.30
        taxable_income = 500000
    if taxable_income > 300000:
        tax += (taxable_income - 300000) * 0.20
        taxable_income = 300000
    if taxable_income > 150000:
        tax += (taxable_income - 150000) * 0.15
        taxable_income = 150000
    if taxable_income > 60000:
        tax += (taxable_income - 60000) * 0.10
        
    return tax * (1 - reduction_pct)

def get_net_salary(gross: float, children: int = 0) -> dict:
    cnss = calculate_cnss_employee(gross)
    taxable = gross - cnss
    irpp = calculate_irpp(taxable, children)
    net = taxable - irpp
    return {"gross": gross, "cnss": cnss, "irpp": irpp, "net": net}