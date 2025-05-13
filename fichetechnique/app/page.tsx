import React from 'react';
import ProductSheetModal from '../src/components/main/main';

export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', minHeight: '100vh', background: '#f6f8fa' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Fiche technique - Produit de peinture</h1>
      <ProductSheetModal />
    </main>
  );
} 