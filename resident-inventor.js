(function () {
  "use strict";

  const explorer = document.querySelector("[data-invention-explorer]");
  const paths = window.RESIDENT_INVENTOR_PATHS;
  if (!explorer || !Array.isArray(paths)) return;

  const tabs = explorer.querySelector(".ri-tabs");
  const panel = explorer.querySelector(".ri-panel");
  const intro = explorer.querySelector(".ri-panel-intro");
  const graph = explorer.querySelector(".ri-graph");
  const insight = explorer.querySelector(".ri-insight");
  const kindNames = {
    field: "Field",
    collision: "Collision",
    ting: "Ting",
    form: "Form",
    reality: "Reality",
    dormant: "Dormant",
    note: "Record note"
  };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderNode(item, index) {
    const li = element("li", `ri-node ri-node--${item.kind}`);
    const marker = element("span", "ri-node-marker", String(index + 1).padStart(2, "0"));
    marker.setAttribute("aria-hidden", "true");
    const body = element("div", "ri-node-body");
    body.append(element("p", "ri-node-kind", kindNames[item.kind] || item.kind));
    body.append(element("h4", "ri-node-title", item.title));
    if (item.quote) body.append(element("blockquote", "ri-node-quote", `“${item.quote.replace(/^“|”$/g, "")}”`));
    if (item.text) body.append(element("p", "ri-node-text", item.text));
    li.append(marker, body);
    return li;
  }

  function renderSequence(nodes, className) {
    const list = element("ol", `ri-sequence ${className || ""}`.trim());
    nodes.forEach((item, index) => list.append(renderNode(item, index)));
    return list;
  }

  function renderBase(path) {
    const field = element("div", "ri-field-environment");
    const fieldHeader = element("div", "ri-field-environment-header");
    const title = element("h3", "", "The Field");
    const detail = element("p", "", "Persistent material surrounds every active path.");
    fieldHeader.append(title, detail);

    const active = element("div", "ri-active-loop");
    active.append(element("p", "ri-loop-label", "One active loop leaves the Field"));
    active.append(renderSequence(path.nodes.slice(1, -1), "ri-sequence--base"));

    const returnLine = element("div", "ri-return-line");
    returnLine.innerHTML = '<span aria-hidden="true">↩</span><strong>Return to the Field</strong><span>New material may remain dormant or leave again.</span>';
    field.append(fieldHeader, active, returnLine);
    graph.append(field);
  }

  function renderLoops(path) {
    path.loops.forEach((loop, loopIndex) => {
      const section = element("section", "ri-loop");
      section.setAttribute("aria-labelledby", `${path.id}-loop-${loopIndex}`);
      const heading = element("h3", "ri-loop-label", loop.label);
      heading.id = `${path.id}-loop-${loopIndex}`;
      section.append(heading, renderSequence(loop.nodes));
      if (loopIndex < path.loops.length - 1) {
        const recur = element("div", "ri-recursion");
        recur.innerHTML = '<span aria-hidden="true">↩</span><strong>Back in the Field</strong><span>Later, a different collision begins another active loop.</span>';
        section.append(recur);
      }
      graph.append(section);
    });
  }

  function selectPath(index, moveFocus) {
    const path = paths[index];
    const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
    buttons.forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) button.focus();
    });

    panel.setAttribute("aria-labelledby", `ri-tab-${path.id}`);
    intro.replaceChildren();
    const heading = element("h3", "", path.title);
    const summary = element("p", "", path.summary);
    intro.append(heading, summary);
    graph.replaceChildren();
    graph.classList.toggle("ri-graph--base", Boolean(path.base));
    path.base ? renderBase(path) : renderLoops(path);
    insight.textContent = path.insight;
  }

  paths.forEach((path, index) => {
    const button = element("button", "ri-tab", path.label);
    button.type = "button";
    button.id = `ri-tab-${path.id}`;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", "invention-path-panel");
    button.addEventListener("click", () => selectPath(index, false));
    button.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % paths.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + paths.length) % paths.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = paths.length - 1;
      else return;
      event.preventDefault();
      selectPath(next, true);
    });
    tabs.append(button);
  });

  panel.id = "invention-path-panel";
  selectPath(0, false);
})();
