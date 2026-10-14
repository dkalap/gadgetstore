# 🛍️ GadgetStore - Next-Gen Tech Hub

GadgetStore is a modern, feature-rich e-commerce web application built for a localized Indian shopping experience. It features seamless cart and wishlist management, real-time inventory tracking, dynamic promotional discounts, and a sleek dark-mode user interface.

---

## ✨ Key Features

- **Localized Indian Experience**: Full currency consistency with the Indian Rupee (`₹`) symbol across product pricing, subtotal logic, and shipping calculations.
- **Interactive Cart & Wishlist Drawers**: Slide-over panels with persistent `localStorage` support, quantity controls, and one-click "Move to Cart" workflows.
- **Dynamic Promo Code Engine**: Built-in discount system supporting codes like `REACT20` (20% off) and `GREET10` (10% off) with real-time subtotal recalibration.
- **Order Receipt & Checkout Modal**: Complete checkout workflow that generates an order summary receipt with order ID, itemized bill, applied discounts, and estimated delivery date.
- **Inventory Tracking**: Real-time stock alerts (`🔥 Only X left!`) and out-of-stock safeguards that prevent over-ordering.
- **Modern Polish & UX**: Custom splash preloader animation on page refresh, interactive toast notifications, and category/search filtering.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, JSX, Vite
* **Styling**: Tailwind CSS
* **State Management & Persistence**: React Hooks (`useState`, `useEffect`), Browser LocalStorage
* **Development Tools**: Git, GitHub, npm, VS Code

---

## 🚀 Getting Started & Setup Instructions

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/dkalap/gadgetstore.git
cd gadgetstore

```

## 2. Install Dependencies
```bash
npm install
```

## 3. Run the Development Server
```bash
npm run dev
```

---

##  Project Structure

```text
gadgetstore/
├── public/            # Static assets and favicon
├── src/
│   ├── components/    # Reusable UI components
│   ├── data/          # Product dataset (products.json)
│   ├── App.jsx        # Main application state
│   ├── App.css        # Custom styles
│   ├── index.css      # Tailwind imports
│   └── main.jsx       # React entry point
├── package.json
└── README.md

```
---