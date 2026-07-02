// In-memory store for Clients
let clients = [
  {
    id: 'CLT-0001',
    clientName: 'Tata Consultancy Services',
    businessName: 'TCS',
    businessDomain: 'IT Services',
    address: 'Banyan Park, Mumbai, Maharashtra',
    logo: '',
    website: 'https://www.tcs.com',
    email: 'contact@tcs.com',
    mobile: '9876543210',
    gstNumber: '27AAACT4355B1Z1',
    panNumber: 'AAACT4355B',
    briefDescription: 'Global leader in IT services, consulting, and business solutions.',
    clientAbbreviation: 'TCS',
    interviewAddress: 'Banyan Park, Andheri East, Mumbai',
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'CLT-0002',
    clientName: 'Infosys Limited',
    businessName: 'Infosys',
    businessDomain: 'IT Consulting',
    address: 'Electronic City, Bangalore, Karnataka',
    logo: '',
    website: 'https://www.infosys.com',
    email: 'contact@infosys.com',
    mobile: '9876543211',
    gstNumber: '29AAACI4355B1Z1',
    panNumber: 'AAACI4355B',
    briefDescription: 'Next-generation digital services and consulting.',
    clientAbbreviation: 'INFY',
    interviewAddress: 'Electronic City Phase 1, Bangalore',
    status: 'Active',
    createdAt: new Date().toISOString()
  }
];

exports.getAll = (req, res) => {
  try {
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = (req, res) => {
  try {
    const newClient = {
      id: `CLT-${String(clients.length + 1).padStart(4, '0')}`,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    clients.push(newClient);
    res.status(201).json({ success: true, message: 'Created successfully', data: newClient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.update = (req, res) => {
  try {
    const { id } = req.params;
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    clients[index] = { ...clients[index], ...req.body, updatedAt: new Date().toISOString() };
    res.status(200).json({ success: true, message: 'Updated successfully', data: clients[index] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.remove = (req, res) => {
  try {
    const { id } = req.params;
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    clients.splice(index, 1);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
