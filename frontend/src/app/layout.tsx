import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trademark Registration System',
  description: 'A comprehensive platform for trademark registration and management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">Trademark System</div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-gray-300">Home</a></li>
                <li><a href="/search" className="hover:text-gray-300">Search</a></li>
                <li><a href="/register" className="hover:text-gray-300">Register</a></li>
                <li><a href="/dashboard" className="hover:text-gray-300">Dashboard</a></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} Trademark Registration System</p>
          </div>
        </footer>
      </body>
    </html>
  );
}