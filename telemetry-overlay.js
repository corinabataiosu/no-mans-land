(async function () {
  'use strict';

  try {
    const response = await fetch('/api/telemetry', {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) return;

    const data = await response.json();
    if (!data || typeof data.server_time_utc !== 'string') return;

    const box = document.createElement('aside');
    box.setAttribute('aria-label', 'Mojave weather and Azure telemetry');
    box.style.cssText = [
      'position: fixed',
      'bottom: 14px',
      'left: 14px',
      'z-index: 9999',
      'pointer-events: none',
      'background: #f5efe2',
      'color: #3b3226',
      'border: 1px solid rgba(59, 50, 38, 0.2)',
      'border-radius: 8px',
      'padding: 10px 12px',
      'box-shadow: 0 2px 8px rgba(59, 50, 38, 0.08)',
      'font: 12px/1.6 system-ui, sans-serif',
      'max-width: calc(100vw - 28px)',
      'box-sizing: border-box',
      'overflow-wrap: anywhere'
    ].join(';');

    const temperature = Number.isFinite(data.temperature_c)
      ? `${data.temperature_c} \u00b0C` : 'Unavailable';
    const wind = Number.isFinite(data.wind_kmh)
      ? `${data.wind_kmh} km/h` : 'Unavailable';
    const lines = [
      `Location: ${data.location}`,
      `Temp: ${temperature} | Wind: ${wind}`,
      `Azure Server Time: ${data.server_time_utc}`,
      `Azure Region: ${data.azure_region}`
    ];

    for (const line of lines) {
      const row = document.createElement('div');
      row.textContent = line;
      box.appendChild(row);
    }
    document.body.appendChild(box);
  } catch {
    // The optional HUD stays hidden when the API is unavailable, including locally.
  }
}());
