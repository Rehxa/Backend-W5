/** @format */

import express from "express";
import * as data from "../models/data.js";

// Articles routes
//• GET /articles — Get all articles
export const getAllArticles = (req, res) => {
  res.json(data.articles);
};
//• GET /articles/:id — Get a single article by ID
export const getArticleById = (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = data.articles.find((f) => f.id === articleId);
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
};
//• POST /articles — Create a new article
export const createArticle = (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({
      error: "Title, content, journalistId and categoryId are required",
    });
  }
  const newArticle = {
    id: data.articles.length + 1,
    title,
    content,
    journalistId,
    categoryId,
  };
  data.articles.push(newArticle);
  res.status(201).json(newArticle);
};
//• PUT /articles/:id — Update an existing article
export const updateArticle = (req, res) => {
  const articleId = parseInt(req.params.id);
  const { title, content, journalistId, categoryId } = req.body;

  const article = data.articles.find((f) => f.id === articleId);
  if (!article) return res.status(404).json({ error: "Article not found" });

  if (title) article.title = title;
  if (content) article.content = content;
  if (journalistId) article.journalistId = journalistId;
  if (categoryId) article.categoryId = categoryId;

  res.json(article);
};
//• DELETE /articles/:id — Delete an article
export const deleteArticle = (req, res) => {
  const articleId = parseInt(req.params.id);
  const articleIndex = data.articles.findIndex((f) => f.id === articleId);
  if (articleIndex === -1)
    return res.status(404).json({ error: "Article not found" });

  data.articles.splice(articleIndex, 1);
  res.status(204).send("Article has been deleted");
};
//===================================================================
//Journalists routes
//• GET /journalists — Get all journalists
export const getAllJournalists = (req, res) => {
  res.json(data.journalists);
};
//• GET /journalists/:id — Get a single journalist by ID
export const getJournalistById = (req, res) => {
  const journalistId = parseInt(req.params.id);
  const journalist = data.journalists.find((f) => f.id === journalistId);
  if (!journalist)
    return res.status(404).json({ error: "Journalist not found" });
  res.json(journalist);
};
//• POST /journalists — Create a new journalist
export const createJournalist = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const newJournalist = {
    id: data.journalists.length + 1,
    name,
    email,
  };
  data.journalists.push(newJournalist);
  res.status(201).json(newJournalist);
};
//• PUT /journalists/:id — Update an existing journalist
export const updateJournalist = (req, res) => {
  const journalistId = parseInt(req.params.id);
  const { name, email } = req.body;

  const journalist = data.journalists.find((f) => f.id === journalistId);
  if (!journalist)
    return res.status(404).json({ error: "Journalist not found" });

  if (name) journalist.name = name;
  if (email) journalist.email = email;

  res.json(journalist);
};
//• DELETE /journalists/:id — Delete a journalist
export const deleteJournalist = (req, res) => {
  const journalistId = parseInt(req.params.id);
  const journalistIndex = data.journalists.findIndex(
    (f) => f.id === journalistId
  );
  if (journalistIndex === -1)
    return res.status(404).json({ error: "Journalist not found" });

  data.journalists.splice(journalistIndex, 1);
  res.status(204).send("Journalist has been deleted");
};
//• GET /journalists/:id/articles — Article by specific journalist
export const getArticlesByJournalist = (req, res) => {
  const journalistId = parseInt(req.params.id);
  const articlesByJournalist = data.articles.filter(
    (f) => f.journalistId === journalistId
  );
  if (articlesByJournalist.length === 0)
    return res
      .status(404)
      .json({ error: "No articles found for this journalist" });
  res.json(articlesByJournalist);
};
//====================================================================
// Categories routes
//• GET /categories — Get all categories
export const getAllCategories = (req, res) => {
  res.json(data.categories);
};
//• GET /categories/:id — Get a single category by ID
export const getCategoryById = (req, res) => {
  const categoriesId = parseInt(req.params.id);
  const categories = data.categories.find((f) => f.id === categoriesId);
  if (!categories) return res.status(404).json({ error: "Category not found" });
  res.json(categories);
};
//• POST /categories — Create a new category
export const createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newCategory = {
    id: data.categories.length + 1,
    name,
  };
  data.categories.push(newCategory);
  res.status(201).json(newCategory);
};
//• PUT /categories/:id — Update an existing category
export const updateCategory = (req, res) => {
  const categoriesId = parseInt(req.params.id);
  const { name } = req.body;
  const categories = data.categories.find((f) => f.id === categoriesId);
  if (!categories) return res.status(404).json({ error: "Category not found" });
  if (name) categories.name = name;
  res.json(categories);
};
//• DELETE /categories/:id — Delete a category
export const deleteCategory = (req, res) => {
  const categoriesId = parseInt(req.params.id);
  const categoriesIndex = data.categories.findIndex(
    (f) => f.id === categoriesId
  );
  if (categoriesIndex === -1)
    return res.status(404).json({ error: "Category not found" });
  data.categories.splice(categoriesIndex, 1);
  res.status(204).send("Category has been deleted");
};
//• GET /categories/:id/articles — Articles from a specific category
export const getArticlesByCategory = (req, res) => {
  const categoriesId = parseInt(req.params.id);
  const articlesByCategory = data.articles.filter(
    (f) => f.categoryId === categoriesId
  );
  if (articlesByCategory.length === 0)
    return res
      .status(404)
      .json({ error: "No articles found for this category" });
  res.json(articlesByCategory);
};
