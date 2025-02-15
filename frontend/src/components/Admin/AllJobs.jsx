import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      });
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/job/delete/${id}`, {
        withCredentials: true,
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="admin-jobs page">
      <div className="container">
        <h1>Manage Jobs</h1>
        <Link to="/admin/add-job" className="add-btn">Add New Job</Link>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.country}</td>
                <td>
                  <Link to={`/admin/edit-job/${job._id}`} className="edit-btn">Edit</Link>
                  <button onClick={() => deleteJob(job._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllJobs;
