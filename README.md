# RecruitMatrix Enterprise System

RecruitMatrix is a comprehensive Recruitment ERP, CRM, ATS, and Client Hiring Portal built on the MERN stack with a Monolithic Architecture and a Workspace monorepo setup.

## Project Structure
- `/admin-panel`: React frontend for internal company staff (System Admins, Recruiters).
- `/company-panel`: React frontend for client company employees (CEOs, HR, Managers).
- `/website`: Public-facing React website.
- `/server`: Node/Express backend API connected to MongoDB.

## Running the Application
The project utilizes npm workspaces. From the root directory, run:
- `npm run dev:admin` - Starts Admin Panel
- `npm run dev:company` - Starts Company Panel
- `npm run dev:website` - Starts Public Website
- `npm run dev:server` - Starts Backend API

## Seeding the Database
To populate the database with initial users, roles, clients, and tasks, navigate to the `server` directory and run the seed script:
```bash
cd server
node src/seed.js
```
*Note: Ensure your MongoDB instance is running locally or that `server/.env` is configured with your `MONGO_URI`.*

---

## 🔐 Seed Data Login Credentials

Once you have run the seed script, you can log in using the following accounts:

### 1. Admin Panel (`http://localhost:5173/login`)
| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **System Admin** | Super Admin | `admin@recruitmatrix.com` | `Admin@123` |

### 2. Company Panel (`http://localhost:5174/login`)
| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **CEO** | Alice CEO | `alice.ceo@acmecorp.com` | `Company@123` |
| **Technical Manager** | Charlie TechMgr | `charlie.tech@acmecorp.com` | `Company@123` |
| **Senior Developer** | Dave SrDev | `dave.srdev@acmecorp.com` | `Company@123` |
| **Junior Developer** | Eve JrDev | `eve.jrdev@acmecorp.com` | `Company@123` |
