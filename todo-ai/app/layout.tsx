import Navbar from '@/layout/navbar/navbar'
import '../styles/globals.scss'
/* import { Inter } from 'next/font/google' */
import Footer from '@/layout/footer/footer'

/* const inter = Inter({ subsets: ['latin'] }) */

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
      </body>
    </html>
  )
}
