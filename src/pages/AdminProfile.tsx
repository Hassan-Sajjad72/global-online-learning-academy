import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const AdminProfile = () => {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const res = await axios.get("/api/admin/profile");

            setUsername(res.data.username);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const saveProfile = async () => {

        try {

            setSaving(true);

            await axios.put("/api/admin/profile", {

                username,

                password

            });

            alert("Profile updated successfully.");

            setPassword("");

        } catch (err: any) {

            alert(err.response?.data?.message || "Unable to update profile.");

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <Loader2 className="w-10 h-10 animate-spin" />

            </div>

        );

    }

    return (

        <div className="max-w-2xl mx-auto pt-32 pb-20">

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10">

                <h1 className="text-3xl font-bold mb-8">
                    Admin Profile
                </h1>

                <div className="space-y-6">

                    <div>

                        <label className="font-semibold">
                            Username
                        </label>

                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-2 border rounded-xl px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave empty to keep current password"
                            className="w-full mt-2 border rounded-xl px-4 py-3"
                        />

                    </div>

                    <button
                        onClick={saveProfile}
                        disabled={saving}
                        className="w-full bg-brand-blue text-white rounded-xl py-3 font-bold hover:opacity-90"
                    >

                        {saving ? "Saving..." : "Save Changes"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default AdminProfile;