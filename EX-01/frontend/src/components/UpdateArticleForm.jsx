/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "./api";

export default function UpdateArticleForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryId: "",
  });
  // Fetch to prefill a form and update an existing article
  const fetchArticle = async (id) => {
    api
      .get(`/articles/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error fetching article:", err));
  };

  useEffect(() => {
    fetchArticle(id);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
      const res = await api.put(`/articles/${id}`, form);
      console.log("Article updated successfully:", res.data);
      setForm({ title: "", content: "", journalistId: "", categoryId: "" });
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input
        name='title'
        value={form.title}
        onChange={handleChange}
        placeholder='Title'
        required
      />
      <br />
      <textarea
        name='content'
        value={form.content}
        onChange={handleChange}
        placeholder='Content'
        required
      />
      <br />
      <input
        name='journalistId'
        value={form.journalistId}
        onChange={handleChange}
        placeholder='Journalist ID'
        required
      />
      <br />
      <input
        name='categoryId'
        value={form.categoryId}
        onChange={handleChange}
        placeholder='Category ID'
        required
      />
      <br />
      <button type='submit'>Update</button>
    </form>
  );
}
