import Navbar from '@/layout/navbar/navbar'
import '../styles/globals.scss'
import Footer from '@/layout/footer/footer'

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
