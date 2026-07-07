# Phani Peddapalem — Portfolio

Personal portfolio site. Apple-inspired "Keynote" design language with a
Three.js particle-sphere hero and pointer-tracked 3D tilt on cards.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Editing content

All copy — projects, skills, experience, links — lives in one place:
[src/config/site.js](src/config/site.js).

## Structure

```
src/
  config/site.js       ← all editable content
  styles/global.css    ← design tokens + all CSS
  hooks/useReveal.js    ← scroll-reveal IntersectionObserver hook
  components/
    Particles3D.jsx     ← Three.js particle sphere (hero + contact)
    Tilt.jsx             ← pointer-tracked 3D tilt wrapper
    Nav.jsx Hero.jsx Bento.jsx Work.jsx Skills.jsx Journey.jsx
    Contact.jsx Footer.jsx
  App.jsx
  main.jsx
```

## Build

```bash
npm run build
npm run preview
```
