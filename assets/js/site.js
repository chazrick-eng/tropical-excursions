/* ============================================================
   Tropical Excursions — shared chrome + render helpers
   ============================================================ */
(function(){
  const S = window.SITE, TX = window.TX, TRIPS = window.TRIPS;

  /* ---- inline icons ---- */
  const ICON = {
    wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.017-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };
  window.ICON = ICON;

  const NAV = [
    ["index.html","Home"],["trips.html","Trips"],["about.html","About"],
    ["gallery.html","Gallery"],["faq.html","FAQ"],["contact.html","Contact"]
  ];

  function statusBadge(st){
    const map = {
      upcoming:['badge-up','Upcoming'], sold_out:['badge-soldout','Sold out'],
      past:['badge-past','Past trip']
    };
    const [cls,txt] = map[st] || map.upcoming;
    return `<span class="badge ${cls}">${txt}</span>`;
  }
  window.statusBadge = statusBadge;

  /* ---- header ---- */
  function renderHeader(active){
    const links = NAV.map(([h,l])=>`<a href="${h}"${h===active?' class="active"':''}>${l}</a>`).join("");
    const wa = TX.waLink(null);
    return `
    <header class="site-head">
      <div class="head-inner">
        <a class="brand" href="index.html" aria-label="Tropical Excursions home">
          <img src="assets/img/logo-trans.png" alt="Tropical Excursions">
        </a>
        <nav class="nav">${links}</nav>
        <a class="btn btn-wa head-cta" href="${wa}" target="_blank" rel="noopener">${ICON.wa} WhatsApp us</a>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
      <div class="mobile-nav">
        ${NAV.map(([h,l])=>`<a href="${h}"${h===active?' class="active"':''}>${l}</a>`).join("")}
        <a class="btn btn-wa btn-block" href="${wa}" target="_blank" rel="noopener">${ICON.wa} WhatsApp us</a>
      </div>
    </header>`;
  }

  /* ---- footer ---- */
  function renderFooter(){
    const phones = S.phones.map(p=>`<a href="tel:${p.tel}"><small>${p.label}</small>${p.display}</a>`).join("");
    const igUrl = "https://instagram.com/"+S.instagram;
    return `
    <footer class="site-foot">
      <div class="wrap-wide">
        <div class="foot-top">
          <div class="foot-brand">
            <div class="f-logo-wrap"><img src="assets/img/logo-trans.png" alt="Tropical Excursions"></div>
            <p>Caribbean day trips and overseas escapes — islandwide pickup, all-inclusive experiences, and giveaways along the way.</p>
            <a class="foot-ig" href="${igUrl}" target="_blank" rel="noopener" style="margin-top:18px">${ICON.ig} @${S.instagram}</a>
          </div>
          <div class="foot-col">
            <h4>Explore</h4>
            <a href="trips.html">All trips</a>
            <a href="trips.html#jamaica">Jamaica day trips</a>
            <a href="trips.html#overseas">Overseas packages</a>
            <a href="gallery.html">Gallery</a>
          </div>
          <div class="foot-col">
            <h4>Company</h4>
            <a href="about.html">About us</a>
            <a href="faq.html">FAQ</a>
            <a href="contact.html">Contact</a>
            <a href="${TX.waLink(null)}" target="_blank" rel="noopener">Book on WhatsApp</a>
          </div>
          <div class="foot-col">
            <h4>Talk to us</h4>
            <div class="foot-phone">${phones}</div>
            <p style="color:#8a9b8f;font-size:.85rem;margin:0">Pickup islandwide across Jamaica.</p>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© ${new Date().getFullYear()} Tropical Excursions. All rights reserved.</span>
          <span>Made for the islands ☀</span>
        </div>
      </div>
    </footer>`;
  }

  /* ---- floating whatsapp ---- */
  function renderWaFloat(){
    return `<a class="wa-float" href="${TX.waLink(null)}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.wa}<span class="lbl">Chat with us</span></a>`;
  }

  /* ---- trip card ---- */
  function tripCard(t){
    const st = TX.status(t);
    const from = TX.fromPrice(t);
    const fromHtml = from
      ? `<div class="tc-price"><small>From</small><b>${TX.fmtMoney(from.cur, from.val)}<span> ${from.cur==='JMD'?'JMD':''}</span></b></div>`
      : `<div class="tc-price"><small>&nbsp;</small><b>Ask us</b></div>`;
    return `
    <article class="trip-card${st==='past'?' is-past':''}">
      <div class="tc-media">
        <img src="${t.card_image}" alt="${t.name}" loading="lazy">
        <div class="tc-badges">
          <span class="badge badge-type">${TX.typeLabel(t)}</span>
          ${statusBadge(st)}
        </div>
      </div>
      <div class="tc-body">
        <div class="tc-date">${ICON.cal} ${t.date_display}</div>
        <h3 class="tc-name">${t.name}</h3>
        <p class="tc-tag">${t.tagline}</p>
        <div class="tc-foot">
          ${fromHtml}
          <span class="tc-go">${st==='past'?'View':'Details'} ${ICON.arrow}</span>
        </div>
      </div>
      <a class="stretch" href="trip.html?slug=${t.slug}" aria-label="${t.name}"></a>
    </article>`;
  }
  window.tripCard = tripCard;

  /* ---- mount chrome + behaviours ---- */
  function mount(active){
    const h = document.getElementById("site-header");
    const f = document.getElementById("site-footer");
    if(h) h.innerHTML = renderHeader(active);
    if(f) f.innerHTML = renderFooter() + renderWaFloat();

    // mobile menu
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".mobile-nav");
    if(toggle && menu){
      toggle.addEventListener("click", ()=>{
        const open = menu.classList.toggle("open");
        document.body.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", open);
      });
      menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
        menu.classList.remove("open"); document.body.classList.remove("menu-open");
      }));
    }
  }
  window.mountChrome = mount;

  /* ---- scroll reveal ---- */
  window.initReveal = function(){
    const els = document.querySelectorAll(".reveal");
    if(!("IntersectionObserver" in window)){ els.forEach(e=>e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:"0px 0px -8% 0px"});
    els.forEach(e=>io.observe(e));
  };
})();
