# Flour Manufacturing Management System

A modular React application for managing flour mill operations — stock, production, delivery, purchases, customers, suppliers, expenses, reports and analytics.

---

## Overview

This project provides a complete management interface for a flour manufacturing business, organized into focused modules (stock, production, delivery, purchases, expenses, reports). It is the **front-end application** of the Yusuf Flower Mills system: this repository contains the React UI, while the deployed full-stack version with an Express + PostgreSQL API lives in [`food-company-website`](https://github.com/AlveeHossain45/food-company-website).

---

## Features

- **Dashboard** — operational overview with key metrics
- **Stock** — inventory levels for finished flour products
- **Production** — production records and planning
- **Delivery** — dispatch and delivery tracking
- **Purchases** — raw material purchase records
- **Customers & Suppliers** — business partner directories
- **Expenses** — operational cost tracking
- **Reports & Analytics** — summaries and trend charts
- **Settings** — application configuration

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| Frontend | React 18, Vite, React Router |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Icons | Lucide React |
| Architecture | Modular components, context, routes |

---

## Screenshots

> **Placeholder** — capture the app and save images under `screenshots/`, then replace the paths below.

```md
![Dashboard](screenshots/dashboard.png)
![Production](screenshots/production.png)
![Reports](screenshots/reports.png)
```

---

## Live Demo

The full-stack version of this system is deployed at:

**https://food-company-website-e7vk.vercel.app**

---

## Installation

```bash
git clone https://github.com/AlveeHossain45/yusuf-flowers-mills-ltd.git
cd yusuf-flowers-mills-ltd
npm install
npm run dev
```

Then open the URL printed by Vite (default `http://localhost:5173`).

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
```

---

## Environment Variables

None — this repository runs on local mock data.

---

## Project Structure

```text
src/
├── components/    # reusable UI and module components
├── context/       # application state providers
├── data/          # mock business data
├── pages/         # Dashboard, Stock, Production, Delivery,
│                  # Purchases, Customers, Suppliers, Expenses,
│                  # Reports, Analytics, Settings
├── routes/        # route configuration
├── styles/        # global styles
└── utils/         # helpers
```

---

## Future Improvements

- Connect modules to the Express + PostgreSQL API from `food-company-website`
- Role-based access for managers vs. operators
- PDF export for reports and delivery notes
