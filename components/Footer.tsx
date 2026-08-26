import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-beige2 text-brown mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-dark-brown">Place Finder</h2>
            <p className="mt-2 text-brown max-w-md">
              Discover the right places around you. Find restaurants, cafes, parks, and more.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-brown hover:text-dark-brown transition">Twitter</a>
              <a href="#" className="text-brown hover:text-dark-brown transition">Instagram</a>
              <a href="#" className="text-brown hover:text-dark-brown transition">Facebook</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark-brown uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-brown hover:text-dark-brown transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/result" className="text-brown hover:text-dark-brown transition">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-brown hover:text-dark-brown transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brown hover:text-dark-brown transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-dark-brown uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-brown hover:text-dark-brown transition">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-brown hover:text-dark-brown transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-brown hover:text-dark-brown transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-brown hover:text-dark-brown transition">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-dark-brown">
          <p className="text-sm text-brown text-center">
            &copy; {new Date().getFullYear()} Place Finder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
