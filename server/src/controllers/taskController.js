const { db } = require('../config/firebase');

exports.getAllTasks = async (req, res) => {
  try {
    const { assignee } = req.query;
    let query = db.collection('tasks');
    
    if (assignee) {
      query = query.where('assignedTo', '==', assignee);
    }
    
    const snapshot = await query.get();
    const tasks = [];
    snapshot.forEach(doc => tasks.push({ id: doc.id, ...doc.data() }));
      
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const doc = await db.collection('tasks').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = {
      ...req.body,
      createdAt: new Date().toISOString()
    };
    const docRef = await db.collection('tasks').add(newTask);
    res.status(201).json({ success: true, data: { id: docRef.id, ...newTask } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status, approvalStatus } = req.body;
    const taskRef = db.collection('tasks').doc(req.params.id);
    const updates = {};
    
    if (status) updates.status = status;
    if (approvalStatus) updates.approvalStatus = approvalStatus;
    if (status === 'Completed') updates.completionDate = new Date().toISOString();
    
    await taskRef.update(updates);
    res.status(200).json({ success: true, message: 'Task updated' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = {
      taskId: req.params.id,
      employeeId: req.body.employeeId,
      commentText: req.body.commentText,
      attachments: req.body.attachments || [],
      createdAt: new Date().toISOString()
    };
    const docRef = await db.collection('taskComments').add(comment);
    res.status(201).json({ success: true, data: { id: docRef.id, ...comment } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
