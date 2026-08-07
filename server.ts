import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { sendEmail } from "./backend/services/emailService";
// Models
import { Enrollment } from './backend/models/Enrollment';
import { TrialRequest } from './backend/models/TrialRequest';
import { Contact } from './backend/models/Contact';
import { Admin } from './backend/models/admins';
import bcrypt from 'bcryptjs';
// Local Fallback Store
import {
  saveLocalEnrollment,
  getLocalEnrollments,
  updateLocalEnrollment,
  saveLocalTrial,
  getLocalTrials,
  updateLocalTrial

} from './backend/localStore';

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/global-academy';

const JWT_SECRET: string = process.env.JWT_SECRET || '';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not configured');
}

// Configure Mongoose to not buffer commands if disconnected, so operations fail fast and trigger fallback
mongoose.set('bufferCommands', false);

async function startServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Connect to MongoDB with short timeout so it fails fast in environments without MongoDB
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('Successfully connected to MongoDB');
 
  }  catch (error: any) {
  console.error("========== MongoDB Connection Error ==========");
  console.error("Name:", error?.name);
  console.error("Message:", error?.message);
  console.error("Code:", error?.code);
  console.error("Reason:", error?.reason);
  console.error(error);
  console.error("=============================================");
}

  // --- PUBLIC APIs ---


  // POST Contact Message
app.post('/api/contact', async (req, res) => {

  try {

    const contact = new Contact(req.body);

    await contact.save();

    res.json({
      success: true,
      message: "Message received successfully."
    });

  } catch (error) {

    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to send message."
    });

  }

});
  // POST /enroll
  app.post('/api/enroll', async (req, res) => {
    try {
      if (mongoose.connection.readyState === 1) {
        const enrollment = new Enrollment(req.body);
        await enrollment.save();
      } else {
        await saveLocalEnrollment(req.body);
      }
      res.json({ success: true, message: 'Enrollment submitted successfully' });
    } catch (error) {
      console.error('Enrollment submission error:', error);
      // Fallback if save throws error due to disconnect
      try {
        await saveLocalEnrollment(req.body);
        res.json({ success: true, message: 'Enrollment submitted successfully (fallback)' });
      } catch (innerError) {
        res.status(500).json({ success: false, message: 'Error submitting enrollment' });
      }
    }
  });

  // POST /trial
  app.post('/api/trial', async (req, res) => {
    try {
      if (mongoose.connection.readyState === 1) {
        const trial = new TrialRequest(req.body);
        await trial.save();
      } else {
        await saveLocalTrial(req.body);
      }
      res.json({ success: true, message: 'Trial request submitted successfully' });
    } catch (error) {
      console.error('Trial submission error:', error);
      // Fallback if save throws error due to disconnect
      try {
        await saveLocalTrial(req.body);
        res.json({ success: true, message: 'Trial request submitted successfully (fallback)' });
      } catch (innerError) {
        res.status(500).json({ success: false, message: 'Error submitting trial request' });
      }
    }
  });

  // GET Contact Messages
app.get('/api/admin/contacts', async (req, res) => {

  try {

    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json(contacts);

  } catch (error) {

    console.error("Error fetching contacts:", error);

    res.status(500).json({
      message: "Unable to fetch contact messages."
    });

  }

});

// DELETE Contact Message
app.delete('/api/admin/contacts/:id', async (req, res) => {

  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Contact message deleted successfully."
    });

  } catch (error) {

    console.error("Delete Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete contact message."
    });

  }

});

// --- ADMIN AUTH ---

  // POST /admin/login
// POST /api/admin/login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role
      },
      JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      success: true,
      token,
      admin: {
        username: admin.username,
        role: admin.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
});

  // =========================================
// INITIAL ADMIN SETUP (RUN ONLY ONCE)
// =========================================

app.post('/api/setup/admin', async (req, res) => {

    try {

        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required."
            });
        }

        // Check if an admin already exists
        const adminCount = await Admin.countDocuments();

        if (adminCount > 0) {
            return res.status(403).json({
                success: false,
                message: "Administrator already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save admin
        const admin = new Admin({
            username,
            password: hashedPassword,
            role: "SuperAdmin"
        });

        await admin.save();

        res.json({
            success: true,
            message: "Administrator created successfully."
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error creating administrator."
        });

    }

});

// Admin Middleware
const adminAuth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message: 'Invalid token'
    });

  }
};
  // --- ADMIN APIs ---

  // GET /enrollments
  app.get('/api/admin/enrollments', adminAuth, async (req, res) => {
    try {
      let enrollments;
      if (mongoose.connection.readyState === 1) {
        enrollments = await Enrollment.find().sort({ createdAt: -1 });
      } else {
        enrollments = await getLocalEnrollments();
      }
      res.json(enrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      res.status(500).json({ message: 'Error fetching enrollments' });
    }
  });

app.get("/api/admin/profile", adminAuth, async (req: any, res) => {

  try {

    const admin = await Admin.findById(req.user.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    res.json(admin);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Unable to load profile"
    });

  }

});

