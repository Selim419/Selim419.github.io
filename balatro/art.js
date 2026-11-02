const COLUMNS = [0, 209, 419, 628, 836, 1045, 1254];
const ROWS = { jokers: [0, 314, 628, 942, 1254], cards: [0, 315, 628, 909, 1254] };
export function sprite(sheet, index, extra = '') {
  const col = index % 6, row = Math.floor(index / 6), rows = ROWS[sheet];
  const x = COLUMNS[col] + 1, y = rows[row] + 1;
  const width = COLUMNS[col + 1] - x - 1, height = rows[row + 1] - y - 1;
  return `<svg class="atlas-sprite ${extra}" viewBox="${x} ${y} ${width} ${height}" preserveAspectRatio="none" aria-hidden="true"><image href="./assets/${sheet}-atlas.webp" width="1254" height="1254"/></svg>`;
}
const JOKER_ORDER = ['smile', 'greedy', 'lusty', 'wrath', 'club', 'jolly', 'zany', 'sly', 'banner', 'abstract', 'fibonacci', 'even', 'odd', 'scholar', 'scary', 'smiley', 'half', 'blue', 'ice', 'loyal', 'blackboard', 'stencil', 'banana', 'rocket'];
export function jokerArt(j) { return sprite('jokers', Math.max(0, JOKER_ORDER.indexOf(j.id))); }
export function courtArt(c) {
  const suit = ['S', 'H', 'C', 'D'].indexOf(c.suit);
  return sprite('cards', suit * 3 + c.rank - 11, 'court-art');
}
const PIPS = {
  2: [[50, 20], [50, 80]],
  3: [[50, 20], [50, 50], [50, 80]],
  4: [[29, 23], [71, 23], [29, 77], [71, 77]],
  5: [[29, 23], [71, 23], [50, 50], [29, 77], [71, 77]],
  6: [[29, 20], [71, 20], [29, 50], [71, 50], [29, 80], [71, 80]],
  7: [[29, 20], [71, 20], [50, 35], [29, 50], [71, 50], [29, 80], [71, 80]],
  8: [[29, 20], [71, 20], [50, 35], [29, 50], [71, 50], [50, 65], [29, 80], [71, 80]],
  9: [[29, 18], [71, 18], [29, 39], [71, 39], [50, 50], [29, 61], [71, 61], [29, 82], [71, 82]],
  10: [[29, 18], [71, 18], [50, 29], [29, 39], [71, 39], [29, 61], [71, 61], [50, 71], [29, 82], [71, 82]],
};
export function pipArt(c, symbol) {
  if (c.rank === 14) return `<span class="ace-emblem">${symbol}</span>`;
  return `<span class="pip-layout">${PIPS[c.rank].map(([x, y]) => `<span style="left:${x}%;top:${y}%;${y > 50 ? '--flip:180deg' : ''}">${symbol}</span>`).join('')}</span>`;
}
