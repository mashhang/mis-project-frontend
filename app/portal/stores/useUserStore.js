import { create } from "zustand";
import api from "../lib/axios";

let initialUser = null;
if (typeof window !== "undefined") {
  const s = localStorage.getItem("student");
  initialUser = s ? JSON.parse(s) : null;
}

export const useUserStore = create((set) => ({
  user: initialUser,

  login: async (email, password) => {
    const { data } = await api.post("/login_student.php", { email, password });
    localStorage.setItem("student", JSON.stringify(data));
    localStorage.setItem("student_id", data.id);
    set({ user: data });
    return data;
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("student");
    localStorage.removeItem("student_id");
  },
}));
