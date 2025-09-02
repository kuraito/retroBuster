import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  /*
  formData contiene email e password dell'utente all'inizio sono vuoti
  setFormData funzione che aggiorna formData
  */

  // e è l evento del submit del form
  const handleSubmit = (e) => {
    e.preventDefault(); //previene il comportamento di default del form che ricarica la pagina
    alert('Login fittizio - funzionalità non implementata'); //placeholder
  };

  //e è il campo specifico che cambia
  const handleChange = (e) => { //gestisce i cambiamenti nei campi del form
    setFormData({ //aggiorna 
      ...formData, //copia lo stato attuale
      [e.target.name]: e.target.value //aggiorna il campo specifico (email o password)
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Accedi al tuo account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Oppure{' '}
            <a href="#" className="font-medium text-red-500 hover:text-red-400">
              registrati per un nuovo account
            </a>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}> {/* sul submit chiama l evento del submit del form */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email} //valore formData che è l array dell'hook
                onChange={handleChange} //sul cambio del campo chiama l evento del cambio del campo
                className="relative block w-full px-3 py-2 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Indirizzo email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {/* altro che sta sotto i campi email e password*/}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Ricordami
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-red-500 hover:text-red-400">
                Password dimenticata?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit" //quando cliccato chiama l evento del submit del form
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Accedi
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Questa è una demo. Il login non è funzionale.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
