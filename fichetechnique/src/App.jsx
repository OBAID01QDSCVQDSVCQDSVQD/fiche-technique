import React, { useState } from 'react';
import './App.css';

const initialForm = {
  nomProduit: '',
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
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setShowModal(false);
    setForm(initialForm);
  };

  return (
    <div className="App">
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Saisir une fiche technique
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>&times;</button>
            <h2>Fiche technique - Produit de peinture</h2>
            <form onSubmit={handleSubmit} className="fiche-form">
              <label>
                Nom du produit
                <input
                  type="text"
                  name="nomProduit"
                  value={form.nomProduit}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description du produit
                <textarea name="description" value={form.description} onChange={handleChange} required />
              </label>
              <label>
                Domaine d'application
                <textarea name="domaine" value={form.domaine} onChange={handleChange} required />
              </label>
              <label>
                Propriétés principales
                <textarea name="proprietes" value={form.proprietes} onChange={handleChange} required />
              </label>
              <label>
                Préparation du support
                <textarea name="preparation" value={form.preparation} onChange={handleChange} required />
              </label>
              <label>
                Conditions d'application
                <textarea name="conditions" value={form.conditions} onChange={handleChange} required />
              </label>
              <label>
                Application
                <textarea name="application" value={form.application} onChange={handleChange} required />
              </label>
              <label>
                Consommation
                <textarea name="consommation" value={form.consommation} onChange={handleChange} required />
              </label>
              <label>
                Nettoyage
                <textarea name="nettoyage" value={form.nettoyage} onChange={handleChange} required />
              </label>
              <label>
                Stockage et conditionnement
                <textarea name="stockage" value={form.stockage} onChange={handleChange} required />
              </label>
              <label>
                Consignes de sécurité
                <textarea name="consignes" value={form.consignes} onChange={handleChange} required />
              </label>
              <button type="submit" className="submit-btn">Envoyer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
