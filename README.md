# 🇮🇹 Italian Grade Converter Platform

A high-quality academic web platform designed to help international students convert their foreign grades into the Italian university system. This tool follows the official Universitaly document **"Allegato 5 – Tabella di conversione dei Titoli stranieri"**.

## 🚀 Live Demo
You can access the live version here: [GitHub Pages Link](https://layaskaaa.github.io/italian-grade-converter/)

## ✨ Features
- **Official Formula**: Implements the precise `Voto = ((V - Vmin) / (Vmax - Vmin)) * (Imax - Imin) + Imin` calculation.
- **Two Conversion Modes**:
  - **Course Grades (Esami - /30)**: Converge individual subjects with dynamic row management.
  - **Final Degree Grade (Laurea - /110)**: Convert overall final graduation grades.
- **Multilingual Support**: Available in **English**, **Italian**, and **Arabic** (with RTL support).
- **Academic Design**: Inspired by official Italian university portals with a serious, scholarly aesthetic and tricolor accents.
- **Verification Table**: Generates a classification table highlighting where your grade falls (A, B, C, D, E).

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6).
- **Icons**: FontAwesome.
- **Typography**: Playfair Display (Serif) & Inter (Sans-serif).
- **Deployment**: Static site optimized for GitHub Pages.

## 📁 Project Structure
- `index.html`: Main structure and multi-step wizard.
- `css/style.css`: Custom academic design system and responsiveness.
- `js/main.js`: Core conversion logic, i18n, and state management.
- `test_logic.js`: Standalone test script for math verification.

## 📚 Official Sources
This tool is based on the following official academic standards:
- [Universitaly - Tabella di conversione dei Titoli stranieri (PDF)](https://www.unitn.it/sites/default/files/2024-11/Tabella_di_conversione_dei_titoli_stranieri.pdf)
- [CIMEA - Italian Voting System](https://www.cimea.it/EN/pagina-sistema-di-votazione)

## ⚖️ Disclaimer
This tool is intended for informational purposes only based on Universitaly guidelines. The final validation of grade equivalence remains the sole responsibility of the receiving Italian university or institution.

## 👤 Credits
Created by **Alaeddine Alioueche**.
Inspired by the Italian Higher Education System.
