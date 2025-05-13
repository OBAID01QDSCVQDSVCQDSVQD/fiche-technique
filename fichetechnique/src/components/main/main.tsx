'use client';

import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FicheTechniquePDF from './FicheTechniquePDF';
import { Editor } from '@tinymce/tinymce-react';
import RichTextEditor from './RichTextEditor';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '10px',
  boxSizing: 'border-box',
};

const modalContentStyles: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: '2rem 1rem',
  minWidth: 0,
  maxWidth: 500,
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  position: 'relative',
  boxSizing: 'border-box',
};

const closeBtnStyles: React.CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'transparent',
  border: 'none',
  fontSize: 22,
  cursor: 'pointer',
};

const labelStyles: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: 4,
  display: 'block',
};

const inputStyles: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 6,
  border: '1px solid #ccc',
  marginBottom: 16,
  fontSize: 15,
  fontFamily: 'inherit',
  resize: 'vertical',
};

const submitBtnStyles: React.CSSProperties = {
  background: 'linear-gradient(90deg,rgb(0, 181, 252),rgb(0, 7, 137))',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 20px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 8,
  width: '100%',
};

const openBtnStyles: React.CSSProperties = {
  background: 'linear-gradient(90deg,hsl(191, 62.60%, 60.20%),rgb(218, 174, 16))',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '12px 28px',
  fontWeight: 600,
  fontSize: 18,
  cursor: 'pointer',
  margin: '40px auto',
  display: 'block',
};

// Hide UI elements not needed in print
const printHideStyles: React.CSSProperties = {
  display: 'none',
};

const printBtnStyles: React.CSSProperties = {
  background: '#0a4275',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 18px',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  marginRight: 12,
  marginBottom: 18,
};

