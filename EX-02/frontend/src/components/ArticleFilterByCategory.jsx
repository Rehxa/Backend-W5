/** @format */

import { useEffect, useState } from "react";
import { api } from "./api";

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
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

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const applyFilters = async (catId = null) => {
    try {
      if (catId) {
        const res = await api.get(`/categories/${catId}/articles`);
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
    setSelectedCategory("");
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
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
            applyFilters(selectedCategory);
            console.log("Filters applied for category:", selectedCategory);
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
