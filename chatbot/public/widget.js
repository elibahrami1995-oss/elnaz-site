/**
 * Elnaz Bahrami — Embeddable Chat Widget
 *
 * Usage (paste before </body> on any site):
 *   <script src="https://your-domain.com/widget.js" data-api="https://your-domain.com"></script>
 */
(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────────────
  const script  = document.currentScript;
  const API_URL = (script?.getAttribute('data-api') || '').replace(/\/$/, '');
  const SESSION = 'elnaz_widget_' + Math.random().toString(36).slice(2);

  // Prevent double-init
  if (window.__ELNAZ_WIDGET__) return;
  window.__ELNAZ_WIDGET__ = true;

  // ── Styles ──────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap');

    #elnaz-widget-btn {
      position:fixed;bottom:24px;left:24px;
      width:56px;height:56px;border-radius:50%;
      background:linear-gradient(135deg,#5C0F1C,#400A14);
      border:none;cursor:pointer;
      box-shadow:0 6px 24px rgba(92,15,28,.35);
      display:flex;align-items:center;justify-content:center;
      z-index:2147483647;
      transition:transform .2s,box-shadow .2s;
    }
    #elnaz-widget-btn:hover{transform:scale(1.08);box-shadow:0 10px 30px rgba(92,15,28,.4);}
    #elnaz-widget-btn svg{width:26px;height:26px;fill:#fff;}

    #elnaz-widget-badge{
      position:absolute;top:-3px;right:-3px;
      width:18px;height:18px;border-radius:50%;
      background:#ef4444;border:2px solid #fff;
      font-family:'Vazirmatn',sans-serif;font-size:10px;
      color:#fff;display:none;align-items:center;justify-content:center;font-weight:700;
    }

    #elnaz-widget-panel{
      position:fixed;bottom:90px;left:24px;
      width:360px;height:520px;
      background:#FAF6EF;
      border-radius:20px;
      box-shadow:0 20px 60px rgba(38,33,28,.18);
      display:flex;flex-direction:column;
      z-index:2147483646;
      overflow:hidden;
      transition:opacity .25s,transform .25s;
      font-family:'Vazirmatn',sans-serif;
      direction:rtl;
    }
    #elnaz-widget-panel.hidden{
      opacity:0;transform:translateY(16px) scale(.97);pointer-events:none;
    }

    #elnaz-w-header{
      background:linear-gradient(135deg,#5C0F1C,#400A14);
      color:#fff;
      padding:14px 16px;
      display:flex;align-items:center;gap:10px;
      flex-shrink:0;
    }
    #elnaz-w-header .ava{
      width:36px;height:36px;border-radius:50%;
      background:rgba(255,255,255,.2);
      display:flex;align-items:center;justify-content:center;font-size:1.1rem;
    }
    #elnaz-w-header .info h3{font-size:.95rem;font-weight:700;margin-bottom:2px;}
    #elnaz-w-header .info p{font-size:.72rem;opacity:.8;display:flex;align-items:center;gap:5px;}
    #elnaz-w-header .dot{width:6px;height:6px;border-radius:50%;background:#4ade80;display:inline-block;}
    #elnaz-w-close{
      margin-right:auto;background:none;border:none;color:#fff;
      font-size:1.3rem;cursor:pointer;opacity:.8;line-height:1;padding:4px;
    }
    #elnaz-w-close:hover{opacity:1;}

    #elnaz-w-messages{
      flex:1;overflow-y:auto;
      padding:14px 12px;
      display:flex;flex-direction:column;gap:10px;
    }
    #elnaz-w-messages::-webkit-scrollbar{width:3px;}
    #elnaz-w-messages::-webkit-scrollbar-thumb{background:#E3D9CA;border-radius:3px;}

    .elnaz-msg{display:flex;flex-direction:column;max-width:82%;}
    .elnaz-msg.bot{align-self:flex-start;align-items:flex-start;}
    .elnaz-msg.user{align-self:flex-end;align-items:flex-end;}
    .elnaz-bubble{
      padding:9px 14px;border-radius:16px;
      font-size:.85rem;line-height:1.75;
      white-space:pre-wrap;word-break:break-word;
    }
    .elnaz-msg.bot  .elnaz-bubble{background:#fff;border:1px solid #E3D9CA;border-top-right-radius:4px;}
    .elnaz-msg.user .elnaz-bubble{background:#5C0F1C;color:#fff;border-bottom-left-radius:4px;}
    .elnaz-time{font-size:.65rem;color:#847A6C;margin-top:3px;padding:0 4px;}

    .elnaz-typing .elnaz-bubble{display:flex;gap:4px;align-items:center;padding:12px 16px;}
    .elnaz-dot{width:7px;height:7px;border-radius:50%;background:#847A6C;animation:elnaz-bounce .9s infinite;}
    .elnaz-dot:nth-child(2){animation-delay:.2s;}
    .elnaz-dot:nth-child(3){animation-delay:.4s;}
    @keyframes elnaz-bounce{
      0%,60%,100%{transform:translateY(0);}
      30%{transform:translateY(-5px);}
    }

    .elnaz-suggs{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;}
    .elnaz-sugg{
      padding:5px 12px;border:1.5px solid #E3D9CA;border-radius:50px;
      font-size:.75rem;cursor:pointer;background:#fff;
      color:#26211C;font-family:'Vazirmatn',sans-serif;
      transition:border-color .2s;
    }
    .elnaz-sugg:hover{border-color:#5C0F1C;}

    #elnaz-w-footer{
      padding:10px 12px;
      background:#fff;
      border-top:1px solid #E3D9CA;
      display:flex;gap:8px;align-items:flex-end;
      flex-shrink:0;
    }
    #elnaz-w-input{
      flex:1;min-height:36px;max-height:120px;resize:none;
      border:1.5px solid #E3D9CA;border-radius:12px;
      padding:8px 12px;font-family:'Vazirmatn',sans-serif;
      font-size:.85rem;color:#26211C;background:#FAF6EF;
      outline:none;transition:border-color .2s;line-height:1.5;
    }
    #elnaz-w-input:focus{border-color:#5C0F1C;}
    #elnaz-w-input::placeholder{color:#847A6C;}
    #elnaz-w-send{
      width:36px;height:36px;border-radius:10px;border:none;
      background:#5C0F1C;color:#fff;font-size:1rem;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:background .2s;flex-shrink:0;
    }
    #elnaz-w-send:hover{background:#400A14;}
    #elnaz-w-send:disabled{background:#E3D9CA;cursor:not-allowed;}

    #elnaz-w-branding{
      text-align:center;font-size:.65rem;color:#847A6C;
      padding:5px 0 8px;background:#fff;flex-shrink:0;
    }

    @media(max-width:420px){
      #elnaz-widget-panel{width:calc(100vw - 16px);left:8px;right:8px;bottom:80px;}
      #elnaz-widget-btn{left:16px;bottom:16px;}
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── HTML ────────────────────────────────────────────────────────────────
  const container = document.createElement('div');
  container.innerHTML = `
    <!-- Chat bubble button -->
    <button id="elnaz-widget-btn" title="چت با دستیار الناز">
      <div id="elnaz-widget-badge"></div>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </button>

    <!-- Chat panel -->
    <div id="elnaz-widget-panel" class="hidden">
      <div id="elnaz-w-header">
        <div class="ava">🤖</div>
        <div class="info">
          <h3>دستیار الناز بهرامی</h3>
          <p><span class="dot"></span> آنلاین</p>
        </div>
        <button id="elnaz-w-close" title="بستن">✕</button>
      </div>

      <div id="elnaz-w-messages"></div>

      <div id="elnaz-w-footer">
        <textarea id="elnaz-w-input" placeholder="پیامت رو بنویس…" rows="1"></textarea>
        <button id="elnaz-w-send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div id="elnaz-w-branding">پشتیبانی‌شده توسط هوش مصنوعی</div>
    </div>
  `;
  document.body.appendChild(container);

  // ── State & helpers ──────────────────────────────────────────────────────
  let open      = false;
  let waiting   = false;
  let hasGreeted = false;

  const panel   = document.getElementById('elnaz-widget-panel');
  const btn     = document.getElementById('elnaz-widget-btn');
  const badge   = document.getElementById('elnaz-widget-badge');
  const msgs    = document.getElementById('elnaz-w-messages');
  const input   = document.getElementById('elnaz-w-input');
  const sendBtn = document.getElementById('elnaz-w-send');

  function nowTime() {
    return new Date().toLocaleTimeString('fa-IR', { hour:'2-digit', minute:'2-digit' });
  }

  function escHtml(t) {
    return t
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/\n/g,'<br>');
  }

  function appendMsg(role, text) {
    const el = document.createElement('div');
    el.className = `elnaz-msg ${role}`;
    el.innerHTML = `<div class="elnaz-bubble">${escHtml(text)}</div><span class="elnaz-time">${nowTime()}</span>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'elnaz-msg bot elnaz-typing';
    el.id = 'elnaz-typing';
    el.innerHTML = `<div class="elnaz-bubble">
      <span class="elnaz-dot"></span>
      <span class="elnaz-dot"></span>
      <span class="elnaz-dot"></span>
    </div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    document.getElementById('elnaz-typing')?.remove();
  }

  function showBadge() {
    badge.style.display = 'flex';
    badge.textContent   = '1';
  }

  function hideBadge() {
    badge.style.display = 'none';
  }

  function greet() {
    if (hasGreeted) return;
    hasGreeted = true;
    appendMsg('bot', 'سلام! 👋 من دستیار الناز بهرامی هستم.\nچطور می‌تونم کمکت کنم؟');

    // Suggested questions
    const suggsEl = document.createElement('div');
    suggsEl.className = 'elnaz-msg bot';
    suggsEl.innerHTML = `
      <div class="elnaz-suggs">
        <button class="elnaz-sugg">خدمات</button>
        <button class="elnaz-sugg">دوره‌های آموزشی</button>
        <button class="elnaz-sugg">ثبت‌نام</button>
      </div>`;
    msgs.appendChild(suggsEl);
    msgs.scrollTop = msgs.scrollHeight;

    suggsEl.querySelectorAll('.elnaz-sugg').forEach(b => {
      b.addEventListener('click', () => {
        input.value = b.textContent;
        suggsEl.remove();
        doSend();
      });
    });
  }

  // ── Send ─────────────────────────────────────────────────────────────────
  async function doSend() {
    if (waiting) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    appendMsg('user', text);

    waiting = true;
    sendBtn.disabled = true;
    showTyping();

    try {
      const res  = await fetch(`${API_URL}/api/chat`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'x-chat-source': 'widget',
        },
        body: JSON.stringify({ message: text, sessionId: SESSION }),
      });
      const data = await res.json();
      removeTyping();
      appendMsg('bot', data.reply || data.error || 'خطا');
    } catch {
      removeTyping();
      appendMsg('bot', 'ارتباط قطع شد. لطفاً دوباره امتحان کن 🙏');
    } finally {
      waiting = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // ── Events ───────────────────────────────────────────────────────────────
  btn.addEventListener('click', () => {
    open = !open;
    panel.classList.toggle('hidden', !open);
    if (open) {
      hideBadge();
      greet();
      setTimeout(() => input.focus(), 100);
    }
  });

  document.getElementById('elnaz-w-close').addEventListener('click', () => {
    open = false;
    panel.classList.add('hidden');
  });

  sendBtn.addEventListener('click', doSend);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Show badge after 8 s if user hasn't opened yet
  setTimeout(() => {
    if (!open) showBadge();
  }, 8000);

})();
