'use strict';
/* ================= Константи ================= */
const STORE = 'fm-data-v1';
const CUR = { UAH: '₴', USD: '$', EUR: '€' };
const CURS = ['UAH', 'USD', 'EUR'];
const TYPES = { cash: 'Готівка', card: 'Картки', saving: 'Накопичення', invest: 'Інвестиції' };
const TYPE_ICON = { cash: 'cash', card: 'card', saving: 'piggy', invest: 'trend' };
const isSav = a => a && (a.type === 'saving' || a.type === 'invest');
const inTotal = a => a.inTotal !== false;
const MONTHS = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
const MSHORT = ['січ','лют','бер','квіт','трав','черв','лип','серп','вер','жовт','лист','груд'];
const DAYS = ['Неділя','Понеділок','Вівторок','Середа','Четвер','Пʼятниця','Субота'];
const COLORS = ['#F5C542','#3DD6A0','#4FA8E0','#E86A92','#9B7BF0','#F08A4B','#5BC0BE','#7ED957','#E05D5D','#8E8E93','#C08552','#4C6EF5','#D16BD8','#2FB5A5','#FFB020','#6C8EAD'];

/* ---------- Іконки (лінійні SVG, 24×24) ---------- */
const ICONS = {
  utensils: '<path d="M5 2v7a2 2 0 0 0 4 0V2M7 2v20"/><path d="M17 22V2c-2.2 0-4 2.5-4 6v5h4"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L21 7H6"/>',
  coffee: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>',
  drink: '<path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M5 8h12v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M5 8a3 3 0 0 1 3-3 3.5 3.5 0 0 1 6 0 3 3 0 0 1 3 3"/>',
  car: '<path d="M5 17H3v-5l2.2-5h13.6L21 12v5h-2"/><path d="M3 12h18M9.5 17h5"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/>',
  fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 10h10"/><path d="M14 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3"/>',
  parking: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 21v-3M16 21v-3"/><path d="M8 14.5h.01M16 14.5h.01"/>',
  train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4M9 14h.01M15 14h.01"/>',
  plane: '<path d="M21 15.5v-2l-8-5V4a1.5 1.5 0 0 0-3 0v4.5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-4.5z" transform="translate(.5 0)"/>',
  home: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  drop: '<path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.4 0z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1-2.1-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.2 1.7 1.4 2.8 2.5 2.8z"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
  wifi: '<path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><path d="M12 19h.01"/>',
  gamepad: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10.5v4M5 12.5h4M15.5 11.5h.01M17.5 13.8h.01"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M3 12h18"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  tv: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M17 2l-5 5-5-5"/>',
  repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
  shirt: '<path d="M8 3L3 6l2 5 3-1v11h8V10l3 1 2-5-5-3a4 4 0 0 1-8 0z"/>',
  bag: '<path d="M6 7h12l1 14H5z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
  pill: '<path d="M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7z"/><path d="M8.5 8.5l7 7"/>',
  health: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/><path d="M12 9v5M9.5 11.5h5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>',
  sparkles: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1L20 20M14.5 9.5L20 4M8.1 15.9l3.4-3.4"/>',
  dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M6.5 12h11M3.5 9v6M20.5 9v6"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8C10.5 4 7 4 7 6s3 2 5 2zM12 8c1.5-4 5-4 5-2s-3 2-5 2z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  school: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/>',
  paw: '<circle cx="11" cy="4.5" r="2"/><circle cx="18" cy="8.5" r="2"/><circle cx="4" cy="8.5" r="2"/><path d="M8 14.5c1-2.5 2-4 3.5-4s3 1.5 4 4c.8 2-.5 4-2.5 4-1 0-1.5-.5-2-.5s-1 .5-2 .5c-2 0-3.3-2-1-4z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a7 7 0 0 1 4 6.5"/>',
  umbrella: '<path d="M12 12v7a2 2 0 0 0 4 0"/><path d="M2 12a10 10 0 0 1 20 0z"/>',
  receipt: '<path d="M5 2v20l2.5-1.5L10 22l2-1.5 2 1.5 2.5-1.5L19 22V2l-2.5 1.5L14 2l-2 1.5L10 2 7.5 3.5z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
  laptop: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20M6 15h4"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15v13H5a2 2 0 0 1-2-2V5"/><path d="M16 13.5h.01"/>',
  coins: '<circle cx="9" cy="9" r="6"/><path d="M18.1 10.4a6 6 0 1 1-7.7 7.7M7 7h2v4"/>',
  stack: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  piggy: '<path d="M19 9.5c0-.3 1-1.5 2-1.5v4h-1.5c-.5 1.5-1.5 2.5-2.5 3V19h-3v-2h-4v2H7v-3.5C5 14.5 4 12.5 4 10.5 4 7 7.5 5 11.5 5c2 0 3.5.5 5 1.5"/><path d="M2 9c0 1.5 1 2.5 2 2.5M15.5 9.5h.01"/>',
  bank: '<path d="M3 21h18M4 10h16M12 3l9 5H3z"/><path d="M6 10v8M10 10v8M14 10v8M18 10v8"/>',
  trend: '<path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  chart: '<path d="M3 3v18h18"/><path d="M8 17v-5M13 17V8M18 17v-6"/>',
  percent: '<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  dollar: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  mountain: '<path d="M3 20l6.5-11 4 6.5 2.5-4L21 20z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12h.01"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19z"/>',
  gem: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21L8.5 9 12 3l3.5 6z"/>',
  star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
  dots: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  transfer: '<path d="M7 7h13l-4-4M17 17H4l4 4"/>',
  scale: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  upload: '<path d="M12 15V3M7 8l5-5 5 5M4 20h16"/>',
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/>',
  printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
  save: '<path d="M5 3h11l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z"/><path d="M8 3v5h7M8 21v-7h8v7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  hand: '<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="M7 20l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L14.4 13"/><path d="M2 15l6 6"/>',
  wave: '<path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10M10 9.5v-6a1.5 1.5 0 0 1 3 0V10M13 5.5a1.5 1.5 0 0 1 3 0V11M16 8.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.4-2.6L3 15.5a1.6 1.6 0 0 1 2.4-2.1L7 15"/>',
};
// Іконки для вибору (порядок у сітці)
const CAT_ICONS = ['utensils','cart','coffee','drink','car','fuel','parking','bus','train','plane','home','bulb','bolt','drop','flame','phone','wifi','gamepad','film','music','tv','repeat','shirt','bag','pill','health','heart','sparkles','scissors','dumbbell','gift','book','school','paw','users','umbrella','receipt','wrench','hand','briefcase','laptop','card','cash','coins','percent','trend','chart','dollar','star','dots'];
const ACC_ICONS = ['cash','card','wallet','bank','piggy','stack','coins','shield','target','mountain','plane','home','car','trend','chart','percent','dollar','gem','globe','briefcase','school','gift','heart','star'];
// Перетворення старих емодзі в нові іконки
const EMOJI_MAP = { '🍔':'utensils','🛒':'cart','☕':'coffee','🍕':'utensils','🍺':'drink','🚗':'car','⛽':'fuel','🅿️':'parking','🚌':'bus','🚕':'car','🏠':'home','💡':'bulb','🔥':'flame','💧':'drop','📱':'phone','🌐':'wifi','🎮':'gamepad','🎬':'film','🎵':'music','📺':'tv','👕':'shirt','👟':'shirt','💊':'pill','🏥':'health','🦷':'health','💅':'sparkles','💇':'scissors','🏋️':'dumbbell','⚽':'dumbbell','✈️':'plane','🏖️':'plane','🏨':'home','🎁':'gift','🎉':'star','📚':'book','🎓':'school','🐾':'paw','👶':'users','💸':'hand','🧾':'receipt','🔧':'wrench','🛠️':'wrench','🧹':'home','🚬':'dots','❤️':'heart','🙏':'heart','💼':'briefcase','💻':'laptop','💳':'card','📈':'trend','💰':'coins','🏦':'bank','🪙':'coins','📊':'chart','🛍️':'bag','🧴':'sparkles','🎂':'gift','👻':'dots','💵':'cash','🐷':'piggy','👛':'wallet','🏧':'bank','🏔️':'mountain','🎯':'target','🛡️':'shield','💎':'gem','🌍':'globe','🇺🇸':'dollar','🇪🇺':'globe' };
const ico = (n, cls = '') => `<svg class="ci ${cls}" viewBox="0 0 24 24">${ICONS[n] || ICONS[EMOJI_MAP[n]] || ICONS.dots}</svg>`;
const bi = n => ico(n, 'bi');
const NOCAT = { id: '', name: 'Без категорії', icon: 'dots', color: '#555' };

const ICON = {
  menu: '<svg class="i" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h12"/></svg>',
  cal: '<svg class="i" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18M8 15h.01M12 15h.01M16 15h.01"/></svg>',
  plus: '<svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  chev: '<svg class="i chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  dl: '<svg class="i" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>',
};

