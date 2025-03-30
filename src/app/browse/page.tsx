'use client';

import { useEffect, useState } from 'react';
import AddCategory from '@/components/AddCategory/AddCategory';
import AddTag from '@/components/AddTag/AddTag';
import CategoryList from '@/components/Categories/Categories';
import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';
import TagList from '@/components/TagList/TagList';

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setIsAdmin(user.admin === true);
      } catch {
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <div className="page">
      <Navigation />
      <CategoryList />
      {isAdmin && <AddCategory />}
      <TagList />
      {isAdmin && <AddTag />}
      <Footer />
    </div>
  );
}


