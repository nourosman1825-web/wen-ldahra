// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../../components/contact_form"; 


export const metadata: Metadata = {
  title: "About — WEN EL DAHRA",
  description: "AI-powered matchmaking for architectural gems and experiences.",
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-6 sm:py-10 md:py-14 flex flex-col min-h-screen">
      
      <section className="flex-1 flex flex-col justify-center py-4 md:py-8">
        
        <span className="inline-block bg-brown/10 text-dark-brown text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5 self-start">
          AI-Powered Matchmaking
        </span>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-start">

          <div className="flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-text">
              Find Your <br />
              <span className="text-brown">Next Experience</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-dark-brown max-w-xl leading-relaxed mt-3 sm:mt-4">
              Welcome to WEN EL DAHRA. We have designed a highly-refined digital
              companion that maps your mood to the city's finest pockets. Through
              elegant AI integration, we curate sunlit rooftops, historic cafes, and
              underground culinary secrets specifically tailored to your sensory
              profile.
            </p>

            {/* Contact Button */}
            <Link href="/contact">
              <button className="mt-4 bg-brown hover:bg-dark-brown text-white font-medium py-2.5 px-6 rounded-xl transition shadow-sm active:scale-95 text-sm">
                Get In Touch
              </button>
            </Link>
          </div>

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

        <div className="mt-8 sm:mt-10 md:mt-12"></div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text">
          WEN <span className="text-brown">EL DAHRA</span>
        </h2>
        <p className="text-sm sm:text-base text-dark-brown max-w-xl mt-1 leading-relaxed">
          An elegant AI-powered matching system crafted to align your mood
          with beautiful architectural gems and experiences.
        </p>
      </section>

     
    </main>
  );
}