import Image from 'next/image'
import s from './page.module.scss'

export default function Home() {
  return (
    <main className={s.main}>

      <div className={s.punchline}>
        boost your productivity with actionable steps powered by ai.
      </div>
      <div className={s.tagline}>
        no more hassle of brainstorming what needs to be done next; let our AI assistant analyze your tasks, prioritize them, and provide you with clear, personalized action steps. From simple to-do items to complex projects, our AI tool will streamline your workflow and help you achieve your goals faster and more efficiently. 
      </div>

      <div className={s.todo}>

      </div>

    </main>
  )
}
