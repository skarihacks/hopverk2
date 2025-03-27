import { Category, Paginated, Question, CategoryPayload, QuestionPayload } from './types';

const BASE_URL = 'https://vef2-2025-v3-hayb.onrender.com';

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }

    if (!response.ok) {
      console.error('non 2xx status from API', url);
      return null;
    }

    if (response.status === 404) {
      console.error('404 from API', url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('error parsing json', url, e);
      return null;
    }

    return json as T;
  }

  
  async getCategory(slug: string): Promise<Category | null> {
    const url = `${BASE_URL}/categories/${slug}`;
    return await this.fetchFromApi<Category>(url);
  }


  async getCategories(): Promise<Paginated<Category> | null> {
    const url = `${BASE_URL}/categories`;
    return await this.fetchFromApi<Paginated<Category>>(url);
  }


  async getQuestions(categorySlug: string): Promise<Paginated<Question> | null> {
    const url = `${BASE_URL}/questions?category=${categorySlug}`;
    return await this.fetchFromApi<Paginated<Question>>(url);
  }

  async getAllQuestions(): Promise<Question[] | null> {
    try {
      const response = await fetch(`${BASE_URL}/questions`);
      if (!response.ok) {
        throw new Error(`Failed to fetch all questions: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all questions:', error);
      return null;
    }
  }


  async addQuestion(payload: QuestionPayload): Promise<Question | null> {
    try {
      const response = await fetch(`${BASE_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to add question');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding question:', error);
      return null;
    }
  }


  async addCategory(payload: CategoryPayload): Promise<Category | null> {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to add Category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding Category:', error);
      return null;
    }
  }


  async deleteCategory(slug: string): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/categories/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Delete Category Response Status:", response.status);
      console.log("Delete Category Response Status Text:", response.statusText);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Delete Category Error Data:", errorData);
        throw new Error(`Failed to delete category: ${errorData || response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }


  async updateCategory(slug: string, payload: CategoryPayload): Promise<Category | null> {
    try {
      const response = await fetch(`${BASE_URL}/categories/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      return null;
    }
  }


  async updateQuestion(id: number, payload: QuestionPayload): Promise<Question | null> {
    try {
      const response = await fetch(`${BASE_URL}/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update question: ${errorData.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating question:', error);
      return null;
    }
  }
}
