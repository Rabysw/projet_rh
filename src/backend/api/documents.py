"""
Module 01 - Administration du Personnel
Document generation endpoints (contracts, certificates, attestations)
"""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from typing import Optional, List
from datetime import datetime
from io import BytesIO

from auth.auth import get_current_user, User
from data_store import rh_employees, collab_payslips
from supabase_client import supabase

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm

router = APIRouter()

# ============================================
# DOCUMENT GENERATION
# ============================================

def generate_contract_pdf(employee, contract_type, start_date, end_date=None):
    """Generate employment contract PDF"""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    styles = getSampleStyleSheet()
    elements = []
    
    # Header
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=18,
        alignment=1,  # Center
        spaceAfter=30,
        textColor=colors.HexColor('#1e3a5f')
    )
    elements.append(Paragraph("CONTRAT DE TRAVAIL", title_style))
    elements.append(Spacer(1, 20))
    
    # Contract type
    type_style = ParagraphStyle(
        'Type',
        parent=styles['Heading2'],
        fontSize=14,
        alignment=1,
        spaceAfter=20
    )
    elements.append(Paragraph(f"{contract_type}", type_style))
    elements.append(Spacer(1, 30))
    
    # Parties
    normal_style = styles['Normal']
    normal_style.fontSize = 11
    normal_style.leading = 16
    
    elements.append(Paragraph("<b>ENTRE LES SOUSSIGNÉS :</b>", normal_style))
    elements.append(Spacer(1, 10))
    
    elements.append(Paragraph(
        f"<b>ICES (Integrated Consulting & Engineering Solution)</b>, société basée au Bénin, "
        f"représentée par sa Direction, ci-après dénommée « L'Employeur »",
        normal_style
    ))
    elements.append(Spacer(1, 15))
    
    elements.append(Paragraph("ET", normal_style))
    elements.append(Spacer(1, 15))
    
    elements.append(Paragraph(
        f"<b>M. / Mme {employee.get('first_name', '')} {employee.get('last_name', '')}</b>, "
        f"ci-après dénommé(e) « Le Collaborateur »",
        normal_style
    ))
    elements.append(Spacer(1, 20))
    
    elements.append(Paragraph("<b>IL A ÉTÉ CONVENU CE QUI SUIT :</b>", normal_style))
    elements.append(Spacer(1, 20))
    
    # Article 1
    elements.append(Paragraph("<b>Article 1 : Objet du contrat</b>", normal_style))
    elements.append(Paragraph(
        "Le présent contrat a pour objet de fixer les conditions d'exécution du travail "
        "fourni par le Collaborateur et les obligations respectives des parties.",
        normal_style
    ))
    elements.append(Spacer(1, 15))
    
    # Article 2
    elements.append(Paragraph("<b>Article 2 : Date d'effet et durée</b>", normal_style))
    date_text = f"Le présent contrat prend effet à compter du {start_date}."
    if end_date:
        date_text += f" Il est conclu pour une durée déterminée se terminant le {end_date}."
    else:
        date_text += " Il est conclu pour une durée indéterminée."
    elements.append(Paragraph(date_text, normal_style))
    elements.append(Spacer(1, 15))
    
    # Article 3
    elements.append(Paragraph("<b>Article 3 : Fonction et classification</b>", normal_style))
    elements.append(Paragraph(
        f"Le Collaborateur est engagé en qualité de <b>{employee.get('position', 'Poste à définir')}</b>. "
        "Il exercera ses fonctions dans les locaux de l'entreprise ou en déplacement selon les besoins.",
        normal_style
    ))
    elements.append(Spacer(1, 15))
    
    # Article 4
    elements.append(Paragraph("<b>Article 4 : Rémunération</b>", normal_style))
    elements.append(Paragraph(
        f"La rémunération brute mensuelle du Collaborateur est fixée à "
        f"<b>{employee.get('base_salary', 0):,} FCFA</b>.",
        normal_style
    ))
    elements.append(Spacer(1, 15))
    
    # Article 5
    elements.append(Paragraph("<b>Article 5 : Durée du travail</b>", normal_style))
    elements.append(Paragraph(
        "La durée du travail est fixée à 40 heures par semaine, "
        "réparties du lundi au vendredi selon l'horaire en vigueur dans l'entreprise.",
        normal_style
    ))
    elements.append(Spacer(1, 30))
    
    # Signature section
    elements.append(Paragraph("<b>Fait à Cotonou, le {}</b>".format(datetime.now().strftime("%d/%m/%Y")), normal_style))
    elements.append(Spacer(1, 40))
    
    # Signature table
    sig_data = [
        ["L'Employeur", "Le Collaborateur"],
        ["", ""],
        ["(Signature précédée de la mention 'Lu et approuvé')", 
         "(Signature précédée de la mention 'Lu et approuvé')"]
    ]
    sig_table = Table(sig_data, colWidths=[8*cm, 8*cm])
    sig_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 60),
        ('FONTNAME', (0, 2), (-1, 2), 'Helvetica-Oblique'),
        ('FONTSIZE', (0, 2), (-1, 2), 8),
    ]))
    elements.append(sig_table)
    
    # Footer
    elements.append(Spacer(1, 40))
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.grey,
        alignment=1
    )
    elements.append(Paragraph("© ICES RH - Document confidentiel - Conforme au Code du Travail du Bénin", footer_style))
    
    doc.build(elements)
    buffer.seek(0)
    return buffer


