"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. استيراد الموجه في Next.js

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // 2. تفعيل الـ router

  function handleSearch(e: React.FormEvent) {
    e.preventDefault(); // نمنع إعادة تحميل الصفحة الطبيعية

    // 1. إذا كان الحقل فارغاً، نظهر الخطأ ونوقف التنفيذ ولا ننتقل لأي مكان
    if (search.trim() === "") {
      setError("Please enter what you're looking for");
      return;
    }

    // إزالة رسالة الخطأ إذا كان مدخلاً صحيحاً
    setError("");

    // 2. إذا كتب شيئاً، ننقله إلى صفحة النتائج ونمرر كلمة البحث مع الرابط
    router.push(`/results?query=${encodeURIComponent(search)}`);
  }

  return (
    <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
      <input
        type="text"
        placeholder="What are you looking for?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">Search</button>

      {/* رسالة الخطأ تظهر فقط إذا كان الحقل فارغاً وبقيتِ في نفس الصفحة */}
      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
    </form>
  );
}