export function exportToHTML(elementId, filename = 'resume.html', title = 'Resume') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Export element not found');
    return;
  }

  // Clone the element so we can modify it without affecting the page
  const clone = element.cloneNode(true);

  // Collect all stylesheets from the document
  let styles = '';
  for (const sheet of document.styleSheets) {
    try {
      // Only include local stylesheets, skip external CDN fonts etc.
      if (sheet.href && !sheet.href.startsWith(window.location.origin)) continue;
      for (const rule of sheet.cssRules) {
        styles += rule.cssText + '\n';
      }
    } catch {
      // Cross-origin stylesheets may throw; skip them
    }
  }

  // Build a self-contained HTML document
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
:root {
  --bg: #f0f2f5;
  --surface: #ffffff;
  --border: #e2e6ed;
  --text: #1a1a2e;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --primary: #1a3a5c;
  --primary-hover: #2d5a8e;
  --danger: #ef4444;
  --radius: 6px;
  --shadow: 0 1px 3px rgba(0,0,0,0.08);
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--text);
  background: white;
  display: flex;
  justify-content: center;
  padding: 24px;
}
${styles}
  </style>
</head>
<body>
  ${clone.outerHTML}
</body>
</html>`;

  // Trigger download
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
