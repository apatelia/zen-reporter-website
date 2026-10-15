// Sample client script
function calculateSummary(items) {
  const total = items.length;
  const active = items.filter(item => item.active);
  return { total, activeCount: active.length };
}