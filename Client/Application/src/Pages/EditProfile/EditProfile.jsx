import React, { Children, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { toast } from "react-toastify";
import { EditUser } from "../../../services/user";
function EditProfile() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthDay] = useState("");

 
  const onSave = async () => {
    try {

      const response = await EditUser(first_name, last_name, email, birthday, mobile)

      if (response['status'] == 'success') {
        toast.success("user updated")
      }
    }
    catch (ex) {
      console.log(`exception:`, ex)
    }
  }
  useEffect(() => {
    onSave()
  })

  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container mt-5">
        <h2 className="fw-bold mb-4">Edit Profile</h2>

        <div className="card shadow p-4">
          <form onSubmit={onSave}>


            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control"
                  placeholder="Enter First Name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Last Name</label>
                <input
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>


            <div className="mb-4">
              <label className="form-label fw-semibold">Email address</label>
              <input
                type="email"

                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Email"
              />
            </div>


            <div className="mb-4">
              <label className="form-label fw-semibold">Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="form-control"
                placeholder="Enter Mobile Number"
              />
            </div>


            <div className="mb-4">
              <label className="form-label fw-semibold">Date of Birth</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthDay(e.target.value)}
                className="form-control"
              />
            </div>


            <button onClick={onSave} className="btn btn-primary px-4" type="submit">
              Save Changes
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
