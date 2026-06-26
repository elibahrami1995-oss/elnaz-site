export default function JourneySection() {
  return (
    <section id="journey">
      <div className="container">
        <h2>مسیرم از دل تجربه‌ست</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-year">۲۰۱۷</span>
            <h3>شروع با گوشی</h3>
            <p>اولین قدم. بدون کلاس، بدون استاد — فقط چشم و ذوق. از همینجا یاد گرفتم چطور ببینم.</p>
          </div>

          <div className="timeline-item">
            <span className="timeline-year">۲۰۱۹</span>
            <h3>MFC میزبان</h3>
            <p>عکاسی محصول خلاقانه برای یکی از برندهای فست‌فود اهواز. اینجا فهمیدم استایل یعنی چی.</p>
            <div className="timeline-images">
              <div className="portfolio-placeholder">تصویر نمونه</div>
              <div className="portfolio-placeholder">تصویر نمونه</div>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-year">۲۰۲۲</span>
            <h3>Papa Factory</h3>
            <p>UGC و عکاسی محصول برای یه برند غذایی خلاق. اینجا با مفهوم روایت تصویری آشنا شدم.</p>
            <div className="timeline-images">
              <div className="portfolio-placeholder">تصویر نمونه</div>
              <div className="portfolio-placeholder">تصویر نمونه</div>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-year">۲۰۲۶ — الان</span>
            <h3>محتوای AI با روح انسانی</h3>
            <p>۷ سال تجربه + ابزارهای AI = محتوایی که هم سریعه، هم زنده‌ست. این همون چیزیه که AI به‌تنهایی نمی‌تونه بسازه.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