/* ================= Утиліти ================= */
const $ = s => document.querySelector(s);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayStr = () => ymd(new Date());
const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = s => { const v = parseFloat(String(s ?? '').replace(/[\s  ]/g, '').replace(',', '.')); return isFinite(v) ? v : 0; };
const r2 = v => Math.round(v * 100) / 100;
const str = v => v ? String(r2(v)).replace('.', ',') : '';
const fmt = v => r2(v).toLocaleString('uk-UA', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(/[   ]/g, ' ').replace('−', '-');
const money = (v, c = 'UAH') => c === 'UAH' ? fmt(v) : fmt(v) + ' ' + CUR[c];
const uah = v => fmt(v) + ' ₴';
const sgn = v => v > 0 ? '+' : '';
const short = v => v >= 1000 ? fmt(Math.round(v / 100) / 10) + 'к' : fmt(Math.round(v));
const dmy = s => s.split('-').reverse().join('.');

/* ================= Дані ================= */
function defaults() {
  const c = (name, icon, color, kind = 'expense') => ({ id: uid(), name, icon, color, kind });
  return {
    version: 2,
    accounts: [
      { id: uid(), name: 'готівка', type: 'cash', currency: 'UAH', initial: 0, icon: 'cash' },
      { id: uid(), name: 'mono', type: 'card', currency: 'UAH', initial: 0, icon: 'card' },
      { id: uid(), name: 'приват24', type: 'card', currency: 'UAH', initial: 0, icon: 'card' },
      { id: uid(), name: 'фінансова подушка', type: 'saving', currency: 'USD', initial: 0, icon: 'shield' },
      { id: uid(), name: 'на Карпати', type: 'saving', currency: 'UAH', initial: 0, icon: 'mountain' },
    ],
    categories: [
      c('Харчування', 'utensils', '#3DD6A0'), c('Продукти', 'cart', '#7ED957'), c('Кафе', 'coffee', '#C08552'),
      c('Автомобіль', 'car', '#5BC0BE'), c('Пальне', 'fuel', '#F08A4B'), c('Транспорт', 'bus', '#4C6EF5'),
      c('Житло', 'home', '#9B7BF0'), c('Комунальні', 'bulb', '#FFB020'), c('Телефон', 'phone', '#E86A92'),
      c('Інтернет', 'wifi', '#4FA8E0'), c('Розваги', 'gamepad', '#2FB5A5'), c('Одяг', 'shirt', '#D16BD8'),
      c('Здоровʼя', 'pill', '#E05D5D'), c('Краса', 'sparkles', '#E86A92'), c('Спорт', 'dumbbell', '#3DD6A0'),
      c('Подорожі', 'plane', '#4FA8E0'), c('Подарунки', 'gift', '#F5C542'), c('Освіта', 'book', '#6C8EAD'),
      c('Підписки', 'repeat', '#9B7BF0'), c('Тварини', 'paw', '#C08552'), c('Борг', 'hand', '#5BC0BE'),
      c('Інше', 'dots', '#4FA8E0'),
      c('Зарплата', 'briefcase', '#3DD6A0', 'income'), c('Фріланс', 'laptop', '#4FA8E0', 'income'),
      c('Подарунки', 'gift', '#F5C542', 'income'), c('Кешбек', 'card', '#9B7BF0', 'income'),
      c('Відсотки / дивіденди', 'percent', '#7ED957', 'income'), c('Інше', 'coins', '#8E8E93', 'income'),
    ],
    tx: [],
    rates: { USD: 41.5, EUR: 48.5, updated: null, auto: true },
    budget: { total: 0, cats: {} },
    lastAccount: null,
    migContrib: true,
  };
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE));
    if (s && Array.isArray(s.accounts)) return fix(s);
  } catch (e) {}
  return defaults();
}
function fix(s) {
  s.rates = Object.assign({ USD: 41.5, EUR: 48.5, updated: null, auto: true }, s.rates || {});
  s.tx = Array.isArray(s.tx) ? s.tx : [];
  s.categories = Array.isArray(s.categories) ? s.categories : defaults().categories;
  // старі емодзі → нові іконки
  s.categories.forEach(c => { if (!ICONS[c.icon]) c.icon = EMOJI_MAP[c.icon] || 'dots'; });
  s.accounts.forEach(a => { if (!ICONS[a.icon]) a.icon = EMOJI_MAP[a.icon] || TYPE_ICON[a.type] || 'wallet'; });
  s.budget = Object.assign({ total: 0, cats: {} }, s.budget || {});
  // Разово: якщо накопичення заповнили кнопкою «Вартість» без жодного внеску — перше поповнення вважаємо внеском
  if (!s.migContrib) {
    s.accounts.filter(a => a.type === 'saving' && !(+a.initial)).forEach(a => {
      const hasContrib = s.tx.some(t => (t.type === 'transfer' && t.toAccountId === a.id) || (t.type === 'adjust' && t.contrib && t.accountId === a.id));
      if (hasContrib) return;
      const first = s.tx.filter(t => t.type === 'adjust' && t.accountId === a.id && t.amount > 0).sort((x, y) => x.date < y.date ? -1 : x.date > y.date ? 1 : (x.created || 0) - (y.created || 0))[0];
      if (first) first.contrib = true;
    });
    s.migContrib = true;
  }
  return s;
}
let S = load();
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { toast('Не вдалося зберегти дані'); } };

const now0 = new Date();
let VM = { y: now0.getFullYear(), m: now0.getMonth() };
let tab = 'tx', chartKind = 'expense', B = {};

const acc = id => S.accounts.find(a => a.id === id);
const cat = id => S.categories.find(c => c.id === id) || NOCAT;
const rate = c => c === 'UAH' ? 1 : (+S.rates[c] || 1);
const toUAH = (v, c) => v * rate(c);
const txUAH = t => toUAH(t.amount, acc(t.accountId)?.currency || 'UAH');
const monthKey = (y, m) => `${y}-${pad(m + 1)}`;
const monthTx = (y = VM.y, m = VM.m) => S.tx.filter(t => t.date.startsWith(monthKey(y, m)));
const byDateDesc = (a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : (b.created || 0) - (a.created || 0);
const sumType = (list, type) => list.filter(t => t.type === type).reduce((s, t) => s + txUAH(t), 0);
const totalUAH = accs => accs.reduce((s, a) => s + toUAH(B[a.id] || 0, a.currency), 0);
const mainAccs = () => S.accounts.filter(a => !isSav(a));
const savAccs = () => S.accounts.filter(isSav);

function balances() {
  const b = {};
  S.accounts.forEach(a => b[a.id] = +a.initial || 0);
  for (const t of S.tx) {
    if (t.type === 'expense') { if (t.accountId in b) b[t.accountId] -= t.amount; }
    else if (t.type === 'income' || t.type === 'adjust') { if (t.accountId in b) b[t.accountId] += t.amount; }
    else if (t.type === 'transfer') {
      if (t.accountId in b) b[t.accountId] -= t.amount;
      if (t.toAccountId in b) b[t.toAccountId] += (t.toAmount ?? t.amount);
    }
  }
  return b;
}

/* ---------- Річна дохідність (XIRR) ---------- */
const MIN_DAYS = 30;
const dayDiff = (a, b) => (parseD(b) - parseD(a)) / 864e5;
function xirr(flows) {
  if (flows.length < 2) return null;
  flows = flows.slice().sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0);
  const d0 = flows[0].d, span = dayDiff(d0, flows[flows.length - 1].d);
  if (span < MIN_DAYS) return { rate: null, days: span };
  const pts = flows.map(f => ({ t: dayDiff(d0, f.d) / 365, v: f.v }));
  if (!pts.some(p => p.v < 0) || !pts.some(p => p.v > 0)) return { rate: null, days: span };
  const npv = r => pts.reduce((s, p) => s + p.v / Math.pow(1 + r, p.t), 0);
  let lo = -0.9999, hi = 1, flo = npv(lo), fhi = npv(hi);
  while (flo * fhi > 0 && hi < 1e4) { hi *= 2; fhi = npv(hi); }
  if (flo * fhi > 0) return { rate: null, days: span };
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2, fm = npv(mid);
    if (Math.abs(fm) < 1e-7) { lo = hi = mid; break; }
    if (flo * fm < 0) hi = mid; else { lo = mid; flo = fm; }
  }
  return { rate: (lo + hi) / 2 * 100, days: span };
}
function accStart(a) {
  if (a.startDate) return a.startDate;
  const ds = S.tx.filter(t => t.accountId === a.id || t.toAccountId === a.id).map(t => t.date).sort();
  return ds[0] || todayStr();
}
function accFlows(a, conv = 1) {
  const fl = [];
  if (+a.initial) fl.push({ d: accStart(a), v: -a.initial * conv });
  for (const t of S.tx) {
    if (t.type === 'transfer') {
      if (t.toAccountId === a.id) fl.push({ d: t.date, v: -(t.toAmount ?? t.amount) * conv });
      if (t.accountId === a.id) fl.push({ d: t.date, v: t.amount * conv });
    } else if (t.type === 'adjust' && t.contrib && t.accountId === a.id) fl.push({ d: t.date, v: -t.amount * conv });
  }
  return fl;
}
function savStats(list = savAccs()) {
  const today = todayStr(), all = [];
  const per = list.map(a => {
    let contrib = +a.initial || 0;
    for (const t of S.tx) {
      if (t.type === 'transfer') {
        if (t.toAccountId === a.id) contrib += (t.toAmount ?? t.amount);
        if (t.accountId === a.id) contrib -= t.amount;
      } else if (t.type === 'adjust' && t.contrib && t.accountId === a.id) contrib += t.amount;
    }
    const bal = B[a.id] || 0;
    all.push(...accFlows(a, rate(a.currency)), { d: today, v: toUAH(bal, a.currency) });
    return { a, bal, contrib, profit: r2(bal - contrib), pct: contrib > 0 ? (bal - contrib) / contrib * 100 : 0, uah: toUAH(bal, a.currency), cuah: toUAH(contrib, a.currency),
      annual: xirr([...accFlows(a), { d: today, v: bal }]) };
  });
  const total = per.reduce((s, p) => s + p.uah, 0), contrib = per.reduce((s, p) => s + p.cuah, 0);
  return { per, total, contrib, profit: r2(total - contrib), pct: contrib > 0 ? (total - contrib) / contrib * 100 : 0, annual: xirr(all) };
}
function annualTxt(x) {
  if (!x) return '—';
  if (x.rate == null) return x.days < MIN_DAYS ? `мало даних (${Math.max(0, Math.floor(x.days))} дн.)` : '—';
  return `${sgn(x.rate)}${fmt(x.rate)}%`;
}
const annualCls = x => x && x.rate != null ? (x.rate >= 0 ? 'green' : 'red') : 'muted';
function periodTxt(days) {
  const y = Math.floor(days / 365), m = Math.floor((days % 365) / 30.44);
  return [y ? `${y} р.` : '', m ? `${m} міс.` : '', !y && !m ? `${Math.floor(days)} дн.` : ''].filter(Boolean).join(' ');
}

