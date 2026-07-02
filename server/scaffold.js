const fs = require('fs');
const path = require('path');

const modules = [
  'client', 'master', 'requisition', 'allocation', 'candidate', 
  'screening', 'shortlisting', 'interview', 'offer', 'joining', 
  'task', 'report', 'audit', 'setting'
];

const controllersDir = path.join(__dirname, 'src', 'controllers');
const routesDir = path.join(__dirname, 'src', 'routes');
const appJsPath = path.join(__dirname, 'src', 'app.js');

// Ensure directories exist
if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir, { recursive: true });
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir, { recursive: true });

// 1. Generate Controllers
modules.forEach(mod => {
  const controllerName = `${mod}Controller`;
  const controllerPath = path.join(controllersDir, `${controllerName}.js`);
  
  if (!fs.existsSync(controllerPath)) {
    const content = `const { db } = require('../config/firebase');

exports.getAll = async (req, res) => {
  try {
    const snapshot = await db.collection('${mod}s').get();
    const data = [];
    snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const docRef = await db.collection('${mod}s').add({
      ...req.body,
      createdAt: new Date().toISOString(),
      isActive: true
    });
    res.status(201).json({ success: true, message: 'Created successfully', id: docRef.id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
`;
    fs.writeFileSync(controllerPath, content);
    console.log(`Created: ${controllerPath}`);
  }
});

// 2. Generate Routes
modules.forEach(mod => {
  const routeName = `${mod}Routes`;
  const routePath = path.join(routesDir, `${routeName}.js`);
  
  if (!fs.existsSync(routePath)) {
    const content = `const express = require('express');
const router = express.Router();
const controller = require('../controllers/${mod}Controller');

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;
`;
    fs.writeFileSync(routePath, content);
    console.log(`Created: ${routePath}`);
  }
});

// 3. Update app.js
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Generate import statements
const importStatements = modules.map(mod => `const ${mod}Routes = require('./routes/${mod}Routes');`).join('\n');
const useStatements = modules.map(mod => `app.use('/api/v1/${mod}s', ${mod}Routes);`).join('\n');

// We will inject the imports after the userRoutes import, and use statements after userRoutes use
if (!appJsContent.includes('const clientRoutes')) {
  appJsContent = appJsContent.replace("const userRoutes = require('./routes/userRoutes');", `const userRoutes = require('./routes/userRoutes');\n${importStatements}`);
  appJsContent = appJsContent.replace("app.use('/api/v1/users', userRoutes);", `app.use('/api/v1/users', userRoutes);\n${useStatements}`);
  fs.writeFileSync(appJsPath, appJsContent);
  console.log('Updated app.js with new routes.');
} else {
  console.log('app.js already updated.');
}

console.log('Backend scaffolding complete!');
