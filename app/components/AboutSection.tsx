export default function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        <span className="section-label">معرفی</span>
        <div className="about-grid">
          <div className="about-text">
            <h2>محتوای هوش مصنوعی با روح انسانی</h2>
            <p>
              اکثر محتوایی که با هوش مصنوعی ساخته می‌شه، یه شکل و یه لحن دارن.
              من یه چیز دیگه اضافه می‌کنم: <strong>ذوق استراتژیک</strong>.
              ترکیبی از فکر و استراتژی با حس و روح انسانی؛ چیزی که AI به‌تنهایی نمی‌تونه بسازه. برای برندی که با من کار می‌کنه، یعنی محتوا دیگه شبیه بقیه نیست.
            </p>
            <span className="quote-mark">«</span>
            <p>
              از سال ۲۰۱۷ با عکاسی غذا شروع کردم — یه مدتم ادمین برندها بودم —
              و سال‌ها تجربه‌ی ساختن از صفر، بدون کلاس و بدون استاد. هر مرحله یه چیزی بهم اضافه کرد:
              چشم بصری، شناخت مخاطب، و توانایی ساختن مستقل.
            </p>
            <p>
              الان با هوش مصنوعی کار می‌کنم؛ ابزاری سریع و دقیق، اما بدون روح.
              کاری که من می‌کنم اینه که اون روح رو به محتوای AI برمی‌گردونم؛
              محتوایی که هم پشتش فکره، هم زنده‌ست.
            </p>
          </div>

          <div className="stats">
            <div className="stat-card">
              <div className="num">+۷</div>
              <div className="label">سال تجربه در تولید محتوا و برندینگ</div>
            </div>
            <div className="stat-card">
              <div className="num">۴</div>
              <div className="label">دوره‌ی آموزشی حضوری AI برگزار شده</div>
            </div>
            <div className="stat-card">
              <div className="num">۲</div>
              <div className="label">کشور همکاری بین‌المللی (کانادا و انگلیس)</div>
            </div>
            <div className="stat-card">
              <div className="num">اهواز</div>
              <div className="label">مقر فعالیت و برگزاری دوره‌های حضوری</div>
            </div>
          </div>
        </div>

        <div className="values">
          <div className="value-card">
            <div className="icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M14.5 9.5 13 14l-4.5 1.5L10 11l4.5-1.5z" />
              </svg>
            </div>
            <h3>کنجکاوی فعال</h3>
            <p>دنیای AI هر هفته تغییر می‌کنه. جلوتر از موج می‌مونم؛ هر ابزار جدید رو تست می‌کنم و نتیجه‌ش رو وارد پروژه‌های واقعی می‌کنم — یعنی برندت همیشه با تازه‌ترین ابزارها جلو می‌ره، نه عقب می‌مونه.</p>
          </div>
          <div className="value-card">
            <div className="icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>صداقت کاری</h3>
            <p>اگه پروژه‌ای به درد برندت نخوره، می‌گم. اگه AI جوابگو نباشه، می‌گم. بدون اغراق و بدون ژست؛ حرف و نتیجه یکیه — یعنی پولت رو روی چیزی که نتیجه نمی‌ده هدر نمی‌دی.</p>
          </div>
          <div className="value-card">
            <div className="icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c0 4-3 7-7 7 4 0 7 3 7 7 0-4 3-7 7-7-4 0-7-3-7-7z" />
              </svg>
            </div>
            <h3>ساخت با روح</h3>
            <p>هیچ کاری بی‌فکر ساخته نمی‌شه. هرچی می‌سازم هم زیباست، هم زنده‌ست؛ یه چیزی داره که مخاطب رو نگه می‌داره — یعنی محتوای برندت بین صدها پست دیگه گم نمی‌شه.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