/* ================= Спільні елементи ================= */
function txRow(t) {
  const a = acc(t.accountId), cur = a?.currency || 'UAH';
  if (t.type === 'transfer') {
    const to = acc(t.toAccountId), fromName = t.accountId ? (a?.name || '?') : 'Ззовні';
    return `<button class="tx" data-act="editTx" data-id="${t.id}">
      <div class="ic" style="background:#E0A82E">${ico('transfer')}</div>
      <div class="t grow"><b>${esc(fromName)}<span class="arrow">➝</span>${esc(to?.name || '?')}</b>${t.note ? `<small>${esc(t.note)}</small>` : ''}</div>
      <div class="a">${t.accountId ? money(t.amount, cur) : '+' + money(t.toAmount ?? t.amount, to?.currency)}${t.accountId ? `<small>➝ ${money(t.toAmount ?? t.amount, to?.currency || cur)}</small>` : ''}</div></button>`;
  }
  if (t.type === 'adjust') {
    return `<button class="tx" data-act="editTx" data-id="${t.id}">
      <div class="ic" style="background:#3a3a3d">${ico('scale')}</div>
      <div class="t grow"><b>${t.contrib ? (t.amount >= 0 ? 'Внесок' : 'Зняття') : isSav(a) ? 'Зміна вартості' : 'Коригування балансу'}</b><small>${esc(a?.name || '')}${t.note ? ' · ' + esc(t.note) : ''}</small></div>
      <div class="a ${t.amount >= 0 ? 'green' : 'red'}">${sgn(t.amount)}${money(t.amount, cur)}</div></button>`;
  }
  const c = cat(t.categoryId), inc = t.type === 'income';
  return `<button class="tx" data-act="editTx" data-id="${t.id}">
    <div class="ic" style="background:${c.color}">${ico(c.icon)}</div>
    <div class="t grow"><b>${esc(c.name)}</b><small>${esc(a?.name || '')}${t.note ? ' · ' + esc(t.note) : ''}</small></div>
    <div class="a ${inc ? 'green' : ''}">${inc ? '+' : '-'}${money(t.amount, cur)}</div></button>`;
}

function accRow(a, extra = '') {
  const b = B[a.id] || 0;
  return `<button class="acc-row" data-act="account" data-id="${a.id}">
    <div class="acc-ic">${ico(a.icon || TYPE_ICON[a.type])}</div>
    <div class="grow"><b>${esc(a.name)}${inTotal(a) ? '' : '<span class="tag">не в балансі</span>'}</b>${a.currency !== 'UAH' ? `<small class="muted">≈ ${uah(toUAH(b, a.currency))}</small>` : ''}${extra}</div>
    <div class="a ${b < 0 ? 'red' : ''}">${fmt(b)} ${CUR[a.currency]}</div>${ICON.chev}</button>`;
}

function monthPick() {
  return `<div class="month-pick"><button data-act="prevMonth">‹</button><div class="m"><small>${VM.y}</small><b>${MSHORT[VM.m]}</b></div><button data-act="nextMonth">›</button></div>`;
}

function donut(segs, center, sub) {
  const R = 62, C = 2 * Math.PI * R, tot = segs.reduce((s, x) => s + x.v, 0) || 1, gap = segs.length > 1 ? 2 : 0;
  let off = 0;
  const arcs = segs.map(s => {
    const len = s.v / tot * C, d = Math.max(len - gap, 0.5);
    const el = `<circle cx="80" cy="80" r="${R}" fill="none" stroke="${s.color}" stroke-width="22" stroke-dasharray="${d} ${C - d}" stroke-dashoffset="${-off}"/>`;
    off += len; return el;
  }).join('');
  return `<svg class="donut" viewBox="0 0 160 160"><g transform="rotate(-90 80 80)">${arcs || `<circle cx="80" cy="80" r="${R}" fill="none" stroke="#2a2a2d" stroke-width="22"/>`}</g>
    <text x="80" y="${sub ? 78 : 85}" text-anchor="middle" class="d-main">${center}</text>${sub ? `<text x="80" y="96" text-anchor="middle" class="d-sub">${sub}</text>` : ''}</svg>`;
}

function legend(items, total) {
  const top = items.slice(0, 5);
  const rest = items.slice(5).reduce((s, i) => s + i.v, 0);
  const rows = top.map(i => `<div><i style="background:${i.color}"></i><span>${esc(i.name)}</span><em>${fmt(i.v / total * 100)}%</em></div>`);
  if (rest > 0) rows.push(`<div><i style="background:#555"></i><span>Інші</span><em>${fmt(rest / total * 100)}%</em></div>`);
  return `<div class="legend">${rows.join('')}</div>`;
}
const emptyIco = n => `<div class="e">${ico(n)}</div>`;

/* ================= Екрани ================= */
function viewTx() {
  const list = monthTx().sort(byDateDesc);
  const total = totalUAH(S.accounts.filter(inTotal));
  const exp = sumType(list, 'expense');
  const byDay = {};
  for (const t of list) (byDay[t.date] ||= []).push(t);
  const days = Object.keys(byDay).sort().reverse().map(d => {
    const ts = byDay[d], e = sumType(ts, 'expense'), i = sumType(ts, 'income'), dt = parseD(d);
    return `<div class="day"><span>${dt.getDate()} ${MSHORT[dt.getMonth()]}. &nbsp;<span class="dim">${DAYS[dt.getDay()]}</span></span>
      <span>${e ? 'Витрати: ' + fmt(e) : ''}${e && i ? ' &nbsp; ' : ''}${i ? 'Доходи: ' + fmt(i) : ''}</span></div>${ts.map(txRow).join('')}`;
  }).join('');
  const empty = S.tx.length === 0
    ? `<div class="empty">${emptyIco('wave')}<b>Вітаю!</b><br>1. У вкладці «Рахунки» вкажіть залишки на своїх рахунках.<br>2. Натисніть <b>+</b>, щоб додати першу витрату.</div>`
    : `<div class="empty">${emptyIco('calendar')}У ${MONTHS[VM.m].toLowerCase()} операцій немає</div>`;
  return `
  <header class="top"><button class="icon-btn" data-act="settings" aria-label="Налаштування">${ICON.menu}</button>
    <h1>Менеджер фінансів</h1><button class="icon-btn" data-act="today" aria-label="Поточний місяць">${ICON.cal}</button></header>
  <div class="summary">${monthPick()}
    <div class="sum-cell"><span>Загальний баланс</span><b>${fmt(total)}</b></div>
    <div class="sum-cell"><span>Витрати</span><b>${fmt(exp)}</b></div>
  </div>
  <div class="list">${days || empty}</div>`;
}

function chartsHead() {
  const K = { expense: 'Витрати', income: 'Доходи', budget: 'Бюджет' };
  return `<header class="top"><span class="icon-btn"></span>
    <div class="seg seg3">${Object.entries(K).map(([k, v]) => `<button data-act="chartKind" data-kind="${k}" class="${chartKind === k ? 'on' : ''}">${v}</button>`).join('')}</div>
    <button class="icon-btn" data-act="report" aria-label="Звіт">${ICON.dl}</button></header>
  <div class="month-nav"><button data-act="prevMonth">‹</button><b>${MONTHS[VM.m]} ${VM.y}</b><button data-act="nextMonth">›</button></div>`;
}

