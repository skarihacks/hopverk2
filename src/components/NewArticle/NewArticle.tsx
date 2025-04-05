"use client";

import { useEffect, useState } from "react";
import { QuestionsApi } from "@/api";
import { Category } from "@/types";
import styles from "./NewArticle.module.css";

export default function NewArticleForm() {
  const [articlename, setArticlename] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState("");

  const api = new QuestionsApi();

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.getCategories();
      if (response) {
        setCategories(response); // ✅ Just use response directly
      }
    }

    fetchCategories();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to post an article.");
      return;
    }

    const formData = new FormData();
    formData.append("articlename", articlename);
    formData.append("content", content);
    if (category) formData.append("categoryId", category); // 👈 This is the line
    if (image) formData.append("image", image);

    try {
      const res = await fetch("https://h1-1lck.onrender.com/articles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("Article created!");
        setArticlename("");
        setContent("");
        setCategory("");
        setImage(null);
      }
    } catch (error) {
      console.error("Failed to submit article", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Write a New Article</h2>

      {message && <p>{message}</p>}

      <label>
        Title:
        <input
          type="text"
          value={articlename}
          onChange={(e) => setArticlename(e.target.value)}
          required
        />
      </label>

      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Image (optional):
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </label>
      <script>console.log(&apos;Selected category:&apos;, category)</script>

      <button type="submit">Post Article</button>
    </form>
  );
}
