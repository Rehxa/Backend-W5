/** @format */

import express from "express";
import * as userControl from "../controllers/userControllers.js";
const router = express.Router();

// Articles routes
//• GET /articles — Get all articles
router.get("/articles", userControl.getAllArticles);
//• GET /articles/:id — Get a single article by ID
router.get("/articles/:id", userControl.getArticleById);
//• POST /articles — Create a new article
router.post("/articles", userControl.createArticle);
//• PUT /articles/:id — Update an existing article
router.put("/articles/:id", userControl.updateArticle);
//• DELETE /articles/:id — Delete an article
router.delete("/articles/:id", userControl.deleteArticle);
//===================================================================
//Journalists routes
//• GET /journalists — Get all journalists
router.get("/journalists", userControl.getAllJournalists);
//• GET /journalists/:id — Get a single journalist by ID
router.get("/journalists/:id", userControl.getJournalistById);
//• POST /journalists — Create a new journalist
router.post("/journalists", userControl.createJournalist);
//• PUT /journalists/:id — Update an existing journalist
router.put("/journalists/:id", userControl.updateJournalist);
//• DELETE /journalists/:id — Delete a journalist
router.delete("/journalists/:id", userControl.deleteJournalist);
//• GET /journalists/:id/articles — Article by specific journalist
router.get("/journalists/:id/articles", userControl.getArticlesByJournalist);
//====================================================================
// Categories routes
//• GET /categories — Get all categories
router.get("/categories", userControl.getAllCategories);
//• GET /categories/:id — Get a single category by ID
router.get("/categories/:id", userControl.getCategoryById);
//• POST /categories — Create a new category
router.post("/categories", userControl.createCategory);
//• PUT /categories/:id — Update an existing category
router.put("/categories/:id", userControl.updateCategory);
//• DELETE /categories/:id — Delete a category
router.delete("/categories/:id", userControl.deleteCategory);
//• GET /categories/:id/articles — Articles from a specific category
router.get("/categories/:id/articles", userControl.getArticlesByCategory);

export default router;