/* ---------- Бюджет ---------- */
let gaugeN = 0;
function gauge(spent, budget, size = 120) {
  const left = budget - spent, over = left < 0;
  const p = budget > 0 ? Math.max(0, Math.min(1, left / budget)) : 0;
  const y = 6 + (1 - p) * 88, id = 'gc' + (++gaugeN), col = over ? 'var(--red)' : p < .15 ? '#F08A4B' : 'var(--acc)';
  const w = 'q12.5 -5 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0';
  return `<svg class="gauge" viewBox="0 0 100 100" style="width:${size}px;height:${size}px">
    <defs><clipPath id="${id}"><circle cx="50" cy="50" r="44"/></clipPath></defs>
    <circle cx="50" cy="50" r="44" fill="#232326"/>
    <g clip-path="url(#${id})"><path class="wave" d="M-50 ${y} ${w} V110 H-50z" fill="${col}" opacity=".9"/><path class="wave w2" d="M-50 ${y + 2} ${w} V110 H-50z" fill="${col}" opacity=".45"/></g>
    <circle cx="50" cy="50" r="47" fill="none" stroke="${col}" stroke-width="3"/>
    <text x="50" y="49" text-anchor="middle" class="g-main">${over ? 'Перевищено' : fmt(p * 100) + '%'}</text>
    <text x="50" y="62" text-anchor="middle" class="g-sub">${over ? 'на ' + short(-left) : 'залишилося'}</text></svg>`;
}
function budgetCard(title, iconHtml, budget, spent, act = '') {
  const left = budget - spent;
  return `<div class="card budget"${act}><div class="b-info">
      <div class="b-title">${iconHtml}${title}</div>
      <div class="flex"><span class="muted">Бюджет</span><span>${fmt(budget)}</span></div>
      <div class="flex"><span class="muted">Витрати</span><span>${fmt(spent)}</span></div>
      <div class="flex b-left"><span class="muted">Залишилося</span><b class="${left < 0 ? 'red' : ''}">${fmt(left)}</b></div>
    </div>${gauge(spent, budget, iconHtml ? 104 : 124)}</div>`;
}
function viewBudget() {
  gaugeN = 0;
  const bd = S.budget, list = monthTx().filter(t => t.type === 'expense');
  const spentBy = {}; list.forEach(t => { const k = t.categoryId || ''; spentBy[k] = (spentBy[k] || 0) + txUAH(t); });
  const spent = list.reduce((s, t) => s + txUAH(t), 0);
  const catIds = Object.keys(bd.cats).filter(id => bd.cats[id] > 0 && S.categories.some(c => c.id === id));
  if (!bd.total && !catIds.length) return chartsHead() + `<div class="empty">${emptyIco('target')}Встановіть, скільки плануєте витрачати за місяць — загалом і по категоріях.<br><br>
    <button class="btn primary" data-act="budgetEdit">Налаштувати бюджет</button></div>`;
  const now = new Date(), isCur = VM.y === now.getFullYear() && VM.m === now.getMonth();
  const daysLeft = isCur ? new Date(VM.y, VM.m + 1, 0).getDate() - now.getDate() + 1 : 0;
  const total = bd.total || catIds.reduce((s, id) => s + bd.cats[id], 0);
  const noBudget = Object.entries(spentBy).filter(([k]) => !catIds.includes(k)).reduce((s, [, v]) => s + v, 0);
  return chartsHead() + `
  ${budgetCard('Місячний бюджет', '', total, spent, ' data-act="budgetEdit"')}
  ${isCur && total - spent > 0 ? `<div class="b-day muted small">Можна витрачати ≈ <b>${uah((total - spent) / daysLeft)}</b> на день до кінця місяця</div>` : ''}
  ${catIds.map(id => { const c = cat(id); return budgetCard(esc(c.name), `<span class="ic sm" style="background:${c.color}">${ico(c.icon)}</span>`, bd.cats[id], spentBy[id] || 0, ` data-act="catTx" data-id="${id}"`); }).join('')}
  ${catIds.length && noBudget ? `<div class="b-day muted small">Витрати в категоріях без бюджету: ${uah(noBudget)}</div>` : ''}
  <button class="btn primary mx" data-act="budgetEdit">${bi('plus')}Налаштування бюджету</button>`;
}
let BF = null;
function openBudget() {
  resetForms();
  BF = { total: S.budget.total || 0, cats: { ...S.budget.cats } };
  const sum = () => Object.values(BF.cats).reduce((s, v) => s + (+v || 0), 0);
  setSheet('budget', `
    <div class="sheet-head"><button class="link" data-act="closeSheet" style="justify-self:start">Скасувати</button><b>Бюджет на місяць</b><button class="link strong" data-act="budgetSave">Готово</button></div>
    <label class="field"><span>Загальний бюджет, ₴</span><input id="b-total" inputmode="decimal" placeholder="0" value="${esc(str(BF.total))}"></label>
    <div class="hint">Якщо не вказати — дорівнюватиме сумі бюджетів категорій</div>
    <div class="sheet-sub">По категоріях <span id="b-sum" style="text-transform:none">разом: ${fmt(sum())} ₴</span></div>
    <div class="section flat">${S.categories.filter(c => c.kind === 'expense').map(c => `<label class="cat-row"><div class="ic sm" style="background:${c.color}">${ico(c.icon)}</div>
      <span class="grow">${esc(c.name)}</span><input class="b-cat" data-id="${c.id}" inputmode="decimal" placeholder="—" value="${esc(str(BF.cats[c.id]))}"></label>`).join('')}</div>
    <button class="btn primary" data-act="budgetSave">Зберегти</button>`);
  BF.sum = sum;
}
function saveBudget() {
  const cats = {}; Object.entries(BF.cats).forEach(([k, v]) => { if (+v > 0) cats[k] = r2(+v); });
  S.budget = { total: r2(+BF.total || 0), cats };
  save(); closeSheet(); chartKind = 'budget'; tab = 'charts'; render();
}

function viewCharts() {
  if (chartKind === 'budget') return viewBudget();
  const list = monthTx().filter(t => t.type === chartKind);
  const by = {}, cnt = {};
  for (const t of list) { const k = t.categoryId || ''; by[k] = (by[k] || 0) + txUAH(t); cnt[k] = (cnt[k] || 0) + 1; }
  const items = Object.entries(by).map(([id, v]) => { const c = cat(id); return { id, v, name: c.name, color: c.color, icon: c.icon, n: cnt[id] }; }).sort((a, b) => b.v - a.v);
  const total = items.reduce((s, i) => s + i.v, 0);
  const arr = [];
  for (let i = 5; i >= 0; i--) {
    let y = VM.y, m = VM.m - i; while (m < 0) { m += 12; y--; }
    arr.push({ m, v: sumType(monthTx(y, m), chartKind) });
  }
  const max = Math.max(...arr.map(a => a.v), 1);
  const prev = arr.slice(0, 5).filter(a => a.v);
  const avg = prev.length ? prev.reduce((s, a) => s + a.v, 0) / prev.length : 0;
  return chartsHead() + `
  ${total ? `
  <div class="card"><div class="chart-wrap">${donut(items, fmt(total), chartKind === 'expense' ? 'витрачено' : 'отримано')}${legend(items, total)}</div></div>
  <div class="section">${items.map(i => `<button class="cat-row" data-act="catTx" data-id="${i.id}">
      <div class="ic" style="background:${i.color}">${ico(i.icon)}</div>
      <div class="grow"><div class="flex"><span>${esc(i.name)}</span><b>${fmt(i.v)}</b></div>
      <div class="bar"><i style="width:${i.v / total * 100}%;background:${i.color}"></i></div>
      <small>${fmt(i.v / total * 100)}% · операцій: ${i.n}</small></div></button>`).join('')}</div>`
    : `<div class="empty">${emptyIco('chart')}За цей місяць ${chartKind === 'expense' ? 'витрат' : 'доходів'} немає</div>`}
  <div class="card"><div class="card-h"><span>Останні 6 місяців</span>${avg ? `<span>середнє: ${fmt(Math.round(avg))}</span>` : ''}</div>
    <div class="mbars">${arr.map((a, i) => `<div class="mb ${i === 5 ? 'cur' : ''}"><small>${a.v ? short(a.v) : ''}</small><div class="col"><i style="height:${Math.max(a.v / max * 100, 2)}%"></i></div><span>${MSHORT[a.m]}</span></div>`).join('')}</div></div>
  <button class="btn mx" data-act="report">${bi('download')}Завантажити звіт витрат</button>`;
}

function viewAccounts() {
  const accs = mainAccs();
  let assets = 0, liab = 0;
  accs.filter(inTotal).forEach(a => { const v = toUAH(B[a.id] || 0, a.currency); v >= 0 ? assets += v : liab -= v; });
  const groups = ['cash', 'card'].map(t => {
    const g = accs.filter(a => a.type === t); if (!g.length) return '';
    return `<div class="section"><div class="section-h"><span>${TYPES[t]}</span><span>${uah(totalUAH(g.filter(inTotal)))}</span></div>${g.map(a => accRow(a)).join('')}</div>`;
  }).join('');
  const sv = savStats();
  return `
  <header class="top"><span class="icon-btn"></span><h1>Рахунки</h1><button class="icon-btn" data-act="addAccount" data-type="card" aria-label="Додати рахунок">${ICON.plus}</button></header>
  <div class="card hero"><small class="muted">Чисті активи <span class="dim">· без накопичень</span></small>
    <div class="big">${uah(assets - liab)}</div>
    <div class="row2"><div class="mini"><span>Активи</span><b>${uah(assets)}</b></div><div class="mini"><span>Зобовʼязання</span><b>${uah(liab)}</b></div></div></div>
  <div class="rates"><span>1 $ = ${fmt(S.rates.USD)} ₴</span><span>1 € = ${fmt(S.rates.EUR)} ₴</span><span class="muted">${S.rates.auto ? 'курс НБУ' : 'вручну'}</span></div>
  ${groups || `<div class="empty">${emptyIco('wallet')}Рахунків ще немає</div>`}
  ${sv.per.length ? `<div class="section"><div class="section-h"><span>Накопичення</span><span>${uah(sv.total)}</span></div>
    <button class="acc-row" data-act="tab" data-tab="invest"><div class="acc-ic">${ico('stack')}</div><div class="grow"><b>Накопичення та інвестиції</b><small class="muted">${sv.per.length} рах. · детальніше</small></div>${ICON.chev}</button></div>` : ''}`;
}

function viewSavings() {
  const sv = savStats();
  const head = `<header class="top"><span class="icon-btn"></span><h1>Накопичення</h1><button class="icon-btn" data-act="addAccount" data-type="saving" aria-label="Додати">${ICON.plus}</button></header>`;
  if (!sv.per.length) return head + `<div class="empty">${emptyIco('piggy')}Додайте рахунок накопичень або інвестицій:<br>подушка безпеки, депозит, ОВДП, брокер, крипта…<br><br><button class="btn primary" data-act="addAccount" data-type="saving">Додати рахунок</button></div>`;
  const segs = sv.per.filter(p => p.uah > 0).map((p, i) => ({ v: p.uah, color: COLORS[(i + 1) % COLORS.length], name: p.a.name }));
  const byCur = CURS.map(c => ({ c, v: sv.per.filter(p => p.a.currency === c).reduce((s, p) => s + p.uah, 0) })).filter(x => x.v > 0);
  const extra = p => {
    if (!p.profit) return '';
    const cls = p.profit >= 0 ? 'green' : 'red';
    return `<small class="${cls}">${sgn(p.profit)}${fmt(p.profit)} ${CUR[p.a.currency]} (${sgn(p.pct)}${fmt(p.pct)}%)</small>${p.annual?.rate != null ? `<small class="${annualCls(p.annual)}">${sgn(p.annual.rate)}${fmt(p.annual.rate)}% річних</small>` : ''}`;
  };
  const groups = ['saving', 'invest'].map(t => {
    const g = sv.per.filter(p => p.a.type === t); if (!g.length) return '';
    return `<div class="section"><div class="section-h"><span>${TYPES[t]}</span><span>${uah(g.reduce((s, p) => s + p.uah, 0))}</span></div>${g.map(p => accRow(p.a, extra(p))).join('')}</div>`;
  }).join('');
  return head + `
  <div class="card hero"><small class="muted">Усього накопичено</small>
    <div class="big">${uah(sv.total)}</div>
    <div class="muted small">≈ ${fmt(sv.total / rate('USD'))} $ · ${fmt(sv.total / rate('EUR'))} €</div>
    <div class="row2"><div class="mini"><span>Вкладено</span><b>${uah(sv.contrib)}</b></div>
      <div class="mini"><span>Прибуток</span><b class="${sv.profit >= 0 ? 'green' : 'red'}">${sgn(sv.profit)}${uah(sv.profit)}</b><div class="small ${sv.profit >= 0 ? 'green' : 'red'}">${sgn(sv.pct)}${fmt(sv.pct)}%</div></div></div>
    <div class="mini annual"><span>Дохідність, % річних</span>
      <div class="flex"><b class="${annualCls(sv.annual)}">${annualTxt(sv.annual)}</b>${sv.annual?.rate != null ? `<small class="muted">за ${periodTxt(sv.annual.days)}</small>` : ''}</div></div></div>
  ${segs.length ? `<div class="card"><div class="card-h"><span>Розподіл</span><span>${byCur.map(x => `${CUR[x.c]} ${fmt(x.v / sv.total * 100)}%`).join(' · ')}</span></div>
    <div class="chart-wrap">${donut(segs, short(sv.total), 'грн')}${legend(segs, sv.total)}</div></div>` : ''}
  ${groups}
  <p class="muted small" style="padding:0 18px">Поповнити — кнопка <b>+</b> внизу (переказ на рахунок накопичень, не рахується як витрата). Коли змінюється вартість — відкрийте рахунок і натисніть «Вартість».</p>`;
}

