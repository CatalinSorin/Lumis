const grid = document.getElementById('catalogGrid');
const cards = Array.from(grid.querySelectorAll('.product-card'));
const filterChips = document.querySelectorAll('.filter-chip');
const sortSelect = document.getElementById('sortSelect');
const resultsCount = document.getElementById('resultsCount');
const emptyState = document.getElementById('emptyState');

let currentFilter = 'all';

// Citește categoria din URL (?cat=lustre) la încărcare
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('cat');
}

function applyFilter(filter) {
  currentFilter = filter;
  let visibleCount = 0;

  cards.forEach(card => {
    const matches = filter === 'all' || card.dataset.cat === filter;
    card.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });

  resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'produs' : 'produse'}`;
  emptyState.classList.toggle('visible', visibleCount === 0);

  // Actualizează stare vizuală a chip-urilor
  filterChips.forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === filter);
  });
}

function applySort(sortValue) {
  const visibleCards = cards.filter(card => card.dataset.cat === currentFilter || currentFilter === 'all');

  let sorted;
  if (sortValue === 'price-asc') {
    sorted = [...cards].sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
  } else if (sortValue === 'price-desc') {
    sorted = [...cards].sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
  } else {
    sorted = cards; // ordine implicită (cea din HTML)
  }

  sorted.forEach(card => grid.appendChild(card));
  grid.appendChild(emptyState); // empty state mereu la final
}

// Click pe chip-uri de filtrare
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    applyFilter(chip.dataset.filter);
    applySort(sortSelect.value);
  });
});

// Schimbare sortare
sortSelect.addEventListener('change', () => {
  applySort(sortSelect.value);
});

// Inițializare: aplică filtrul din URL dacă există
const urlCategory = getCategoryFromURL();
if (urlCategory && document.querySelector(`[data-filter="${urlCategory}"]`)) {
  applyFilter(urlCategory);
} else {
  applyFilter('all');
}
