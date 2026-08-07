import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'backend-data');
const ENROLLMENTS_FILE = path.join(DATA_DIR, 'enrollments.json');
const TRIALS_FILE = path.join(DATA_DIR, 'trials.json');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENROLLMENTS_FILE)) {
  fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(TRIALS_FILE)) {
  fs.writeFileSync(TRIALS_FILE, JSON.stringify([]));
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function saveLocalEnrollment(data: any) {
  const fileContent = fs.readFileSync(ENROLLMENTS_FILE, 'utf8');
  const enrollments = JSON.parse(fileContent || '[]');
  const newEnrollment = {
    _id: generateId(),
    ...data,
    meetLink: data.meetLink || '',
    status: data.status || 'Pending',
    createdAt: new Date().toISOString()
  };
  enrollments.push(newEnrollment);
  fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(enrollments, null, 2));
  return newEnrollment;
}

export async function getLocalEnrollments() {
  const fileContent = fs.readFileSync(ENROLLMENTS_FILE, 'utf8');
  const enrollments = JSON.parse(fileContent || '[]');
  // Sort by createdAt desc
  return enrollments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateLocalEnrollment(id: string, data: any) {
  const fileContent = fs.readFileSync(ENROLLMENTS_FILE, 'utf8');
  let enrollments = JSON.parse(fileContent || '[]');
  let updatedItem = null;
  enrollments = enrollments.map((item: any) => {
    if (item._id === id) {
      updatedItem = { ...item, ...data };
      return updatedItem;
    }
    return item;
  });
  fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(enrollments, null, 2));
  return updatedItem;
}

export async function saveLocalTrial(data: any) {
  const fileContent = fs.readFileSync(TRIALS_FILE, 'utf8');
  const trials = JSON.parse(fileContent || '[]');
  const newTrial = {
    _id: generateId(),
    ...data,
    status: data.status || 'Pending',
    createdAt: new Date().toISOString()
  };
  trials.push(newTrial);
  fs.writeFileSync(TRIALS_FILE, JSON.stringify(trials, null, 2));
  return newTrial;
}

export async function getLocalTrials() {
  const fileContent = fs.readFileSync(TRIALS_FILE, 'utf8');
  const trials = JSON.parse(fileContent || '[]');
  return trials.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateLocalTrial(id: string, data: any) {
  const fileContent = fs.readFileSync(TRIALS_FILE, 'utf8');
  let trials = JSON.parse(fileContent || '[]');
  let updatedItem = null;
  trials = trials.map((item: any) => {
    if (item._id === id) {
      updatedItem = { ...item, ...data };
      return updatedItem;
    }
    return item;
  });
  fs.writeFileSync(TRIALS_FILE, JSON.stringify(trials, null, 2));
  return updatedItem;
}