const VIEWS = { tx: viewTx, charts: viewCharts, accounts: viewAccounts, invest: viewSavings };
function render() {
  B = balances();
  $('#view').innerHTML = VIEWS[tab]();
  document.querySelectorAll('#tabbar [data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
}

/* ================= Шторка ================= */
const root = $('#sheet-root');
let sheetGen = 0, sheetKey = null, F = null, AF = null, CF = null, RF = null;
function setSheet(key, html, onMount) {
  sheetGen++;
  let sh = root.querySelector('.sheet');
  if (sh && root.classList.contains('open')) {
    const st = key === sheetKey ? sh.scrollTop : 0;
    sh.innerHTML = html; sh.scrollTop = st;
  } else {
    root.innerHTML = `<div class="overlay" data-act="closeSheet"></div><div class="sheet">${html}</div>`;
    sh = root.querySelector('.sheet');
    sh.offsetHeight; root.classList.add('open');
  }
  sheetKey = key;
  onMount && onMount(sh);
}
function closeSheet() {
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  F = AF = CF = RF = null; BF = null; sheetKey = null;
  root.classList.remove('open');
  const g = ++sheetGen;
  setTimeout(() => { if (g === sheetGen) root.innerHTML = ''; }, 300);
}
const resetForms = () => { F = AF = CF = RF = null; BF = null; };
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 2200);
}

/* Клавіатура iPhone: піднімаємо шторку над нею */
if (window.visualViewport) {
  const vv = window.visualViewport, ds = document.documentElement.style;
  let wasOpen = false;
  const upd = () => {
    const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    ds.setProperty('--kb', kb + 'px');
    ds.setProperty('--vvh', vv.height + 'px');
    const open = kb > 80;
    document.body.classList.toggle('kb-open', open);
    if (open && !wasOpen) {
      const el = document.activeElement;
      if (el && el.closest && el.closest('.sheet')) setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 60);
    }
    wasOpen = open;
  };
  vv.addEventListener('resize', upd); vv.addEventListener('scroll', upd); upd();
}

/* ---------- Операція ---------- */
function openTx(id, preset = {}) {
  resetForms();
  if (!S.accounts.length) { toast('Спочатку додайте рахунок'); return openAccountForm(null, 'card'); }
  const t = id ? S.tx.find(x => x.id === id) : null;
  const defAcc = (acc(S.lastAccount) && S.lastAccount) || (S.accounts.find(a => !isSav(a)) || S.accounts[0]).id;
  F = t ? { ...t, accountId: t.accountId || '', amountStr: str(t.type === 'transfer' && !t.accountId ? (t.toAmount ?? t.amount) : t.amount), toAmountStr: str(t.toAmount), toTouched: true }
    : { id: null, type: 'expense', amountStr: '', categoryId: null, accountId: defAcc, toAccountId: null, toAmountStr: '', date: todayStr(), note: '', toTouched: false, ...preset };
  if (F.type === 'transfer' && F.accountId && F.accountId === F.toAccountId) F.accountId = (S.accounts.find(a => a.id !== F.toAccountId && !isSav(a)) || {}).id || F.accountId;
  drawTx(!id);
}
function drawTx(focus) {
  const isT = F.type === 'transfer', isAdj = F.type === 'adjust';
  if (!isT && !F.accountId) F.accountId = (S.accounts.find(a => !isSav(a)) || S.accounts[0]).id;
  const cats = S.categories.filter(c => c.kind === (F.type === 'income' ? 'income' : 'expense'));
  if (!isT && !isAdj && F.categoryId && !cats.some(c => c.id === F.categoryId)) F.categoryId = null;
  const from = acc(F.accountId), to = acc(F.toAccountId);
  const external = isT && !F.accountId;
  const diff = isT && from && to && from.currency !== to.currency;
  const opts = sel => ['cash', 'card', 'saving', 'invest'].map(tp => {
    const g = S.accounts.filter(a => a.type === tp); if (!g.length) return '';
    return `<optgroup label="${TYPES[tp]}">${g.map(a => `<option value="${a.id}" ${a.id === sel ? 'selected' : ''}>${esc(a.name)} (${fmt(B[a.id] || 0)} ${CUR[a.currency]})</option>`).join('')}</optgroup>`;
  }).join('');
  const T = { expense: 'Витрата', income: 'Дохід', transfer: 'Переказ' };
  const amtCur = external ? (to?.currency || 'UAH') : (from?.currency || 'UAH');
  setSheet('tx', `
    <div class="sheet-head"><button class="link" data-act="closeSheet" style="justify-self:start">Скасувати</button><b>${F.id ? 'Редагування' : 'Нова операція'}</b><button class="link strong" data-act="saveTx">Готово</button></div>
    ${isAdj ? `<div class="center muted">${isSav(from) ? 'Зміна балансу' : 'Коригування балансу'} (може бути мінусом)</div>
      ${isSav(from) ? `<label class="field"><span>Це внесок, а не прибуток</span><input type="checkbox" id="f-contrib" class="switch" ${F.contrib ? 'checked' : ''}></label>` : ''}`
      : `<div class="seg">${Object.keys(T).map(k => `<button data-act="txType" data-type="${k}" class="${F.type === k ? 'on' : ''}">${T[k]}</button>`).join('')}</div>`}
    <div class="amount-box ${F.type}"><input id="f-amount" inputmode="decimal" placeholder="0" value="${esc(F.amountStr)}" autocomplete="off"><span>${CUR[amtCur]}</span></div>
    ${isT ? `
      <label class="field"><span>Звідки</span><select id="f-acc"><option value="" ${external ? 'selected' : ''}>Ззовні (без списання)</option>${opts(F.accountId)}</select></label>
      ${external ? '<div class="hint">Гроші просто додадуться на рахунок, ні з якого рахунку не спишуться</div>' : ''}
      <label class="field"><span>Куди</span><select id="f-to"><option value="">— оберіть —</option>${opts(F.toAccountId)}</select></label>
      ${diff ? `<label class="field"><span>Зараховано, ${CUR[to.currency]}</span><input id="f-toamount" inputmode="decimal" placeholder="0" value="${esc(F.toAmountStr)}"></label>
        <div class="hint">Розраховано за курсом, можна змінити на фактичну суму</div>` : ''}`
    : `<label class="field"><span>Рахунок</span><select id="f-acc">${opts(F.accountId)}</select></label>
      ${isAdj ? '' : `<div class="cat-grid">${cats.map(c => `<button class="cat ${c.id === F.categoryId ? 'on' : ''}" data-act="txCat" data-id="${c.id}"><i style="background:${c.color}">${ico(c.icon)}</i><span>${esc(c.name)}</span></button>`).join('')}</div>`}`}
    <label class="field"><span>Дата</span><input type="date" id="f-date" value="${F.date}"></label>
    <label class="field"><span>Коментар</span><input id="f-note" value="${esc(F.note || '')}" placeholder="Необовʼязково"></label>
    <button class="btn primary" data-act="saveTx">Зберегти</button>
    ${F.id ? '<button class="btn danger" data-act="delTx">Видалити операцію</button>' : ''}`,
    focus ? sh => sh.querySelector('#f-amount').focus() : null);
}
function syncToAmount() {
  if (!F || F.type !== 'transfer' || F.toTouched) return;
  const a = acc(F.accountId), b = acc(F.toAccountId);
  if (!a || !b || a.currency === b.currency) return;
  F.toAmountStr = str(num(F.amountStr) * rate(a.currency) / rate(b.currency));
  const el = document.getElementById('f-toamount'); if (el) el.value = F.toAmountStr;
}
function saveTx() {
  const amt = r2(num(F.amountStr));
  if (!amt || (F.type !== 'adjust' && amt < 0)) return toast('Введіть суму');
  const external = F.type === 'transfer' && !F.accountId;
  if (!external && !acc(F.accountId)) return toast('Оберіть рахунок');
  const rec = { id: F.id || uid(), type: F.type, amount: amt, accountId: external ? null : F.accountId, date: F.date || todayStr(), note: (F.note || '').trim(), created: F.created || Date.now() };
  if (F.type === 'adjust' && F.contrib) rec.contrib = true;
  if (F.type === 'expense' || F.type === 'income') {
    if (!F.categoryId) return toast('Оберіть категорію');
    rec.categoryId = F.categoryId;
  }
  if (F.type === 'transfer') {
    const to = acc(F.toAccountId);
    if (!to) return toast('Оберіть, куди переказати');
    if (to.id === F.accountId) return toast('Рахунки мають відрізнятись');
    rec.toAccountId = to.id;
    const from = acc(F.accountId);
    rec.toAmount = external || from.currency === to.currency ? amt : (r2(num(F.toAmountStr)) || r2(amt * rate(from.currency) / rate(to.currency)));
  }
  const i = S.tx.findIndex(t => t.id === rec.id);
  if (i >= 0) S.tx[i] = rec; else S.tx.push(rec);
  if (F.type !== 'adjust' && rec.accountId && !isSav(acc(rec.accountId))) S.lastAccount = rec.accountId;
  if (!F.id) { const d = parseD(rec.date); VM = { y: d.getFullYear(), m: d.getMonth() }; }
  save(); closeSheet(); render(); toast('Збережено ✓');
}

