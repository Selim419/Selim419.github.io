export const SUITS = ['S', 'H', 'C', 'D'];
export const SYMBOLS = { S: '♠', H: '♥', C: '♣', D: '♦' };
export const SUIT_NAMES = { S: 'Maça', H: 'Kupa', C: 'Sinek', D: 'Karo' };
export const RANK = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' };
export const HANDS = [
  { id: 'high', name: 'Yüksek Kart', chips: 5, mult: 1, dc: 10, dm: 1, planet: 'Plüton', example: 'A · 10 · 8 · 5 · 2' },
  { id: 'pair', name: 'Per', chips: 10, mult: 2, dc: 15, dm: 1, planet: 'Merkür', example: 'K · K' },
  { id: 'two', name: 'Döper', chips: 20, mult: 2, dc: 20, dm: 1, planet: 'Uranüs', example: 'K · K · 7 · 7' },
  { id: 'three', name: 'Üçlü', chips: 30, mult: 3, dc: 20, dm: 2, planet: 'Venüs', example: '8 · 8 · 8' },
  { id: 'straight', name: 'Kent', chips: 30, mult: 4, dc: 30, dm: 3, planet: 'Satürn', example: '5 · 6 · 7 · 8 · 9' },
  { id: 'flush', name: 'Renk', chips: 35, mult: 4, dc: 15, dm: 2, planet: 'Jüpiter', example: 'A♥ · J♥ · 8♥ · 5♥ · 2♥' },
  { id: 'full', name: 'Full', chips: 40, mult: 4, dc: 25, dm: 2, planet: 'Dünya', example: 'Q · Q · Q · 4 · 4' },
  { id: 'four', name: 'Kare', chips: 60, mult: 7, dc: 30, dm: 3, planet: 'Mars', example: '9 · 9 · 9 · 9' },
  { id: 'sf', name: 'Sıralı Renk', chips: 100, mult: 8, dc: 40, dm: 4, planet: 'Neptün', example: '5♠ · 6♠ · 7♠ · 8♠ · 9♠' },
];
export const JOKERS = [
  { id: 'smile', name: 'Joker', desc: 'Her ele +4 çarpan.', price: 3, rarity: 'Sıradan', art: 'jester', color: 'coral' },
  { id: 'greedy', name: 'Açgözlü', desc: 'Puan veren her karo için +3 çarpan.', price: 5, rarity: 'Sıradan', art: 'diamond', color: 'gold' },
  { id: 'lusty', name: 'Kupa Kızı', desc: 'Puan veren her kupa için +3 çarpan.', price: 5, rarity: 'Sıradan', art: 'heart', color: 'coral' },
  { id: 'wrath', name: 'Kara Maça', desc: 'Puan veren her maça için +3 çarpan.', price: 5, rarity: 'Sıradan', art: 'spade', color: 'blue' },
  { id: 'club', name: 'Yonca', desc: 'Puan veren her sinek için +3 çarpan.', price: 5, rarity: 'Sıradan', art: 'club', color: 'green' },
  { id: 'jolly', name: 'Neşeli', desc: 'Elinde bir per varsa +8 çarpan.', price: 4, rarity: 'Sıradan', art: 'jester', color: 'gold' },
  { id: 'zany', name: 'Çılgın', desc: 'Elinde üçlü varsa +12 çarpan.', price: 4, rarity: 'Sıradan', art: 'star', color: 'coral' },
  { id: 'sly', name: 'Kurnaz', desc: 'Elinde bir per varsa +50 fiş.', price: 4, rarity: 'Sıradan', art: 'eye', color: 'blue' },
  { id: 'banner', name: 'Sancak', desc: 'Kalan her atma hakkı için +30 fiş.', price: 5, rarity: 'Sıradan', art: 'flag', color: 'blue' },
  { id: 'abstract', name: 'Soyut', desc: 'Sahip olduğun her joker için +3 çarpan.', price: 6, rarity: 'Sıradan', art: 'abstract', color: 'violet' },
  { id: 'fibonacci', name: 'Fibonacci', desc: 'Puan veren her A, 2, 3, 5, 8 için +8 çarpan.', price: 8, rarity: 'Sıra dışı', art: 'spiral', color: 'gold' },
  { id: 'even', name: 'Çift Sayı', desc: 'Puan veren her 2, 4, 6, 8, 10 için +4 çarpan.', price: 4, rarity: 'Sıradan', art: 'number', color: 'green' },
  { id: 'odd', name: 'Tek Sayı', desc: 'Puan veren her A, 3, 5, 7, 9 için +31 fiş.', price: 4, rarity: 'Sıradan', art: 'number', color: 'coral' },
  { id: 'scholar', name: 'Bilgin', desc: 'Puan veren her as için +20 fiş ve +4 çarpan.', price: 5, rarity: 'Sıradan', art: 'eye', color: 'violet' },
  { id: 'scary', name: 'Korkuluk', desc: 'Puan veren her J, Q, K için +30 fiş.', price: 4, rarity: 'Sıradan', art: 'jester', color: 'green' },
  { id: 'smiley', name: 'Gülen Yüz', desc: 'Puan veren her J, Q, K için +5 çarpan.', price: 5, rarity: 'Sıradan', art: 'jester', color: 'gold' },
  { id: 'half', name: 'Yarım Joker', desc: 'En fazla 3 kart oynarsan +20 çarpan.', price: 5, rarity: 'Sıradan', art: 'half', color: 'coral' },
  { id: 'blue', name: 'Mavi Joker', desc: 'Çekme destesindeki her kart için +2 fiş.', price: 5, rarity: 'Sıradan', art: 'card', color: 'blue' },
  { id: 'ice', name: 'Dondurma', desc: '+100 fiş. Her oynanan elden sonra 5 fiş erir.', price: 5, rarity: 'Sıradan', art: 'ice', color: 'blue' },
  { id: 'loyal', name: 'Sadakat', desc: 'Her 6. oynanan elde ×4 çarpan.', price: 7, rarity: 'Sıra dışı', art: 'star', color: 'violet' },
  { id: 'blackboard', name: 'Karatahta', desc: 'Elde kalan tüm kartlar maça veya sinekse ×3 çarpan.', price: 8, rarity: 'Sıra dışı', art: 'abstract', color: 'green' },
  { id: 'stencil', name: 'Şablon', desc: 'Her boş joker yuvası için ×1 çarpan (en az ×1).', price: 8, rarity: 'Sıra dışı', art: 'eye', color: 'violet' },
  { id: 'banana', name: 'Muz', desc: '+15 çarpan. Tur sonunda %15 ihtimalle kaybolur.', price: 4, rarity: 'Sıradan', art: 'banana', color: 'gold' },
  { id: 'rocket', name: 'Roket', desc: 'Tur sonunda $3 kazan.', price: 6, rarity: 'Sıra dışı', art: 'rocket', color: 'coral' },
];
export const DECKS = [
  { id: 'red', name: 'Kırmızı Deste', desc: 'Her tur +1 atma hakkı.', color: 'coral' },
  { id: 'blue', name: 'Mavi Deste', desc: 'Her tur +1 el hakkı.', color: 'blue' },
  { id: 'yellow', name: 'Sarı Deste', desc: 'Oyuna fazladan $10 ile başla.', color: 'gold' },
  { id: 'black', name: 'Siyah Deste', desc: '+1 joker yuvası, her tur −1 el hakkı.', color: 'violet' },
];
export const BOSSES = [
  { id: 'club', name: 'Sinek', desc: 'Sinek kartları puan ve kart etkisi vermez.', suit: 'C' },
  { id: 'plant', name: 'Bitki', desc: 'J, Q ve K kartları puan ve kart etkisi vermez.' },
  { id: 'water', name: 'Su', desc: 'Bu tur hiç atma hakkın yok.' },
  { id: 'psychic', name: 'Medyum', desc: 'Her elde tam 5 kart oynamalısın.' },
  { id: 'hook', name: 'Kanca', desc: 'Her elden sonra eldeki 2 rastgele kart atılır.' },
  { id: 'needle', name: 'İğne', desc: 'Yalnızca 1 el hakkın var. Hedef normal boss hedefinin yarısı.' },
  { id: 'wall', name: 'Duvar', desc: 'Boss hedefi iki katına çıkar.' },
  { id: 'heart', name: 'Kalp', desc: 'Kupa kartları puan ve kart etkisi vermez.', suit: 'H' },
];
export const TAROTS = [
  { id: 'bonus', name: 'Hiyerofant', desc: 'Destendeki 2 kartı bonus karta dönüştürür (+30 fiş).', glyph: 'V' },
  { id: 'mult', name: 'İmparatoriçe', desc: 'Destendeki 2 kartı çarpan karta dönüştürür (+4 çarpan).', glyph: 'III' },
  { id: 'wild', name: 'Âşıklar', desc: 'Destendeki 1 kartı her renge uyan vahşi karta dönüştürür.', glyph: 'VI' },
  { id: 'steel', name: 'Savaş Arabası', desc: '1 kartı çelik yapar: elde kaldığında ×1,5 çarpan.', glyph: 'VII' },
  { id: 'glass', name: 'Adalet', desc: '1 kartı cam yapar: ×2 çarpan; oynandığında %25 kırılır.', glyph: 'XI' },
  { id: 'hermit', name: 'Ermiş', desc: 'Paranı ikiye katlar (en fazla +$20).', glyph: 'IX' },
];
export const VOUCHERS = [
  { id: 'hands', name: 'Kapkaç', desc: 'Her tur kalıcı +1 el hakkı.', price: 10 },
  { id: 'discards', name: 'Çöp Kutusu', desc: 'Her tur kalıcı +1 atma hakkı.', price: 10 },
  { id: 'handSize', name: 'Boya Fırçası', desc: 'Elinde kalıcı +1 kart tut.', price: 10 },
  { id: 'slots', name: 'Antimadde', desc: 'Kalıcı +1 joker yuvası.', price: 10 },
];
const BASE = [300, 800, 2000, 5000, 11000, 20000, 35000, 50000];
export function random(s) {
  s.rng = (s.rng + 0x6D2B79F5) >>> 0;
  let t = s.rng;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
export function shuffle(s, cards) {
  const result = [...cards];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random(s) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function createRun(deck = 'red', seed = '') {
  if (!DECKS.some(d => d.id === deck)) deck = 'red';
  seed = String(seed || Math.random().toString(36).slice(2, 10)).toUpperCase().slice(0, 24);
  let hash = 2166136261;
  for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  const s = {
    version: 1, seed, rng: hash >>> 0, deck, phase: 'blind', ante: 1, blind: 0, round: 0,
    money: deck === 'yellow' ? 14 : 4, score: 0, hands: 0, discards: 0, hand: [], pile: [], used: [],
    cards: SUITS.flatMap(suit => Array.from({ length: 13 }, (_, i) => ({ id: suit + (i + 2), suit, rank: i + 2, enhancement: null }))),
    jokers: [], levels: Object.fromEntries(HANDS.map(h => [h.id, 1])),
    upgrades: { hands: 0, discards: 0, handSize: 0, slots: 0 }, boughtVouchers: [],
    totalHands: 0, bestHand: 0, totalScore: 0, totalEarned: 0, rerollCost: 5, shop: [],
    boss: BOSSES[0].id, selected: [], lastResult: null, history: [], endless: false, sort: 'rank', pack: null,
  };
  return s;
}
export function jokerSlots(s) { return 5 + (s.deck === 'black' ? 1 : 0) + s.upgrades.slots; }
export function currentBoss(s) { return BOSSES.find(b => b.id === s.boss) || BOSSES[0]; }
export function blindTarget(s, blind = s.blind) {
  let base = BASE[s.ante - 1] || Math.round(50000 * 1.8 ** (s.ante - 8));
  let factor = [1, 1.5, 2][blind];
  if (blind === 2 && s.boss === 'wall') factor *= 2;
  if (blind === 2 && s.boss === 'needle') factor /= 2;
  return Math.round(base * factor);
}
export function isDebuffed(s, c) {
  if (s.blind !== 2) return false;
  const b = currentBoss(s);
  return Boolean((b.suit && (c.suit === b.suit || c.enhancement === 'wild')) || (b.id === 'plant' && c.rank >= 11 && c.rank <= 13));
}
export function evaluate(cards) {
  if (!cards.length) return { ...HANDS[0], scoring: [], counts: [] };
  const groups = new Map();
  for (const c of cards) groups.set(c.rank, [...(groups.get(c.rank) || []), c]);
  const sorted = [...groups.values()].sort((a, b) => b.length - a.length || b[0].rank - a[0].rank);
  const counts = sorted.map(g => g.length);
  const ranks = [...groups.keys()].sort((a, b) => a - b);
  const straight = cards.length === 5 && ranks.length === 5 && (ranks[4] - ranks[0] === 4 || ranks.join(',') === '2,3,4,5,14');
  const flush = cards.length === 5 && SUITS.some(suit => cards.every(c => c.suit === suit || c.enhancement === 'wild'));
  let index = 0, scoring = sorted[0].slice(0, 1);
  if (straight && flush) { index = 8; scoring = cards; }
  else if (counts[0] === 4) { index = 7; scoring = sorted[0]; }
  else if (counts[0] === 3 && counts[1] === 2) { index = 6; scoring = cards; }
  else if (flush) { index = 5; scoring = cards; }
  else if (straight) { index = 4; scoring = cards; }
  else if (counts[0] === 3) { index = 3; scoring = sorted[0]; }
  else if (counts[0] === 2 && counts[1] === 2) { index = 2; scoring = [...sorted[0], ...sorted[1]]; }
  else if (counts[0] === 2) { index = 1; scoring = sorted[0]; }
  return { ...HANDS[index], scoring, counts };
}
export function scoreHand(s, cards) {
  const hand = evaluate(cards), level = s.levels[hand.id] || 1;
  let chips = hand.chips + (level - 1) * hand.dc;
  let mult = hand.mult + (level - 1) * hand.dm;
  const effects = [], valid = hand.scoring.filter(c => !isDebuffed(s, c));
  const add = (name, c = 0, m = 0, x = 1) => {
    chips += c; mult = (mult + m) * x;
    if (c || m || x !== 1) effects.push({ name, chips: c, mult: m, x });
  };
  for (const c of valid) {
    add(`${RANK[c.rank] || c.rank}${SYMBOLS[c.suit]}`, c.rank === 14 ? 11 : Math.min(10, c.rank));
    if (c.enhancement === 'bonus') add('Bonus kart', 30);
    if (c.enhancement === 'mult') add('Çarpan kart', 0, 4);
    if (c.enhancement === 'glass') add('Cam kart', 0, 0, 2);
  }
  const kept = s.hand.filter(c => !cards.some(x => x.id === c.id));
  for (const c of kept) if (c.enhancement === 'steel' && !isDebuffed(s, c)) add('Çelik kart', 0, 0, 1.5);
  for (const j of s.jokers) {
    const def = JOKERS.find(x => x.id === j.id);
    if (!def) continue;
    const n = def.name;
    const suitCount = suit => valid.filter(c => c.suit === suit || c.enhancement === 'wild').length;
    const ranks = values => valid.filter(c => values.includes(c.rank)).length;
    switch (j.id) {
      case 'smile': add(n, 0, 4); break;
      case 'greedy': add(n, 0, 3 * suitCount('D')); break;
      case 'lusty': add(n, 0, 3 * suitCount('H')); break;
      case 'wrath': add(n, 0, 3 * suitCount('S')); break;
      case 'club': add(n, 0, 3 * suitCount('C')); break;
      case 'jolly': if (hand.counts.some(v => v >= 2)) add(n, 0, 8); break;
      case 'zany': if (hand.counts.some(v => v >= 3)) add(n, 0, 12); break;
      case 'sly': if (hand.counts.some(v => v >= 2)) add(n, 50); break;
      case 'banner': add(n, s.discards * 30); break;
      case 'abstract': add(n, 0, s.jokers.length * 3); break;
      case 'fibonacci': add(n, 0, 8 * ranks([14, 2, 3, 5, 8])); break;
      case 'even': add(n, 0, 4 * ranks([2, 4, 6, 8, 10])); break;
      case 'odd': add(n, 31 * ranks([14, 3, 5, 7, 9])); break;
      case 'scholar': add(n, 20 * ranks([14]), 4 * ranks([14])); break;
      case 'scary': add(n, 30 * ranks([11, 12, 13])); break;
      case 'smiley': add(n, 0, 5 * ranks([11, 12, 13])); break;
      case 'half': if (cards.length <= 3) add(n, 0, 20); break;
      case 'blue': add(n, s.pile.length * 2); break;
      case 'ice': add(n, Math.max(0, 100 - (j.melt || 0) * 5)); break;
      case 'loyal': if ((s.totalHands + 1) % 6 === 0) add(n, 0, 0, 4); break;
      case 'blackboard': if (kept.length && kept.every(c => ['S', 'C'].includes(c.suit))) add(n, 0, 0, 3); break;
      case 'stencil': add(n, 0, 0, Math.max(1, jokerSlots(s) - s.jokers.length)); break;
      case 'banana': add(n, 0, 15); break;
    }
  }
  return { hand: hand.id, name: hand.name, level, chips, mult, score: Math.floor(chips * mult), scoring: valid.map(c => c.id), effects };
}
export function sortHand(s) {
  s.hand.sort(s.sort === 'suit' ? (a, b) => SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit) || b.rank - a.rank : (a, b) => b.rank - a.rank || SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit));
}
function draw(s) {
  while (s.hand.length < 8 + s.upgrades.handSize && s.pile.length) s.hand.push(s.pile.pop());
  sortHand(s);
}
export function startBlind(s) {
  if (s.phase !== 'blind') return false;
  s.phase = 'playing'; s.round++; s.score = 0; s.selected = []; s.lastResult = null; s.used = []; s.hand = [];
  s.hands = 4 + (s.deck === 'blue' ? 1 : s.deck === 'black' ? -1 : 0) + s.upgrades.hands;
  s.discards = 3 + (s.deck === 'red' ? 1 : 0) + s.upgrades.discards;
  if (s.blind === 2 && s.boss === 'water') s.discards = 0;
  if (s.blind === 2 && s.boss === 'needle') s.hands = 1;
  s.pile = shuffle(s, s.cards.map(c => ({ ...c })));
  draw(s);
  return true;
}
export function selectCard(s, id) {
  if (s.phase !== 'playing' || !s.hand.some(c => c.id === id)) return false;
  if (s.selected.includes(id)) s.selected = s.selected.filter(x => x !== id);
  else if (s.selected.length < 5) s.selected.push(id);
  else return false;
  return true;
}
export function playHand(s) {
  if (s.phase !== 'playing' || !s.selected.length || s.selected.length > 5 || s.hands <= 0) return { error: 'Önce 1–5 kart seç.' };
  if (s.blind === 2 && s.boss === 'psychic' && s.selected.length !== 5) return { error: 'Medyum: tam 5 kart oynamalısın.' };
  const cards = s.hand.filter(c => s.selected.includes(c.id));
  const result = scoreHand(s, cards);
  s.lastResult = result; s.score += result.score; s.totalScore += result.score; s.totalHands++; s.hands--;
  s.bestHand = Math.max(s.bestHand, result.score);
  s.hand = s.hand.filter(c => !s.selected.includes(c.id)); s.used.push(...cards); s.selected = [];
  s.history = [result, ...s.history].slice(0, 20);
  for (const c of cards) if (c.enhancement === 'glass' && result.scoring.includes(c.id) && random(s) < 0.25) {
    s.cards = s.cards.filter(x => x.id !== c.id); result.effects.push({ name: 'Cam kırıldı', chips: 0, mult: 0, x: 1 });
  }
  s.jokers = s.jokers.filter(j => { if (j.id === 'ice') { j.melt = (j.melt || 0) + 1; return j.melt < 20; } return true; });
  if (s.blind === 2 && s.boss === 'hook') {
    for (let i = 0; i < 2 && s.hand.length; i++) s.used.push(...s.hand.splice(Math.floor(random(s) * s.hand.length), 1));
  }
  if (s.score >= blindTarget(s)) {
    s.phase = 'settlement';
    const reward = [3, 4, 5][s.blind], interest = Math.min(5, Math.floor(s.money / 5));
    const rocket = s.jokers.filter(j => j.id === 'rocket').length * 3;
    s.payout = { reward, hands: s.hands, interest, rocket, total: reward + s.hands + interest + rocket };
  } else {
    draw(s);
    if (s.hands === 0 || s.hand.length === 0 || (s.blind === 2 && s.boss === 'psychic' && s.hand.length < 5)) s.phase = 'gameover';
  }
  return result;
}
export function discard(s) {
  if (s.phase !== 'playing' || !s.selected.length || s.discards <= 0) return false;
  s.discards--; s.used.push(...s.hand.filter(c => s.selected.includes(c.id)));
  s.hand = s.hand.filter(c => !s.selected.includes(c.id)); s.selected = []; draw(s);
  if (!s.hand.length) s.phase = 'gameover';
  return true;
}
function offer(s, type, id, price) { return { uid: Math.floor(random(s) * 1e12).toString(36), type, id, price, sold: false }; }
export function generateShop(s) {
  const owned = s.jokers.map(j => j.id);
  const pool = JOKERS.filter(j => !owned.includes(j.id));
  const picks = shuffle(s, pool).slice(0, 2);
  s.shop = picks.map(j => offer(s, 'joker', j.id, j.price));
  const h = HANDS[Math.floor(random(s) * HANDS.length)];
  s.shop.push(offer(s, 'planet', h.id, 3));
  const tarot = TAROTS[Math.floor(random(s) * TAROTS.length)];
  s.shop.push(offer(s, 'tarot', tarot.id, 3));
  const voucher = VOUCHERS.find(v => !s.boughtVouchers.includes(v.id));
  if (voucher) s.shop.push(offer(s, 'voucher', voucher.id, voucher.price));
  s.shop.push(offer(s, 'pack', 'joker', 5));
}
export function collectReward(s) {
  if (s.phase !== 'settlement') return false;
  s.money += s.payout.total; s.totalEarned += s.payout.total;
  s.jokers = s.jokers.filter(j => j.id !== 'banana' || random(s) >= 0.15);
  if (s.ante === 8 && s.blind === 2 && !s.endless) { s.phase = 'victory'; return true; }
  s.phase = 'shop'; s.rerollCost = 5; generateShop(s); return true;
}
export function continueEndless(s) {
  if (s.phase !== 'victory') return false;
  s.endless = true; s.phase = 'shop'; s.rerollCost = 5; generateShop(s); return true;
}
function advance(s) {
  s.blind++;
  if (s.blind > 2) { s.blind = 0; s.ante++; s.boss = BOSSES[(s.ante - 1) % BOSSES.length].id; }
  s.phase = 'blind'; s.hand = []; s.selected = []; s.lastResult = null; s.score = 0; s.hands = 0; s.discards = 0;
}
export function leaveShop(s) { if (s.phase !== 'shop' || s.pack) return false; advance(s); return true; }
export function skipBlind(s) { if (s.phase !== 'blind' || s.blind === 2) return false; s.money += 5; s.totalEarned += 5; advance(s); return true; }
export function reroll(s) {
  if (s.phase !== 'shop' || s.pack || s.money < s.rerollCost) return false;
  s.money -= s.rerollCost; s.rerollCost++; generateShop(s); return true;
}
export function buy(s, uid) {
  if (s.phase !== 'shop' || s.pack) return { error: 'Şu anda alışveriş yapamazsın.' };
  const item = s.shop.find(x => x.uid === uid);
  if (!item || item.sold) return { error: 'Bu ürün satıldı.' };
  if (s.money < item.price) return { error: 'Yeterli paran yok.' };
  if (item.type === 'joker' && s.jokers.length >= jokerSlots(s)) return { error: 'Joker yuvaların dolu. Önce bir joker sat.' };
  if (item.type === 'joker') s.jokers.push({ id: item.id, uid: item.uid, price: item.price });
  if (item.type === 'planet') s.levels[item.id]++;
  if (item.type === 'voucher') { s.upgrades[item.id]++; s.boughtVouchers.push(item.id); }
  s.money -= item.price; item.sold = true;
  let note = '';
  if (item.type === 'tarot') {
    if (item.id === 'hermit') { const amount = Math.min(20, s.money); s.money += amount; note = `+$${amount}`; }
    else {
      const count = ['bonus', 'mult'].includes(item.id) ? 2 : 1;
      const targets = shuffle(s, s.cards.filter(c => !c.enhancement)).slice(0, count);
      if (!targets.length) { s.money += item.price; item.sold = false; return { error: 'Geliştirilebilecek normal kart kalmadı.' }; }
      targets.forEach(c => { c.enhancement = item.id; });
      note = targets.map(c => `${RANK[c.rank] || c.rank}${SYMBOLS[c.suit]}`).join(', ') + ' geliştirildi';
    }
  }
  if (item.type === 'pack') {
    const options = shuffle(s, JOKERS.filter(j => !s.jokers.some(x => x.id === j.id))).slice(0, 3);
    s.pack = options.map(j => ({ id: j.id, uid: Math.floor(random(s) * 1e12).toString(36), price: j.price }));
  }
  return { ok: true, note };
}
export function pickPack(s, uid) {
  if (s.phase !== 'shop' || !s.pack) return false;
  const item = s.pack.find(j => j.uid === uid);
  if (item) { if (s.jokers.length >= jokerSlots(s)) return false; s.jokers.push({ ...item }); }
  else if (uid !== 'skip') return false;
  s.pack = null; return true;
}
export function sellJoker(s, uid) {
  if (!['shop', 'blind'].includes(s.phase)) return false;
  const i = s.jokers.findIndex(j => j.uid === uid);
  if (i < 0) return false;
  s.money += Math.max(1, Math.floor(s.jokers[i].price / 2)); s.jokers.splice(i, 1); return true;
}
export function moveJoker(s, uid, direction) {
  if (!['shop', 'blind', 'playing'].includes(s.phase)) return false;
  const i = s.jokers.findIndex(j => j.uid === uid), next = i + direction;
  if (i < 0 || next < 0 || next >= s.jokers.length) return false;
  [s.jokers[i], s.jokers[next]] = [s.jokers[next], s.jokers[i]]; return true;
}