def generate_certificate_pdf(employee, certificate_type):
    """Generate work certificate PDF"""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    styles = getSampleStyleSheet()
    elements = []
    
    # Logo area (placeholder)
    header_style = ParagraphStyle(
        'Header',
        parent=styles['Normal'],
        fontSize=10,
        alignment=1,
        textColor=colors.HexColor('#1e3a5f')
    )
    elements.append(Paragraph("<b>ICES</b>", header_style))
    elements.append(Paragraph("Integrated Consulting & Engineering Solution", header_style))
    elements.append(Spacer(1, 30))
    
    # Title
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=16,
        alignment=1,
        spaceAfter=40,
        textColor=colors.HexColor('#1e3a5f')
    )
    
    if certificate_type == "attestation_travail":
        elements.append(Paragraph("ATTESTATION DE TRAVAIL", title_style))
    elif certificate_type == "certificat_travail":
        elements.append(Paragraph("CERTIFICAT DE TRAVAIL", title_style))
    else:
        elements.append(Paragraph("CERTIFICAT", title_style))
    
    elements.append(Spacer(1, 40))
    
    # Content
    normal_style = styles['Normal']
    normal_style.fontSize = 12
    normal_style.leading = 20
    normal_style.alignment = 0  # Justify
    
    full_name = f"{employee.get('first_name', '')} {employee.get('last_name', '')}"
    
    content = f"""Nous soussignés, <b>ICES (Integrated Consulting & Engineering Solution)</b>, 
    certifions que <b>{full_name}</b>, immatriculé(e) sous le numéro <b>{employee.get('matricule', 'N/A')}</b>, 
    a travaillé au sein de notre entreprise en qualité de <b>{employee.get('position', 'Collaborateur')}</b>, 
    du <b>{employee.get('hire_date', 'date non spécifiée')}</b> à ce jour."""
    
    elements.append(Paragraph(content, normal_style))
    elements.append(Spacer(1, 20))
    
    if certificate_type == "certificat_travail":
        elements.append(Paragraph(
            "Ce certificat est délivré à la demande de l'intéressé(e) pour servir et valoir ce que de droit.",
            normal_style
        ))
    else:
        elements.append(Paragraph(
            "Cette attestation est délivrée à la demande de l'intéressé(e) pour servir et valoir ce que de droit.",
            normal_style
        ))
    
    elements.append(Spacer(1, 60))
    
    # Date and signature
    date_text = f"Fait à Cotonou, le {datetime.now().strftime('%d/%m/%Y')}"
    elements.append(Paragraph(date_text, normal_style))
    elements.append(Spacer(1, 40))
    
    sig_style = ParagraphStyle(
        'Sig',
        parent=styles['Normal'],
        fontSize=11,
        alignment=2  # Right
    )
    elements.append(Paragraph("<b>La Direction des Ressources Humaines</b>", sig_style))
    elements.append(Spacer(1, 50))
    elements.append(Paragraph("(Signature et cachet)", ParagraphStyle('Cachet', parent=styles['Normal'], fontSize=9, alignment=2, textColor=colors.grey)))
    
    # Footer
    elements.append(Spacer(1, 60))
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.grey,
        alignment=1
    )
    elements.append(Paragraph("© ICES RH - Document confidentiel", footer_style))
    
    doc.build(elements)
    buffer.seek(0)
    return buffer