export default function ProductSheetModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    shortdesc: '',
    description: '',
    domaine: '',
    proprietes: '',
    preparation: '',
    conditions: '',
    application: '',
    consommation: '',
    nettoyage: '',
    stockage: '',
    consignes: '',
  });
  const [submitted, setSubmitted] = useState<typeof form | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    setSubmitted(form);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const fieldLabels: { [K in keyof typeof form]: string } = {
    nom: 'Nom du produit',
    shortdesc: 'Short description',
    description: 'Description du produit',
    domaine: "Domaine d'application",
    proprietes: 'Propriétés principales',
    preparation: 'Préparation du support',
    conditions: "Conditions d'application",
    application: 'Application',
    consommation: 'Consommation',
    nettoyage: 'Nettoyage',
    stockage: 'Stockage et conditionnement',
    consignes: 'Consignes de sécurité',
  };

  const cardStyles: React.CSSProperties = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    padding: '2rem 1.5rem',
    margin: '32px auto',
    maxWidth: 600,
    width: '100%',
    color: '#222',
  };
  const fieldTitleStyles: React.CSSProperties = {
    fontWeight: 700,
    color: '#0a4275',
    marginBottom: 4,
    fontSize: 17,
  };
  const fieldValueStyles: React.CSSProperties = {
    marginBottom: 18,
    fontSize: 15,
    whiteSpace: 'pre-line',
    background: '#f6f8fa',
    borderRadius: 6,
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
  };

  return (
    <>
      <button style={openBtnStyles} onClick={() => setOpen(true)}>
        Saisir une fiche technique
      </button>
      {open && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <button style={closeBtnStyles} onClick={() => setOpen(false)} title="Fermer">&times;</button>
            <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Fiche technique - Produit de peinture</h2>
            <form onSubmit={handleSubmit}>
              <label style={labelStyles} htmlFor="nom">Nom du produit *</label>
              <input
                style={inputStyles}
                type="text"
                id="nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
              />
              <label style={labelStyles} htmlFor="shortdesc">Short description</label>
              <input
                style={inputStyles}
                type="text"
                id="shortdesc"
                name="shortdesc"
                value={form.shortdesc}
                onChange={handleChange}
                maxLength={120}
              />
              <label style={labelStyles} htmlFor="description">Description du produit</label>
              <RichTextEditor
                value={form.description}
                onChange={val => setForm({ ...form, description: val })}
              />
              <label style={labelStyles} htmlFor="domaine">Domaine d'application</label>
              <RichTextEditor
                value={form.domaine}
                onChange={val => setForm({ ...form, domaine: val })}
              />
              <label style={labelStyles} htmlFor="proprietes">Propriétés principales</label>
              <RichTextEditor
                value={form.proprietes}
                onChange={val => setForm({ ...form, proprietes: val })}
              />
              <label style={labelStyles} htmlFor="preparation">Préparation du support</label>
              <RichTextEditor
                value={form.preparation}
                onChange={val => setForm({ ...form, preparation: val })}
              />
              <label style={labelStyles} htmlFor="conditions">Conditions d'application</label>
              <RichTextEditor
                value={form.conditions}
                onChange={val => setForm({ ...form, conditions: val })}
              />
              <label style={labelStyles} htmlFor="application">Application</label>
              <RichTextEditor
                value={form.application}
                onChange={val => setForm({ ...form, application: val })}
              />
              <label style={labelStyles} htmlFor="consommation">Consommation</label>
              <RichTextEditor
                value={form.consommation}
                onChange={val => setForm({ ...form, consommation: val })}
              />
              <label style={labelStyles} htmlFor="nettoyage">Nettoyage</label>
              <RichTextEditor
                value={form.nettoyage}
                onChange={val => setForm({ ...form, nettoyage: val })}
              />
              <label style={labelStyles} htmlFor="stockage">Stockage et conditionnement</label>
              <RichTextEditor
                value={form.stockage}
                onChange={val => setForm({ ...form, stockage: val })}
              />
              <label style={labelStyles} htmlFor="consignes">Consignes de sécurité</label>
              <RichTextEditor
                value={form.consignes}
                onChange={val => setForm({ ...form, consignes: val })}
              />
              <button type="submit" style={submitBtnStyles}>Envoyer</button>
            </form>
          </div>
        </div>
      )}
      {submitted && (
        <>
          <section style={{
            background: '#f6f8fa',
            borderRadius: 14,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            padding: 0,
            margin: '32px auto',
            maxWidth: 900,
            width: '100%',
            color: '#222',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Header with logo and product name */}
            <div style={{
              background: '#0a2640',
              color: '#fff',
              padding: '38px 0 24px 0',
              textAlign: 'left',
              boxShadow: '0 2px 8px #0a264033',
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              justifyContent: 'flex-start',
            }}>
              <img src="/logo-hc.png" alt="Logo Horizon Chimique" style={{ height: 64, width: 'auto', marginLeft: 32, background: '#fff', borderRadius: 8, padding: 6, boxShadow: '0 2px 8px #0a427522' }} />
              <div>
                <h1 style={{ fontSize: 38, fontWeight: 900, margin: 0, letterSpacing: 1 }}>{submitted.nom || 'Nom du produit'}</h1>
                {submitted.shortdesc && (
                  <div style={{ fontSize: 17, fontWeight: 400, marginTop: 8, opacity: 0.93 }}>{submitted.shortdesc}</div>
                )}
              </div>
            </div>
            {/* Sections */}
            <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0 32px 0' }}>
              {[
                { label: 'INFORMATION', value: submitted.description },
                { label: "DOMAINES D'APPLICATIONS", value: submitted.domaine },
                { label: 'CARACTÉRISTIQUES AVANTAGES', value: submitted.proprietes },
                { label: 'PRÉPARATION DU SUPPORT', value: submitted.preparation },
                { label: "CONDITIONS D'APPLICATION", value: submitted.conditions },
                { label: 'APPLICATION', value: submitted.application },
                { label: 'CONSOMMATION', value: submitted.consommation },
                { label: 'NETTOYAGE', value: submitted.nettoyage },
                { label: 'STOCKAGE ET CONDITIONNEMENT', value: submitted.stockage },
                { label: 'CONSIGNES DE SÉCURITÉ', value: submitted.consignes },
              ]
              .filter(section => section.value && section.value.trim() !== '')
              .map((section, idx, arr) => {
                const labelBg = idx % 2 === 0 ? 'rgb(11, 0, 114)' : 'rgb(99, 198, 255)';
                const valueBg = idx % 2 === 0 ? 'rgb(237, 237, 237)' : 'rgb(99, 198, 255)';
                const valueColor = idx % 2 === 0 ? '#222' : '#222';
                return (
                  <React.Fragment key={idx}>
                    <div style={{
                      background: valueBg,
                      borderRadius: 0,
                      marginBottom: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'stretch',
                      overflow: 'hidden',
                      boxShadow: 'none',
                      borderBottom: idx < arr.length - 1 ? '2px solid #fff' : 'none',
                    }}>
                      <div style={{
                        width: 210,
                        minWidth: 140,
                        maxWidth: 240,
                        background: labelBg,
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 15,
                        padding: '18px 16px 18px 18px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        lineHeight: 1.3,
                        justifyContent: 'flex-start',
                      }}>{section.label}</div>
                      <div style={{ maxWidth: 600, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
                        <div
                          className="rich-html-content"
                          style={{
                            background: valueBg,
                            color: valueColor,
                            fontSize: 15,
                            padding: '8px 12px',
                            minHeight: 60,
                            maxWidth: 600,
                            width: '100%',
                            margin: '0 auto',
                            boxSizing: 'border-box',
                            lineHeight: 1.5,
                            fontFamily: 'inherit',
                          }}
                          dangerouslySetInnerHTML={{ __html: section.value }}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </main>
            <div style={{ textAlign: 'right', padding: '0 32px 24px 0' }}>
              <button style={printBtnStyles} onClick={handlePrint}>Imprimer</button>
            </div>
            {/* Footer with page number */}
            <footer
              className="pdf-print-footer"
              style={{
                width: '100%',
                background: '#fff',
                color: '#0a4275',
                fontSize: 14,
                padding: '8px 24px',
                borderTop: '2px solid #e3f0fa',
                textAlign: 'left',
                fontFamily: 'inherit',
                letterSpacing: 1,
                opacity: 0.85,
                position: 'relative',
                display: 'none', // Hide on screen, show in print
              }}
            >
              <span style={{ display: 'inline-block', marginRight: 16 }}>
                www.horizon-chimique.tn
              </span>
              <span style={{ display: 'inline-block', marginRight: 16 }}>
                31 520 033
              </span>
              <span style={{ display: 'inline-block', marginRight: 16 }}>
                ZI Sidi Abdelhamid, Sousse, Tunisie
              </span>
              <span style={{ float: 'right' }} className="pdf-print-page">Page <span className="pdf-print-page-num"></span></span>
            </footer>
          </section>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <PDFDownloadLink
              document={<FicheTechniquePDF data={submitted} />}
              fileName={`fiche-technique-${submitted.nom || 'produit'}.pdf`}
              style={{
                display: 'inline-block',
                margin: '16px 0',
                padding: '10px 24px',
                background: '#0a4275',
                color: '#fff',
                borderRadius: 6,
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: 16
              }}
            >
              {({ loading }) => loading ? 'Génération PDF...' : 'Télécharger PDF'}
            </PDFDownloadLink>
          </div>
        </>
      )}
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          section, section * { visibility: visible !important; }
          section { position: absolute !important; left: 0; top: 0; width: 100vw !important; background: #fff !important; box-shadow: none !important; }
          .print-hide { display: none !important; }
          .pdf-print-footer {
            display: block !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100vw;
            background: #fff !important;
            color: #0a4275 !important;
            border-top: 2px solid #e3f0fa !important;
            font-size: 13px !important;
            padding: 8px 24px !important;
            text-align: left !important;
            opacity: 0.95 !important;
            z-index: 9999;
          }
          .pdf-print-page-num:after {
            content: counter(page);
          }
        }
        .rich-html-content h1 { font-size: 2em; font-weight: bold; margin: 0.5em 0; }
        .rich-html-content h2 { font-size: 1.5em; font-weight: bold; margin: 0.4em 0; }
        .rich-html-content h3 { font-size: 1.2em; font-weight: bold; margin: 0.3em 0; }
        .rich-html-content ul, .rich-html-content ol { margin-left: 1.5em; }
        .rich-html-content li { margin-bottom: 0.2em; }
        .rich-html-content span[style] { padding: 0 2px; }
        .rich-html-content b, .rich-html-content strong { font-weight: bold; }
        .rich-html-content i, .rich-html-content em { font-style: italic; }
        .rich-html-content p { display: block; margin: 0 0 1em 0; }
      `}</style>
    </>
  );
}
