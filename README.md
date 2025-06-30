# 🧪 table-spike

A technical exploration to evaluate and identify the best solution for a scalable and accessible Table component for **Calendly UI (CUI)**.

## 🎯 Goals

- Evaluate options for building a performant, accessible, and customizable Table component.
- Compare **React-Aria Table**, **TanStack Table**, and our **existing custom implementation**.
- Determine the best approach for integration into CUI.

## ✅ Evaluation Criteria

Each solution is assessed across the following dimensions:

| Criteria               | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| Feature Support        | Sorting, filtering, column resizing, drag-and-drop, sticky headers, etc.    |
| Performance            | Smooth rendering with **10,000+ rows** and **100+ columns**                 |
| Accessibility (a11y)   | WAI-ARIA compliance, keyboard navigation, screen reader support             |
| Ease of Integration    | Compatibility with CUI primitives and design tokens                         |
| Customization & DX     | API flexibility, developer experience, theming support                      |

## 🔬 Work In Progress

### 📁 Structure

table-spike/
  data
    └── dataset               # Scripts to generate large datasets
  pages
    ├── react-aria/           # React Aria Table prototype
    ├── tanstack/             # TanStack Table prototype
    ├── cui-table/            # Current implementation from the monolith
  results
    └── evaluation            # Findings, notes, and comparison matrix

### 🧪 Scenarios Tested

- 10k+ rows × 100+ columns rendering
- Sorting & filtering (column-level)
- Column reordering and resizing
- Custom cell rendering (e.g., icons, avatars)
- Sticky headers
- Accessibility audits (Lighthouse, Axe)

## 📊 Outcome

At the end of this spike, we will:

- Choose the most appropriate solution for CUI’s Table needs.
- Deliver a recommendation with trade-offs and rationale.
- Provide a high-level implementation plan for integration into CUI.

## 📅 Timeline

| Phase               | Status     |
|---------------------|------------|
| Environment setup   | ✅ Complete |
| Table prototypes    | 🚧 In progress |
| Evaluation matrix   | 🔜 Upcoming |
| Final recommendation| 🔜 Upcoming |

## 🤝 Contributing

This is an internal spike for evaluation purposes. If you're part of the CUI team and want to collaborate, feel free to open a PR or leave comments in the `evaluation/` folder.

## 📄 License

This project is for internal use only and is not intended for public distribution.