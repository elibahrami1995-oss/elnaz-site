export default function PortfolioSection() {
  return (
    <section id="portfolio">
      <div className="container">
        <span className="section-label">نمونه‌کار</span>
        <h2>یه نمونه از کارهام</h2>
        <p style={{opacity:0.7, fontSize:"0.9em"}}>نمونه‌ی مفهومی</p>
        <p className="lead">
          یکی از پروژه‌های اخیر؛ محتوای ویدیویی برای یک برند برگر، با ترکیب عکاسی، ادیت
          و کمک ابزارهای هوش مصنوعی. هدفش محتوایی بود که هم زیبا باشه، هم مخاطب رو نگه داره.
        </p>
        <div className="portfolio-grid">
          <div className="portfolio-video">
            <video src="/portfolio-video.mp4" controls muted loop playsInline />
          </div>
          <div className="portfolio-content">
            <h3>محتوای ویدیویی برند برگر</h3>
            <p>
              تولید و ادیت یک ویدیوی کوتاه برای شبکه‌های اجتماعی؛ با تمرکز روی نورپردازی،
              ریتم و لحن انسانی، طوری که حس محتوای ماشینی نده.
            </p>
            <div className="tag-list">
              <span className="tag">UGC</span>
              <span className="tag">ویدیو و عکاسی</span>
              <span className="tag">ادیت با AI</span>
            </div>
          </div>

          <div className="portfolio-video landscape">
            <video src="/project5.mp4" controls muted loop playsInline />
          </div>
          <div className="portfolio-content">
            <h3>معرفی محصول برند دلکینی</h3>
            <p style={{opacity:0.7, fontSize:"0.9em"}}>نمونه‌ی مفهومی</p>
            <p>
              ویدیوی معرفی محصول برای برند قهوه دلکینی؛ نمونه‌ای برای نشون دادن سبک تولید محتوای معرفی محصول.
            </p>
            <div className="tag-list">
              <span className="tag">معرفی محصول</span>
              <span className="tag">قهوه/رستوران</span>
              <span className="tag">ویدیو</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
