export default function BrandsSection() {
  return (
    <section id="brands" className="brands">
      <div className="container">
        <span className="section-label">برندها</span>
        <h2>محتوای حرفه‌ای با هوش مصنوعی، برای برندی که نمی‌خواد شبیه بقیه باشه</h2>
        <p className="lead">من محتوا می‌سازم — سریع، با فکر، و با روح. تو برند داری، من بقیه‌اش رو می‌دونم.</p>

        <div className="pricing-grid">
          <div className="pricing-card featured">
            <span className="pricing-badge">مقرون‌به‌صرفه</span>
            <h4>عکس و ویدیو با AI</h4>
            <p>با قیمتی کمتر از عکاسی حرفه‌ای، کیفیتی بهتر از آیفون می‌گیری — بدون دوربین، استودیو، یا فتوشوت.</p>
            <div className="pricing-price">بسته به حجم — پیام بده</div>
          </div>
          <div className="pricing-card">
            <h4>پکیج پست</h4>
            <p>تولید پست اختصاصی برند — بسته به تعداد و نوع محتوا</p>
            <div className="pricing-price">برای قیمت پیام بده</div>
          </div>
          <div className="pricing-card">
            <h4>پکیج کامل</h4>
            <p>۹ پست (اسلایدی یا ریل) + استوری + آپلود + ادمین حضوری</p>
            <div className="pricing-price">از ۳۰ میلیون تومان</div>
          </div>
        </div>

        <div className="process-grid">
          <div className="process-step">
            <div className="process-num">۱</div>
            <h4>آشنایی</h4>
            <p>برند، مخاطب، و هدفت رو بهم می‌گی</p>
          </div>
          <div className="process-step">
            <div className="process-num">۲</div>
            <h4>برنامه‌ریزی</h4>
            <p>تقویم محتوایی و ایده‌ها آماده می‌شن</p>
          </div>
          <div className="process-step">
            <div className="process-num">۳</div>
            <h4>تولید</h4>
            <p>محتوا ساخته، چک، و تحویل داده می‌شه</p>
          </div>
          <div className="process-step">
            <div className="process-num">۴</div>
            <h4>بهبود</h4>
            <p>هر ماه بهتر از قبل می‌شیم</p>
          </div>
        </div>

        <div className="cta-box">
          <h3>آماده‌ای شروع کنیم؟</h3>
          <p>بهم بگو برندت چیه — بقیه‌اش با منه.</p>
          <a href="https://wa.me/989304009383" target="_blank" rel="noopener noreferrer" className="btn">
            واتساپ بزن
          </a>
        </div>
      </div>
    </section>
  )
}
