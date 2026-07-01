# TalentFlow ERP CRM - Technical Requirements Document (TRD)

## Version: 1.0

---

## Part 1: Architecture and Standards

### Project Overview
TalentFlow ERP CRM is a comprehensive Recruitment ERP and CRM platform designed to manage the end-to-end recruitment lifecycle. It serves multiple user roles (Admin, Manager, Staff/Recruiter, Client, Candidate) and streamlines operations from client onboarding to employee joining.

### Technology Stack
*   **Frontend**: React.js (with Redux Toolkit for state management), Tailwind CSS, Material-UI (MUI) or Ant Design for components.
*   **Backend**: Node.js, Express.js.
*   **Database**: Firebase Cloud Firestore.
*   **Authentication**: Firebase Authentication (Google Sign-up, OTP Verification, Email/Password).
*   **File Storage**: AWS S3 or Cloudinary (for resumes, logos, and documents).
*   **Email/SMS Service**: SendGrid/Nodemailer, Twilio.

### Monolithic Architecture
The application will follow a Monolithic Architecture for the initial MVP to ensure rapid development and deployment. The backend will act as a unified API serving the React frontend. Both will be maintained in a single repository or two closely coupled repositories. The backend will handle routing, business logic, database interactions, and integrations.

### Folder Structure (Backend)
```text
src/
├── config/           # Environment variables and configuration (DB, AWS, etc.)
├── controllers/      # Route controllers (req, res handlers)
├── middlewares/      # Custom middlewares (auth, validation, error handling)
├── models/           # Firebase Data Models & Validation
├── routes/           # Express routes definitions
├── services/         # Business logic layer (Repository Pattern implementation)
├── utils/            # Utility functions (helpers, constants, standard responses)
├── templates/        # Email/SMS templates
├── app.js            # Express app setup
└── server.js         # Server entry point
```

### Coding Standards
*   **Language**: JavaScript (ES6+) / TypeScript (Recommended for enterprise).
*   **Linting/Formatting**: ESLint, Prettier.
*   **Naming Conventions**: 
    *   Variables/Functions: `camelCase`
    *   Classes/Models: `PascalCase`
    *   Files/Directories: `kebab-case`
*   **Comments**: JSDoc standard for all functions and classes.

### Database Design Standards
*   Use plural nouns for collection names (e.g., `users`, `candidates`).
*   Always include `createdAt` and `updatedAt` timestamps (Firestore Server Timestamps).
*   Use soft deletes (`isActive` or `isDeleted` boolean flags) instead of hard deletions for audit purposes.
*   Create Firestore composite indexes for frequently queried fields (e.g., `email`, `candidateId`, `status`).

### Repository Pattern
Business logic will be abstracted from controllers into Service/Repository files. 
*   **Controller**: Handles HTTP request, validation, and passes data to Service.
*   **Service**: Contains the core business logic, orchestrates models, and returns data to Controller.

### Authentication
Authentication using Firebase Auth.
*   Supports Google Sign-up, Phone Number (OTP Verification), and Email/Password.
*   Firebase Client SDK handles token generation and refresh.
*   Passed in the `Authorization` header as `Bearer <Firebase_ID_Token>` for backend verification via Firebase Admin SDK.

### Authorization
Role-Based Access Control (RBAC).
*   Roles: `ADMIN`, `MANAGER`, `STAFF`, `CLIENT`, `CANDIDATE`.
*   Middleware `authorizeRoles(...roles)` will protect specific routes.

### Common Response Format
All API responses must follow a consistent JSON structure.
**Success:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```
**Error:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [ ... ]
}
```

---

## Part 2: User Management Module
**Description**: Manages all internal users (Admin, Manager, Staff).
**Features**:
*   CRUD operations for Users.
*   Assign Roles, Departments, and Designations.
*   Assign Reporting Managers.
*   Status Management (Activate/Deactivate).
*   Reset Passwords securely.

---

## Part 3: Client Management Module
**Description**: Onboarding and managing corporate clients.
**Features**:
*   Capture Client details (Name, Business Domain, GST, PAN, etc.).
*   Manage Client locations and interview addresses.
*   Export Client lists (Excel, PDF).
*   Soft delete / Deactivate clients.

---

## Part 4: Master Module
**Description**: Dynamic management of dropdowns and system-wide configurations.
**Collections Managed**:
*   Business Domain, Industry, Department, Designation
*   Employment Type, Contract Type, Compensation Structure
*   Education, Certification, Skills
*   Geography (Country, State, District, City)
*   Facilities, Documents, Candidate Source, Status Master

---

## Part 5: Talent Requisition Module
**Description**: Core module for creating and managing job requirements.
**Features**:
*   Client or Admin can create a Requisition (TR).
*   Fields include Vacancies, Priority, Salary Range, TAT, Skills, Education.
*   Status tracking: Draft, Pending, Approved, Rejected, Closed.
*   Export TR data.

---

## Part 6: Approval Workflow
**Description**: Controls the lifecycle of a Talent Requisition.
**Workflow**:
1.  TR Created -> Status: `Pending`.
2.  Admin reviews TR.
3.  Admin `Approves` or `Rejects` (requires rejection note).
4.  Logs are created in the Approval History (Date, Approved By).

