"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

export default function ComponentName() {
  const router = useRouter();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);

    try {
      const res = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: studentId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 text-gray-500 hover:underline text-sm"
      >
        ← Back to Main ERP Page
      </button>

      <section className="flex flex-col max-w-[265px] h-screen items-center justify-center mx-auto my-auto">
        <h1 className="text-center font-semibold text-[24px]">SIGN IN</h1>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleLogin(); // Trigger login
          }}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Username"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border-black border-[1px] rounded-xl text-[18px] py-2 px-2 mt-8 mb-2 shadow-sm hover:shadow-lg transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-black border-[1px] rounded-xl text-[18px] py-2 px-2 mb-4 shadow-sm hover:shadow-lg transition duration-300"
          />

          <button
            className="py-[10px] w-full bg-[#30608E] text-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-lg transition duration-300"
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <CgSpinner className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>
      </section>
    </>
  );
}
