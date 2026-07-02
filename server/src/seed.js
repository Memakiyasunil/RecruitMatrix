require('dotenv').config({ path: __dirname + '/../.env' });
const { admin, db, auth } = require('./config/firebase');

const importData = async () => {
  if (!db || !auth) {
    console.error('Firebase Admin is not initialized. Please add FIREBASE_SERVICE_ACCOUNT to your .env file.');
    process.exit(1);
  }

  try {
    console.log('Seeding data to Firebase...');

    // We cannot easily "deleteMany" in Firestore without deleting documents individually,
    // so we'll just write predefined documents with known IDs for the seed.

    // 1. Create Client (Company)
    const clientRef = db.collection('clients').doc('client_acme');
    await clientRef.set({
      companyName: 'Acme Corp',
      industry: 'Technology',
      website: 'www.acmecorp.com',
      status: 'Active',
      contactPerson: 'Jane Doe',
      email: 'jane@acmecorp.com',
      phone: '123-456-7890'
    });

    // 2. Create Company Roles
    const roles = {
      ceo: { name: 'CEO', clientId: 'client_acme', permissions: { canManageEmployees: true, canAssignTaskDownward: true, canAssignTaskAll: true, canApproveTask: true, canViewAllTasks: true, canViewTeamTasks: true } },
      techMgr: { name: 'Technical Manager', clientId: 'client_acme', permissions: { canManageEmployees: false, canAssignTaskDownward: true, canAssignTaskAll: false, canApproveTask: true, canViewAllTasks: false, canViewTeamTasks: true } },
      seniorDev: { name: 'Senior Developer', clientId: 'client_acme', permissions: { canManageEmployees: false, canAssignTaskDownward: true, canAssignTaskAll: false, canApproveTask: true, canViewAllTasks: false, canViewTeamTasks: true } },
      juniorDev: { name: 'Junior Developer', clientId: 'client_acme', permissions: { canManageEmployees: false, canAssignTaskDownward: false, canAssignTaskAll: false, canApproveTask: false, canViewAllTasks: false, canViewTeamTasks: false } }
    };
    
    for (const [key, roleData] of Object.entries(roles)) {
      await db.collection('companyRoles').doc(`role_${key}`).set(roleData);
    }

    // 3. Create Departments & Teams
    await db.collection('departments').doc('dept_mgt').set({ name: 'Management', clientId: 'client_acme' });
    await db.collection('departments').doc('dept_eng').set({ name: 'Engineering', clientId: 'client_acme' });
    await db.collection('teams').doc('team_frontend').set({ name: 'Frontend Team', departmentId: 'dept_eng', clientId: 'client_acme' });

    // 4. Create Users in Firebase Auth & Firestore mapping
    const seedUsers = [
      { id: 'admin_sys', email: 'admin@recruitmatrix.com', password: 'Admin@123', name: 'Super Admin', portal: 'admin', role: 'System Admin' },
      { id: 'emp_ceo', email: 'alice.ceo@acmecorp.com', password: 'Company@123', name: 'Alice CEO', portal: 'company', roleRef: 'role_ceo', deptRef: 'dept_mgt', designation: 'CEO' },
      { id: 'emp_tech', email: 'charlie.tech@acmecorp.com', password: 'Company@123', name: 'Charlie TechMgr', portal: 'company', roleRef: 'role_techMgr', deptRef: 'dept_eng', designation: 'Technical Manager' },
      { id: 'emp_srdev', email: 'dave.srdev@acmecorp.com', password: 'Company@123', name: 'Dave SrDev', portal: 'company', roleRef: 'role_seniorDev', deptRef: 'dept_eng', teamRef: 'team_frontend', designation: 'Senior Frontend Dev' },
      { id: 'emp_jrdev', email: 'eve.jrdev@acmecorp.com', password: 'Company@123', name: 'Eve JrDev', portal: 'company', roleRef: 'role_juniorDev', deptRef: 'dept_eng', teamRef: 'team_frontend', designation: 'Junior Frontend Dev' }
    ];

    for (const user of seedUsers) {
      try {
        // Attempt to create user in Firebase Auth
        await auth.createUser({
          uid: user.id,
          email: user.email,
          password: user.password,
          displayName: user.name,
        });
      } catch (err) {
        if (err.code === 'auth/uid-already-exists' || err.code === 'auth/email-already-exists') {
          console.log(`User ${user.email} already exists in Auth, updating password...`);
          await auth.updateUser(user.id, { password: user.password });
        } else {
          throw err;
        }
      }

      // Write mapped doc to Firestore
      if (user.portal === 'admin') {
        await db.collection('users').doc(user.id).set({
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: true
        });
      } else {
        await db.collection('companyEmployees').doc(user.id).set({
          employeeId: user.id,
          clientId: 'client_acme',
          personalInfo: { firstName: user.name.split(' ')[0], lastName: user.name.split(' ')[1] || '', email: user.email },
          officialInfo: {
            department: user.deptRef,
            team: user.teamRef || null,
            role: user.roleRef,
            designation: user.designation,
          },
          status: 'Active'
        });
      }
    }

    // 5. Create Tasks
    await db.collection('tasks').doc('tsk_001').set({
      taskNumber: 'TSK-0001',
      clientId: 'client_acme',
      title: 'Review Frontend Architecture',
      priority: 'High',
      status: 'Pending',
      moduleSource: 'Technical',
      assignedBy: 'emp_tech',
      assignedTo: 'emp_srdev',
      reviewRequired: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    await db.collection('tasks').doc('tsk_002').set({
      taskNumber: 'TSK-0002',
      clientId: 'client_acme',
      title: 'Build Login Component',
      priority: 'Medium',
      status: 'In Progress',
      moduleSource: 'Technical',
      assignedBy: 'emp_srdev',
      assignedTo: 'emp_jrdev',
      reviewRequired: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Firebase Seeding Complete!');
    process.exit();
  } catch (error) {
    console.error(`Firebase Seeding Error:`, error);
    process.exit(1);
  }
};

importData();
