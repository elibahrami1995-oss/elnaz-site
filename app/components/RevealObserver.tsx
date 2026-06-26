'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const STAGGER = 110
    const singles = [
      '#about .section-label', '#about .about-text',
      '#journey h2',
      '#brands .section-label', '#brands h2', '#brands .lead', '#brands .cta-box',
      '#education .section-label', '#education h2', '#education .lead', '#education .edu-feature',
      '#portfolio .section-label', '#portfolio h2', '#portfolio .lead',
      '#contact .section-label', '#contact h2', '#contact .lead',
    ]
    const groups = [
      '#about .stat-card',
      '#about .value-card',
      '#journey .timeline-item',
      '#brands .pricing-card',
      '#brands .process-step',
      '#education .edu-card, #education .lead-magnet',
      '#portfolio .portfolio-video, #portfolio .portfolio-content',
      '#contact .contact-info, #contact .contact-form',
    ]

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    singles.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('reveal')
        observer.observe(el)
      })
    })

    groups.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        (el as HTMLElement).style.transitionDelay = `${i * STAGGER}ms`
        observer.observe(el)
      })
    })

    return () => observer.disconnect()
  }, [])

  return null
}
