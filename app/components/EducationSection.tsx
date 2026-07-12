'use client'

import { FormEvent } from 'react'

export default function EducationSection() {
  function handleClassForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const lines = [
      'سلام، می‌خوام برای کلاس نیمه خصوصی AI ثبت‌نام کنم:',
      `اسم: ${(form.elements.namedItem('classname') as HTMLInputElement).value}`,
      `حیطه فعالیت: ${(form.elements.namedItem('classrole') as HTMLSelectElement).value}`,
      `نوع کسب‌وکار: ${(form.elements.namedItem('classbiz') as HTMLSelectElement).value}`,
    ]
    const exp = (form.elements.namedItem('classexp') as HTMLSelectElement).value
    if (exp) lines.push(`سابقه کار: ${exp}`)
    const aiRadio = form.querySelector<HTMLInputElement>('input[name="classai"]:checked')
    if (aiRadio) lines.push(`تجربه قبلی با AI: ${aiRadio.value}`)
    const goal = (form.elements.namedItem('classgoal') as HTMLTextAreaElement).value
    if (goal) lines.push(`هدف از کلاس: ${goal}`)
    window.open(`https://wa.me/989304009383?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  function handlePromptForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const lines = [
      'سلام، می‌خوام پکیج ۶۵ پرامپت رایگان رو دریافت کنم:',
      `شماره تماس: ${(form.elements.namedItem('promptphone') as HTMLInputElement).value}`,
      `حیطه کاری: ${(form.elements.namedItem('promptcategory') as HTMLSelectElement).value}`,
    ]
    const email = (form.elements.namedItem('promptemail') as HTMLInputElement).value
    if (email) lines.push(`ایمیل: ${email}`)
    window.open(`https://wa.me/989304009383?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  return (
    <section id="education">
      <div className="container">
        <span className="section-label">آموزش</span>
        <h2>یاد بگیر با AI کار کنی — نه فقط ازش استفاده کنی</h2>
        <p className="lead">آموزش کاربردی هوش مصنوعی، از کسی که خودش هر روز باهاش کار می‌کنه.</p>
        <p>اگه وسط هزار ابزار و آموزش پراکنده گم شدی، اینجا یه مسیر روشن و عملی پیدا می‌کنی — نه تئوری خالی.</p>

        <div className="edu-feature">
          <span className="badge-pill">ظرفیت محدود</span>
          <h3>کلاس نیمه خصوصی AI</h3>
          <div className="edu-meta">
            <span>تاریخ: نیمه دوم تیرماه — اهواز</span>
            <span>شهریه: <strong>۱۲ میلیون تومان</strong></span>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <div className="info-label">مدت</div>
              <div className="info-value">یک ماه</div>
            </div>
            <div className="info-box">
              <div className="info-label">جلسات</div>
              <div className="info-value">۸ جلسه</div>
            </div>
            <div className="info-box">
              <div className="info-label">برگزاری</div>
              <div className="info-value">هفته‌ای دو بار</div>
            </div>
            <div className="info-box">
              <div className="info-label">ظرفیت</div>
              <div className="info-value">محدود</div>
            </div>
          </div>

          <h4>بعد از کلاس می‌تونی:</h4>
          <ul className="check-list">
            <li><span>✅</span><span>عکس محصول حرفه‌ای با AI بسازی — بدون دوربین و فتوشاپ</span></li>
            <li><span>✅</span><span>ویدیوی برند تولید کنی</span></li>
            <li><span>✅</span><span>استراتژی محتوا بنویسی</span></li>
            <li><span>✅</span><span>پرامپت‌نویسی خلاقانه بلد بشی</span></li>
            <li><span>✅</span><span>تمام فایل‌ها و پرامپت‌های کلاس مال خودته — برای همیشه</span></li>
          <li className="no-bullet"><p>یعنی از یه ادمین/فریلنسر ساده، به کسی تبدیل می‌شی که AI رو واقعاً بلده — و این مهارت رو می‌تونه به مشتری‌هاش هم بفروشه.</p></li>
          </ul>

          <form onSubmit={handleClassForm}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="classname">اسم</label>
                <input type="text" id="classname" name="classname" placeholder="نام و نام خانوادگی" required />
              </div>
              <div className="form-group">
                <label htmlFor="classrole">حیطه فعالیت</label>
                <select id="classrole" name="classrole" required defaultValue="">
                  <option value="" disabled>انتخاب کن</option>
                  <option value="ادمین پیج">ادمین پیج</option>
                  <option value="فریلنسر">فریلنسر</option>
                  <option value="صاحب کسب‌وکار">صاحب کسب‌وکار</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="classbiz">نوع کسب‌وکار</label>
                <select id="classbiz" name="classbiz" required defaultValue="">
                  <option value="" disabled>انتخاب کن</option>
                  <option value="رستوران/کافه/غذا">رستوران/کافه/غذا</option>
                  <option value="کلینیک زیبایی/سلامت">کلینیک زیبایی/سلامت</option>
                  <option value="فروشگاه/محصول">فروشگاه/محصول</option>
                  <option value="خدمات (آموزش، مشاوره و...)">خدمات (آموزش، مشاوره و...)</option>
                  <option value="سایر">سایر</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="classexp">چند وقته کار می‌کنی؟</label>
                <select id="classexp" name="classexp" defaultValue="">
                  <option value="" disabled>انتخاب کن</option>
                  <option value="کمتر از ۱ سال">کمتر از ۱ سال</option>
                  <option value="۱ تا ۳ سال">۱ تا ۳ سال</option>
                  <option value="۳ تا ۵ سال">۳ تا ۵ سال</option>
                  <option value="بیشتر از ۵ سال">بیشتر از ۵ سال</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>تا حالا با AI کار کردی؟</label>
              <div className="radio-group">
                <label><input type="radio" name="classai" value="بله" defaultChecked /> بله</label>
                <label><input type="radio" name="classai" value="خیر" /> خیر</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="classgoal">هدفت از کلاس چیه؟</label>
              <textarea id="classgoal" name="classgoal" placeholder="کمی درباره‌ی هدفت بنویس..." />
            </div>
            <button type="submit" className="btn btn-gold btn-block">ثبت‌نام — واتساپ</button>
          </form>
        </div>

        <div className="edu-grid">
          <div className="edu-card">
            <h4>جلسه راهنمایی شخصی</h4>
            <p>اگه مشکل قیمت‌گذاری، جذب مشتری، یا ساختن پورتفولیو داری — یا می‌خوای بدونی مسیر کار با AI چیه و چطور ازش درآمد بسازی — این جلسه برات طراحی شده.</p>
            <p><strong>یه جلسه، یه مشکل مشخص، یه راه‌حل واقعی.</strong></p>
            <div className="edu-price">۱ ساعت — ۱،۵۰۰،۰۰۰ تومان</div>
            <a
              href="https://wa.me/989304009383"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-block"
            >
              رزرو جلسه
            </a>
          </div>

          <div className="lead-magnet">
            <h4>۶۵ پرامپت ویژه کسب‌وکارها — رایگان</h4>
            <p>دیگه لازم نیست خودت پرامپت بسازی و وقت بگذاری — شماره و حیطه کاریت رو بذار، پرامپت‌های آماده رو بگیر.</p>
            <form onSubmit={handlePromptForm}>
              <div className="form-group">
                <label htmlFor="promptphone">شماره تماس</label>
                <input type="tel" id="promptphone" name="promptphone" placeholder="09xxxxxxxxx" required />
              </div>
              <div className="form-group">
                <label htmlFor="promptcategory">حیطه کاری</label>
                <select id="promptcategory" name="promptcategory" required defaultValue="">
                  <option value="" disabled>انتخاب کن</option>
                  <option value="رستوران/کافه/غذا">رستوران/کافه/غذا</option>
                  <option value="کلینیک زیبایی/سلامت">کلینیک زیبایی/سلامت</option>
                  <option value="فروشگاه/محصول">فروشگاه/محصول</option>
                  <option value="ادمین/فریلنسر">ادمین/فریلنسر</option>
                  <option value="خدمات">خدمات</option>
                  <option value="سایر">سایر</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="promptemail">ایمیل (اختیاری)</label>
                <input type="email" id="promptemail" name="promptemail" placeholder="example@email.com" />
              </div>
              <a href="/downloads/prompt-booklet.pdf" download className="btn btn-gold btn-block" style={{display:'block',textAlign:'center'}}>دریافت رایگان</a>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
