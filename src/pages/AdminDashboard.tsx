import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { Users, ClipboardList, CheckCircle, XCircle, Loader2, Video, LogOut, Mail, Globe, MessageSquare } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

const AdminDashboard = () => {

  const [showReplyModal, setShowReplyModal] = useState(false);

const [replyEmail, setReplyEmail] = useState("");

const [replySubject, setReplySubject] = useState("");

const [replyMessage, setReplyMessage] = useState("");

const [sendingReply, setSendingReply] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 10;
  const [stats, setStats] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [trials, setTrials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] =
useState<'enrollments' | 'trials' | 'contacts'>('enrollments');
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

const [deleteId, setDeleteId] = useState('');

const [deleteType, setDeleteType] = useState<
  'enrollment' | 'trial' | 'contact'
>('enrollment');

const [isDeleting, setIsDeleting] = useState(false);


  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchData = async () => {
    try {
     const [
  statsRes,
  enrollRes,
  trialsRes,
  contactRes,
] = await Promise.all([
  axios.get('/api/admin/stats'),
  axios.get('/api/admin/enrollments'),
  axios.get('/api/admin/trials'),
  axios.get('/api/admin/contacts'),
]);
      setStats(statsRes.data);
      setEnrollments(enrollRes.data);
      setTrials(trialsRes.data);
      setContacts(contactRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, activeTab]);

  const filteredEnrollments = enrollments.filter((enroll) => {
  const search = searchTerm.toLowerCase();

  return (
    enroll.studentName?.toLowerCase().includes(search) ||
    enroll.parentName?.toLowerCase().includes(search) ||
    enroll.email?.toLowerCase().includes(search) ||
    enroll.subject?.toLowerCase().includes(search)
  );
});

const filteredTrials = trials.filter((trial) => {
  const search = searchTerm.toLowerCase();

  return (
    trial.studentName?.toLowerCase().includes(search) ||
    trial.email?.toLowerCase().includes(search) ||
    trial.subject?.toLowerCase().includes(search)
  );
});

const filteredContacts = contacts.filter((contact) => {
  const search = searchTerm.toLowerCase();

  return (
    contact.name?.toLowerCase().includes(search) ||
    contact.email?.toLowerCase().includes(search) ||
    contact.subject?.toLowerCase().includes(search)
  );
});

const paginate = (items: any[]) => {
  const start = (currentPage - 1) * recordsPerPage;
  return items.slice(start, start + recordsPerPage);
};

const paginatedEnrollments = paginate(filteredEnrollments);
const paginatedTrials = paginate(filteredTrials);
const paginatedContacts = paginate(filteredContacts);

const totalRecords =
  activeTab === 'enrollments'
    ? filteredEnrollments.length
    : activeTab === 'trials'
    ? filteredTrials.length
    : filteredContacts.length;

const totalPages = Math.ceil(totalRecords / recordsPerPage);

const startRecord =
  totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;

const endRecord = Math.min(
  currentPage * recordsPerPage,
  totalRecords
);

  const handleUpdateEnrollment = async (id: string, data: any) => {
    try {
      await axios.put(`/api/admin/enrollments/${id}`, data);
      fetchData();
    } catch (error) {
      console.error('Error updating enrollment:', error);
    }
  };

  const handleUpdateTrial = async (id: string, data: any) => {
    try {
      await axios.put(`/api/admin/trials/${id}`, data);
      fetchData();
    } catch (error) {
      console.error('Error updating trial:', error);
    }
  };

  const handleDeleteEnrollment = async (id: string) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this enrollment?"
  );

  if (!confirmed) return;

  try {

    await axios.delete(`/api/admin/enrollments/${id}`);

    fetchData();

  } catch (error) {

    console.error("Delete enrollment failed:", error);

    alert("Unable to delete enrollment.");

  }

};

const handleReply = async () => {

  try {

    setSendingReply(true);

    await axios.post("/api/admin/contact/reply", {

      email: replyEmail,

      subject: replySubject,

      message: replyMessage

    });

    toast.success("Profile updated successfully.");

    setShowReplyModal(false);

    setReplyEmail("");

    setReplySubject("");

    setReplyMessage("");

  } catch (error) {

    console.error(error);

    alert("Unable to send reply.");

  } finally {

    setSendingReply(false);

  }

};

const handleDeleteTrial = async (id: string) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this trial request?"
  );

  if (!confirmed) return;

  try {

    await axios.delete(`/api/admin/trials/${id}`);

    fetchData();

  } catch (error) {

    console.error("Delete trial failed:", error);

    toast.success("Profile updated successfully.");
  }

};



const handleDeleteContact = async (id: string) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this message?"
  );

  if (!confirmed) return;

  try {

    await axios.delete(`/api/admin/contacts/${id}`);

    fetchData();

  } catch (error) {

    console.error("Delete contact failed:", error);
toast.success("Profile updated successfully.");

  }

};
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-brand-light dark:bg-slate-900">
        <Loader2 className="w-12 h-12 text-brand-blue animate-spin" />
      </div>
    );
  }

  const openDeleteModal = (
  id: string,
  type: 'enrollment' | 'trial' | 'contact'
) => {

  setDeleteId(id);

  setDeleteType(type);

  setShowDeleteModal(true);

};

