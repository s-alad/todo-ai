import Image from 'next/image'
import s from './page.module.scss'
import l from "@/styles/loader.module.scss"

import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import {
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Todo from '@/utils/todo/todo';
import { Suspense } from 'react';
import Tasks from '@/components/tasks/tasks';
import Link from 'next/link';
import Instant from '@/components/instant/instant';

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

      <Suspense fallback={<div className={l.loading}></div>}> 
        <Instant />


      </Suspense>

    </main>
  )
}
