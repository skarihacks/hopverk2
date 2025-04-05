import { Category, Article, User, Comment, Tag, CommentPayload, CategoryPayload, QuestionPayload } from './types';
const BASE_URL = 'https://h1-1lck.onrender.com';

// Define a type for the possible payloads
type Payload = CategoryPayload | QuestionPayload | CommentPayload | { name: string } | { content: string };

export class QuestionsApi {
  async fetchFromApi<T>(url: string, method: string = 'GET', payload?: Payload): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });
    } catch (e) {
      console.error(`Error fetching from API (${method} ${url})`, e);
      return null;
    }

    if (!response.ok) {
      console.error(`API responded with status ${response.status} for ${url}`);
      return null;
    }

    try {
      return await response.json();
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      return null;
    }
  }

  async getCategories(): Promise<Category[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/categories`);
  }

  async addCategory(payload: CategoryPayload): Promise<Category | null> {
    return await this.fetchFromApi(`${BASE_URL}/categories`, 'POST', payload);
  }

  async updateCategory(id: number, payload: CategoryPayload): Promise<Category | null> {
    return await this.fetchFromApi(`${BASE_URL}/categories/${id}`, 'PATCH', payload);
  }

  async deleteCategory(id: number): Promise<boolean> {
    return await this.fetchFromApi(`${BASE_URL}/categories/${id}`, 'DELETE') !== null;
  }

  async getTags(): Promise<Tag[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/tags`);
  }

  async getArticlesByTag(tagName: string): Promise<Article[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/tags/${tagName}/articles`);
  }

  async addTag(name: string): Promise<Tag | null> {
    return await this.fetchFromApi(`${BASE_URL}/tags`, 'POST', { name });
  }

  async getArticles(): Promise<Article[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/articles`);
  }

  async getArticleById(articleId: number): Promise<Article | null> {
    return await this.fetchFromApi(`${BASE_URL}/articles/${articleId}`);
  }
  async getArticleByCategory(categoryId: number): Promise<Article[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/categories/${categoryId}/articles`);
  }

  async addArticle(payload: QuestionPayload): Promise<Article | null> {
    return await this.fetchFromApi(`${BASE_URL}/articles`, 'POST', payload);
  }

  async updateArticle(articleId: number, payload: QuestionPayload): Promise<Article | null> {
    return await this.fetchFromApi(`${BASE_URL}/articles/${articleId}`, 'PATCH', payload);
  }

  async deleteArticle(articleId: number): Promise<boolean> {
    return await this.fetchFromApi(`${BASE_URL}/articles/${articleId}`, 'DELETE') !== null;
  }

  async getComments(articleId: number): Promise<Comment[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/comments/${articleId}`);
  }

  async addComment(payload: CommentPayload): Promise<Comment | null> {
    return await this.fetchFromApi(`${BASE_URL}/comments`, 'POST', payload);
  }

  async deleteComment(commentId: number): Promise<boolean> {
    return await this.fetchFromApi(`${BASE_URL}/comments/${commentId}`, 'DELETE') !== null;
  }

  async getUserById(userId: number): Promise<User | null> {
    return await this.fetchFromApi(`${BASE_URL}/users/${userId}`);
  }

  async getUserArticles(userId: number): Promise<Article[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/users/${userId}/articles`);
  }
  
  async getUserComments(userId: number): Promise<Comment[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/comments/users/${userId}/comments`);
  }

  async getAllUsers(): Promise<User[] | null> {
    return await this.fetchFromApi(`${BASE_URL}/users`);
  }

  async updateUser(userId: number, payload: QuestionPayload): Promise<User | null> {
    return await this.fetchFromApi(`${BASE_URL}/users/${userId}`, 'PATCH', payload);
  }

  async deleteUser(userId: number): Promise<boolean> {
    return await this.fetchFromApi(`${BASE_URL}/users/${userId}`, 'DELETE') !== null;
  }
}
