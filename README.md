# K12 Hunar Scholarship Management CRM

## Overview

The **K12 Hunar Scholarship Management CRM** is a modern, responsive, and intuitive internal frontend dashboard designed for educational operations employees. It streamlines managing, reviewing, filtering, updating, and publishing student scholarship opportunities across **Bihar**, **Haryana**, and **Jharkhand**.

This project was built from scratch as part of the **K12 Hunar Frontend Developer Assessment**, emphasizing robust functionality, clean modular architecture, accessible design tokens, dynamic status management, instant localStorage persistence, and a student-facing discovery preview.

---

## Important Scope

> **Note on Project Scope**:  
> This is a frontend assessment demo. It intentionally **does not contain authentication, backend services, databases (MongoDB/PostgreSQL), payment gateways, or email automation**. All data operations execute directly in the browser with resilient client-side state and `localStorage` synchronization.

---

## Features

- **Dynamic Summary Cards**: Real-time KPI cards displaying Total Scholarships, Published, Draft, and Expired counts. Cards dynamically recalculate on every status change or addition.
- **State Filtering**: Dedicated filtering by state (**Bihar**, **Haryana**, **Jharkhand**) per assessment requirements.
- **Status Filtering**: Filter by publication status (**Published**, **Draft**, **Expired**).
- **Class Filtering**: Filter by applicable educational level (**Class 1-10**, **Class 9-10**, **Class 11-12**).
- **Multi-Field Instant Search**: Real-time search across scholarship name, state, provider, applicable class, status, and benefit keywords with a one-click clear button.
- **Multi-Criteria Sorting**: Sort by Recently Updated, Application Deadline (chronological date order with "Not stated" handling), and Scholarship Name (A–Z / Z–A).
- **Interactive Status Management**: Modify status directly from the desktop table row or mobile card dropdown. Instant state update, summary count recalculation, localStorage sync, and toast feedback.
- **Add Scholarship**: Add new records with all 9 required fields, custom ID generation, and inline validation.
- **Edit Scholarship**: Pre-populates all existing data, supports editing all fields, and immutably updates records.
- **Student-Facing Preview**: Simulates how opportunities appear to students on K12 Hunar. Displays the current status badge, provider information, benefit highlights, class & state tags, deadline, "Who can apply?" eligibility card, and a safe "Apply Now" button opening official external links (`target="_blank"` `rel="noopener noreferrer"`). Placeholder links are flagged with a visible demo notice.
- **Form Validation**: Comprehensive inline validation with clear error messages for required fields, min-length, valid states, date parsing, and URL formatting.
- **LocalStorage Persistence**: Auto-saves all modifications to `k12-hunar-scholarships` with corrupt data fallback to the original 9 seed records.
- **Reset Demo Data**: Easily restore the original 9 assessment records (3 Published, 3 Draft, 3 Expired) with a safe confirmation dialog.
- **Safe Record Deletion**: Optional deletion with accessible confirmation modal.
- **Toast Notifications**: Reusable notifications for status updates, additions, edits, deletions, and demo data resets.
- **Responsive Layout**: Desktop table view smoothly transforms into touch-friendly cards on mobile and tablet screens, paired with a collapsible mobile navigation drawer.

---

## Tech Stack

- **Framework**: React 18 (Functional components & hooks)
- **Build Tool**: Vite 6
- **Language**: Modern JavaScript (ES6+ / JSX)
- **Styling**: Tailwind CSS 3 with custom educational CRM design tokens
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Persistence**: Browser `localStorage` with custom `useLocalStorage` hook

---

## Project Structure