const closeDeleteModal = () => {

  setShowDeleteModal(false);

  setDeleteId('');

};

const confirmDelete = async () => {

  try {

    setIsDeleting(true);

    if (deleteType === 'enrollment') {

      await axios.delete(`/api/admin/enrollments/${deleteId}`);

    }

    if (deleteType === 'trial') {

      await axios.delete(`/api/admin/trials/${deleteId}`);

    }

    if (deleteType === 'contact') {

      await axios.delete(`/api/admin/contacts/${deleteId}`);

    }

    fetchData();

    closeDeleteModal();

  } catch (error) {

    console.error(error);

  } finally {

    setIsDeleting(false);

  }

};
const exportToExcel = () => {

  let data: any[] = [];
  let fileName = "";

  if (activeTab === "enrollments") {

    data = filteredEnrollments.map((e) => ({
      Student: e.studentName,
      Parent: e.parentName,
      Email: e.email,
      Subject: e.subject,
      Country: e.country,
      Status: e.status,
      "Google Meet": e.meetLink || "",
    }));

    fileName = "Enrollments.xlsx";

  } else if (activeTab === "trials") {

    data = filteredTrials.map((t) => ({
      Student: t.studentName,
      Email: t.email,
      Subject: t.subject,
      Country: t.country,
      Status: t.status,
    }));

    fileName = "TrialRequests.xlsx";

  } else {

    data = filteredContacts.map((c) => ({
      Name: c.name,
      Email: c.email,
      Subject: c.subject,
      Message: c.message,
      Date: new Date(c.createdAt).toLocaleString(),
    }));

    fileName = "ContactMessages.xlsx";

  }

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, fileName);

};

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex gap-3">

  <button
    onClick={() => navigate("/admin/profile")}
    className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-bold"
  >
    <span>Profile</span>
  </button>

  <button
    onClick={handleLogout}
    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold"
  >
    <LogOut className="w-5 h-5" />
    <span>Logout</span>
  </button>

