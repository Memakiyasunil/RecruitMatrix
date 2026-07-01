import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firstNames = ['Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Diya', 'Advik', 'Kabir', 'Anaya', 'Aarohi', 'Shruti', 'Neha', 'Rohan', 'Amit', 'Sunil', 'Priya', 'Kavita', 'Sanjay', 'Rahul', 'Vikram', 'Pooja', 'Sneha', 'Karan', 'Raj', 'Simran', 'Riya', 'Arjun', 'Ravi', 'Rakesh', 'Suresh', 'Ramesh', 'Ritu', 'Kiran', 'Nisha', 'Nitin', 'Manoj'];
const lastNames = ['Patel', 'Sharma', 'Singh', 'Kumar', 'Das', 'Bose', 'Gupta', 'Mehta', 'Trivedi', 'Joshi', 'Chauhan', 'Shah', 'Verma', 'Reddy', 'Rao', 'Nair', 'Pillai', 'Iyer', 'Deshmukh', 'Kulkarni', 'Jain', 'Agarwal', 'Chatterjee', 'Sen', 'Bhattacharya'];
const companies = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini', 'IBM', 'Google', 'Microsoft', 'Amazon', 'Oracle'];
const cities = ['Ahmedabad', 'Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Hyderabad', 'Surat', 'Vadodara', 'Rajkot'];
const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'IT Support', 'Product'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId(prefix, index) {
  return `${prefix}-${String(index).padStart(4, '0')}`;
}

function generateClients(count) {
  const clients = [];
  for (let i = 1; i <= count; i++) {
    clients.push({
      id: generateId('CLT', i),
      name: getRandomItem(companies) + (Math.random() > 0.5 ? ' Technologies' : ' Solutions'),
      contactPerson: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
      email: `contact@client${i}.com`,
      phone: `+91 98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      city: getRandomItem(cities),
      status: Math.random() > 0.1 ? 'Active' : 'Inactive',
      joinedDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0]
    });
  }
  return clients;
}

function generateUsers(count, prefix, role) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const fn = getRandomItem(firstNames);
    const ln = getRandomItem(lastNames);
    users.push({
      id: generateId(prefix, i),
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@recruitmatrix.com`,
      role: role,
      department: getRandomItem(departments),
      status: Math.random() > 0.05 ? 'Active' : 'Inactive'
    });
  }
  return users;
}

function generateCandidates(count) {
  const candidates = [];
  const skills = ['React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'SQL', 'MongoDB', 'Angular', 'Vue'];
  const statuses = ['Sourced', 'Screening', 'Shortlisted', 'Interviewing', 'Offered', 'Joined', 'Rejected'];
  for (let i = 1; i <= count; i++) {
    const fn = getRandomItem(firstNames);
    const ln = getRandomItem(lastNames);
    candidates.push({
      id: generateId('CAN', i),
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}${i}@example.com`,
      phone: `+91 9${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
      city: getRandomItem(cities),
      experience: Math.floor(Math.random() * 15) + 1, // 1-15 years
      currentCompany: getRandomItem(companies),
      skills: [getRandomItem(skills), getRandomItem(skills)],
      status: getRandomItem(statuses),
      expectedCTC: `${Math.floor(Math.random() * 20) + 5} LPA`
    });
  }
  return candidates;
}

const dataDir = path.join(__dirname, 'public', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'clients.json'), JSON.stringify(generateClients(50), null, 2));
fs.writeFileSync(path.join(dataDir, 'managers.json'), JSON.stringify(generateUsers(20, 'MGR', 'Manager'), null, 2));
fs.writeFileSync(path.join(dataDir, 'recruiters.json'), JSON.stringify(generateUsers(100, 'REC', 'Recruiter'), null, 2));
fs.writeFileSync(path.join(dataDir, 'candidates.json'), JSON.stringify(generateCandidates(2500), null, 2));

console.log('Seed data generated successfully in public/data/');
