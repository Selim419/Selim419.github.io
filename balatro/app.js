import { SUITS, SYMBOLS, SUIT_NAMES, RANK, HANDS, JOKERS, DECKS, TAROTS, VOUCHERS, createRun, jokerSlots, currentBoss, blindTarget, isDebuffed, scoreHand, startBlind, selectCard, playHand, discard, collectReward, continueEndless, leaveShop, skipBlind, reroll, buy, pickPack, sellJoker, moveJoker, sortHand } from './engine.js';

const $ = s => document.querySelector(s);
const KEY = 'balatro-web-run-v1', SETTINGS = 'balatro-web-settings-v1';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1, notation: Math.abs(n) > 99999999 ? 'compact' : 'standard' }).format(n);
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${({ sound: '<path d="m11 5-6 4H2v6h3l6 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>', mute: '<path d="m11 5-6 4H2v6h3l6 4V5Zm5 4 5 6m0-6-5 6"/>', arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>', play: '<path d="m8 5 11 7-11 7V5Z"/>', refresh: '<path d="M20 7v5h-5M4 17v-5h5M5.5 7a8 8 0 0 1 13-2L20 7M4 17l1.5 2a8 8 0 0 0 13-2"/>', discard: '<path d="M4 7h16M9 3h6l1 4H8l1-4ZM6 7l1 14h10l1-14M10 11v6m4-6v6"/>' })[name] || ''}</svg>`;
const btn = (action, text, cls = '', disabled = false, extra = '') => `<button type="button" class="btn ${cls}" data-action="${action}" ${disabled ? 'disabled' : ''} ${extra}>${text}</button>`;
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } }
function validRun(s) {
  return s && s.version === 1 && DECKS.some(d => d.id === s.deck) && ['blind', 'playing', 'settlement', 'shop', 'gameover', 'victory'].includes(s.phase)
    && Number.isFinite(s.money) && Number.isFinite(s.rng) && Number.isFinite(s.score) && Number.isInteger(s.ante) && s.ante >= 1 && s.ante <= 100
    && [0, 1, 2].includes(s.blind) && ['cards', 'hand', 'pile', 'used', 'jokers', 'selected', 'shop', 'history', 'boughtVouchers'].every(k => Array.isArray(s[k]))
    && s.cards.length <= 100 && s.hand.length <= 20 && s.jokers.length <= 20 && s.upgrades && ['hands', 'discards', 'handSize', 'slots'].every(k => Number.isInteger(s.upgrades[k]) && s.upgrades[k] >= 0)
    && s.levels && HANDS.every(h => Number.isInteger(s.levels[h.id]) && s.levels[h.id] > 0)
    && [...s.cards, ...s.hand, ...s.pile].every(c => c && SUITS.includes(c.suit) && c.rank >= 2 && c.rank <= 14 && typeof c.id === 'string')
    && (s.phase !== 'settlement' || s.payout && Number.isFinite(s.payout.total));
}
let cached = read(KEY, null), state = validRun(cached) ? cached : createRun();
let settings = { sound: false, ...read(SETTINGS, {}) }, busy = false, toastTimer, audio, newDeck = 'red', storageWarning = false;
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { if (!storageWarning) { storageWarning = true; toast('Tarayıcı kayda izin vermiyor. İlerlemen bu sekmede tutulacak.'); } }
}
function toast(message) {
  $('#toast').textContent = message; $('#toast').classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3300);
}
function sound(type = 'select') {
  if (!settings.sound) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const notes = { select: [380], discard: [260, 180], play: [330, 440, 660], win: [440, 554, 660, 880], buy: [660, 880] }[type] || [380];
    notes.forEach((hz, i) => {
      const osc = audio.createOscillator(), gain = audio.createGain(), t = audio.currentTime + i * .075;
      osc.type = 'triangle'; osc.frequency.value = hz; gain.gain.setValueAtTime(.045, t); gain.gain.exponentialRampToValueAtTime(.001, t + .13);
      osc.connect(gain); gain.connect(audio.destination); osc.start(t); osc.stop(t + .14);
    });
  } catch { /* Silent fallback for browsers without Web Audio. */ }
}
function jokerArt(j) {
  const art = {
    jester: '<path d="m19 48 7-27 21 16 22-21 10 34-30-5Z" fill="currentColor"/><circle cx="26" cy="21" r="5"/><circle cx="69" cy="16" r="5"/><path d="M27 48h47v16c0 29-47 29-47 0Z" fill="var(--color-paper)"/><path d="m33 57 9 2m18 0 9-2M38 73q13 12 26-1" stroke="currentColor" stroke-width="4" fill="none"/><circle cx="52" cy="67" r="4"/><path d="m27 88-9 17h65L73 88l-22 7Z" fill="currentColor"/>',
    diamond: '<path d="m50 19 32 39-32 41-32-41Z" fill="currentColor"/><path d="m50 30 21 28-21 29-21-29Z" stroke="var(--color-paper)" fill="none" stroke-width="2"/>',
    heart: '<path d="M50 91 21 61C-2 35 33 12 50 39c17-27 52-4 29 22Z" fill="currentColor"/>',
    spade: '<path d="M50 20C35 45 15 48 15 68c0 17 24 22 34 5l-9 28h20l-9-28c10 17 34 12 34-5 0-20-20-23-35-48Z" fill="currentColor"/>',
    club: '<circle cx="50" cy="40" r="20" fill="currentColor"/><circle cx="30" cy="67" r="20" fill="currentColor"/><circle cx="70" cy="67" r="20" fill="currentColor"/><path d="m49 66-11 38h24L51 66Z" fill="currentColor"/>',
    star: '<path d="m50 17 11 28 30 2-23 20 7 30-25-17-25 17 7-30L9 47l30-2Z" fill="currentColor"/><circle cx="50" cy="59" r="11" fill="var(--art-light)"/>',
    eye: '<path d="M10 60q40-60 80 0-40 60-80 0Z" fill="var(--color-paper)" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="60" r="20" fill="currentColor"/><circle cx="54" cy="55" r="6" fill="var(--color-paper)"/><path d="M50 14v10m25 2-7 8m-43-8 7 8M50 96v10" stroke="currentColor" stroke-width="3"/>',
    flag: '<path d="M26 105V19m0 5h52L64 42l14 19H26" fill="currentColor" stroke="currentColor" stroke-width="4"/><path d="m38 34 9 8-9 8m16-16 9 8-9 8" stroke="var(--art-light)" fill="none" stroke-width="3"/>',
    abstract: '<path d="M15 25h40v40H15Zm30 30h40v40H45Z" fill="currentColor"/><circle cx="62" cy="42" r="21" fill="var(--color-paper)"/><path d="m15 96 23-38 22 38Z" fill="var(--color-gold)"/>',
    spiral: '<path d="M50 60c-10-18 24-32 32-8 13 36-43 54-62 17C-2 19 65-1 92 38" stroke="currentColor" stroke-width="6" fill="none"/><text x="41" y="69" font-size="22" fill="currentColor" font-family="monospace">φ</text>',
    number: `<text x="50" y="83" text-anchor="middle" font-size="72" font-family="monospace" font-weight="bold" fill="currentColor">${j.id === 'even' ? '2' : '7'}</text><path d="M20 95h60M20 24h60" stroke="currentColor" stroke-width="3"/>`,
    half: '<path d="M19 27h60v67H19Z" fill="var(--color-paper)"/><path d="M19 27h30v67H19Z" fill="currentColor"/><path d="m49 27 8 12-8 12 8 12-8 12 8 12-8 7" stroke="currentColor" fill="none" stroke-width="3"/>',
    card: '<rect x="20" y="24" width="52" height="72" rx="4" fill="var(--color-paper)" transform="rotate(-12 50 60)"/><text x="50" y="78" text-anchor="middle" font-size="50" fill="currentColor">♠</text>',
    ice: '<path d="m26 63 24 44 24-44Z" fill="currentColor"/><path d="m35 70 26 21m5-20L43 91" stroke="var(--art-light)" stroke-width="2"/><path d="M20 63c-8-9 0-22 10-22-5-27 42-32 40 0 14 0 21 12 10 22Z" fill="var(--color-paper)"/><path d="M31 35q18-23 34 1" fill="none" stroke="currentColor" stroke-width="3"/>',
    banana: '<path d="M21 25c16 47 41 44 61 11 13 51-54 82-65 1Z" fill="var(--color-paper)" stroke="currentColor" stroke-width="3"/><path d="M25 40c13 30 30 33 49 10" fill="none" stroke="currentColor" stroke-width="2"/>',
    rocket: '<path d="M50 15c-19 15-26 34-19 61h38c7-27 0-46-19-61Z" fill="var(--color-paper)"/><circle cx="50" cy="46" r="10" fill="currentColor"/><path d="m29 58-15 26 18-4m39-22 15 26-18-4M40 81l10 26 10-26" fill="currentColor"/>',
  };
  return `<svg class="joker-art" viewBox="0 0 100 120" fill="currentColor" aria-hidden="true"><path d="M0 0h100v120H0z" fill="var(--art-light)"/><path d="M0 0 100 120M-25 0 75 120M25 0 125 120M-50 0 50 120M50 0 150 120" stroke="var(--art-dark)" stroke-width="1" opacity=".12"/>${art[j.art] || art.jester}</svg>`;
}
function jokerCard(j, action = '', uid = '') {
  return `<${action ? 'button type="button"' : 'div'} class="joker-card art-${j.color}" ${action ? `data-action="${action}" data-id="${esc(uid)}" aria-label="${esc(j.name + ' : ' + j.desc)}" title="${esc(j.name + ' — ' + j.desc)}"` : ''}>${jokerArt(j)}<span class="joker-corner">JOKER</span></${action ? 'button' : 'div'}>`;
}
const enhanceNames = { bonus: '+30 FIŞ', mult: '+4 ÇARPAN', steel: 'ÇELİK', glass: 'CAM', wild: 'VAHŞİ' };
function card(c, interactive = false, i = 0, small = false) {
  const red = ['H', 'D'].includes(c.suit), selected = state.selected.includes(c.id), debuff = isDebuffed(state, c);
  const rank = RANK[c.rank] || c.rank, symbol = SYMBOLS[c.suit];
  const tag = interactive ? 'button' : 'div';
  return `<${tag} ${interactive ? `type="button" data-action="card" data-id="${esc(c.id)}" aria-pressed="${selected}"` : ''} class="playing-card ${red ? 'red' : ''} ${interactive && selected ? 'selected' : ''} ${debuff ? 'debuffed' : ''} ${c.enhancement ? 'enhanced' : ''} ${small && !state.pile.some(x => x.id === c.id) ? 'drawn' : ''}" style="--tilt:${interactive ? (i - (state.hand.length - 1) / 2) * .8 : 0}deg;--i:${i}" aria-label="${SUIT_NAMES[c.suit]} ${rank}${c.enhancement ? ', ' + enhanceNames[c.enhancement] : ''}${debuff ? ', etkisiz' : ''}">
    <span class="card-corner">${rank}<small>${symbol}</small></span>
    <span class="card-pip ${c.rank > 10 && c.rank < 14 ? 'face' : ''}">${c.rank > 10 && c.rank < 14 ? `<span>${rank}<small style="font-size:.45em">${symbol}</small></span>` : symbol}</span>
    <span class="card-corner bottom">${rank}<small>${symbol}</small></span>
    ${interactive && selected ? '<span class="card-check">✓</span>' : ''}${debuff ? '<span class="debuff-line"></span>' : ''}
    ${c.enhancement ? `<span class="enhancement">${enhanceNames[c.enhancement]}</span>` : ''}
  </${tag}>`;
}
function chip(index, size = '') { return `<span class="chip ${index === 1 ? 'big' : index === 2 ? 'boss' : ''} ${size}" aria-hidden="true">${index === 2 ? '♠' : index === 1 ? '♦' : '♣'}</span>`; }
const blindName = i => ['Küçük Blind', 'Büyük Blind', currentBoss(state).name][i];
function sidebar() {
  const chosen = state.hand.filter(c => state.selected.includes(c.id));
  const preview = chosen.length ? scoreHand(state, chosen) : null;
  const display = preview || state.lastResult;
  const base = state.phase === 'blind' ? (state.blind === 2 && state.boss === 'needle' ? 1 : 4 + state.upgrades.hands + (state.deck === 'blue' ? 1 : state.deck === 'black' ? -1 : 0)) : state.hands;
  const d = state.phase === 'blind' ? (state.blind === 2 && state.boss === 'water' ? 0 : 3 + state.upgrades.discards + (state.deck === 'red' ? 1 : 0)) : state.discards;
  return `<aside class="sidebar" aria-label="Tur bilgileri">
    <section class="panel blind-panel"><div class="blind-label">${state.blind === 2 ? 'BOSS BLIND' : 'BU TURUN HEDEFİ'}</div><div class="blind-title">${chip(state.blind)}${blindName(state.blind)}</div>
      <div class="target-label">En az</div><div class="target-number">${num(blindTarget(state))}<small>fiş</small></div>
      <div class="progress" role="progressbar" aria-label="Tur hedefi" aria-valuenow="${Math.min(state.score, blindTarget(state))}" aria-valuemin="0" aria-valuemax="${blindTarget(state)}"><div style="--progress:${Math.min(100, state.score / blindTarget(state) * 100)}%"></div></div>
      <div class="progress-copy"><span>${num(state.score)} / ${num(blindTarget(state))}</span><span>Ödül $${[3, 4, 5][state.blind]}</span></div>
    </section>
    <section class="score-panel" aria-label="Puanlama"><span class="eyebrow">TUR PUANI</span><div class="score-number">${num(state.score)}</div><div class="hand-name">${display ? display.name : 'Elini oluştur'} ${display ? `<span>Sv. ${display.level}</span>` : ''}</div><div class="formula"><div class="value">${display ? num(display.chips) : '0'}<small>FİŞ</small></div><div class="times">×</div><div class="value mult">${display ? num(display.mult) : '0'}<small>ÇARPAN</small></div></div></section>
    <div class="resources"><div class="panel resource"><span class="label">Kalan el</span><span class="number">${base}</span></div><div class="panel resource discards"><span class="label">Atma hakkı</span><span class="number">${d}</span></div><div class="panel resource money"><span class="label">Bakiye</span><span class="number">$${num(state.money)}</span></div><div class="panel resource ante"><span class="label">Ante</span><span class="number">${state.ante}<small> / ${state.endless ? '∞' : '8'}</small></span></div></div>
    <div class="side-bottom"><button class="outline-btn" data-action="hands">Poker elleri <small>H</small></button><button class="outline-btn" data-action="collection">Joker koleksiyonu <small>${JOKERS.length}</small></button></div>
  </aside>`;
}
function jokerZone() {
  return `<section class="joker-zone" aria-label="Jokerlerin"><div class="zone-header"><span class="eyebrow">JOKERLERİN</span><span class="count">${state.jokers.length} / ${jokerSlots(state)}</span></div><div class="joker-row" style="${jokerSlots(state) > 5 ? 'flex-wrap:wrap' : ''}">
    ${state.jokers.map(j => jokerCard(JOKERS.find(d => d.id === j.id), 'joker', j.uid)).join('')}
    ${Array.from({ length: Math.max(0, jokerSlots(state) - state.jokers.length) }, () => '<div class="joker-slot" aria-hidden="true">+</div>').join('')}
    ${state.jokers.length === 0 ? '<p class="joker-hint">Küçük bir joker.<br>Büyük bir fark.<br><span>Dükkânda seni bekliyor.</span></p>' : ''}</div></section>`;
}
function blindSelect() {
  return `<section class="blind-select"><div class="section-heading"><h1>${state.round === 0 ? 'Her büyük seri bir elle başlar.' : 'Bir el daha.'}</h1><p>${state.blind === 2 ? esc(currentBoss(state).desc) : 'Poker elleri kur. Jokerleri birleştir. Hedefi aş.'}</p></div><div class="blind-options">${[0, 1, 2].map(i => {
    const current = state.blind === i, done = i < state.blind;
    return `<article class="blind-option ${current ? 'current' : done ? 'done' : 'future'}">${chip(i)}<h3>${blindName(i)}</h3><div class="blind-target">${num(blindTarget(state, i))}</div><div class="blind-reward">Ödül <strong>$${[3, 4, 5][i]}</strong></div>${i === 2 ? `<p class="boss-desc">${esc(currentBoss(state).desc)}</p>` : '<p class="boss-desc">&nbsp;</p>'}
      ${current ? `${btn('start', 'Turu başlat', 'primary full')}${i < 2 ? '<button class="skip" data-action="skip">Pas geç · +$5</button>' : '<div class="locked-label">Son mücadele</div>'}` : `<div class="locked-label">${done ? '✓ Geçildi' : 'Sıradaki tur'}</div><div class="locked-label">${done ? 'Tamamlandı' : i === 2 ? 'BOSS' : 'KİLİTLİ'}</div>`}</article>`;
  }).join('')}</div></section>`;
}
function resultEffects(result) {
  return result.effects.filter(e => !/^[AJQK\d]+[♠♥♣♦]$/.test(e.name)).map(e => `<span class="effect-tag">${esc(e.name)} ${e.chips ? '+' + num(e.chips) + ' fiş' : ''}${e.mult ? '+' + num(e.mult) + ' çarpan' : ''}${e.x !== 1 ? '×' + num(e.x) : ''}</span>`).join('');
}
function playing() {
  const result = state.lastResult;
  return `<div class="play-watermark" aria-hidden="true">♠</div><section class="playing-center" aria-label="Oyun masası">${state.blind === 2 ? `<div class="boss-warning"><strong>${currentBoss(state).name}:</strong> ${esc(currentBoss(state).desc)}</div>` : ''}
    ${result ? `<div class="eyebrow">SON EL · ${result.name.toLocaleUpperCase('tr')}</div><div class="score-pop">+${num(result.score)}</div><div class="last-hand">${num(result.chips)} fiş × ${num(result.mult)} çarpan</div><div class="effects-list">${resultEffects(result)}</div>` : `<div class="center-prompt">Masa senin.</div><p class="center-sub">Aşağıdan 1–5 kart seçerek bir poker eli oluştur.<br>İyi kartları tut, diğerlerini değiştir.</p>`}
    ${state.selected.length ? `<div class="last-hand">Tahmini puan: <strong style="color:var(--color-gold)">${num(scoreHand(state, state.hand.filter(c => state.selected.includes(c.id))).score)}</strong></div>` : ''}
  </section>`;
}
function settlement() {
  const p = state.payout;
  return `<section class="settlement"><h2>Hedef aşıldı!</h2><p class="center-sub">${num(state.score)} fiş. Güzel el.</p><div class="receipt"><div class="receipt-row"><span>Blind ödülü</span><strong>$${p.reward}</strong></div><div class="receipt-row"><span>${p.hands} kalan el</span><strong>$${p.hands}</strong></div><div class="receipt-row"><span>Faiz · her $5 için $1</span><strong>$${p.interest}</strong></div>${p.rocket ? `<div class="receipt-row"><span>Roket jokeri</span><strong>$${p.rocket}</strong></div>` : ''}<div class="receipt-row total"><span>Toplam kazanç</span><strong>$${p.total}</strong></div></div>${btn('collect', state.ante === 8 && state.blind === 2 && !state.endless ? 'Zaferi kutla' : `Kasaya al ${icon('arrow')}`, 'primary full')}</section>`;
}
function itemInfo(item) {
  if (item.type === 'joker') return JOKERS.find(j => j.id === item.id);
  if (item.type === 'planet') { const h = HANDS.find(h => h.id === item.id); return { name: h.planet, desc: `${h.name} seviye ${state.levels[h.id]} → ${state.levels[h.id] + 1}. +${h.dc} fiş, +${h.dm} çarpan.`, glyph: '' }; }
  if (item.type === 'tarot') return TAROTS.find(t => t.id === item.id);
  if (item.type === 'voucher') return VOUCHERS.find(v => v.id === item.id);
  return { name: 'Joker Paketi', desc: '3 rastgele jokerden 1 tanesini seç ve al.' };
}
function itemArt(item, info) {
  if (item.type === 'joker') return jokerCard(info);
  return `<div class="item-art ${item.type}-art" aria-hidden="true">${item.type === 'tarot' ? info.glyph : item.type === 'voucher' ? 'V' : item.type === 'pack' ? 'J' : ''}</div>`;
}
function shop() {
  if (state.pack) return `<section class="shop"><div class="section-heading"><h2>İçinden biri senin.</h2><p>Bir joker seç. Joker yuvaların doluysa önce bir jokerini sat.</p></div><div class="shop-grid">${state.pack.map(j => {
    const def = JOKERS.find(d => d.id === j.id);
    return `<article class="shop-item">${jokerCard(def)}<h3>${def.name}</h3><p>${def.desc}</p>${btn('pick', 'Bu jokeri al', 'primary', state.jokers.length >= jokerSlots(state), `data-id="${j.uid}"`)}</article>`;
  }).join('')}</div><div style="text-align:center;margin-top:16px">${btn('pick', 'Paketi geç', '', false, 'data-id="skip"')}</div></section>`;
  return `<section class="shop"><div class="shop-heading"><div><h2>Dükkân</h2><p>Biraz şans. Biraz strateji. Çokça çarpan.</p></div><div class="shop-actions">${btn('reroll', `${icon('refresh')} $${state.rerollCost}`, '', state.money < state.rerollCost, 'aria-label="Dükkânı yenile"')}${btn('leave', `Sonraki tur ${icon('arrow')}`, 'primary')}</div></div><div class="shop-grid">${state.shop.map(item => {
    const info = itemInfo(item), full = item.type === 'joker' && state.jokers.length >= jokerSlots(state);
    return `<article class="shop-item ${item.sold ? 'sold' : ''}">${itemArt(item, info)}<h3>${info.name}</h3><p>${info.desc}</p>${btn('buy', item.sold ? 'Satıldı' : full ? 'Yuvalar dolu' : `Satın al · $${item.price}`, item.type === 'joker' ? 'primary' : '', item.sold || state.money < item.price || full, `data-id="${item.uid}"`)}</article>`;
  }).join('')}</div><p class="hint-line">Jokerlerini görmek, sıralamak veya satmak için üstteki kartlara dokun.</p></section>`;
}
function endState(win) {
  return `<section class="end-state ${win ? 'win' : ''}"><div class="eyebrow">${win ? 'ANTE 8 · TAMAMLANDI' : 'BU SERİ BURADA BİTTİ'}</div><h2>${win ? 'Ne seriydi ama.' : 'Bir el daha?'}</h2><p>${win ? 'Sekiz anteyi de geçtin. Masadan bir şampiyon olarak kalkabilir veya sonsuz modda şansını zorlayabilirsin.' : `Hedef ${num(blindTarget(state))} fişti. Sen ${num(state.score)} fişe ulaştın. Yeni bir deste, yeni bir ihtimal.`}</p><div class="end-stats"><div class="end-stat"><strong>${state.ante}</strong><span>ULAŞILAN ANTE</span></div><div class="end-stat"><strong>${num(state.bestHand)}</strong><span>EN İYİ EL</span></div><div class="end-stat"><strong>${state.round}</strong><span>OYNANAN TUR</span></div></div>${win ? btn('endless', `Sonsuz moda devam ${icon('arrow')}`, 'primary') : ''} ${btn('new', 'Yeni seri başlat', win ? '' : 'primary')}</section>`;
}
function handZone(deal) {
  const playingNow = state.phase === 'playing', show = ['playing', 'settlement', 'gameover'].includes(state.phase);
  const fake = !show;
  return `<section class="hand-zone" aria-label="Elindeki kartlar"><div class="zone-header"><span class="eyebrow">${show ? 'ELİNDEKİ KARTLAR' : 'DESTEN HAZIR'}</span><button class="top-link" style="padding:0;min-height:24px;font-size:10px" data-action="hands">Poker elleri ↗</button></div><div class="hand-wrap"><div class="hand-cards ${deal ? 'dealing' : ''}">${fake ? Array.from({ length: 8 }, (_, i) => `<div class="playing-card card-back" style="--tilt:${(i - 3.5) * .8}deg;--i:${i}" aria-hidden="true"></div>`).join('') : state.hand.map((c, i) => card(c, playingNow && !busy, i)).join('')}</div><div class="deck-pile"><button class="playing-card card-back" data-action="deck" aria-label="Desteyi görüntüle"></button><div class="deck-count">${show ? state.pile.length : state.cards.length} / ${state.cards.length}</div></div></div>
    <div class="hand-controls"><div class="hand-actions">${btn('play', `${icon('play')} Eli oyna`, 'play', !playingNow || !state.selected.length || busy)}${btn('discard', `${icon('discard')} Kart at`, 'danger', !playingNow || !state.selected.length || state.discards <= 0 || busy)}</div><span class="selection-count">${state.selected.length} / 5 seçili</span><div class="sort-control"><span>Sırala</span><button class="sort-btn ${state.sort === 'rank' ? 'active' : ''}" data-action="sort" data-id="rank" aria-pressed="${state.sort === 'rank'}">Değer</button><button class="sort-btn ${state.sort === 'suit' ? 'active' : ''}" data-action="sort" data-id="suit" aria-pressed="${state.sort === 'suit'}">Renk</button></div></div>
    <p class="hint-line">${playingNow ? 'Seçmek için kartlara dokun.' : fake ? 'Kartlarını açmak için turu başlat.' : 'Her el yeni bir ihtimal.'} <span class="desktop-hint"><kbd>1</kbd>–<kbd>9</kbd> seç · <kbd>Enter</kbd> oyna · <kbd>D</kbd> at · <kbd>H</kbd> eller</span></p>
  </section>`;
}
function render(deal = false) {
  const focused = document.activeElement?.dataset;
  const content = state.phase === 'blind' ? blindSelect() : state.phase === 'playing' ? playing() : state.phase === 'settlement' ? settlement() : state.phase === 'shop' ? shop() : endState(state.phase === 'victory');
  $('#app').innerHTML = `<div class="shell"><header class="topbar"><div class="brand"><div class="brand-mark" aria-hidden="true">♠</div><div><div class="wordmark">BALATRO<span style="color:var(--color-coral)">.</span></div><div class="brand-sub">BİR EL DAHA.</div></div></div><nav class="top-actions" aria-label="Oyun menüsü"><button class="top-link" data-action="help" aria-label="Nasıl oynanır?"><span class="desktop-label">Nasıl oynanır?</span><span class="mobile-label">?</span></button><button class="top-link icon-btn" data-action="sound" aria-label="${settings.sound ? 'Sesi kapat' : 'Sesi aç'}" aria-pressed="${Boolean(settings.sound)}">${icon(settings.sound ? 'sound' : 'mute')}</button><button class="top-link new-game" data-action="new">Yeni seri ↗</button></nav></header>
    <div class="runbar"><span class="eyebrow"><span class="live-dot"></span><strong>${DECKS.find(d => d.id === state.deck).name}</strong> · ${state.phase === 'shop' ? 'DÜKKÂN' : 'TUR ' + (state.round || 1)}</span><span class="seed">TOHUM <strong>${esc(state.seed)}</strong></span></div>
    <main class="workspace">${sidebar()}<div class="table">${jokerZone()}<div class="play-zone">${content}</div>${state.phase !== 'shop' ? handZone(deal) : ''}</div></main>
    <footer class="footer"><span class="tagline">ŞANSINI OYNA.</span><span class="save-note">${storageWarning ? 'Kayıt bu sekmede' : 'İlerlemen otomatik kaydediliyor'} · yerel kayıt</span><span>Bağımsız hayran yapımı · <a href="https://www.playbalatro.com/" target="_blank" rel="noopener noreferrer">Orijinal Balatro ↗</a></span></footer></div>`;
  if (focused?.action && !$('#modal').open) {
    const candidates = document.querySelectorAll('[data-action]');
    const match = [...candidates].find(e => e.dataset.action === focused.action && e.dataset.id === focused.id);
    match?.focus({ preventScroll: true });
  }
}
function modal(title, body) {
  $('#modal').innerHTML = `<div class="modal-head"><h2 id="modal-title">${title}</h2><button class="close-btn" data-action="close" aria-label="Pencereyi kapat">×</button></div><div class="modal-body">${body}</div>`;
  if (!$('#modal').open) $('#modal').showModal();
}
function showHands() {
  modal('Poker elleri', `<p>Yalnızca eli oluşturan kartlar fiş kazandırır. Kent, renk ve fullde beş kartın tamamı sayılır. As 11, resimli kartlar 10, diğerleri kendi değeri kadar fiş verir.</p><table class="hands-table"><thead><tr><th>EL</th><th>ÖRNEK</th><th>SEVİYE</th><th>FİŞ × ÇARPAN</th></tr></thead><tbody>${[...HANDS].reverse().map(h => `<tr><td><strong>${h.name}</strong></td><td class="hand-example">${h.example}</td><td class="level">${state.levels[h.id]}</td><td>${h.chips + (state.levels[h.id] - 1) * h.dc} × ${h.mult + (state.levels[h.id] - 1) * h.dm}</td></tr>`).join('')}</tbody></table><p class="hint-line">A–2–3–4–5 de kenttir. Gezegenler el seviyelerini kalıcı artırır.</p>`);
}
function showHelp() {
  modal('Bir elden fazlası.', `<div class="help-formula">FİŞ × ÇARPAN = PUAN</div><div class="help-steps"><div class="help-step"><span>1</span><div><h3>Elini oluştur</h3><p>8 karttan <b>1–5 tanesini seç</b>, bir poker eli kur ve <b>Eli oyna</b>'ya bas. Seçtiğin elin tahmini puanını masada görebilirsin. Kötü kartları seçip <b>Kart at</b> ile yenilerini çek.</p></div></div><div class="help-step"><span>2</span><div><h3>Hedefi geç</h3><p>El hakkın bitmeden tur hedefini aş. Puanın her elde birikir. Her antede küçük, büyük ve <b>özel kurallı boss</b> olmak üzere üç blind var. 8. anteyi geçerek kazan.</p></div></div><div class="help-step"><span>3</span><div><h3>Jokerlerle kuralı değiştir</h3><p>Dükkândan <b>joker, gezegen, tarot, kupon ve paket</b> al. Jokerler soldan sağa çalışır; kartlara dokunarak sıralayabilirsin. Gezegenler ellerini güçlendirir. Tarotlar açıklamasındaki kadar rastgele normal kartı geliştirir.</p></div></div><div class="help-step"><span>4</span><div><h3>Paranı da oyna</h3><p>Kalan her el <b>$1</b>, tuttuğun her <b>$5 ise $1 faiz</b> kazandırır (en fazla $5). Jokerleri tur başlamadan veya dükkânda yarı fiyatına satabilirsin. Boss hariç blindleri $5 karşılığında pas geçebilirsin.</p></div></div></div><p class="hint-line" style="margin-top:24px">Gerçek para kullanılmaz. Kayıt bu tarayıcıda tutulur. Bu, özgün çizimlerle hazırlanmış bağımsız bir hayran uyarlamasıdır.</p><div style="margin-top:18px;text-align:center">${btn('hands', 'Poker ellerini göster', 'primary')}</div>`);
}
function showNew() {
  newDeck = state.deck;
  modal('Yeni bir ihtimal.', `<p>Desteni seç. Aynı tohumla aynı kararları verdiğinde aynı seriyi tekrar oynayabilirsin.</p><div class="deck-choice">${DECKS.map(d => `<button class="deck-option art-${d.color} ${newDeck === d.id ? 'active' : ''}" data-action="choose-deck" data-id="${d.id}" aria-pressed="${newDeck === d.id}"><span class="mini-deck" aria-hidden="true">♠</span><span><strong>${d.name}</strong><small>${d.desc}</small></span></button>`).join('')}</div><label class="form-label" for="seed-input">TOHUM · İSTEĞE BAĞLI</label><input id="seed-input" class="seed-input" maxlength="24" placeholder="Rastgele bir seri" autocomplete="off" spellcheck="false"><p class="new-run-warning">Yeni seri mevcut serinin kaydının yerini alır.</p>${btn('confirm-new', `Kartları dağıt ${icon('arrow')}`, 'primary full')}`);
}
function showJoker(uid) {
  const j = state.jokers.find(j => j.uid === uid); if (!j) return;
  const d = JOKERS.find(d => d.id === j.id), index = state.jokers.indexOf(j);
  modal(d.name, `<div class="modal-joker">${jokerCard(d)}<div><span class="eyebrow">${d.rarity}</span><p style="margin-top:10px">${d.desc}</p>${j.id === 'ice' ? `<p>Kalan bonus: +${Math.max(0, 100 - (j.melt || 0) * 5)} fiş.</p>` : ''}${j.id === 'loyal' ? `<p>×4 için ${6 - state.totalHands % 6} el kaldı.</p>` : ''}<p style="margin-top:10px;font-size:11px">Soldan sağa ${index + 1}. joker. Çarpan veren jokerleri × etkilerinden önce kullanmayı dene.</p></div></div><div class="joker-management">${btn('move', '← Sola', '', index === 0, `data-id="${esc(uid)}" data-dir="-1"`)}${btn('move', 'Sağa →', '', index === state.jokers.length - 1, `data-id="${esc(uid)}" data-dir="1"`)}${btn('sell', `Sat · $${Math.max(1, Math.floor(j.price / 2))}`, 'danger', !['shop', 'blind'].includes(state.phase), `data-id="${esc(uid)}"`)}</div>${state.phase === 'playing' ? '<p class="hint-line">Jokerleri dükkânda veya tur başlamadan satabilirsin.</p>' : ''}`);
}
function handle(action, id, el) {
  if (busy && !['sound', 'help', 'close', 'hands', 'collection', 'deck'].includes(action)) return;
  let changed = false, deal = false;
  switch (action) {
    case 'card': changed = selectCard(state, id); sound(); break;
    case 'start': changed = startBlind(state); deal = true; sound('play'); break;
    case 'skip': changed = skipBlind(state); toast('Blind pas geçildi · +$5'); break;
    case 'discard': changed = discard(state); if (changed) { deal = true; sound('discard'); } break;
    case 'play': {
      const result = playHand(state);
      if (result.error) { toast(result.error); break; }
      changed = true; busy = true; sound(state.phase === 'settlement' ? 'win' : 'play');
      setTimeout(() => { busy = false; render(true); }, 650); break;
    }
    case 'collect': changed = collectReward(state); sound('buy'); break;
    case 'leave': changed = leaveShop(state); break;
    case 'endless': changed = continueEndless(state); break;
    case 'reroll': changed = reroll(state); if (changed) sound('discard'); break;
    case 'buy': { const result = buy(state, id); if (result.error) toast(result.error); else { changed = true; sound('buy'); if (result.note) toast(result.note); } break; }
    case 'pick': changed = pickPack(state, id); if (changed) sound('buy'); break;
    case 'sort': state.sort = id === 'suit' ? 'suit' : 'rank'; sortHand(state); changed = true; break;
    case 'sound': settings.sound = !settings.sound; try { localStorage.setItem(SETTINGS, JSON.stringify(settings)); } catch {} sound(); render(); return;
    case 'help': showHelp(); return;
    case 'hands': showHands(); return;
    case 'close': $('#modal').close(); return;
    case 'new': showNew(); return;
    case 'confirm-new': state = createRun(newDeck, $('#seed-input').value.trim()); $('#modal').close(); changed = true; sound('play'); break;
    case 'choose-deck': newDeck = id; document.querySelectorAll('.deck-option').forEach(b => { b.classList.toggle('active', b.dataset.id === id); b.setAttribute('aria-pressed', b.dataset.id === id); }); sound(); return;
    case 'joker': showJoker(id); return;
    case 'move': if (moveJoker(state, id, Number(el.dataset.dir))) { save(); render(); showJoker(id); } return;
    case 'sell': changed = sellJoker(state, id); if (changed) { $('#modal').close(); sound('buy'); } break;
    case 'collection': modal('Joker koleksiyonu', `<p>${JOKERS.length} joker, sayısız kombinasyon. Aynı jokerden aynı anda yalnızca bir tane tutabilirsin.</p><div class="collection">${JOKERS.map(j => `<article class="collection-item">${jokerCard(j)}<h3>${j.name}</h3><p>${j.desc}</p><span class="rarity">${j.rarity} · $${j.price}</span></article>`).join('')}</div>`); return;
    case 'deck': modal('Desten', `<p>${state.cards.length} kart. Soluk kartlar çekme destesinde değil. Geliştirmeler seri boyunca korunur.</p><div class="deck-preview">${[...state.cards].sort((a, b) => SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit) || b.rank - a.rank).map(c => card(c, false, 0, state.phase === 'playing')).join('')}</div>`); return;
  }
  if (changed) { save(); render(deal); }
}
document.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  if (target && !target.disabled) handle(target.dataset.action, target.dataset.id, target);
});
document.addEventListener('keydown', e => {
  if ($('#modal').open || ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  if (e.key.toLowerCase() === 'h') { e.preventDefault(); showHands(); return; }
  if (state.phase !== 'playing' || busy) return;
  const index = Number(e.key) - 1;
  if (/^[1-9]$/.test(e.key) && state.hand[index]) { e.preventDefault(); handle('card', state.hand[index].id); }
  else if (e.key === 'Enter' && (e.target.tagName !== 'BUTTON' || e.target.dataset.action === 'card')) { e.preventDefault(); handle('play'); }
  else if (e.key.toLowerCase() === 'd') { e.preventDefault(); handle('discard'); }
});
$('#modal').addEventListener('click', e => { if (e.target === $('#modal')) { const r = $('#modal').getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $('#modal').close(); } });
render(); save();
