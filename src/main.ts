import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";


// //Debut blockage
// // 🔒 Fonction pour désactiver les sorties console (log, warn, error, info, debug)
// function disableConsole() {
//   console.log = () => {};
//   console.info = () => {};
//   console.warn = () => {};
//   console.error = () => {};
//   console.debug = () => {};
// }

// // 🔒 Fonction pour détecter l’ouverture des DevTools via un léger retard induit par debugger
// function detectDevTools() {
//   setInterval(() => {
//     const before = new Date().getTime();
//     debugger; // provoque un retard si DevTools ouverts
//     const after = new Date().getTime();
//     if (after - before > 100) {
//       // seuil à ajuster selon besoin
//       document.body.innerHTML = ""; // vide la page
//       alert("DevTools détecté. Fermeture."); // message utilisateur
//       window.location.href = "about:blank"; // redirige vers une page blanche
//     }
//   }, 1000); // vérification toutes les secondes
// }

// // 🔒 Bloque le clic droit sur toute la page pour empêcher menu contextuel
// document.addEventListener("contextmenu", (event) => event.preventDefault());

// // 🔒 Bloque les raccourcis clavier souvent utilisés pour ouvrir console/devtools et sauvegarder
// document.addEventListener("keydown", (event) => {
//   const key = event.key.toLowerCase();
//   if (
//     event.key === "F12" || // touche F12
//     (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) || // Ctrl+Shift+I/J/C
//     (event.ctrlKey && (key === "u" || key === "s")) // Ctrl+U (source) et Ctrl+S (sauvegarde)
//   ) {
//     event.preventDefault(); // bloque l'action
//     return false;
//   }
// });

// // 🔒 Bloque le drag & drop pour éviter injection de fichiers non souhaités
// document.addEventListener("dragstart", (event) => event.preventDefault());
// document.addEventListener("drop", (event) => event.preventDefault());

// // Désactive la console dès le démarrage
// disableConsole();

// // Lance la détection des DevTools
// detectDevTools();
 
// //fin blockage


// c'est le code origine
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
