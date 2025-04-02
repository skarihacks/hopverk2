"use client";

import { QuestionsApi } from "@/api";
import Link from "next/link";
import { Article, Comment, UiState, User } from "@/types";
import { JSX, useEffect, useState } from "react";
import MakeComment from "@/components/MakeComment/MakeComment";
import AddTagToArticle from "../AddTag/AddTagToArticle";
import ArticleTags from "../AddTag/ArticleTags";
import styles from "./Article.module.css";

export function ArticleView({ id }: { id: number }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState("loading");
      const api = new QuestionsApi();

      const response = await api.getArticleById(id);
      if (!response) {
        setUiState("error");
        return;
      }
      setArticle(response);
      setUiState("data");

      const commentsResponse = await api.getComments(id);
      if (commentsResponse) {
        setComments(commentsResponse);
      }

      const userJson = localStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    }

    fetchData();
  }, [id]);

  async function handleDeleteArticle() {
    const confirmed = confirm("Are you sure you want to delete this article?");
    if (!confirmed) return;

    const res = await fetch(`https://h1-1lck.onrender.com/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await res.json();
    if (res.ok) {
      alert("Article deleted");
      window.location.href = "/articles";
    } else {
      alert(result.error || "Failed to delete article");
    }
  }

  async function handleDeleteComment(commentId: number) {
    const confirmed = confirm("Delete this comment?");
    if (!confirmed) return;

    const res = await fetch(
      `https://h1-1lck.onrender.com/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const result = await res.json();
    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } else {
      alert(result.error || "Failed to delete comment");
    }
  }

  if (uiState === "loading") return <p>Loading article...</p>;
  if (uiState === "error") return <p>Could not load the article.</p>;
  if (!article) return <p>No article found.</p>;

  return (
    <div>
      <h1>{article.articlename}</h1>
      <h2>
        Posted by{" "}
        <Link href={`/users/${article.userId}`}>{article.user?.username}</Link>
      </h2>
      <ArticleTags tags={article.tags.map((t) => t.tag)} />
      {article.img && (
        <img
          style={{ marginBottom: "1rem" }}
          src={article.img}
          alt={article.articlename}
        />
      )}
      <p style={{ marginBottom: "1rem" }}>{article.content}</p>
      {(user?.id === article.userId || user?.admin) && (
        <AddTagToArticle articleId={article.id} />
      )}

      <div className={styles.labelRow}>
        {(user?.id === article.userId || user?.admin) && (
          <Link href={`/articles/${article.id}/edit`}>
            <button>Edit post</button>
          </Link>
        )}
        {(user?.id === article.userId || user?.admin) && (
          <button onClick={handleDeleteArticle}>Delete Article</button>
        )}
      </div>
      <h3 style={{ marginBottom: "1rem" }}>Comments:</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li className={styles.li} key={comment.id}>
              <small className={styles.small}>
                <Link href={`/users/${comment.userId}`}>
                  {comment.userId ? comment.user?.username : "Anonymous"}
                </Link>
              </small>
              <div className={styles.insideComment}>
                <p>{comment.content}</p>
                {(user?.admin || user?.id === comment.userId) && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginBottom: "1rem" }}>No comments yet.</p>
      )}

      {user && (
        <MakeComment
          articleId={id}
          onCommentPosted={async () => {
            const api = new QuestionsApi();
            const updated = await api.getComments(id);
            if (updated) setComments(updated);
          }}
        />
      )}
    </div>
  );
}
