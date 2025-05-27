/** @format */

import { useEffect, useState } from "react";
import { api } from "./api";

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await api.get("/articles");
      setArticles(res.data);
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

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const applyFilters = async () => {
    try {
      const res = await api.get(
        `/article?categoryId=${selectedCategory}&journalistId=${selectedJournalist}`
      );
      console.log("Filtered Articles:", res.data);
      setArticles(res.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };
  const resetFilters = () => {
    fetchArticles();
    setSelectedJournalist("");
    setSelectedCategory("");
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

        <label htmlFor='categoryFilter'>Filter by Category:</label>
        <select
          id='categoryFilter'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value=''>All Categories</option>
          {/* Options for categories */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            applyFilters();
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
