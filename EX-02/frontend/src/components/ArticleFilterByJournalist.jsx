/** @format */

import { useEffect, useState } from "react";
import { api } from "./api";

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState("");

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const response = await api.get("/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await api.get("/journalists");
      setJournalists(res.data);
    } catch (error) {
      console.error("Error fetching journalists:", error);
    }
  };

  const applyFilters = async (journalId = null) => {
    try {
      if (journalId) {
        const res = await api.get(`/journalists/${journalId}/articles`);
        console.log("Filtered Articles:", res.data);
        setArticles(res.data);
      } else {
        fetchArticles();
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };
  const resetFilters = () => {
    fetchArticles();
    setSelectedJournalist("");
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor='journalistFilter'>Filter by Journalist:</label>
        <select
          id='journalistFilter'
          value={selectedJournalist}
          onChange={(e) => setSelectedJournalist(e.target.value)}>
          <option value=''>All Journalists</option>
          {/* Options for journalists */}
          {journalists.map((journal) => (
            <option key={journal.id} value={journal.id}>
              {journal.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            applyFilters(selectedJournalist);
            console.log("Selected Journalist:", selectedJournalist);
          }}>
          Apply Filters
        </button>
        <button
          onClick={() => {
            // Logic to reset filters
            resetFilters();
          }}>
          Reset Filters
        </button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
