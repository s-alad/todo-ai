import Image from 'next/image'
import s from './page.module.scss'

import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import {
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Todo from '@/components/todo/todo';
import { Suspense } from 'react';
import Tasks from '@/components/tasks/tasks';


export default function Home() {
  return (
    <main className={s.main}>

      <div className={s.punchline}>
        boost your productivity with actionable steps
        <span>
          <FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }}/>
        </span> by ai.
      </div>
      <div className={s.tagline}>
        no more hassle of brainstorming what needs to be done next; let our AI assistant analyze your tasks, prioritize them, and provide you with clear, personalized action steps. From simple to-do items to complex projects, our AI tool will streamline your workflow and help you achieve your goals faster and efficiently. 
      </div>

      <div className={s.try}>
        try it instantly below or <span>sign up</span> to save your tasks. 
      </div>

      <Suspense fallback={<p>Loading...</p>}> 
        {/* <Todo /> */}
        <Tasks />


      </Suspense>

    </main>
  )
}