/* ---------- Рахунок ---------- */
function openAccount(id) {
  resetForms();
  const a = acc(id); if (!a) return;
  const b = B[id] || 0;
  const txs = S.tx.filter(t => t.accountId === id || t.toAccountId === id).sort(byDateDesc).slice(0, 150);
  const p = isSav(a) ? savStats([a]).per[0] : null;
  setSheet('acc', `
    <div class="sheet-head"><button class="link" data-act="closeSheet" style="justify-self:start">Закрити</button><b>${esc(a.name)}</b><button class="link" data-act="editAccount" data-id="${id}">Змінити</button></div>
    <div class="acc-hero"><div class="acc-ic lg">${ico(a.icon)}</div><div class="big ${b < 0 ? 'red' : ''}">${fmt(b)} ${CUR[a.currency]}</div>
      ${a.currency !== 'UAH' ? `<div class="muted">≈ ${uah(toUAH(b, a.currency))}</div>` : ''}<div class="muted small">${TYPES[a.type]}${inTotal(a) ? '' : ' · не враховується в загальному балансі'}</div></div>
    ${p ? `<div class="row2"><div class="mini"><span>Вкладено</span><b>${fmt(p.contrib)} ${CUR[a.currency]}</b></div>
      <div class="mini"><span>Прибуток</span><b class="${p.profit >= 0 ? 'green' : 'red'}">${sgn(p.profit)}${fmt(p.profit)} ${CUR[a.currency]}</b><div class="small ${p.profit >= 0 ? 'green' : 'red'}">${sgn(p.pct)}${fmt(p.pct)}%</div></div></div>
      <div class="mini annual"><span>Дохідність, % річних</span><div class="flex"><b class="${annualCls(p.annual)}">${annualTxt(p.annual)}</b>
        <small class="muted">${p.annual?.rate != null ? 'за ' + periodTxt(p.annual.days) : 'з ' + dmy(accStart(a))}</small></div></div>` : ''}
    <div class="btn-row" style="margin-top:10px">
      <button class="btn" data-act="addOp" data-id="${id}">${bi('plus')}Операція</button>
      <button class="btn" data-act="topup" data-id="${id}">${bi('transfer')}Поповнити</button>
      <button class="btn" data-act="adjust" data-id="${id}">${bi('scale')}${a.type === 'invest' ? 'Вартість' : 'Баланс'}</button></div>
    <div class="sheet-sub">Операції</div>
    <div style="margin:0 -16px">${txs.map(txRow).join('') || '<div class="empty">Ще немає операцій</div>'}</div>`);
}

function openAccountForm(id, type = 'card') {
  resetForms();
  const a = id ? acc(id) : null;
  AF = a ? { ...a, inTotal: inTotal(a) } : { id: null, name: '', type, currency: type === 'invest' ? 'USD' : 'UAH', initial: 0, icon: TYPE_ICON[type], inTotal: true };
  drawAccForm();
}
function drawAccForm() {
  const sav = isSav(AF);
  // З вкладки «Накопичення» — лише типи накопичень, з «Рахунків» — лише звичайні
  const types = sav ? ['saving', 'invest'] : ['cash', 'card'];
  setSheet('accform', `
    <div class="sheet-head"><button class="link" data-act="closeSheet" style="justify-self:start">Скасувати</button><b>${AF.id ? 'Рахунок' : sav ? 'Нове накопичення' : 'Новий рахунок'}</b><button class="link strong" data-act="saveAccount">Готово</button></div>
    <div class="acc-hero"><div class="acc-ic lg">${ico(AF.icon)}</div></div>
    <label class="field"><span>Назва</span><input id="a-name" value="${esc(AF.name)}" placeholder="${sav ? 'Напр. Подушка безпеки' : 'Напр. mono'}"></label>
    <div class="field-label">Тип</div>
    <div class="seg">${types.map(k => `<button data-act="accType" data-v="${k}" class="${AF.type === k ? 'on' : ''}">${TYPES[k]}</button>`).join('')}</div>
    <div class="field-label">Валюта</div>
    <div class="seg">${CURS.map(c => `<button data-act="accCur" data-v="${c}" class="${AF.currency === c ? 'on' : ''}">${CUR[c]} ${c}</button>`).join('')}</div>
    <label class="field"><span>${sav ? 'Вже вкладено' : 'Початковий баланс'}</span><input id="a-initial" inputmode="decimal" placeholder="0" value="${esc(str(AF.initial))}"></label>
    <div class="hint">${sav ? 'Сума, яку ви вже внесли. Поточну вартість потім вкажете кнопкою «Вартість».' : 'Залишок на рахунку до першої операції в програмі'}</div>
    ${sav ? `<label class="field"><span>Дата першого внеску</span><input type="date" id="a-start" value="${AF.startDate || (AF.id ? accStart(AF) : todayStr())}"></label>
    <div class="hint">Потрібна, щоб порахувати % річних</div>` : ''}
    <label class="field"><span>Враховувати в загальному балансі</span><input type="checkbox" id="a-total" class="switch" ${AF.inTotal ? 'checked' : ''}></label>
    <div class="hint">Вимкніть, щоб ця сума не додавалась до «Загального балансу» на головному екрані</div>
    <div class="field-label">Іконка</div>
    <div class="emoji-grid">${ACC_ICONS.map(n => `<button data-act="accIcon" data-v="${n}" class="${AF.icon === n ? 'on' : ''}">${ico(n)}</button>`).join('')}</div>
    <button class="btn primary" data-act="saveAccount" style="margin-top:16px">Зберегти</button>
    ${AF.id ? '<button class="btn danger" data-act="delAccount">Видалити рахунок</button>' : ''}`);
}
function saveAccount() {
  AF.name = (AF.name || '').trim();
  if (!AF.name) return toast('Введіть назву');
  const rec = { id: AF.id || uid(), name: AF.name, type: AF.type, currency: AF.currency, initial: r2(+AF.initial || 0), icon: AF.icon };
  if (!AF.inTotal) rec.inTotal = false;
  if (isSav(AF)) rec.startDate = AF.startDate || (AF.id ? accStart(AF) : todayStr());
  const i = S.accounts.findIndex(a => a.id === rec.id);
  if (i >= 0) S.accounts[i] = rec; else S.accounts.push(rec);
  save(); render(); B = balances(); openAccount(rec.id);
}
function delAccount() {
  const n = S.tx.filter(t => t.accountId === AF.id || t.toAccountId === AF.id).length;
  if (!confirm(`Видалити «${AF.name}»${n ? ` і всі його операції (${n})` : ''}? Це не можна скасувати.`)) return;
  S.tx = S.tx.filter(t => t.accountId !== AF.id && t.toAccountId !== AF.id);
  S.accounts = S.accounts.filter(a => a.id !== AF.id);
  save(); closeSheet(); render();
}
function openAdjust(id) {
  resetForms();
  const a = acc(id);
  setSheet('adj', `
    <div class="sheet-head"><button class="link" data-act="account" data-id="${id}" style="justify-self:start">Назад</button><b>${isSav(a) ? 'Поточна вартість' : 'Фактичний баланс'}</b><button class="link strong" data-act="saveAdjust" data-id="${id}">Готово</button></div>
    <div class="amount-box"><input id="adj-val" inputmode="decimal" value="${esc(str(B[id] || 0))}" placeholder="0"><span>${CUR[a.currency]}</span></div>
    ${isSav(a) ? `<div class="seg"><button data-act="adjMode" data-v="contrib" class="${a.type === 'saving' ? 'on' : ''}">Я доклав / зняв гроші</button><button data-act="adjMode" data-v="profit" class="${a.type === 'saving' ? '' : 'on'}">Змінилась вартість</button></div>
    <p class="muted small center" id="adj-hint"></p>`
    : '<p class="muted small center">Вкажіть реальний залишок. Різниця запишеться як коригування і не потрапить у витрати чи доходи.</p>'}
    <button class="btn primary" data-act="saveAdjust" data-id="${id}">Зберегти</button>`,
    sh => { adjHint(); const i = sh.querySelector('#adj-val'); i.focus(); i.select(); });
}
function adjHint() {
  const h = $('#adj-hint'); if (!h) return;
  h.textContent = $('[data-act=adjMode].on')?.dataset.v === 'contrib'
    ? 'Різниця запишеться як ваш внесок — піде у «Вкладено», а не в прибуток.'
    : 'Різниця запишеться як прибуток або збиток (зміна ціни активів, відсотки).';
}
function saveAdjust(id) {
  const v = num($('#adj-val').value), diff = r2(v - (B[id] || 0));
  const contrib = $('[data-act=adjMode].on')?.dataset.v === 'contrib';
  if (diff) S.tx.push({ id: uid(), type: 'adjust', amount: diff, accountId: id, date: todayStr(), note: '', created: Date.now(), ...(contrib ? { contrib: true } : {}) });
  save(); render(); openAccount(id);
}

