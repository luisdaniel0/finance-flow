import type { Transaction, Budget } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL as string;

// ─── Token helpers ────────────────────────────────────────────────────────────

export const getToken = (): string | null => localStorage.getItem("token");

export const saveToken = (token: string): void =>
  localStorage.setItem("token", token);

export const clearToken = (): void => localStorage.removeItem("token");

const authHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Centralized response handler — redirects to /login on 401
const handleResponse = async (response: Response): Promise<Response> => {
  if (response.status === 401) {
    clearToken();
    window.location.href = "/login";
    throw new Error("Session expired");
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail ?? "Request failed");
  }
  return response;
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const login = async (
  username: string,
  password: string,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // backend User model requires email even for login — send empty string
    body: JSON.stringify({ username, password, email: "" }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Login failed");
  }

  const token: string = await response.json();
  saveToken(token);
};

export const signup = async (
  username: string,
  password: string,
  email: string,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/users/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Signup failed");
  }
};

// ─── Transactions ─────────────────────────────────────────────────────────────

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await handleResponse(
    await fetch(`${BASE_URL}/transactions/`, { headers: authHeaders() }),
  );
  return response.json();
};

export const createTransaction = async (
  transaction: Omit<Transaction, "id">,
): Promise<Transaction> => {
  const response = await handleResponse(
    await fetch(`${BASE_URL}/transactions/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(transaction),
    }),
  );
  return response.json();
};

export const updateTransaction = async (
  id: number,
  transaction: Omit<Transaction, "id">,
): Promise<Transaction> => {
  const response = await handleResponse(
    await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(transaction),
    }),
  );
  return response.json();
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await handleResponse(
    await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }),
  );
};

// ─── Budgets ──────────────────────────────────────────────────────────────────

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await handleResponse(
    await fetch(`${BASE_URL}/budgets/`, { headers: authHeaders() }),
  );
  return response.json();
};

export const createBudget = async (
  budget: Omit<Budget, "id">,
): Promise<Budget> => {
  const response = await handleResponse(
    await fetch(`${BASE_URL}/budgets/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(budget),
    }),
  );
  return response.json();
};

export const updateBudget = async (
  id: number,
  budget: Omit<Budget, "id">,
): Promise<Budget> => {
  const response = await handleResponse(
    await fetch(`${BASE_URL}/budgets/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(budget),
    }),
  );
  return response.json();
};

export const deleteBudget = async (id: number): Promise<void> => {
  await handleResponse(
    await fetch(`${BASE_URL}/budgets/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }),
  );
};
