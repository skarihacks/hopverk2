'use client';

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation/Navigation";
import NewQuestion from "@/components/NewQuestion/newquestion";
import { QuestionsApi } from "@/api";
import { Category } from "@/types";
import Footer from "@/components/Footer/footer";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const api = new QuestionsApi();
      const response = await api.getCategories();
      if (Array.isArray(response)) {
        setCategories(response);
      } else {
        console.error("Error fetching categories:", response);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="page">
      <Navigation />
      {categories.length > 0 ? (
        <NewQuestion categories={categories} />
      ) : (
        <p>Loading categories...</p>
      )}
      <Footer/>
    </div>
  );
}