/* ---------- Категорії з діаграми ---------- */
function openCatTx(id) {
  resetForms();
  const c = cat(id);
  const kind = chartKind === 'income' ? 'income' : 'expense';
  const list = monthTx().filter(t => t.type === kind && (t.categoryId || '') === id).sort(byDateDesc);
  setSheet('cattx', `
    <div class="sheet-head"><span></span><b>${esc(c.name)}</b><button class="link strong" data-act="closeSheet">Закрити</button></div>
    <div class="center muted small">${MONTHS[VM.m]} ${VM.y} · ${uah(list.reduce((s, t) => s + txUAH(t), 0))}</div>
    <div style="margin:8px -16px 0">${list.map(txRow).join('')}</div>`);
}

/* ---------- Звіт ---------- */
function openReport() {
  resetForms();
  RF = { period: 'month', income: false };
  drawReport();
}
function drawReport() {
  const P = { month: `${MONTHS[VM.m]} ${VM.y}`, year: `${VM.y} рік`, all: 'Увесь час' };
  const list = reportTx();
  const exp = sumType(list, 'expense'), inc = sumType(list, 'income');
  setSheet('report', `
    <div class="sheet-head"><span></span><b>Звіт витрат</b><button class="link strong" data-act="closeSheet">Закрити</button></div>
    <div class="field-label">Період</div>
    <div class="seg">${Object.entries(P).map(([k, v]) => `<button data-act="repPeriod" data-v="${k}" class="${RF.period === k ? 'on' : ''}">${v}</button>`).join('')}</div>
    <label class="field"><span>Додати доходи у звіт</span><input type="checkbox" id="r-inc" class="switch" ${RF.income ? 'checked' : ''}></label>
    <div class="card" style="margin:12px 0">
      <div class="flex"><span class="muted">Витрати</span><b>${uah(exp)}</b></div>
      ${RF.income ? `<div class="flex" style="margin-top:6px"><span class="muted">Доходи</span><b class="green">${uah(inc)}</b></div>` : ''}
      <div class="flex" style="margin-top:6px"><span class="muted">Операцій</span><b>${list.filter(t => t.type === 'expense' || (RF.income && t.type === 'income')).length}</b></div></div>
    <button class="btn primary" data-act="repCsv">${bi('sheet')}Завантажити Excel (CSV)</button>
    <button class="btn" data-act="repPrint">${bi('printer')}Звіт для друку / PDF</button>
    <p class="muted small">CSV відкривається в Excel, Numbers та Google Таблицях. «Для друку» відкриває сторінку, яку можна зберегти як PDF через «Поділитися → Друк».</p>`);
}
function reportTx() {
  const pre = RF.period === 'month' ? monthKey(VM.y, VM.m) : RF.period === 'year' ? `${VM.y}-` : '';
  return S.tx.filter(t => t.date.startsWith(pre)).sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
}
function reportData() {
  const list = reportTx().filter(t => t.type === 'expense' || (RF.income && t.type === 'income'));
  const name = RF.period === 'month' ? `${MONTHS[VM.m]} ${VM.y}` : RF.period === 'year' ? `${VM.y} рік` : 'Увесь час';
  const file = RF.period === 'month' ? monthKey(VM.y, VM.m) : RF.period === 'year' ? String(VM.y) : 'all';
  const cats = kind => {
    const by = {};
    list.filter(t => t.type === kind).forEach(t => { const k = t.categoryId || ''; (by[k] ||= { v: 0, n: 0 }); by[k].v += txUAH(t); by[k].n++; });
    const tot = Object.values(by).reduce((s, x) => s + x.v, 0);
    return { tot, rows: Object.entries(by).map(([id, x]) => ({ c: cat(id), ...x, p: tot ? x.v / tot * 100 : 0 })).sort((a, b) => b.v - a.v) };
  };
  return { list, name, file, exp: cats('expense'), inc: cats('income') };
}
function download(name, content, type) {
  const blob = new Blob([content], { type });
  const f = new File([blob], name, { type });
  if (navigator.canShare && /iPhone|iPad|Android/i.test(navigator.userAgent) && navigator.canShare({ files: [f] })) {
    navigator.share({ files: [f], title: name }).catch(() => {});
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
}
function reportCsv() {
  const R = reportData();
  const q = v => { const s = String(v ?? ''); return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const n = v => String(r2(v)).replace('.', ',');
  const L = [];
  L.push(['Звіт', R.name].map(q).join(';'));
  L.push(['Сформовано', new Date().toLocaleString('uk-UA')].map(q).join(';'));
  L.push(['Курс USD / EUR', n(S.rates.USD) + ' / ' + n(S.rates.EUR)].map(q).join(';'));
  L.push('');
  const block = (title, d) => {
    L.push(q(title));
    L.push(['Категорія', 'Сума, грн', 'Частка, %', 'Операцій'].join(';'));
    d.rows.forEach(r => L.push([q(r.c.name), n(r.v), n(r.p), r.n].join(';')));
    L.push([q('Разом'), n(d.tot), '100', d.rows.reduce((s, r) => s + r.n, 0)].join(';'));
    L.push('');
  };
  block('ВИТРАТИ ЗА КАТЕГОРІЯМИ', R.exp);
  if (RF.income) block('ДОХОДИ ЗА КАТЕГОРІЯМИ', R.inc);
  L.push(q('УСІ ОПЕРАЦІЇ'));
  L.push(['Дата', 'Тип', 'Категорія', 'Рахунок', 'Сума', 'Валюта', 'Сума, грн', 'Коментар'].join(';'));
  R.list.forEach(t => {
    const a = acc(t.accountId);
    L.push([dmy(t.date), t.type === 'expense' ? 'Витрата' : 'Дохід', q(cat(t.categoryId).name), q(a?.name || ''),
      n(t.amount), a?.currency || 'UAH', n(txUAH(t)), q(t.note || '')].join(';'));
  });
  download(`zvit-vytraty-${R.file}.csv`, '﻿' + L.join('\r\n'), 'text/csv;charset=utf-8');
}
function reportPrint() {
  const R = reportData();
  const table = (title, d) => `<h2>${title} — ${uah(d.tot)}</h2><table><tr><th>Категорія</th><th class="r">Сума, ₴</th><th class="r">%</th><th class="r">К-сть</th></tr>
    ${d.rows.map(r => `<tr><td><span class="dot" style="background:${r.c.color}"></span>${esc(r.c.name)}</td><td class="r">${fmt(r.v)}</td><td class="r">${fmt(r.p)}</td><td class="r">${r.n}</td></tr>`).join('')}</table>`;
  const html = `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Звіт — ${R.name}</title>
  <style>body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;margin:24px;max-width:800px}h1{margin:0 0 4px}h2{margin:28px 0 8px;font-size:18px}
  .m{color:#777;font-size:13px}table{width:100%;border-collapse:collapse;font-size:14px}td,th{padding:7px 6px;border-bottom:1px solid #e5e5e5;text-align:left}
  th{background:#f6f6f6}.r{text-align:right;white-space:nowrap}.dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:8px}
  button{margin-top:16px;padding:12px 20px;font-size:16px;border-radius:10px;border:0;background:#F5C542}@media print{button{display:none}}</style></head><body>
  <h1>Звіт витрат</h1><div class="m">${R.name} · сформовано ${new Date().toLocaleString('uk-UA')} · 1$ = ${fmt(S.rates.USD)} ₴, 1€ = ${fmt(S.rates.EUR)} ₴</div>
  <button onclick="print()">Друк / Зберегти PDF</button>
  ${table('Витрати', R.exp)}${RF.income ? table('Доходи', R.inc) : ''}
  <h2>Операції</h2><table><tr><th>Дата</th><th>Категорія</th><th>Рахунок</th><th class="r">Сума</th><th>Коментар</th></tr>
  ${R.list.map(t => { const a = acc(t.accountId); return `<tr><td>${dmy(t.date)}</td><td>${esc(cat(t.categoryId).name)}</td><td>${esc(a?.name || '')}</td>
    <td class="r">${t.type === 'income' ? '+' : '-'}${money(t.amount, a?.currency || 'UAH')}</td><td>${esc(t.note || '')}</td></tr>`; }).join('')}</table></body></html>`;
  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
  else download(`zvit-vytraty-${R.file}.html`, html, 'text/html');
}

/* ---------- Налаштування ---------- */
function openSettings() {
  resetForms();
  const r = S.rates;
  const list = k => S.categories.filter(c => c.kind === k).map(c => `<button class="cat-row" data-act="editCat" data-id="${c.id}"><div class="ic sm" style="background:${c.color}">${ico(c.icon)}</div><span class="grow">${esc(c.name)}</span>${ICON.chev}</button>`).join('');
  setSheet('settings', `
    <div class="sheet-head"><span></span><b>Налаштування</b><button class="link strong" data-act="closeSheet">Готово</button></div>
    <div class="sheet-sub">Курси валют</div>
    <label class="field"><span>Автоматично (НБУ)</span><input type="checkbox" id="s-auto" class="switch" ${r.auto ? 'checked' : ''}></label>
    <label class="field"><span>1 $ =</span><input id="s-usd" inputmode="decimal" value="${esc(str(r.USD))}"><span>₴</span></label>
    <label class="field"><span>1 € =</span><input id="s-eur" inputmode="decimal" value="${esc(str(r.EUR))}"><span>₴</span></label>
    <div class="muted small">${r.updated ? 'Оновлено: ' + new Date(r.updated).toLocaleString('uk-UA') : 'Ще не оновлювались'} · <button class="link small" data-act="refreshRates">Оновити зараз</button></div>
    <div class="sheet-sub">Категорії витрат <button class="link" data-act="addCat" data-kind="expense">+ Додати</button></div>
    <div class="section flat">${list('expense')}</div>
    <div class="sheet-sub">Категорії доходів <button class="link" data-act="addCat" data-kind="income">+ Додати</button></div>
    <div class="section flat">${list('income')}</div>
    <div class="sheet-sub">Звіти та дані</div>
    <button class="btn" data-act="report">${bi('sheet')}Звіт витрат (Excel / PDF)</button>
    <button class="btn" data-act="export">${bi('save')}Зберегти резервну копію</button>
    <label class="btn">${bi('upload')}Відновити з копії<input type="file" id="s-import" accept=".json,application/json" hidden></label>
    <button class="btn danger" data-act="reset">Видалити всі дані</button>
    <p class="muted small">Дані зберігаються лише на цьому пристрої. Раз на місяць робіть резервну копію (наприклад, у Файли / iCloud).</p>`);
}
async function fetchRates(manual) {
  try {
    const r = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', { cache: 'no-store' });
    const j = await r.json();
    const u = j.find(x => x.cc === 'USD'), e = j.find(x => x.cc === 'EUR');
    if (!u || !e) throw 0;
    Object.assign(S.rates, { USD: u.rate, EUR: e.rate, updated: new Date().toISOString(), auto: true });
    save(); render();
    if (sheetKey === 'settings') openSettings();
    if (manual) toast(`Курс НБУ: $ ${fmt(u.rate)} · € ${fmt(e.rate)}`);
  } catch (err) { if (manual) toast('Не вдалося отримати курс'); }
}

function openCatForm(id, kind) {
  resetForms();
  const c = id ? cat(id) : null;
  CF = c ? { ...c } : { id: null, name: '', kind, icon: 'cart', color: COLORS[1] };
  drawCatForm();
}
function drawCatForm() {
  setSheet('catform', `
    <div class="sheet-head"><button class="link" data-act="settings" style="justify-self:start">Назад</button><b>${CF.id ? 'Категорія' : 'Нова категорія'}</b><button class="link strong" data-act="saveCat">Готово</button></div>
    <div class="acc-hero"><div class="ic xl" style="background:${CF.color}">${ico(CF.icon)}</div></div>
    <label class="field"><span>Назва</span><input id="c-name" value="${esc(CF.name)}" placeholder="Напр. Кава"></label>
    <div class="seg"><button data-act="catKind" data-v="expense" class="${CF.kind === 'expense' ? 'on' : ''}">Витрата</button><button data-act="catKind" data-v="income" class="${CF.kind === 'income' ? 'on' : ''}">Дохід</button></div>
    <div class="field-label">Колір</div>
    <div class="color-grid">${COLORS.map(c => `<button data-act="catColor" data-v="${c}" class="${CF.color === c ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div>
    <div class="field-label">Іконка</div>
    <div class="emoji-grid">${CAT_ICONS.map(n => `<button data-act="catIcon" data-v="${n}" class="${CF.icon === n ? 'on' : ''}">${ico(n)}</button>`).join('')}</div>
    <button class="btn primary" data-act="saveCat" style="margin-top:16px">Зберегти</button>
    ${CF.id ? '<button class="btn danger" data-act="delCat">Видалити категорію</button>' : ''}`);
}
function saveCat() {
  CF.name = (CF.name || '').trim();
  if (!CF.name) return toast('Введіть назву');
  const rec = { id: CF.id || uid(), name: CF.name, icon: CF.icon, color: CF.color, kind: CF.kind };
  const i = S.categories.findIndex(c => c.id === rec.id);
  if (i >= 0) S.categories[i] = rec; else S.categories.push(rec);
  save(); render(); openSettings();
}

function exportData() {
  download(`finance-backup-${todayStr()}.json`, JSON.stringify(S), 'application/json');
}
function importFile(file) {
  if (!file) return;
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const d = JSON.parse(rd.result);
      if (!Array.isArray(d.accounts) || !Array.isArray(d.tx)) throw 0;
      if (!confirm(`Замінити поточні дані копією? (рахунків: ${d.accounts.length}, операцій: ${d.tx.length})`)) return;
      S = fix(d); save(); closeSheet(); render(); toast('Дані відновлено ✓');
    } catch (e) { toast('Невірний файл'); }
  };
  rd.readAsText(file);
}

/* ================= Події ================= */
function shiftMonth(d) { let m = VM.m + d, y = VM.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } VM = { y, m }; render(); }
const firstSav = () => savAccs()[0]?.id;

const ACT = {
  tab: d => { tab = d.tab; closeSheet(); render(); window.scrollTo(0, 0); },
  prevMonth: () => shiftMonth(-1),
  nextMonth: () => shiftMonth(1),
  today: () => { const n = new Date(); VM = { y: n.getFullYear(), m: n.getMonth() }; render(); },
  add: () => openTx(null, tab === 'invest' && firstSav() ? { type: 'transfer', toAccountId: firstSav() } : {}),
  editTx: d => openTx(d.id),
  txType: d => { F.type = d.type; F.toTouched = false; syncToAmount(); drawTx(); },
  txCat: d => { F.categoryId = d.id; root.querySelectorAll('.cat').forEach(b => b.classList.toggle('on', b.dataset.id === d.id)); },
  saveTx: () => saveTx(),
  delTx: () => { if (confirm('Видалити операцію?')) { S.tx = S.tx.filter(t => t.id !== F.id); save(); closeSheet(); render(); } },
  closeSheet: () => closeSheet(),
  settings: () => openSettings(),
  account: d => openAccount(d.id),
  addAccount: d => openAccountForm(null, d.type || (tab === 'invest' ? 'saving' : 'card')),
  editAccount: d => openAccountForm(d.id),
  accType: d => { if (AF.icon === TYPE_ICON[AF.type]) AF.icon = TYPE_ICON[d.v]; AF.type = d.v; drawAccForm(); },
  accCur: d => { AF.currency = d.v; drawAccForm(); },
  accIcon: d => { AF.icon = d.v; drawAccForm(); },
  saveAccount: () => saveAccount(),
  delAccount: () => delAccount(),
  adjust: d => openAdjust(d.id),
  adjMode: (d, el) => { root.querySelectorAll('[data-act=adjMode]').forEach(b => b.classList.toggle('on', b === el)); adjHint(); },
  saveAdjust: d => saveAdjust(d.id),
  topup: d => openTx(null, { type: 'transfer', toAccountId: d.id }),
  addOp: d => openTx(null, { accountId: d.id }),
  chartKind: d => { chartKind = d.kind; render(); },
  catTx: d => openCatTx(d.id),
  budgetEdit: () => openBudget(),
  budgetSave: () => saveBudget(),
  report: () => openReport(),
  repPeriod: d => { RF.period = d.v; drawReport(); },
  repCsv: () => reportCsv(),
  repPrint: () => reportPrint(),
  refreshRates: () => fetchRates(true),
  addCat: d => openCatForm(null, d.kind),
  editCat: d => openCatForm(d.id),
  catKind: d => { CF.kind = d.v; drawCatForm(); },
  catColor: d => { CF.color = d.v; drawCatForm(); },
  catIcon: d => { CF.icon = d.v; drawCatForm(); },
  saveCat: () => saveCat(),
  delCat: () => { if (confirm(`Видалити категорію «${CF.name}»? Операції залишаться «Без категорії».`)) { S.categories = S.categories.filter(c => c.id !== CF.id); save(); render(); openSettings(); } },
  export: () => exportData(),
  reset: () => { if (confirm('Видалити ВСІ рахунки та операції? Це не можна скасувати.') && confirm('Точно? Радимо спершу зберегти резервну копію.')) { S = defaults(); save(); closeSheet(); render(); } },
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = ACT[el.dataset.act];
  if (fn) fn(el.dataset, el, e);
});
document.addEventListener('input', e => {
  const t = e.target, id = t.id;
  if (F) {
    if (id === 'f-amount') { F.amountStr = t.value; syncToAmount(); }
    else if (id === 'f-toamount') { F.toAmountStr = t.value; F.toTouched = true; }
    else if (id === 'f-note') F.note = t.value;
    else if (id === 'f-date') F.date = t.value;
  }
  if (AF) { if (id === 'a-name') AF.name = t.value; if (id === 'a-initial') AF.initial = num(t.value); if (id === 'a-start') AF.startDate = t.value; }
  if (CF && id === 'c-name') CF.name = t.value;
  if (BF) {
    if (id === 'b-total') BF.total = num(t.value);
    if (t.classList.contains('b-cat')) { BF.cats[t.dataset.id] = num(t.value); const s = $('#b-sum'); if (s) s.textContent = `разом: ${fmt(BF.sum())} ₴`; }
  }
});
document.addEventListener('change', e => {
  const t = e.target, id = t.id;
  if (F && (id === 'f-acc' || id === 'f-to')) {
    F[id === 'f-acc' ? 'accountId' : 'toAccountId'] = t.value || null;
    F.toTouched = false; syncToAmount(); drawTx();
  }
  if (F && id === 'f-date') F.date = t.value;
  if (AF && id === 'a-start') AF.startDate = t.value;
  if (AF && id === 'a-total') AF.inTotal = t.checked;
  if (F && id === 'f-contrib') F.contrib = t.checked;
  if (id === 's-auto') { S.rates.auto = t.checked; save(); if (t.checked) fetchRates(true); }
  if (id === 's-usd' || id === 's-eur') {
    const v = num(t.value); if (v > 0) { S.rates[id === 's-usd' ? 'USD' : 'EUR'] = v; S.rates.auto = false; save(); render(); openSettings(); }
  }
  if (id === 'r-inc' && RF) { RF.income = t.checked; drawReport(); }
  if (id === 's-import') importFile(t.files[0]);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.tagName === 'INPUT') e.target.blur();
  if (e.key === 'Escape' && sheetKey) closeSheet();
});

/* ================= Старт ================= */
save();
render();
if (S.rates.auto && (!S.rates.updated || Date.now() - new Date(S.rates.updated) > 6 * 3600e3)) fetchRates();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
