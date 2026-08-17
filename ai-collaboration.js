(function () {
  const root = document.querySelector("[data-ai-builder]");
  if (!root || !window.AI_COLLABORATION_ACTIONS) return;

  const actions = window.AI_COLLABORATION_ACTIONS;
  const byId = Object.fromEntries(actions.map((action) => [action.id, action]));
  const palette = root.querySelector("[data-action-palette]");
  const sequenceEl = root.querySelector("[data-sequence]");
  const codeEl = root.querySelector("[data-code]");
  const consoleEl = root.querySelector("[data-console]");
  const countEl = root.querySelector("[data-step-count]");
  const emptyEl = root.querySelector("[data-empty]");
  let sequence = [];

  function create(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderPaletteGroup(group, title, note) {
    const section = create("section", "aic-palette-group");
    const heading = create("div", "aic-palette-group-heading");
    heading.append(create("h4", "", title), create("span", "", note));
    const list = create("div", "aic-action-list");
    actions.filter((action) => action.group === group).forEach((action) => {
      const button = create("button", "aic-action", action.label);
      button.type = "button";
      button.dataset.addAction = action.id;
      button.title = action.description;
      button.setAttribute("aria-label", `Add ${action.label}. ${action.description}${action.loopable ? " Loopable." : " Occasional."}`);
      button.append(create("span", `aic-actor aic-actor--${action.actor.toLowerCase()}`, action.actor));
      if (action.loopable) button.append(create("small", "", "↻ LOOPABLE"));
      list.append(button);
    });
    section.append(heading, list);
    palette.append(section);
  }

  function generateCode() {
    const lines = [
      "' FLETCHER_AI_COLLABORATION.vb",
      "' More computation. Final judgment retained.",
      "",
      "Sub CollaborateWithAI()",
      "",
      "    Dim Pieces As Collection",
      "    Dim Candidate As Pattern",
      "    Dim Ding As Boolean",
      ""
    ];
    if (!sequence.length) lines.push("    ' Add an action to begin.");
    sequence.forEach((id) => {
      const action = byId[id];
      action.code.split("\n").forEach((line) => lines.push(`    ${line}`));
      lines.push("");
    });
    lines.push("End Sub");
    return lines.join("\n");
  }

  function render() {
    sequenceEl.replaceChildren();
    sequence.forEach((id, index) => {
      const action = byId[id];
      const item = create("li", "aic-step");
      item.dataset.index = index;
      const number = create("span", "aic-step-number", String(index + 1).padStart(2, "0"));
      const body = create("div", "aic-step-body");
      const title = create("strong", "", action.label);
      title.append(create("span", `aic-actor aic-actor--${action.actor.toLowerCase()}`, action.actor));
      body.append(title, create("p", "", action.description));
      const controls = create("div", "aic-step-controls");
      [["up", "↑", "Move up"], ["down", "↓", "Move down"], ["remove", "×", "Remove"]].forEach(([command, label, aria]) => {
        const button = create("button", "", label);
        button.type = "button";
        button.dataset.stepCommand = command;
        button.setAttribute("aria-label", `${aria}: ${action.label}`);
        if ((command === "up" && index === 0) || (command === "down" && index === sequence.length - 1)) button.disabled = true;
        controls.append(button);
      });
      item.append(number, body, controls);
      sequenceEl.append(item);
    });
    emptyEl.hidden = sequence.length > 0;
    countEl.textContent = `${sequence.length} ${sequence.length === 1 ? "step" : "steps"}`;
    codeEl.textContent = generateCode();
    palette.querySelectorAll("[data-add-action]").forEach((button) => {
      const action = byId[button.dataset.addAction];
      const used = !action.loopable && sequence.includes(action.id);
      button.disabled = used;
      button.setAttribute("aria-label", used ? `${action.label} is already in the program. Remove it to add it elsewhere.` : `Add ${action.label}. ${action.description}${action.loopable ? " Loopable." : " One-off or occasional."}`);
    });
  }

  function announce(message) { consoleEl.textContent = message; }

  palette.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-action]");
    if (!button) return;
    const action = byId[button.dataset.addAction];
    if (!action.loopable && sequence.includes(action.id)) return;
    sequence.push(action.id);
    render();
    announce(`${action.label} added. ${action.loopable ? "This instruction can be used again." : "This optional instruction can appear once; remove it to place it elsewhere."}`);
  });

  sequenceEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step-command]");
    if (!button) return;
    const item = button.closest("[data-index]");
    const index = Number(item.dataset.index);
    const command = button.dataset.stepCommand;
    const name = byId[sequence[index]].label;
    if (command === "remove") sequence.splice(index, 1);
    if (command === "up" && index > 0) [sequence[index - 1], sequence[index]] = [sequence[index], sequence[index - 1]];
    if (command === "down" && index < sequence.length - 1) [sequence[index + 1], sequence[index]] = [sequence[index], sequence[index + 1]];
    render();
    announce(`${name} ${command === "remove" ? "removed" : `moved ${command}`}.`);
    sequenceEl.querySelector(`[data-index="${Math.min(index, sequence.length - 1)}"] button:not(:disabled)`)?.focus();
  });

  root.querySelector("[data-command='example']").addEventListener("click", () => {
    sequence = [...window.AI_COLLABORATION_EXAMPLE]; render(); announce("Example loaded: archaeology, mixing, a human correction, Ding, development, reality, and both results returned to the Field.");
  });
  root.querySelector("[data-command='clear']").addEventListener("click", () => { sequence = []; render(); announce("Program cleared. The Field remains."); });
  root.querySelector("[data-command='run']").addEventListener("click", () => {
    if (!sequence.length) return announce("Nothing ran. Add at least one instruction.");
    const hasVote = sequence.some((id) => ["react", "hmmm_no_but", "ding"].includes(id));
    const hasDing = sequence.includes("ding");
    const storesHistory = sequence.includes("store_history");
    announce(`RUN COMPLETE · ${sequence.length} instructions · Human vote: ${hasVote ? "present" : "missing"} · Ding: ${hasDing ? "recognized" : "not required"} · Collaboration history: ${storesHistory ? "returned to Field" : "not stored"}.`);
  });

  renderPaletteGroup("loopable", "Loopable pieces", "ADD FREELY");
  renderPaletteGroup("occasional", "One-off / occasional", "ALL OPTIONAL");
  sequence = [...window.AI_COLLABORATION_EXAMPLE];
  render();
})();
