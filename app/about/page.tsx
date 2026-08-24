// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — WEN EL DAHRA",
  description: "AI-powered matchmaking for architectural gems and experiences.",
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-6 sm:py-10 md:py-14 flex flex-col min-h-screen">
      
      <section className="flex-1 flex flex-col justify-center py-4 md:py-8">
        
        {/* شارة AI-Powered Matchmaking */}
        <span className="inline-block bg-brown/10 text-dark-brown text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5 self-start">
          AI-Powered Matchmaking
        </span>

        {/* الصف المرن: النص + الصورة */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-start">
          
          {/* العمود الأيسر: النصوص */}
          <div className="flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-text">
              Find Your <br />
              <span className="text-brown">Next Experience</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-dark-brown max-w-xl leading-relaxed mt-3 sm:mt-4">
              Welcome to WEN EL DAHRA. We have designed a highly-refined digital
              companion that maps your mood to the city’s finest pockets. Through
              elegant AI integration, we curate sunlit rooftops, historic cafes, and
              underground culinary secrets specifically tailored to your sensory
              profile.
            </p>
          </div>

          {/* العمود الأيمن: الصورة (مستجيبة) */}
          <div className="relative w-full md:w-64 lg:w-80 xl:w-96 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-2xl overflow-hidden shadow-md border border-brown/10 flex-shrink-0 bg-beige">
            <Image
              src="/photos/aboutus.jpeg"
              alt="WEN EL DAHRA - Architectural beauty"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* مسافة بين القسمين (بدلاً من <br/>) */}
        <div className="mt-8 sm:mt-10 md:mt-12"></div>

        {/* عنوان WEN EL DAHRA والوصف */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text">
          WEN <span className="text-brown">EL DAHRA</span>
        </h2>
        <p className="text-sm sm:text-base text-dark-brown max-w-xl mt-1 leading-relaxed">
          An elegant AI-powered matching system crafted to align your mood
          with beautiful architectural gems and experiences.
        </p>
      </section>

      {/* ============================================= */}
      {/* 🔹 الفوتر (التذييل) بخلفية بنية غامقة */}
      {/* ============================================= */}
      <footer className="mt-8 -mx-5 sm:-mx-8 md:-mx-10 px-5 sm:px-8 md:px-10 py-8 bg-dark-brown rounded-2xl">
        
        {/* روابط التذييل (ثلاثة أعمدة) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-beige/80 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-beige/70">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Explore</a></li>
              <li><a href="#" className="hover:text-white transition">Categories</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-beige/80 mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-beige/70">
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-beige/80 mb-3">
              Connect With Us
            </h4>
            <div className="flex gap-4 text-sm text-beige/70">
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">Facebook</a>
            </div>
          </div>
        </div>

        {/* الفاصل */}
        <div className="border-t border-beige/20 my-6"></div>

        {/* الشريط السفلي */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-beige/60">
          <span>&copy; 2026 WEN EL DAHRA. All rights reserved.</span>
          <div className="flex gap-3">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span className="text-beige/30">|</span>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}