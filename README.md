# Flora Wedding Planners

An immersive, high-end digital web application designed for a luxury wedding planning agency. **Flora** transforms wedding discovery into an interactive experience—combining modern WebGL 3D graphics, subtle micro-animations, and bespoke event curation workflows.

---

## Features

* **3D Interactive Invitation Preview**: Interactive 3D invitation viewer powered by Three.js and React Three Fiber, allowing clients to physically inspect and rotate bespoke invitation designs in real-time.
* **Fluid Scroll & Micro-Animations**: Built with Framer Motion for graceful stage reveals, cinematic typography, and subtle UI transitions.
* **Canvas Visual Effects**: Custom falling floral petal canvas animations integrated into hero and interactive sections.
* **Curated Story & Venue Showcase**: Dedicated discovery sections for bespoke wedding packages, luxury venue selections, client stories, and photo galleries.
* **Consultation Booking Flow**: Built-in interactive contact and inquiry form designed for frictionless client onboarding.

---

## Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
* **Language**: TypeScript
* **3D & Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
* **Styling & UI**: Tailwind CSS v4, `@base-ui/react`, Lucide Icons
* **Animation**: Framer Motion
* **Typography**: Cormorant Garamond, Jost, and Classico web fonts

## Project Structure

├── app/                  # Next.js App Router (pages & layouts)
│   ├── about/            # About page
│   ├── blog/             # Wedding stories & articles
│   ├── contact/          # Consultation inquiry
│   ├── gallery/          # Visual wedding showcases
│   ├── services/         # Bespoke planning packages
│   └── page.tsx          # Homepage with 3D canvas & reveals
├── components/           # UI components & sections
│   ├── home/             # Hero, 3D Invite, Stage reveal, Story components
│   ├── ui/               # Reusable UI primitives
│   └── petals-canvas.tsx # Floral petal canvas animation engine
├── public/               # Static assets & local web fonts
└── package.json          # Project dependencies & scripts