```text
ScholarHub/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # Brand assets
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── ScholarshipCard.jsx     # Mobile/tablet card view
│   │   │   ├── ScholarshipFilters.jsx  # Search, state, status, class & sort controls
│   │   │   ├── ScholarshipRow.jsx      # Desktop table row with inline status selector
│   │   │   ├── ScholarshipTable.jsx    # Table & card list container with counts
│   │   │   ├── SearchBar.jsx           # Search input with clear button
│   │   │   ├── StatusBadge.jsx         # Color-coded badge for status display
│   │   │   └── SummaryCard.jsx         # Dynamic KPI summary card
│   │   ├── layout/             # Application layout
│   │   │   ├── Header.jsx              # CRM top navigation & employee profile
│   │   │   ├── PageContainer.jsx       # Standard layout wrapper
│   │   │   └── Sidebar.jsx             # Desktop sidebar & mobile navigation drawer
│   │   ├── scholarship/        # Scholarship domain components
│   │   │   ├── DeleteConfirmModal.jsx  # Safe deletion confirmation modal
│   │   │   ├── ResetConfirmModal.jsx   # Demo data restore modal
│   │   │   ├── ScholarshipForm.jsx     # Reusable Add & Edit form (9 fields)
│   │   │   └── ScholarshipPreview.jsx  # Student-facing discovery preview card
│   │   └── ui/                 # Reusable UI primitives
│   │       ├── Button.jsx              # Button with variants (primary, secondary, danger, etc.)
│   │       ├── EmptyState.jsx          # Zero results placeholder with action
│   │       ├── Input.jsx               # Form input with validation state
│   │       ├── LoadingState.jsx        # Skeleton loaders
│   │       ├── Modal.jsx               # Accessible dialog modal
│   │       ├── Select.jsx              # Dropdown select with custom arrow
│   │       ├── Textarea.jsx            # Multi-line text input
│   │       └── Toast.jsx               # Toast notification container & item
│   ├── context/
│   │   ├── ScholarshipContext.jsx      # Central scholarship state, actions & metrics
│   │   └── ToastContext.jsx            # Global toast notifications context
│   ├── data/
│   │   └── scholarships.js             # 9 authoritative assessment seed records
│   ├── hooks/
│   │   ├── useLocalStorage.js          # Resilient localStorage hook with fallback
│   │   ├── useScholarships.js          # Hook exposing scholarship context
│   │   └── useToast.js                 # Hook exposing toast triggers
│   ├── pages/
│   │   ├── AddScholarshipPage.jsx      # Dedicated route for adding scholarships
│   │   ├── Dashboard.jsx               # Main CRM dashboard page
│   │   ├── EditScholarshipPage.jsx     # Dedicated route for editing scholarships
│   │   ├── NotFoundPage.jsx            # 404 page with return to dashboard
│   │   └── PreviewPage.jsx             # Dedicated route for student preview
│   ├── utils/
│   │   ├── dateUtils.js                # Safe date formatting and parsing
│   │   ├── scholarshipUtils.js         # Filtering, sorting and metric calculations
│   │   └── validation.js               # Form field validation rules
│   ├── App.jsx                         # App layout, router configuration & providers
│   ├── index.css                       # Tailwind CSS directives & base styles
│   └── main.jsx                        # React root entry point
├── index.html                          # HTML template with SEO tags & Inter font
├── package.json                        # Dependencies and npm scripts
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.js                  # Tailwind tokens and theme extensions
├── vite.config.js                      # Vite build configuration
└── README.md                           # Documentation
```

---

## Installation & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Run `npm run dev` and open the **local URL shown by Vite** in your browser (typically `http://localhost:5173/` or as configured in `vite.config.js`).

### 3. Build for Production
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Data Management & Initial State

The application initializes with the **exact nine assessment scholarship records** across Bihar, Haryana, and Jharkhand.

Initial summary distribution:
- **Total Scholarships**: 9
- **Published**: 3
- **Draft**: 3
- **Expired**: 3

Per assessment instructions, placeholder attributes (`provider`, `eligibility`, `benefit`, `officialLink`) are clearly identified as demo data and never presented as verified real claims.

### Authorship Records Matrix

| # | Scholarship Name | State | Applicable Class | Deadline | Status |
|---|---|---|---|---|---|
| 1 | Post-Matric Scholarship BC EBC | Bihar | Class 11-12 | 30 Sep 2026 | Published |
| 2 | Post-Matric Scholarship SC ST | Bihar | Class 11-12 | 30 Sep 2026 | Draft |
| 3 | Mukhyamantri Balak Balika Protsahan Yojana | Bihar | Class 9-10 | Not stated | Expired |
| 4 | Pre-Matric Scholarship for SC Students | Haryana | Class 9-10 | 31 Dec 2026 | Published |
| 5 | Pre-Matric Scholarship for BC Students | Haryana | Class 9-10 | 31 Dec 2026 | Draft |
| 6 | Post-Matric Scholarship for SC Students | Haryana | Class 11-12 | 31 Dec 2026 | Expired |
| 7 | Pre-Matric Scholarship for SC Students | Jharkhand | Class 1-10 | 20 Nov 2026 | Published |
| 8 | Pre-Matric Scholarship for ST Students | Jharkhand | Class 1-10 | 20 Nov 2026 | Draft |
| 9 | Pre-Matric Scholarship for BC OBC Students | Jharkhand | Class 1-10 | 20 Nov 2026 | Expired |

