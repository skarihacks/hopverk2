"use client";

import { useState } from "react";
import styles from "./AddCategory.module.css";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in as admin to create a category.");
      return;
    }

    try {
      const res = await fetch("https://h1-1lck.onrender.com/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("Category created!");
        setName("");
        setDescription("");
        window.location.reload();
      }
    } catch (err) {
      setMessage("Failed to create category.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add New Category</h3>
      {message && <p>{message}</p>}

      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Description:
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <button type="submit">Create Category</button>
    </form>
  );
}
