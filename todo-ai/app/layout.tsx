import '../styles/globals.scss'

import Navbar from '@/layout/navbar/navbar'
import Footer from '@/layout/footer/footer'

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'todo-ai',
  description: 'todo list powered by ai',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
