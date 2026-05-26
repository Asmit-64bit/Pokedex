<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=32&pause=1000&color=FF6B35&center=true&vCenter=true&width=500&height=70&lines=Pok%C3%A9dex;Gotta+catch+%27em+all!" alt="Pokedex" />

<p>A fast, clean Pokémon explorer built with React — browse the entire Pokédex, search by name, and dive into detailed stats, evolution chains, and more.</p>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-FF6B35?style=for-the-badge&logo=vercel&logoColor=white)](https://pokedex-jet-pi.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)

</div>

---

## Screenshots

### Home — Pokémon Grid
> Dark-themed 4-column grid with live search, Pokédex number watermarks, and color-coded type badges

### Detail Page — Pokémon Info
> Full stat breakdown, Pokédex description, height & weight, and complete evolution chain with level indicators

---

## Features

### Home Page
- **Live Search** — Filters Pokémon by name in real-time with partial matching — search `char` for all Charmander family, or `-mega` to instantly find every Mega Evolution. Includes a clear (✕) button
- **Pokémon Cards** — Each card shows the sprite, name, Pokédex number watermark, and type badges
- **Color-coded Type Badges** — Fire, Grass, Poison, Flying, and more — each type has its own distinct color

### Detail Page
- **Base Stats** — HP, Attack, Defense, Special-Attack, Special-Defense, Speed shown as animated progress bars
- **Pokédex Entry** — Official flavor text description for each Pokémon
- **Physical Info** — Height and weight displayed in a clean card layout
- **Evolution Chain** — Full evolution line with level requirements (e.g. Charmander → Lvl 16 → Charmeleon → Lvl 36 → Charizard)

### General
- **Optimized API Fetching** — Efficient data fetching from PokéAPI via Axios with custom React hooks
- **Smooth Animations** — Card transitions and page interactions powered by Framer Motion
- **Responsive Layout** — Adapts cleanly across screen sizes

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| Axios | API data fetching |
| React Router DOM v7 | Client-side routing (home ↔ detail page) |
| Framer Motion | Animations & transitions |
| PokéAPI | Pokémon data source |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Asmit-64bit/Pokedex.git
cd Pokedex

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
Pokedex/
├── public/
├── src/
│   ├── hooks/          # Custom React hooks (data fetching)
│   ├── components/     # Reusable UI components
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

---

## API

This project uses the free [PokéAPI](https://pokeapi.co/) — no API key required.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Built with ❤️ by <a href="https://github.com/Asmit-64bit">Asmit Samanta</a>
</div>