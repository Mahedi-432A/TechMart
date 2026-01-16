# 🛒 TechMart - Enterprise POS System

![TechMart Banner](https://via.placeholder.com/1200x600?text=TechMart+Dashboard+Preview) 
*(Note: Replace this link with your actual screenshot)*

A robust, scalable, and offline-capable **Point of Sale (POS)** application designed for modern retail businesses. Built with high-performance technologies to ensure speed, reliability, and complex state management.

## 🚀 Live Demo
[Link to your Vercel/Netlify deploy]

---

## 🚧 Project Status: Active Development (Beta)
This project is currently in the **Advanced Frontend Phase**. 
- ✅ **Completed:** Core POS Logic, Inventory Management, Cart System (Undo/Redo), Persistence, Invoice Printing.
- ⏳ **In Progress:** Backend Integration, Authentication, Multi-user support.

---

## ✨ Key Features

### 🛍️ Point of Sale (POS)
- **Fast Transactions:** Optimized product grid with server-side filtering & search.
- **Smart Cart System:** Add/remove items with automatic tax & total calculation.
- **Undo/Redo:** Mistakenly deleted an item? Bring it back instantly with `redux-undo`.
- **Offline Persistence:** Cart data survives browser refresh (using `redux-persist`).

### 📦 Inventory & Management
- **Real-time Updates:** Powered by **RTK Query** for efficient caching and data fetching.
- **Stock Alerts:** Visual indicators for low-stock items.
- **Dashboard Analytics:** Interactive charts (Recharts) for sales visualization.

### 🖨️ Invoicing
- **Thermal Print Ready:** Generates professional receipts with auto-print functionality.

---

## 🛠️ Tech Stack

- **Framework:** React (Vite) + TypeScript
- **State Management:** Redux Toolkit (RTK) + RTK Query
- **Styling:** Tailwind CSS + Shadcn/UI
- **Data Visualization:** Recharts
- **Utilities:** React Hook Form, Zod, Redux-Undo, React-to-Print

---

## 💻 Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/techmart-pos.git](https://github.com/yourusername/techmart-pos.git)