app.put("/api/admin/profile", adminAuth, async (req: any, res) => {

  try {

    const { username, password } = req.body;

    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    if (username && username !== admin.username) {

      const existing = await Admin.findOne({ username });

      if (existing) {
        return res.status(400).json({
          message: "Username already exists."
        });
      }

      admin.username = username;

    }

    if (password && password.trim() !== "") {

      const hashedPassword = await bcrypt.hash(password, 10);

      admin.password = hashedPassword;

    }

    await admin.save();

    res.json({
      success: true,
      message: "Profile updated successfully."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile."
    });

  }

});

app.post("/api/admin/contact/reply", adminAuth, async (req, res) => {

  try {

    const { email, subject, message } = req.body;

  const html = `
<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;border:1px solid #ddd;border-radius:8px;overflow:hidden">

    <div style="background:#2563eb;padding:20px;color:white;text-align:center;">
        <h2 style="margin:0;">Global Online Learning Academy</h2>
    </div>

    <div style="padding:30px;">

        <p>Dear Student,</p>

        <p>
            Thank you for contacting
            <strong>Global Online Learning Academy</strong>.
        </p>

        <div style="
            margin:25px 0;
            padding:20px;
            background:#f8fafc;
            border-left:4px solid #2563eb;
            white-space:pre-line;
        ">
            ${message}
        </div>

        <p>
            If you have any further questions,
            simply reply to this email and our team
            will gladly assist you.
        </p>

        <br>

        <p>
            Kind Regards,
        </p>

        <strong>
            Global Online Learning Academy
        </strong>

    </div>

    <div
        style="
        background:#f1f5f9;
        padding:15px;
        text-align:center;
        font-size:12px;
        color:#64748b;
        "
    >
        © Global Online Learning Academy
    </div>

</div>
`;

await sendEmail(
    email,
    subject,
    html
);
    res.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to send email."
    });

  }

});

  // GET /trials
  app.get('/api/admin/trials', adminAuth, async (req, res) => {
    try {
      let trials;
      if (mongoose.connection.readyState === 1) {
        trials = await TrialRequest.find().sort({ createdAt: -1 });
      } else {
        trials = await getLocalTrials();
      }
      res.json(trials);
    } catch (error) {
      console.error('Error fetching trials:', error);
      res.status(500).json({ message: 'Error fetching trials' });
    }
  });
  // DELETE Trial Request
app.delete('/api/admin/trials/:id', async (req, res) => {

  try {

    await TrialRequest.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Trial request deleted successfully."
    });

  } catch (error) {

    console.error("Delete Trial Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete trial request."
    });

  }

});

  // UPDATE enrollment (status/meetLink)
  app.put('/api/admin/enrollments/:id', adminAuth, async (req, res) => {
    try {
      let updated;
      if (mongoose.connection.readyState === 1) {
        updated = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      } else {
        updated = await updateLocalEnrollment(req.params.id, req.body);
      }
      if (
  updated &&
  req.body.status === "Approved"
) {

  await sendEmail(
    updated.email,
    "Enrollment Approved - Global Online Learning Academy",
    `
      <div style="font-family:Arial,sans-serif;padding:20px;">

        <h2 style="color:#2563eb;">
          Congratulations ${updated.studentName}!
        </h2>

        <p>
          Your enrollment request has been approved.
        </p>

        <hr>

        <p><strong>Subject:</strong> ${updated.subject}</p>

        <p><strong>Country:</strong> ${updated.country}</p>

        <p><strong>Status:</strong> Approved</p>

        ${
          updated.meetLink
            ? `
            <p>
              <strong>Google Meet Link</strong><br>
              <a href="${updated.meetLink}">
                ${updated.meetLink}
              </a>
            </p>
            `
            : `
            <p>
              Your Google Meet link will be shared with you shortly.
            </p>
            `
        }

        <br>

        <p>
          We look forward to welcoming you to
          <strong>Global Online Learning Academy</strong>.
        </p>

      </div>
    `
  );

}

res.json(updated);
    } catch (error) {
      console.error('Error updating enrollment:', error);
      res.status(500).json({ message: 'Error updating enrollment' });
    }
  });
// DELETE Enrollment
app.delete('/api/admin/enrollments/:id', async (req, res) => {

  try {

    await Enrollment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Enrollment deleted successfully."
    });

  } catch (error) {

    console.error("Delete Enrollment Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete enrollment."
    });

  }

});



  // UPDATE trial (status)
  app.put('/api/admin/trials/:id', adminAuth, async (req, res) => {
    try {
      let updated;
      if (mongoose.connection.readyState === 1) {
        updated = await TrialRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
      } else {
        updated = await updateLocalTrial(req.params.id, req.body);
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating trial:', error);
      res.status(500).json({ message: 'Error updating trial' });
    }
  });

  // GET stats
  app.get('/api/admin/stats', adminAuth, async (req, res) => {
    try {
      let enrollCount, trialCount, recentEnrollments;
      if (mongoose.connection.readyState === 1) {
        enrollCount = await Enrollment.countDocuments();
        trialCount = await TrialRequest.countDocuments();
        recentEnrollments = await Enrollment.find().sort({ createdAt: -1 }).limit(5);
      } else {
        const enrolls = await getLocalEnrollments();
        const trials = await getLocalTrials();
        enrollCount = enrolls.length;
        trialCount = trials.length;
        recentEnrollments = enrolls.slice(0, 5);
      }
      res.json({ enrollCount, trialCount, recentEnrollments });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ message: 'Error fetching stats' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