def generate_payslip_pdf(employee, payslip):
    """Generate payslip PDF conforming to Benin labor law"""
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []
    
    # Header
    elements.append(Paragraph(f"<b>BULLETIN DE PAIE - {payslip['month']}</b>", styles['Heading1']))
    elements.append(Spacer(1, 12))
    
    # Info Table
    emp_info = [
        [f"Employé: {employee['first_name']} {employee['last_name']}", f"Matricule: {employee['matricule']}"],
        [f"Poste: {employee['position']}", f"Date d'entrée: {employee['hire_date']}"],
        [f"CNSS: {employee.get('num_cnss', 'N/A')}", f"IFU: {employee.get('ifu', 'N/A')}"]
    ]
    t = Table(emp_info, colWidths=[9*cm, 9*cm])
    t.setStyle(TableStyle([('GRID', (0,0), (-1,-1), 0.5, colors.grey)]))
    elements.append(t)
    elements.append(Spacer(1, 20))
    
    # Salary details
    data = [["Désignation", "Base", "Taux", "Gain", "Retenue"]]
    data.append(["Salaire de base", f"{employee['base_salary']:,}", "100%", f"{employee['base_salary']:,}", ""])
    
    for d in payslip.get('deductions', []):
        data.append([d['label'], "", f"{d.get('percent', '')}%", "", f"{d['amount']:,}"])
        
    data.append(["", "", "", "", ""])
    data.append(["<b>TOTAL NET À PAYER</b>", "", "", "", f"<b>{payslip['net']:,} FCFA</b>"])
    
    salary_table = Table(data, colWidths=[6*cm, 3*cm, 2*cm, 3.5*cm, 3.5*cm])
    salary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e3a5f')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
        ('ALIGN', (3,1), (-1,-1), 'RIGHT')
    ]))
    elements.append(salary_table)
    
    doc.build(elements)
    buffer.seek(0)
    return buffer

@router.get("/generate/payslip/{payslip_id}")
def download_payslip(payslip_id: int, current_user: User = Depends(get_current_user)):
    """Download a specific payslip as PDF"""
    payslip = next((p for p in collab_payslips if p.id == payslip_id), None)
    if not payslip:
        raise HTTPException(status_code=404, detail="Bulletin non trouvé")

    employee = next((e for e in rh_employees if e.id == current_user.id), None)
    if not employee and current_user.role.lower() not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Accès refusé")

    # Si l'utilisateur est RH/Admin et n'est pas dans rh_employees, on crée un objet minimal pour éviter le crash
    emp_data = employee.model_dump() if employee else {"first_name": "Admin", "last_name": "ICES", "matricule": "ADMIN", "position": "RH", "hire_date": "N/A"}
    pdf_buffer = generate_payslip_pdf(emp_data, payslip.model_dump())
    filename = f"bulletin_{payslip.month.replace(' ', '_')}.pdf"

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


# ============================================
# API ENDPOINTS
# ============================================

