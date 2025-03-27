"use client";

import React, { useState, useEffect } from "react";
import { QuestionsApi } from "@/api";
import { Category } from "@/types";

export default function CategoryManager() {
  const [action, setAction] = useState<string>("post");
  const [categoryName, setCategoryName] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");


  useEffect(() => {
    async function fetchCategories() {
      try {
        const api = new QuestionsApi();
        const response = await api.getCategories();

        if (response && Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (Array.isArray(response)) {
          setCategories(response);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
    setCategoryName("");
    setNewCategoryName("");
    setMessage("");
  };


  const handleSubmit = async () => {
    try {
      const api = new QuestionsApi();
      let response;

      if (action === "post") {
        response = await api.addCategory({ title: categoryName });
        console.log("Post Response:", response);
        setMessage(response ? "Category created successfully!" : "Error creating category");
      } else if (action === "update") {
        response = await api.updateCategory(selectedCategory, { title: newCategoryName });
        console.log("Update Response:", response);
        setMessage(response ? "Category updated successfully!" : "Error updating category");
      } else if (action === "delete") {
        response = await api.deleteCategory(selectedCategory);
        console.log("Delete Response:", response);
        setMessage(response ? "Category deleted successfully!" : "Error deleting category");
      }

      const updatedCategories = await api.getCategories();
      console.log("Updated Categories:", updatedCategories);

 
      if (updatedCategories && Array.isArray(updatedCategories.data)) {
        setCategories(updatedCategories.data);
      } else if (Array.isArray(updatedCategories)) {
        setCategories(updatedCategories);
      } else {
        console.error("Invalid response format:", updatedCategories);
      }
    } catch (error) {
      console.error("Error performing action:", error);
      setMessage("An error occurred while performing the action.");
    }
  };

  return (
    <div>
      <h2>Categories Skipanir</h2>

      <select value={action} onChange={handleActionChange}>
        <option value="post">Post</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>

      {action === "post" && (
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter new category name"
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      )}

      {action === "update" && (
        <div>
          <label>Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
          <label>Category name:</label>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter new name"
          />
          <button onClick={handleSubmit}>Update</button>
        </div>
      )}

      {action === "delete" && (
        <div>
          <label>Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
          <button onClick={handleSubmit}>Delete</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