</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          { label: 'Total Enrollments', value: stats?.enrollCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Total Trial Requests', value: stats?.trialCount, icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-100' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-slate-700`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <span className="text-4xl font-bold text-slate-900 dark:text-white">{stat.value || 0}</span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</h3>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('enrollments')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'enrollments'
              ? 'bg-brand-blue text-white shadow-lg'
              : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50'
          }`}
        >
          Enrollments
        </button>
        <button
          onClick={() => setActiveTab('trials')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'trials'
              ? 'bg-brand-blue text-white shadow-lg'
              : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50'
          }`}
        >
          Trial Requests
        </button>
        <button
  onClick={() => setActiveTab('contacts')}
  className={`px-6 py-3 rounded-xl font-bold transition-all ${
    activeTab === 'contacts'
      ? 'bg-brand-blue text-white shadow-lg'
      : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50'
  }`}
>
  Contact Messages
</button>
      </div>

<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

  <input
    type="text"
    placeholder="Search by name, email or subject..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full md:w-96 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800"
  />

  <button
    onClick={exportToExcel}
    className="px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
  >
    📥 Export Excel
  </button>

</div>

      {/* Content Area */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'enrollments' ? (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4 font-bold">Student/Parent</th>
                  <th className="px-8 py-4 font-bold">Subject/Country</th>
                  <th className="px-8 py-4 font-bold">Google Meet Link</th>
                  <th className="px-8 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {paginatedEnrollments.map((enroll) => (
                  <tr key={enroll._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 dark:text-white">{enroll.studentName}</div>
                      <div className="text-xs text-slate-500 flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{enroll.email}</span>
                      </div>
                      <div className="text-xs text-slate-400">Parent: {enroll.parentName}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-brand-blue dark:text-brand-green">{enroll.subject}</div>
                      <div className="text-xs text-slate-500 flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>{enroll.country}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          defaultValue={enroll.meetLink}
                          onBlur={(e) => handleUpdateEnrollment(enroll._id, { meetLink: e.target.value })}
                          placeholder="Add link..."
                          className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-brand-blue w-32"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <select
                        value={enroll.status}
                        onChange={(e) => handleUpdateEnrollment(enroll._id, { status: e.target.value })}
                        className={`text-xs font-bold px-2 py-1 rounded-full outline-none ${
                          enroll.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                          enroll.status === 'Contacted' ? 'bg-blue-100 text-blue-600' :
                          'bg-amber-100 text-amber-600'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Contacted">Contacted</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                <button
  onClick={() => handleDeleteEnrollment(enroll._id)}
  className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
>
  Delete
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : activeTab === 'trials' ? (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4 font-bold">Student</th>
                  <th className="px-8 py-4 font-bold">Subject</th>
                  <th className="px-8 py-4 font-bold">Country</th>
                  <th className="px-8 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {paginatedTrials.map((trial) => (
                  <tr key={trial._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 dark:text-white">{trial.studentName}</div>
                      <div className="text-xs text-slate-500">{trial.email}</div>
                    </td>
                    <td className="px-8 py-6 text-slate-600 dark:text-slate-300">{trial.subject}</td>
                    <td className="px-8 py-6 text-slate-600 dark:text-slate-300">{trial.country}</td>
                    <td className="px-8 py-6">
                      <select
                        value={trial.status}
                        onChange={(e) => handleUpdateTrial(trial._id, { status: e.target.value })}
                        className={`text-xs font-bold px-2 py-1 rounded-full outline-none ${
                          trial.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                          trial.status === 'Contacted' ? 'bg-blue-100 text-blue-600' :
                          'bg-amber-100 text-amber-600'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Contacted">Contacted</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
  onClick={() => handleDeleteTrial(trial._id)}
  className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
>
  Delete
</button>
                    </td>
                  </tr>
                ))}
                          </tbody>
            </table>

          ) : (

            <table className="w-full text-left">

              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">

                <tr>
                  <th className="px-8 py-4 font-bold">Name</th>
                  <th className="px-8 py-4 font-bold">Email</th>
                  <th className="px-8 py-4 font-bold">Subject</th>
                  <th className="px-8 py-4 font-bold">Message</th>
                  <th className="px-8 py-4 font-bold">Date</th>
                  <th className="px-8 py-4 font-bold text-right">
  Actions
</th>
                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">

                {paginatedContacts.map((contact) => (

                  <tr
                    key={contact._id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                  >

                    <td className="px-8 py-6 font-bold">
                      {contact.name}
                    </td>

                    <td className="px-8 py-6">
                      {contact.email}
                    </td>

                    <td className="px-8 py-6">
                      {contact.subject}
                    </td>

                    <td className="px-8 py-6 max-w-sm">
                      <div className="break-words">
                        {contact.message}
                      </div>
                    </td>

                  <td className="px-8 py-6">
  {new Date(contact.createdAt).toLocaleDateString()}
</td>

<td className="px-8 py-6 text-right">
 <div className="flex justify-end gap-2">

  <button
    onClick={() => {

      setReplyEmail(contact.email);

      setReplySubject(`Re: ${contact.subject}`);

      setReplyMessage("");

      setShowReplyModal(true);

    }}
    className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
  >
    Reply
  </button>

  <button
    onClick={() => handleDeleteContact(contact._id)}
    className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
  >
    Delete
  </button>

</div>
</td>

</tr>

                ))}

              </tbody>

            </table>

          )}

<div className="flex flex-col md:flex-row justify-between items-center px-8 py-5 border-t border-slate-200 dark:border-slate-700">

  <p className="text-sm text-slate-500">
    Showing <b>{startRecord}</b> - <b>{endRecord}</b> of{" "}
    <b>{totalRecords}</b> records
  </p>

  <div className="flex items-center gap-3 mt-4 md:mt-0">

    <button
      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      Previous
    </button>

    <span className="font-semibold">
      Page {currentPage} of {totalPages || 1}
    </span>

    <button
      onClick={() =>
        setCurrentPage((p) => Math.min(totalPages, p + 1))
      }
      disabled={currentPage === totalPages || totalPages === 0}
      className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      Next
    </button>

  </div>

</div>

        </div>
           </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">

            <div className="flex justify-center mb-4">

              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7L5 7M10 11V17M14 11V17M6 7L7 19C7.1 20 7.9 21 9 21H15C16.1 21 16.9 20 17 19L18 7M9 7V5C9 3.9 9.9 3 11 3H13C14.1 3 15 3.9 15 5V7"
                  />
                </svg>

              </div>

            </div>

            <h2 className="text-2xl font-bold text-center mb-2">
              Delete Record
            </h2>

            <p className="text-slate-500 text-center mb-8">
              Are you sure you want to delete this record?
              <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={closeDeleteModal}
                className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Reply Modal */}
{showReplyModal && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Reply to Contact
      </h2>

      <div className="space-y-5">

        <div>

          <label className="block font-semibold mb-2">
            Recipient
          </label>

          <input
            value={replyEmail}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-slate-100 dark:bg-slate-700"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Subject
          </label>

          <input
            value={replySubject}
            onChange={(e) => setReplySubject(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Reply
          </label>

          <textarea
            rows={8}
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 resize-none"
            placeholder="Type your reply..."
          />

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => setShowReplyModal(false)}
          className="px-5 py-2 rounded-lg border hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={handleReply}
          disabled={sendingReply}
          className="px-5 py-2 rounded-lg bg-brand-blue text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {sendingReply ? "Sending..." : "Send Reply"}
        </button>

      </div>

    </div>

  </div>

)}

    </div>
  );
};

export default AdminDashboard;