const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function getStockPrediction(ticker = "AAPL") {
  const response = await fetch(
    `${API_BASE_URL}/predict?ticker=${encodeURIComponent(ticker)}`
  );

  if (!response.ok) {
    throw new Error(`Prediction failed: ${response.status}`);
  }

  return response.json();
}

export async function getStockHistory(ticker = "AAPL") {
  const response = await fetch(
    `${API_BASE_URL}/history?ticker=${encodeURIComponent(ticker)}`
  );

  if (!response.ok) {
    throw new Error(`History fetch failed: ${response.status}`);
  }

  return response.json();
}

export async function getStockSummary(ticker = "AAPL") {
  const response = await fetch(
    `${API_BASE_URL}/summary?ticker=${encodeURIComponent(ticker)}`
  );

  if (!response.ok) {
    throw new Error(`Stock summary failed: ${response.status}`);
  }

  return response.json();
}

export async function getAvailableTickers() {
  try {
    const response = await fetch(`${API_BASE_URL}/tickers`);
    if (!response.ok) return ['AAPL', 'RELIANCE.NS', 'NVDA', 'TCS.NS', 'MSFT', 'GOOGL'];
    const data = await response.json();
    return data.tickers || ['AAPL', 'RELIANCE.NS', 'NVDA', 'TCS.NS', 'MSFT', 'GOOGL'];
  } catch {
    return ['AAPL', 'RELIANCE.NS', 'NVDA', 'TCS.NS', 'MSFT', 'GOOGL'];
  }
}
