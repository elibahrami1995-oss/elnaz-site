'use client'

import { FormEvent } from 'react'

export default function ContactSection() {
  function handleContactForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value || 'تماس از طریق سایت'
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value
    const body = `نام: ${name}\nایمیل: ${email}\n\n${message}`
    window.location.href = `mailto:elibahrami1995@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact">
      <div className="container">
        <span className="section-label">تماس</span>
        <h2>بیا گفتگو رو شروع کنیم</h2>
        <p className="lead">
          برای همکاری در پروژه‌های محتوایی، ثبت‌نام در دوره‌های آموزشی، یا فقط یه گفتگوی دوستانه
          درباره‌ی هوش مصنوعی و محتوا، خوشحال می‌شم ازت بشنوم.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>راه‌های ارتباطی</h3>
            <p>پیامت رو بفرست یا از راه‌های زیر در ارتباط باش؛ معمولاً ظرف ۲۴ ساعت پاسخ می‌دم.</p>

            <a className="contact-item" href="mailto:elibahrami1995@gmail.com">
              <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </div>
              <div className="ci-text">
                <div className="ci-label">ایمیل</div>
                <div className="ci-value">elibahrami1995@gmail.com</div>
              </div>
            </a>

            <a className="contact-item" href="https://instagram.com/elna1zbahramii" target="_blank" rel="noopener noreferrer">
              <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
                </svg>
              </div>
              <div className="ci-text">
                <div className="ci-label">اینستاگرام</div>
                <div className="ci-value">elna1zbahramii</div>
              </div>
            </a>

            <a className="contact-item" href="https://wa.me/989304009383" target="_blank" rel="noopener noreferrer">
              <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4L21 21l-4.3-1.1a8.5 8.5 0 1 1 4.3-8.4z" />
                </svg>
              </div>
              <div className="ci-text">
                <div className="ci-label">واتساپ</div>
                <div className="ci-value">۰۹۳۰۴۰۰۹۳۸۳</div>
              </div>
            </a>

            <div className="contact-item">
              <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className="ci-text">
                <div className="ci-label">موقعیت</div>
                <div className="ci-value">اهواز، ایران</div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactForm}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">نام و نام خانوادگی</label>
                <input type="text" id="name" name="name" placeholder="نام و نام خانوادگی" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">ایمیل</label>
                <input type="email" id="email" name="email" placeholder="example@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">موضوع</label>
              <input type="text" id="subject" name="subject" placeholder="مثلاً: همکاری در پروژه محتوا" />
            </div>
            <div className="form-group">
              <label htmlFor="message">پیام شما</label>
              <textarea id="message" name="message" placeholder="کمی درباره‌ی پروژه یا درخواستت بنویس..." required />
            </div>
            <button type="submit" className="btn btn-primary">ارسال پیام</button>
          </form>
        </div>
      </div>
    </section>
  )
}
