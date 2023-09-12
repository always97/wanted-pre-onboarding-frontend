import axios from "axios";

const api_url = "https://www.pre-onboarding-selection-task.shop/";

const wantedAxios = axios.create({
  baseURL: api_url,
});

export const signUpAPI = async (email, password) => {
  return await wantedAxios({
    url: "/auth/signup",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
    },
  });
};
export const signInAPI = async (email, password) => {
  return await wantedAxios({
    url: "/auth/signin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
    },
  });
};

export const getTodosAPI = async (access_token) => {
  return await wantedAxios({
    url: "/todos",
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const addTodoAPI = async (access_token, todoText) => {
  return await wantedAxios({
    url: "/todos",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    data: { todo: todoText },
  });
};

export const updateTodoAPI = async (
  access_token,
  id,
  todoText,
  isCompleted
) => {
  return await wantedAxios({
    url: `/todos/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    data: {
      todo: todoText,
      isCompleted,
    },
  });
};
export const deleteTodoAPI = async (access_token, id) => {
  return await wantedAxios({
    url: `/todos/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
