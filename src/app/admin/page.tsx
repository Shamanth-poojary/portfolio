"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-surface-1 py-24 px-8 flex justify-center text-text-main">
      <div className="max-w-5xl w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-10">
          <h1 className="text-3xl font-display font-extrabold tracking-tight">
            Admin <span className="text-brand">Dashboard</span>
          </h1>
          <Link 
            href="/admin/add-project" 
            className="px-6 py-2 bg-brand hover:bg-brand-light text-white rounded-full font-bold tracking-wide transition-colors"
          >
            + Add New
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">Loading Database...</div>
        ) : projects.length === 0 ? (
          <div className="text-center p-12 text-text-muted bg-black/20 rounded-2xl border border-white/5">
            No projects found in database. Start adding some!
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 bg-black/20 border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center gap-4">
                  {project.imageBase64 ? (
                     <img src={project.imageBase64} className="w-16 h-12 object-cover rounded-md" alt={project.name} />
                  ) : (
                     <div className="w-16 h-12 bg-white/5 rounded-md flex items-center justify-center text-xs text-text-muted">No Img</div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <div className="text-xs text-text-muted">{project.year} • {project.tags.join(", ")}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link 
                    href={`/admin/edit-project/${project._id}`}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm border border-white/10 transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-sm border border-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
