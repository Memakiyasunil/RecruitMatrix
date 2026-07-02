import React from 'react';

const StubPage = ({ title, desc }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    <p className="text-gray-500 mt-2">{desc || 'This module is under construction.'}</p>
  </div>
);

export const RequisitionsPage = () => <StubPage title="Talent Requisition" desc="Create and manage talent requisitions." />
export const ApprovalsPage = () => <StubPage title="TR Approval" desc="Review and approve talent requisitions." />
export const AllocationsPage = () => <StubPage title="TR Allocation" desc="Allocate recruiters to requisitions." />
export const CandidatesPage = () => <StubPage title="Candidate Master" desc="Manage candidate database." />
export const TaggingPage = () => <StubPage title="Tagging" desc="Tag candidates to open requisitions." />
export const ScreeningPage = () => <StubPage title="Screening" desc="Screen tagged candidates." />
export const ShortlistingPage = () => <StubPage title="Shortlisting" desc="Shortlist screened candidates." />
export const InterviewsPage = () => <StubPage title="Interviews" desc="Schedule and manage interviews." />
export const SelectionPage = () => <StubPage title="Candidate Selection" desc="Record candidate selection." />
export const OffersPage = () => <StubPage title="Offer Letter" desc="Generate and release offer letters." />
export const OfferAcceptancePage = () => <StubPage title="Offer Acceptance" desc="Track offer acceptance and rejection." />
export const JoiningPage = () => <StubPage title="Joining & Onboarding" desc="Track candidate joining." />

export const DocumentsPage = () => <StubPage title="Documents" desc="Manage client and candidate documents." />
export const TasksPage = () => <StubPage title="Task Management" desc="Manage recruitment tasks." />
export const AttendancePage = () => <StubPage title="Attendance" desc="Internal team attendance." />
export const ReportsPage = () => <StubPage title="Reports & Analytics" desc="View recruitment reports." />

export const RolesPage = () => <StubPage title="Role & Permissions" desc="Manage RBAC roles and permissions matrix." />
export const DepartmentsPage = () => <StubPage title="Department Master" desc="Manage internal departments." />
export const DesignationsPage = () => <StubPage title="Designation Master" desc="Manage internal designations." />
export const AuditPage = () => <StubPage title="Audit Logs" desc="View system audit logs." />
