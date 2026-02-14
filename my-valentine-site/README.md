# 💌 Valentine's Day Virtual Mail

A responsive, interactive React application designed as a romantic digital experience. This project features a multi-stage interaction: a shaking mail-opener, a smooth scrollable letter with photo reveals, and a virtual bouquet finale.

---

## 🚀 Features

* **Progressive Feedback**: 
    * **Tap 1 & 2**: Mail shakes + Heart particles burst from the cursor position + "Paper Tap" sound.
    * **Tap 3**: Mail opens + Massive confetti burst + "Read Me" button reveal.
* **Scroll-Linked Reveals**: Photos and text fade in using Framed Motion `whileInView`.
* **Virtual Gift Finale**: A smooth "giving" animation for a 3D-like bouquet effect.
* **Fully Responsive**: Optimized for mobile and desktop viewing.

---

## 🛠️ Tech Stack & Dependencies

| Tool | Purpose |
| :--- | :--- |
| **React** | Core UI library for component-based architecture. |
| **Tailwind CSS** | Utility-first CSS for rapid, responsive styling. |
| **Framer Motion** | Handles all gestures, shakes, and scroll animations. |
| **Canvas-Confetti** | High-performance particle effects for the "Mail Opening" moment. |
| **Howler.js** | Reliable cross-browser audio management for tap sounds. |
| **Lucide React** | Scalable vector icons (Mail, Heart, etc.). |

---

## 📂 Project Structure

```text
valentine-web/
├── public/              # Static assets (favicons, sounds)
├── src/
│   ├── assets/          # Girlfriend's photos and background music
│   ├── components/
│   │   ├── Envelope.jsx # Stage 1: The interactive mail
│   │   ├── Letter.jsx   # Stage 2: Scroll-reveal message
│   │   └── Bouquet.jsx  # Stage 3: The final animation
│   ├── App.jsx          # Main logic & state management
│   └── index.css        # Tailwind and global styles
└── package.json         # Dependency manifest

---

## 🎨 Color Palette

We are using a warm, romantic theme based on the following hex codes:

| Color | Hex | Role in UI |
| :--- | :--- | :--- |
| **Cream** | `#FFF7CD` | Primary Background / Letter Paper |
| **Peach** | `#FDC3A1` | Secondary Accents / Soft Shadows |
| **Coral** | `#FB9B8F` | Mail Envelope / Interaction Highlights |
| **Pink** | `#F57799` | Buttons / Icons / Primary Headings |