# Action menu HTML template

Copy the HTML below into an inline HTML response and fill its `menu-data` as described in the [action menu reference](../references/action-menu.md).

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LoomaScale audit choices</title>
<style>
  :root {
    color-scheme: light dark;
    font: 100%/1.4 Inter, system-ui, sans-serif;
    --purple: #8b5cf6;
    --blue: #3b82f6;
    --cyan: #06b6d4;
  }
  body { margin: 0; color: CanvasText; background: Canvas; }
  section { --accent: var(--cyan); }
  [data-tone="lavender"] {
    --accent: var(--purple);
    padding: .7rem .8rem;
    border: 1px solid color-mix(in srgb, var(--accent) 22%, Canvas);
    border-radius: .8rem;
    background: color-mix(in srgb, var(--accent) 7%, Canvas);
  }
  [data-tone="blue"] { --accent: var(--blue); }
  section + section { margin-top: 1rem; }
  .more { margin-top: .4rem; }
  h2 { font-size: 1.05rem; margin: 0 0 .4rem; }
  .choice + .choice { border-top: 1px solid color-mix(in srgb, var(--accent) 22%, Canvas); }
  [data-tone="blue"] .choices { display: flex; flex-wrap: wrap; gap: .4rem; }
  [data-tone="blue"] .choice {
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid color-mix(in srgb, var(--accent) 24%, Canvas);
    border-radius: .65rem;
    background: color-mix(in srgb, var(--accent) 7%, Canvas);
  }
  a, summary, .preview { display: block; padding: .4rem .55rem; color: inherit; overflow-wrap: anywhere; }
  a { text-decoration: none; }
  a:hover strong, summary:hover strong { text-decoration: underline; }
  summary { position: relative; cursor: pointer; list-style: none; padding-right: 1.8rem; }
  summary::-webkit-details-marker { display: none; }
  summary::after { content: "⌄"; position: absolute; top: .4rem; right: .55rem; }
  details[open] summary::after { content: "⌃"; }
  .icon { display: inline-grid; place-content: center; width: 1.2em; margin-right: .35em; vertical-align: middle; }
  .icon img { width: 1.1em; height: 1.1em; object-fit: contain; }
  small { display: block; margin-top: .1rem; }
  .answer { padding: 0 .7rem .65rem; }
  .answer p { margin: .2rem 0 .5rem; }
  button { padding: .3rem .6rem; font: inherit; cursor: pointer; }
  footer { margin-top: 1rem; }
  .recommendation .answer, footer .answer { padding: 0; }
  .recommendation small, footer small { margin-bottom: .35rem; }
  .recommendation button, .recommendation a, footer button {
    box-sizing: border-box; width: 100%; min-height: 2.75rem; padding: .6rem;
    border-radius: .6rem; text-align: center; font-weight: 700;
  }
  .recommendation button, .recommendation a { border: 0; background: #174ea6; color: white; }
  footer button { border: 1px solid color-mix(in srgb, CanvasText 42%, Canvas); background: Canvas; color: CanvasText; }
  button:disabled { background: ButtonFace; color: GrayText; border: 1px solid GrayText; cursor: default; }
  :focus-visible { outline: 2px solid Highlight; outline-offset: 1px; }
</style>
<main id="menu"></main>
<script id="recommended-action-data" type="application/json">null</script>
<script id="menu-data" type="application/json">[]</script>
<script id="ads-audit-data" type="application/json">null</script>
<script>
  const menu = document.getElementById("menu");
  const groups = JSON.parse(document.getElementById("menu-data").textContent);

  function element(tag, text) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  }

  function icon(filename, glyph) {
    const mark = element("span");
    mark.className = "icon";
    mark.setAttribute("aria-hidden", "true");
    const img = element("img");
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", () => { mark.textContent = glyph; });
    img.src = "https://loomascale.com/icons/" + encodeURIComponent(filename);
    mark.append(img);
    return mark;
  }

  function question(prompt, label = "Copy question", showPrompt = true) {
    const panel = element("div");
    panel.className = "answer";
    const text = element("p", prompt);
    text.hidden = !showPrompt;
    const copy = element("button", label);
    copy.type = "button";
    const status = element("small");
    status.setAttribute("role", "status");
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(prompt);
        status.textContent = "Copied. Paste into this chat to run.";
      } catch {
        text.hidden = false;
        const range = document.createRange();
        range.selectNodeContents(text);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = "Select and copy the question, then paste it into this chat.";
      }
    });
    panel.append(text, copy, status);
    return panel;
  }

  function choice(item) {
    const isLink = item.href && /^https:\/\//i.test(item.href);
    const node = element(isLink ? "a" : item.prompt ? "details" : "div");
    node.className = "choice";
    const face = node.tagName === "DETAILS" ? element("summary") : node;
    if (isLink) {
      node.href = item.href;
      node.target = "_blank";
      node.rel = "noopener noreferrer";
    } else if (face === node) {
      node.classList.add("preview");
    }
    const source = element("small");
    for (const [filename, glyph] of item.icons || []) {
      (isLink ? face : source).append(icon(filename, glyph));
    }
    face.append(element("strong", item.label));
    if (item.hint) source.append(document.createTextNode(item.hint));
    if (source.hasChildNodes()) face.append(source);
    if (face !== node) node.append(face, question(item.prompt, item.copyLabel));
    return node;
  }

  function renderAction(item, primary) {
    const block = element(primary ? "section" : "footer");
    const hint = element("small", item.hint);
    hint.id = primary ? "recommendation-hint" : "audit-hint";
    if (primary) block.className = "recommendation";
    block.append(hint);
    if (primary && /^https:\/\//i.test(item.href || "")) {
      block.append(choice({label: item.label, href: item.href, icons: item.icons}));
    } else if (item.prompt) {
      block.append(question(item.prompt, item.label, false));
    } else {
      const button = element("button", item.label);
      button.disabled = true;
      block.append(button);
    }
    block.querySelector("button, a").setAttribute("aria-describedby", hint.id);
    menu.append(block);
  }

  const recommendation = JSON.parse(document.getElementById("recommended-action-data").textContent);
  if (recommendation) renderAction(recommendation, true);

  for (const group of groups) {
    if (!group.items.length && !group.moreItems?.length) continue;
    const section = element("section");
    section.dataset.tone = group.tone || (group.items.every(item => item.href) ? "blue" : "cyan");
    const choices = element("div");
    choices.className = "choices";
    for (const item of group.items) choices.append(choice(item));
    section.append(element("h2", group.title), choices);
    if (group.moreItems && group.moreItems.length) {
      const more = element("details");
      more.className = "more";
      more.append(element("summary", group.moreLabel || "More tasks"));
      for (const item of group.moreItems) more.append(choice(item));
      section.append(more);
    }
    menu.append(section);
  }

  const audit = JSON.parse(document.getElementById("ads-audit-data").textContent);
  if (audit) renderAction(audit, false);
</script>
</html>
```
