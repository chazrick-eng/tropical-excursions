/* ============================================================
   Tropical Excursions — Trip catalog (single source of truth)
   Add a trip = add one record here + drop its images. No code changes.
   ============================================================ */
window.SITE = {
  whatsapp: "18765987712",            // primary WhatsApp (876-598-7712, intl format)
  instagram: "tropical_excursions",
  phones: [
    { label: "Jamaica", display: "876-598-7712", tel: "+18765987712" },
    { label: "US / Atlanta", display: "770-639-1106", tel: "+17706391106" },
    { label: "Jamaica", display: "876-707-3059", tel: "+18767073059" }
  ],
  email: null,        // not supplied — footer omits gracefully
  base: null          // physical base — not supplied
};

window.TRIPS = [
  {
    slug: "portland-trilogy",
    name: "Portland Trilogy",
    type: "jamaica_day_trip",
    status: "upcoming",
    accent: "var(--teal)", accentDk: "var(--teal-dk)", accentRGB: "28,168,184",
    tagline: "Frenchman's Cove · Boston Beach · Boston Jerk Centre",
    summary: "A one-day trilogy through Portland's most iconic spots — turquoise river-meets-sea coves, a famous beach, and the birthplace of jerk.",
    date_display: "Sunday, June 28, 2026",
    date_sort: "2026-06-28",
    duration: "Full day",
    hero_image: "assets/img/stock-cove.jpg",
    card_image: "assets/img/stock-beach.jpg",
    gallery: ["assets/img/stock-cove.jpg","assets/img/stock-beach.jpg","assets/img/stock-underwater.jpg"],
    locations: ["Frenchman's Cove","Boston Beach","Boston Jerk Centre"],
    inclusions: [
      "Round-trip transportation","Day pass at Frenchman's Cove","Day pass at Boston Beach",
      "Refreshments","Explore a hidden underwater cave","Rest & food stops","Games & giveaways"
    ],
    pickup_locations: ["Spanish Town","Portmore","St. Andrew / Kingston","Montego Bay","Ocho Rios","Mandeville"],
    pricing: [
      { label:"Adults", jmd:9500, usd:60 },
      { label:"Children", note:"Ages 4–12", jmd:5750, usd:35 },
      { label:"Children 3 & under", jmd:0, usd:0, free:true },
      { label:"Groups of 3+", note:"per person", jmd:8750, usd:null }
    ],
    currency_primary: "JMD",
    departure_airport: null
  },
  {
    slug: "trinidad-tobago-escape",
    name: "Tropical Escape to Trinidad & Tobago",
    short_name: "Trinidad & Tobago",
    type: "overseas_package",
    status: "upcoming",
    accent: "var(--sunset)", accentDk: "var(--sunset-dk)", accentRGB: "245,148,43",
    tagline: "5 days · 4 nights · two islands, one unforgettable escape",
    summary: "A five-day Caribbean getaway across Trinidad and Tobago — flights, stays, and a boat ride between islands, all handled for you.",
    date_display: "October 21–25, 2026",
    date_sort: "2026-10-21",
    duration: "5 days / 4 nights",
    hero_image: "assets/img/bay-tt.jpg",
    card_image: "assets/img/bay-tt.jpg",
    gallery: ["assets/img/bay-tt.jpg"],
    locations: ["Trinidad","Tobago"],
    inclusions: [
      "5 days & 4 nights accommodation","Round-trip airfare","Breakfast included","Airport transfer",
      "Boat ride to Tobago","Games & giveaways","Preparation of travel documents"
    ],
    pickup_locations: null,
    pricing: [
      { label:"Per person", note:"all-inclusive package", jmd:null, usd:1350 }
    ],
    currency_primary: "USD",
    departure_airport: "TBC — ask us"
  },
  {
    slug: "ultimate-resort-day-pass",
    name: "The Ultimate Resort Day Pass",
    short_name: "Ultimate Day Pass",
    type: "jamaica_day_trip",
    status: "upcoming",
    accent: "var(--palm)", accentDk: "var(--palm-dk)", accentRGB: "60,140,47",
    tagline: "Azul Beach Resort, Negril — a full day of all-inclusive luxury",
    summary: "Trade the everyday for cabanas, buffets and open bars at Negril's Azul Beach Resort — a complete luxury day pass with transport from your town.",
    date_display: "Saturday, November 28, 2026",
    date_sort: "2026-11-28",
    duration: "Full day",
    hero_image: "assets/img/resort.jpg",
    card_image: "assets/img/resort.jpg",
    gallery: ["assets/img/resort.jpg"],
    locations: ["Azul Beach Resort, Negril"],
    inclusions: [
      "Round-trip transportation","Breakfast buffet","Non-motorized watersports","Lunch buffet & gourmet meals",
      "Exclusive access to all bars","Beach beds & cabanas","Beach & main pools","Gym",
      "Hospitality room (based on hotel occupancy)","Giveaways & games"
    ],
    pickup_locations: ["Spanish Town","Portmore","St. Andrew / Kingston","Montego Bay","Ocho Rios"],
    pricing: [
      { label:"Per person", jmd:28000, usd:null },
      { label:"Groups of 3+", note:"per person", jmd:27500, usd:null }
    ],
    currency_primary: "JMD",
    departure_airport: null
  }
];

/* ---------- helpers shared across pages ---------- */
window.TX = {
  todayISO: "2026-06-09",
  fmtMoney(cur, n){
    if(n === 0) return "Free";
    if(n == null) return null;
    const sym = cur === "JMD" ? "J$" : "US$";
    return sym + n.toLocaleString("en-US");
  },
  // resolve status: manual sold_out wins, else derive past/upcoming from date
  status(t){
    if(t.status === "sold_out") return "sold_out";
    return (t.date_sort < window.TX.todayISO) ? "past" : t.status || "upcoming";
  },
  // "from" price for cards — primary currency, lowest adult-ish price
  fromPrice(t){
    const cur = t.currency_primary;
    const key = cur.toLowerCase();
    const vals = t.pricing.map(p=>p[key]).filter(v=>v!=null && v>0);
    if(!vals.length) return null;
    return { cur, val: Math.min(...vals) };
  },
  waLink(t){
    const base = "https://wa.me/" + window.SITE.whatsapp + "?text=";
    const msg = t
      ? `Hi Tropical Excursions! I'm interested in the ${t.name} (${t.date_display}). `
      : "Hi Tropical Excursions! I'd like to ask about an upcoming trip. ";
    return base + encodeURIComponent(msg);
  },
  typeLabel(t){ return t.type === "overseas_package" ? "Overseas Package" : "Jamaica Day Trip"; },
  byDate(a,b){ return a.date_sort < b.date_sort ? -1 : 1; },
  get(slug){ return window.TRIPS.find(t=>t.slug===slug); }
};