---

## Part 7: Allocation Module
**Description**: Assigns approved TRs to internal teams.
**Workflow**:
1.  Admin allocates TR to a `Manager`.
2.  Manager allocates TR to specific `Staff` (Recruiter) or self-assigns.
3.  Tracks Assigned Date, Due Date, and Priority.

---

## Part 8: Candidate Module
**Description**: Core candidate database and applicant tracking.
**Features**:
*   Detailed candidate profile (Demographics, Experience, Skills, Location).
*   Resume upload and automated AI Resume Parsing.
*   Source tracking (LinkedIn, Referral, Website).
*   Import from Excel.
*   Advanced Search and Filter by skills, experience, location.

---

## Part 9: Screening
**Description**: Initial evaluation of candidates against TRs.
**Features**:
*   Candidate Tagging to a specific TR.
*   Record Resume Score, Recruiter Comments, Manager Comments.
*   Update Status: `Passed`, `Failed`, `Hold`.

---

## Part 10: Shortlisting
**Description**: Manager/Client review of screened candidates.
**Features**:
*   Track Shortlisting Date and Comments.
*   Update Status: `Shortlisted`, `Rejected`.

---

## Part 11: Interview
**Description**: Scheduling and capturing feedback for interviews.
**Features**:
*   Schedule Interview Round (Date, Time, Type: Online/Offline, Location).
*   Assign Interviewer.
*   Capture Feedback and Result (`Selected`, `Rejected`, `Hold`).

---

## Part 12: Offer
**Description**: Managing the offer rollout process.
**Features**:
*   Record Final Salary, Department, and expected Joining Date.
*   Generate and send Offer Letter.
*   Track Offer Status (`Pending`, `Accepted`, `Rejected`, `Withdrawn`).
*   Capture Withdrawal Reason if applicable.

---

## Part 13: Joining
**Description**: Post-offer acceptance and employee onboarding.
**Features**:
*   Confirm Actual Joining Date.
*   Generate Employee ID.
*   Assign to Client Department and Manager.
*   Final Status updates and Remarks.

---

## Part 14: Dashboard
**Description**: Role-specific data visualization.
*   **Admin/Manager**: KPI Cards (Total Clients, Open Positions, Today's Interviews), Charts (Monthly Hiring, Recruiter Performance, TAT Performance).
*   **Staff**: Personal allocated tasks, candidate pipeline.
*   **Client**: Active TRs, candidate progress, joined employees.

---

## Part 15: Reports
**Description**: Comprehensive data extraction and analytics.
*   **Reports**: Client Wise, Manager/Recruiter Wise, Candidate Wise, Position Wise, Interview, Offer, Joining, TAT, Performance.
*   **Filters**: Date ranges, Status, Roles.
*   **Exports**: Excel, PDF, CSV.

---

## Part 16: Notifications
**Description**: Multi-channel alerts for system events.
*   **Channels**: Email, SMS, WhatsApp (optional API integration), In-App Push Notifications.
*   **Events**: TR Created/Approved/Rejected, Task Assigned, Interview Scheduled, Offer Released, Candidate Joined.

---

## Part 17: Audit Logs
**Description**: System-wide tracking for security and compliance.
*   **Tracks**: User, Module, Action (Create, Update, Delete), Old Value, New Value, Date, Time, IP Address, User Agent (Browser).

---

## Part 18: Settings
**Description**: System configurations.
*   Company Profile, Email SMTP settings, SMS Gateway settings.
*   Role Permissions Matrix (Define granular View, Create, Edit, Delete, Approve, Export access per role).

---

## Part 19: API Documentation
*   Will be generated using **Swagger UI** or **Postman Collections**.
*   All endpoints will follow RESTful standards (e.g., `GET /api/v1/candidates`, `POST /api/v1/requisitions`).
*   Include request payloads, headers (Authorization), and expected standard responses.

---

## Part 20: Firebase Firestore Collections
1.  `users` (Admin, Manager, Staff)
2.  `clients` (Client details)
3.  `candidates` (Candidate profiles)
4.  `requisitions` (Talent Requisitions)
5.  `allocations` (Manager/Staff assignments)
6.  `interviews` (Schedules and feedback)
7.  `offers` (Offer details)
8.  `masters` (Unified collection or individual collections for skills, locations, etc.)
9.  `auditLogs` (System activity)
10. `notifications` (In-app alerts)

---

## Part 21: Deployment
*   **Cloud Provider**: AWS / Azure / DigitalOcean.
*   **Containerization**: Docker (Dockerfile for backend and frontend).
*   **CI/CD**: GitHub Actions or Jenkins for automated testing and deployment.
*   **Reverse Proxy**: NGINX.
*   **Process Manager**: PM2 for Node.js.

---

## Part 22: GitHub Structure
```text
/talentflow-erp
├── /client                 # React Frontend
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /redux
│   │   ├── /services
│   │   └── /utils
│   └── package.json
├── /server                 # Node.js/Express Backend
│   ├── /src
│   │   ├── /controllers
│   │   ├── /models
│   │   ├── /routes
│   │   └── /services
│   ├── package.json
│   └── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

---
*End of Technical Requirements Document.*
