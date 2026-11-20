module.exports = async function (context) {
  let temperature = null;
  let wind = null;

  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=36.5054&longitude=-117.0794&current=temperature_2m,wind_speed_10m',
      { signal: AbortSignal.timeout(5000) }
    );
    if (!response.ok) throw new Error('Weather service unavailable');

    const weather = await response.json();
    if (Number.isFinite(weather.current?.temperature_2m)) {
      temperature = weather.current.temperature_2m;
    }
    if (Number.isFinite(weather.current?.wind_speed_10m)) {
      wind = weather.current.wind_speed_10m;
    }
  } catch {
    // Server telemetry remains available when weather data cannot be retrieved.
  }

  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    },
    body: {
      location: 'Mojave Desert, CA',
      temperature_c: temperature,
      wind_kmh: wind,
      server_time_utc: new Date().toISOString(),
      azure_region: process.env.REGION_NAME || process.env.WEBSITE_REGION || 'Azure Cloud',
      runtime: 'Azure Functions'
    }
  };
};