@router.post("/generate/contract")
def generate_contract(
    employee_id: int,
    contract_type: str,  # CDI, CDD, Stage
    start_date: str,
    end_date: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """Generate employment contract PDF"""
    # Check authorization
    if current_user.role.lower() not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Accès réservé aux RH")
    
    employee = next((e for e in rh_employees if e.id == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employé non trouvé")

    # Generate PDF
    pdf_buffer = generate_contract_pdf(
        employee.model_dump(),
        contract_type,
        start_date,
        end_date
    )
    
    filename = f"contrat_{employee.matricule}_{datetime.now().strftime('%Y%m%d')}.pdf"
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


@router.post("/generate/certificate")
def generate_certificate(
    employee_id: int,
    certificate_type: str = "attestation_travail",  # attestation_travail, certificat_travail
    current_user: User = Depends(get_current_user)
):
    """Generate work certificate PDF"""
    employee = next((e for e in rh_employees if e.id == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employé non trouvé")

    # Check authorization - employee can request their own, RH can request any
    if current_user.role.lower() not in ["admin_rh", "resp_rh"] and current_user.id != employee_id:
        raise HTTPException(status_code=403, detail="Vous ne pouvez générer que vos propres certificats")
    
    # Generate PDF
    pdf_buffer = generate_certificate_pdf(employee.model_dump(), certificate_type)
    
    filename = f"attestation_{employee.matricule}_{datetime.now().strftime('%Y%m%d')}.pdf"
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = "contract",  # contract, certificate, payslip, other
    employee_id: Optional[int] = None,
    current_user: User = Depends(get_current_user)
):
    """Upload a document to employee file"""
    # Check authorization
    if current_user.role.lower() not in ["admin_rh", "resp_rh"] and (employee_id is not None and current_user.id != employee_id):
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    if employee_id is None:
        raise HTTPException(status_code=400, detail="ID employé requis")

    try:
        # 1. Read file content
        content = await file.read()
        file_ext = file.filename.split(".")[-1]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_path = f"employee_{employee_id}/{document_type}_{timestamp}.{file_ext}"

        # 2. Upload to Supabase Storage (bucket 'documents')
        # Ensure the bucket exists (this might fail if it already exists, so we wrap it)
        try:
            supabase.storage.create_bucket("documents", options={"public": True})
        except:
            pass

        res = supabase.storage.from_("documents").upload(
            path=file_path,
            file=content,
            file_options={"content-type": file.content_type}
        )

        # 3. Get public URL
        file_url = supabase.storage.from_("documents").get_public_url(file_path)

        # 4. Save to database
        # We try to save to employee_documents table if it exists
        try:
            doc_data = {
                "employee_id": employee_id,
                "document_type": document_type,
                "file_url": file_url,
                "file_name": file.filename
            }
            supabase.table("employee_documents").insert(doc_data).execute()
        except Exception as e:
            # Fallback: if it's a contract, try to update the employees table
            if document_type == "contract":
                try:
                    supabase.table("employees").update({"contract_url": file_url}).eq("id", employee_id).execute()
                except:
                    print(f"Failed to update employee contract_url: {e}")
            print(f"Database insertion failed but file was uploaded: {e}")

        return {
            "message": "Document uploadé avec succès",
            "filename": file.filename,
            "url": file_url,
            "type": document_type,
            "employee_id": employee_id,
            "uploaded_at": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du téléchargement : {str(e)}")


@router.get("/employee/{employee_id}")
def get_employee_documents(
    employee_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get list of documents for an employee"""
    # Check authorization
    if current_user.role.lower() not in ["admin_rh", "resp_rh"] and current_user.id != employee_id:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    try:
        result = supabase.table("employee_documents").select("*").eq("employee_id", employee_id).order("uploaded_at", desc=True).execute()
        return {
            "employee_id": employee_id,
            "documents": result.data or []
        }
    except Exception:
        # Fallback if table doesn't exist
        return {
            "employee_id": employee_id,
            "documents": []
        }

@router.post("/generate/avenant")
def generate_avenant(
    employee_id: int,
    modifications: List[str],
    current_user: User = Depends(get_current_user)
):
    """Generate a contract amendment (Avenant)"""
    if current_user.role.lower() not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Accès réservé aux RH")

    employee = next((e for e in rh_employees if e.id == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employé non trouvé")

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph(f"<b>AVENANT AU CONTRAT DE TRAVAIL</b>", styles['Heading1']))
    elements.append(Spacer(1, 20))
    
    elements.append(Paragraph(f"Entre ICES et M./Mme {employee.first_name} {employee.last_name}, il est convenu ce qui suit :", styles['Normal']))
    elements.append(Spacer(1, 12))
    
    for mod in modifications:
        elements.append(Paragraph(f"• {mod}", styles['Normal']))
        elements.append(Spacer(1, 6))

    elements.append(Spacer(1, 40))
    elements.append(Paragraph(f"Fait à Cotonou, le {datetime.now().strftime('%d/%m/%Y')}", styles['Normal']))
    
    doc.build(elements)
    buffer.seek(0)
    
    filename = f"avenant_{employee.matricule}_{datetime.now().strftime('%Y%m%d')}.pdf"
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
