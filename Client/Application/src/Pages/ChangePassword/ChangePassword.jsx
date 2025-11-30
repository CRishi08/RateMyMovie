import React, { useState } from "react";
import { toast } from "react-toastify";
import './ChangePassword.css'
import Navbar from "../../Components/Navbar/Navbar";
import { ChangePasswords } from "../../../services/user";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const ChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("New password and Confirm password do not match!");
      }
      else {
        const response = await ChangePasswords(currentPassword, newPassword)
        if (response['status'] == 'success') {
          toast.success("password Updated")
        }
        else {
          toast.error("error")
        }
      }


    }
    catch (ex) {
      console.log(`exception:`, ex)
    }
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container mt-5">
        <h2 className="fw-bold mb-4">Change Password</h2>

        <div className="card shadow p-4 col-md-8 col-lg-6 mx-auto">
          <form>

            <div className="mb-4">
              <label className="form-label fw-semibold">Current Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>


            <div className="mb-4">
              <label className="form-label fw-semibold">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>


            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button onClick={ChangePassword} className="btn btn-primary w-auto px-4">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
