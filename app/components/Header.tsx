'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <nav className="nav">
        <Link href="#top" className="logo">
          <span className="logo-mark">ا.ب</span>
          <span>الناز بهرامی</span>
        </Link>
        <ul className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          <li><a href="#about" onClick={() => setOpen(false)}>معرفی</a></li>
          <li><a href="#brands" onClick={() => setOpen(false)}>برندها</a></li>
          <li><a href="#education" onClick={() => setOpen(false)}>آموزش</a></li>
          <li><a href="#portfolio" onClick={() => setOpen(false)}>نمونه‌کار</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>تماس</a></li>
          <li>
            <a href="#contact" className="btn btn-gold" onClick={() => setOpen(false)}>
              همکاری با من
            </a>
          </li>
        </ul>
        <button
          className="menu-toggle"
          aria-label="باز کردن منو"
          onClick={() => setOpen(prev => !prev)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  )
}
