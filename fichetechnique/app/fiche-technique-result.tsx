import React from 'react';
import { useSearchParams } from 'next/navigation';

const sectionStyle = (bg: string) => ({
  background: bg,
  borderRadius: 10,
  marginBottom: 24,
  display: 'flex' as const,
  flexDirection: 'row' as const,
  alignItems: 'stretch' as const,
  overflow: 'hidden' as const,
  boxShadow: '0 1px 6px #e5e7eb',
});
const labelStyle = {
  minWidth: 180,
  background: '#0a4275',
  color: '#fff',
  fontWeight: 700,
  fontSize: 16,
  padding: '20px 18px',
  display: 'flex',
  alignItems: 'center',
  borderRight: '3px solid #88ccff',
};
const valueStyle = {
  flex: 1,
  background: '#fff',
  color: '#222',
  fontSize: 15,
  padding: '20px 22px',
  whiteSpace: 'pre-line',
  display: 'flex',
  alignItems: 'center',
};

export default function FicheTechniqueResult() {
  const params = useSearchParams();
  const fiche = {
    nom: params.get('nom') || 'Nom du produit',
    description: params.get('description') || '',
    domaine: params.get('domaine') || '',
    proprietes: params.get('proprietes') || '',
    preparation: params.get('preparation') || '',
    conditions: params.get('conditions') || '',
    application: params.get('application') || '',
    consommation: params.get('consommation') || '',
    nettoyage: params.get('nettoyage') || '',
    stockage: params.get('stockage') || '',
    consignes: params.get('consignes') || '',
  };
  return (
    <div style={{ fontFamily: 'Roboto, Segoe UI, Arial, sans-serif', background: '#f6f8fa', minHeight: '100vh', padding: 0 }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
      {/* Header */}
      <header style={{ background: '#0a2640', color: '#fff', padding: '38px 0 24px 0', textAlign: 'left', boxShadow: '0 2px 8px #0a264033' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 32 }}>
          <img src="/logo-hc.png" alt="Logo Horizon Chimique" style={{ height: 64, width: 'auto', marginRight: 32, background: '#fff', borderRadius: 8, padding: 6, boxShadow: '0 2px 8px #0a427522' }} />
          <div>
            <h1 style={{ fontSize: 38, fontWeight: 900, margin: 0, letterSpacing: 1 }}>{fiche.nom}</h1>
            <div style={{ fontSize: 19, fontWeight: 400, marginTop: 12, opacity: 0.97 }}>{fiche.description}</div>
          </div>
        </div>
      </header>
      {/* Sections */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 12px 32px 12px' }}>
        <div style={sectionStyle('#e3f0fa')}>
          <div style={labelStyle}>Nom du produit</div>
          <div style={valueStyle}>{fiche.nom}</div>
        </div>
        <div style={sectionStyle('#f7fafd')}>
          <div style={labelStyle}>Description du produit</div>
          <div style={valueStyle}>{fiche.description}</div>
        </div>
        <div style={sectionStyle('#e3f0fa')}>
          <div style={labelStyle}>Domaine d'application</div>
          <div style={valueStyle}>{fiche.domaine}</div>
        </div>
        <div style={sectionStyle('#f7fafd')}>
          <div style={labelStyle}>Propriétés principales</div>
          <div style={valueStyle}>{fiche.proprietes}</div>
        </div>
        <div style={sectionStyle('#e3f0fa')}>
          <div style={labelStyle}>Préparation du support</div>
          <div style={valueStyle}>{fiche.preparation}</div>
        </div>
        <div style={sectionStyle('#f7fafd')}>
          <div style={labelStyle}>Conditions d'application</div>
          <div style={valueStyle}>{fiche.conditions}</div>
        </div>
        <div style={sectionStyle('#e3f0fa')}>
          <div style={labelStyle}>Application</div>
          <div style={valueStyle}>{fiche.application}</div>
        </div>
        <div style={sectionStyle('#f7fafd')}>
          <div style={labelStyle}>Consommation</div>
          <div style={valueStyle}>{fiche.consommation}</div>
        </div>
        <div style={sectionStyle('#e3f0fa')}>
          <div style={labelStyle}>Nettoyage</div>
          <div style={valueStyle}>{fiche.nettoyage}</div>
        </div>
        <div style={sectionStyle('#f7fafd')}>
          <div style={labelStyle}>Stockage et conditionnement</div>
          <div style={valueStyle}>{fiche.stockage}</div>
        </div>
        <div style={sectionStyle('#e3f0fa')}>
          <div style={labelStyle}>Consignes de sécurité</div>
          <div style={valueStyle}>{fiche.consignes}</div>
        </div>
      </main>
    </div>
  );
} 