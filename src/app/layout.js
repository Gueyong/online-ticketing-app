import { Roboto } from 'next/font/google';
import "./globals.css";
import ClientLayout from './ClientLayout'; // Import the client-side layout

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <ClientLayout> {/* Wrap the client-side layout */}
            {children}
          </ClientLayout>
          <footer className="border-t p-8 text-center text-gray-500 mt-16">
            &copy; 2024 All rights reserved
          </footer>
        </main>
      </body>
    </html>
  );
}
