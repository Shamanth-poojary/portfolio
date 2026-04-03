"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    tags: "",
    year: "",
    bgGradient: "linear-gradient(135deg,#1a0d04 0%,#2d1508 50%,#1a0d04 100%)",
    live: "",
    github: "",
  });
  const [imageBase64, setImageBase64] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB to keep Mongo footprint small
        alert("Image should be smaller than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        imageBase64,
        links: { live: formData.live, github: formData.github },
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Project Added Successfully!");
        router.push("/");
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-1 py-24 px-8 flex justify-center text-text-main">
      <div className="max-w-2xl w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <h1 className="text-3xl font-display font-extrabold tracking-tight mb-8">
          Add New <span className="text-brand">Project</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-text-muted font-medium">Project Name</label>
            <input 
              required
              type="text" 
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Pulse Dashboard"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-text-muted font-medium">Description</label>
            <textarea 
              required
              rows={4}
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-colors"
              value={formData.desc}
              onChange={(e) => setFormData({...formData, desc: e.target.value})}
              placeholder="A brief overview of the project..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-text-muted font-medium">Tags (comma separated)</label>
            <input 
              type="text" 
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-colors"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="React, Next.js, MongoDB"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted font-medium">Year</label>
              <input 
                type="text" 
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-colors"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                placeholder="2024"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted font-medium">CSS Gradient Overlay</label>
              <input 
                type="text" 
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-colors"
                value={formData.bgGradient}
                onChange={(e) => setFormData({...formData, bgGradient: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-text-muted font-medium">Project Preview Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-text-muted file:bg-white/10 file:border-0 file:py-2 file:px-4 file:rounded-full file:text-white file:mr-4 file:cursor-pointer hover:file:bg-white/20 transition-all cursor-pointer bg-black/20 border border-white/10 rounded-xl px-4 py-2"
            />
            {imageBase64 && (
              <div className="mt-3 w-40 h-24 relative overflow-hidden rounded-lg border border-white/20">
                <img src={imageBase64} alt="Preview" className="object-cover w-full h-full" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted font-medium">Live URL (Optional)</label>
              <input 
                type="url" 
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-colors"
                value={formData.live}
                onChange={(e) => setFormData({...formData, live: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted font-medium">GitHub URL (Optional)</label>
              <input 
                type="url" 
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-colors"
                value={formData.github}
                onChange={(e) => setFormData({...formData, github: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-6 w-full py-4 bg-brand hover:bg-brand-light text-white rounded-xl font-bold tracking-wide transition-colors disabled:opacity-50"
          >
            {loading ? "Saving Project..." : "Save Database Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
