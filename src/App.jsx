import { useEffect, useState } from "react";

// Change this to your Render URL in production, e.g.:
// const API_BASE = "https://your-app.onrender.com";
const API_BASE = "https://fullstack-project2-snippet-api-2.onrender.com";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search/filter state
  const [languageFilter, setLanguageFilter] = useState("");
  const [limit, setLimit] = useState(10);

  // New snippet form state
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    code: "",
    description: "",
    tags: "",
  });

  // Load data on first render
  useEffect(() => {
    fetchSnippets();
  }, []);

  async function fetchSnippets(params = {}) {
    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams();

      if (params.lang) query.set("lang", params.lang);
      if (params.limit) query.set("limit", params.limit);

      const url = `${API_BASE}/api/snippets${query.toString() ? `?${query.toString()}` : ""}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error fetching snippets: ${res.status}`);
      }
      const data = await res.json();
      setSnippets(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    fetchSnippets({
      lang: languageFilter || undefined,
      limit: limit || undefined,
    });
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleCreateSnippet(e) {
    e.preventDefault();
    setError("");

    // Build tags array from comma-separated input
    const tagsArray = formData.tags
      ? formData.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const payload = {
      title: formData.title,
      language: formData.language,
      code: formData.code,
      description: formData.description || undefined,
      tags: tagsArray,
    };

    try {
      const res = await fetch(`${API_BASE}/api/snippets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Error creating snippet: ${res.status}`);
      }

      const created = await res.json();

      // Add new snippet to top of list
      setSnippets(prev => [created, ...prev]);

      // Reset form
      setFormData({
        title: "",
        language: "",
        code: "",
        description: "",
        tags: "",
      });
    } catch (err) {
      setError(err.message || "Error creating snippet");
    }
  }

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-1">Snippet Library</h1>
        <p className="text-muted mb-0">
          A MERN-style app to store and search your code snippets.
        </p>
      </header>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Search / Filter section */}
      <section className="mb-4">
        <h2 className="h4">Search & Filter</h2>
        <form className="row g-3 align-items-end" onSubmit={handleFilterSubmit}>
          <div className="col-md-4">
            <label className="form-label">Language (e.g., javascript)</label>
            <input
              type="text"
              className="form-control"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              placeholder="javascript"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Limit</label>
            <input
              type="number"
              className="form-control"
              value={limit}
              min={1}
              onChange={(e) => setLimit(Number(e.target.value))}
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              Apply Filters
            </button>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => {
                setLanguageFilter("");
                setLimit(10);
                fetchSnippets();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {/* New Snippet Form */}
      <section className="mb-5">
        <h2 className="h4">Create New Snippet</h2>
        <form className="row g-3" onSubmit={handleCreateSnippet}>
          <div className="col-md-6">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Language *</label>
            <input
              type="text"
              className="form-control"
              name="language"
              value={formData.language}
              onChange={handleFormChange}
              placeholder="javascript"
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Code *</label>
            <textarea
              className="form-control"
              name="code"
              value={formData.code}
              onChange={handleFormChange}
              rows={4}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description (optional)</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={2}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              name="tags"
              value={formData.tags}
              onChange={handleFormChange}
              placeholder="web, db, utils"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success">
              Save Snippet
            </button>
          </div>
        </form>
      </section>

      {/* Snippets List */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Snippets</h2>
          {loading && <span className="text-muted">Loading…</span>}
        </div>

        {snippets.length === 0 && !loading && (
          <p className="text-muted">No snippets found. Try creating one!</p>
        )}

        <div className="row g-3">
          {snippets.map((snippet) => (
            <div className="col-md-6" key={snippet._id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{snippet.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {snippet.language}
                  </h6>
                  {snippet.description && (
                    <p className="card-text">{snippet.description}</p>
                  )}
                  <pre className="bg-light p-2 rounded small flex-grow-1">
                    <code>{snippet.code}</code>
                  </pre>
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {snippet.tags &&
                      snippet.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="badge bg-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <small className="text-muted mt-2">
                    Created:{" "}
                    {snippet.created_at
                      ? new Date(snippet.created_at).toLocaleString()
                      : "Unknown"}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
