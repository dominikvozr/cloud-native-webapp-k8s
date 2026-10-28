const errorEl = document.getElementById('error');

async function load() {
  try {
    const res = await fetch('/api/info');
    if (!res.ok) throw new Error(`backend returned ${res.status}`);
    const data = await res.json();
    for (const key of ['message', 'version', 'hostname']) {
      document.getElementById(key).textContent = data[key];
    }
    errorEl.hidden = true;
  } catch (err) {
    errorEl.textContent = `Cannot reach backend: ${err.message}`;
    errorEl.hidden = false;
  }
}

document.getElementById('refresh').addEventListener('click', load);
load();
