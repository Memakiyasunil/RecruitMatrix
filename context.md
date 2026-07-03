# RecruitMatrix Project Context

This file serves as a comprehensive context document for AI assistants and developers working on the **RecruitMatrix** project.

## 1. Project Overview
**RecruitMatrix** is a comprehensive enterprise-level Recruitment ERP, CRM, ATS (Applicant Tracking System), and Client Hiring Portal.
It is designed to manage internal recruitment operations as well as provide a portal for client companies to track requisitions, tasks, and candidate progress.

## 2. Architecture & Monorepo Structure
The project is structured as a **monorepo** utilizing NPM Workspaces. It contains three distinct React frontends and one Express.js backend.

### Workspaces:
- **`admin-panel/`**: React application for internal agency staff (System Admins, Internal Recruiters, Managers).
- **`company-panel/`**: React application for client companies (Client CEOs, Technical Managers, Developers) to track hiring and internal tasks.
- **`website/`**: Public-facing marketing React website detailing features, pricing, and services.
- **`server/`**: Node.js/Express backend that handles specific business logic, seeded data, and extended role-based access control.

## 3. Technology Stack
- **Frontend Core**: React 19, Vite, React Router DOM v7.
- **Frontend Styling**: TailwindCSS v4, Lucide React (Icons), Framer Motion (Animations).
- **Backend Core**: Node.js, Express.js.
- **Database & Auth**: **Firebase** (Firestore for NoSQL Database, Firebase Auth for Authentication). 
  - *Note: MongoDB was initially planned but completely replaced by Firebase Admin SDK and Firebase Client SDK.*
- **Deployment**: Docker and Docker Compose (orchestrates all 4 services via NGINX for the frontends).

## 4. Key Functional Modules
1. **Role-Based Access Control (RBAC)**
   - Custom claims and roles exist across the admin staff and company employees.
   - Example Company Roles: CEO, Technical Manager, Senior Developer, Junior Developer.
2. **Task Management**
   - Task assignment between company employees based on hierarchy.
   - Real-time status tracking (Pending, In Progress, Completed).
3. **Employee & Department Management**
   - CRUD operations for managing client company departments, teams, and employees.
4. **Talent Requisition & Applicant Tracking**
   - Managing job openings, candidate pipelines (Screening, Interview, Offer, Joining).

## 5. Deployment & Docker Environment
The entire architecture is containerized using `docker-compose.yml`.
- `admin-panel` exposed on port `80`
- `company-panel` exposed on port `8081`
- `website` exposed on port `8082`
- `server` exposed on port `5000`

### Environment Variables
- Client applications rely on standard Firebase config variables (`apiKey`, `authDomain`, `projectId`, etc.).
- The `server/` relies on `FIREBASE_SERVICE_ACCOUNT`, which contains the stringified JSON of the Firebase Admin private key.

## 6. Development Scripts (Root Directory)
- `npm run dev:admin`
- `npm run dev:company`
- `npm run dev:website`
- `npm run dev:server`

## 7. Seeding the Database
The project includes a robust seeding mechanism to populate Firebase with dummy clients, roles, tasks, and user accounts.
- **Command**: `docker compose run --rm seed` (or `npm run seed` inside the `server` directory).
- **Behavior**: Generates users via Firebase Auth and inserts structural documents into Firestore (`clients`, `companyRoles`, `tasks`, etc.).

*Always refer to `TalentFlow_TRD.md` for extended technical requirements and schema definitions.*