---

## State Management & Persistence

- **Centralized State**: The `ScholarshipProvider` (`src/context/ScholarshipContext.jsx`) maintains the master list of scholarships and provides operations:
  - `addScholarship(data)`
  - `updateScholarship(id, data)`
  - `updateStatus(id, newStatus)`
  - `deleteScholarship(id)`
  - `resetScholarships()`
- **Derived Metrics**: Summary card statistics are computed with `useMemo` from the raw state array.
- **LocalStorage Sync**: Managed by `useLocalStorage(STORAGE_KEY, INITIAL_SCHOLARSHIPS)`. Changes persist across browser reloads. If localStorage contains corrupted data, the application safely falls back to the default seed data without crashing.

---

## Responsive Design

- **Desktop (>= 1024px)**: Fixed CRM sidebar navigation, 4 summary cards in a row, dense data table with inline status selects and action triggers.
- **Tablet (768px – 1023px)**: 2x2 summary cards grid, compact search and filter row, adaptable table/card layout.
- **Mobile (< 768px)**: Collapsible sidebar drawer with backdrop, full-width summary cards, stacked filter controls, data rows converted to readable cards with comfortable touch targets, and full-screen modals.

---

## Assessment Requirements Checklist

| # | Requirement | Implementation Details | Status |
|---|---|---|:---:|
| 1 | Four Summary Cards (Total, Published, Draft, Expired) | `SummaryCard.jsx` dynamically computes counts from `useScholarships` state. | Passed |
| 2 | Filter by Bihar, Haryana, Jharkhand | `ScholarshipFilters.jsx` provides state filter updating table instantly without reload. | Passed |
| 3 | Display scholarship records in table or card list | `ScholarshipTable.jsx` renders table on desktop and converts to `ScholarshipCard.jsx` on mobile. | Passed |
| 4 | Change scholarship status (Published, Draft, Expired) | Inline status dropdown on both table and card triggers `updateStatus()` with instant update and toast. | Passed |
| 5 | Add Scholarship & Edit Scholarship | `ScholarshipForm.jsx` handles Add and Edit with pre-population, validation, and persistence. | Passed |
| 6 | Preview button showing student view | `ScholarshipPreview.jsx` renders student discovery card with eligibility, benefits, and external link. | Passed |
| 7 | Use the nine provided scholarship records | `data/scholarships.js` seeds application with exact 9 records and 3/3/3 status distribution. | Passed |
| 8 | Add/Edit form contains 9 required fields | Validates and stores: Name, State, Provider, Class, Eligibility, Benefit, Deadline, Official Link, Status. | Passed |
| 9 | Responsive / mobile layout | Tailwind responsive design tested for mobile (375px/390px), tablet (768px), and desktop (1024px+). | Passed |
| 10 | Basic form validation | `utils/validation.js` checks required fields, min-length (3 for name, 10 for eligibility), URL syntax, and dates. | Passed |
| 11 | Clean, organized & understandable code | Structured folder layout (`components`, `context`, `hooks`, `pages`, `utils`, `data`). No backend complexity. | Passed |
| 12 | README explaining how to run the project | Complete documentation with installation, dev, build, architecture, and requirements matrix. | Passed |
| 13 | AI / Reference usage note | Explicit section declaring AI assistance and K12 Hunar UX reference usage. | Passed |

---

## AI Tools & References Used

1. **AI Assistant**: Developed with the assistance of Google Antigravity AI coding assistant for architecture structuring, component breakdown, and boilerplate validation.
2. **UX / Content Reference**: The public scholarship portal at [K12 Hunar Scholarships](https://www.k12hunar.com/scholarships) was referenced strictly to understand information hierarchy (how scholarships are discovered, eligibility presentation, benefit highlights, and student-facing preview card styling). The CRM admin interface itself is an original internal design.
3. **Libraries Used**: `react`, `react-dom`, `react-router-dom`, `lucide-react`, `tailwindcss`, `clsx`, `tailwind-merge`.
