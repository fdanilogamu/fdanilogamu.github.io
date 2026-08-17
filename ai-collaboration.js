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
  const statusEl = root.querySelector("[data-window-status]");
  const runButton = root.querySelector("[data-command='run']");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let sequence = [];
  let runToken = 0;

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
      const item = create("div", "aic-action-wrap");
      item.dataset.actionItem = action.id;
      const button = create("button", "aic-action", action.label);
      button.type = "button";
      button.dataset.addAction = action.id;
      button.setAttribute("aria-describedby", `aic-help-${action.id}`);
      button.append(create("span", `aic-actor aic-actor--${action.actor.toLowerCase()}`, action.actor));
      if (action.loopable) button.append(create("small", "", "↻ LOOPABLE"));
      if (action.recommendedStart) button.append(create("small", "aic-action-cue aic-action-cue--start", "START HERE"));
      const info = create("button", "aic-action-info", "i");
      info.type = "button";
      info.dataset.helpToggle = action.id;
      info.setAttribute("aria-label", `Explain ${action.label}`);
      info.setAttribute("aria-expanded", "false");
      info.setAttribute("aria-controls", `aic-help-${action.id}`);
      const help = create("div", "aic-action-help");
      help.id = `aic-help-${action.id}`;
      help.append(create("strong", "", "WHAT IS THIS?"), create("p", "", action.help.what), create("strong", "", "USE WHEN"), create("p", "", action.help.when), create("span", "", `WHO · ${action.actor}`));
      item.append(button, info, help);
      list.append(item);
    });
    section.append(heading, list);
    palette.append(section);
  }

  function codeLines() {
    const lines = [
      { text: "' FLETCHER_AI_COLLABORATION.vb" },
      { text: "' More computation. Final judgment retained." }, { text: "" },
      { text: "Sub CollaborateWithAI()" }, { text: "" },
      { text: "    Dim Pieces As Collection" },
      { text: "    Dim Candidate As Pattern" },
      { text: "    Dim Ding As Boolean" }, { text: "" }
    ];
    if (!sequence.length) lines.push({ text: "    ' Add an action to begin." });
    sequence.forEach((id, step) => {
      byId[id].code.split("\n").forEach((line) => lines.push({ text: `    ${line}`, step }));
      lines.push({ text: "", step });
    });
    lines.push({ text: "End Sub" });
    return lines;
  }

  function renderCode() {
    codeEl.replaceChildren();
    codeLines().forEach((line) => {
      const span = create("span", "aic-code-line", line.text || " ");
      if (line.step !== undefined) span.dataset.codeStep = line.step;
      codeEl.append(span);
    });
  }

  function suggestedIds() {
    if (!sequence.length) return actions.filter((action) => action.recommendedStart).map((action) => action.id);
    return byId[sequence[sequence.length - 1]].suggestsNext || [];
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
        button.type = "button"; button.dataset.stepCommand = command;
        button.setAttribute("aria-label", `${aria}: ${action.label}`);
        if ((command === "up" && index === 0) || (command === "down" && index === sequence.length - 1)) button.disabled = true;
        controls.append(button);
      });
      item.append(number, body, controls);
      sequenceEl.append(item);
    });
    emptyEl.hidden = sequence.length > 0;
    countEl.textContent = `${sequence.length} ${sequence.length === 1 ? "step" : "steps"}`;
    renderCode();
    const suggested = new Set(suggestedIds());
    palette.querySelectorAll("[data-action-item]").forEach((item) => {
      const action = byId[item.dataset.actionItem];
      const used = !action.loopable && sequence.includes(action.id);
      const button = item.querySelector("[data-add-action]");
      button.disabled = used;
      button.setAttribute("aria-label", used ? `${action.label} is already in the program. Remove it to add it elsewhere.` : `Add ${action.label}. ${action.help.what} Use when: ${action.help.when}`);
      item.classList.toggle("is-suggested", suggested.has(action.id) && !used);
      let cue = button.querySelector(".aic-action-cue--next");
      if (suggested.has(action.id) && !used && sequence.length) {
        if (!cue) button.append(create("small", "aic-action-cue aic-action-cue--next", "SUGGESTED NEXT"));
      } else cue?.remove();
    });
  }

  function cancelRun(message) {
    runToken += 1;
    root.classList.remove("is-running");
    root.querySelectorAll(".is-executing").forEach((node) => node.classList.remove("is-executing"));
    statusEl.textContent = "READY";
    runButton.disabled = false;
    if (message) consoleEl.textContent = message;
  }

  function mutate(message) { cancelRun(); render(); consoleEl.textContent = message; }

  palette.addEventListener("click", (event) => {
    const helpButton = event.target.closest("[data-help-toggle]");
    if (helpButton) {
      const open = helpButton.getAttribute("aria-expanded") !== "true";
      palette.querySelectorAll("[data-help-toggle]").forEach((button) => button.setAttribute("aria-expanded", "false"));
      helpButton.setAttribute("aria-expanded", String(open));
      return;
    }
    const button = event.target.closest("[data-add-action]");
    if (!button) return;
    const action = byId[button.dataset.addAction];
    if (!action.loopable && sequence.includes(action.id)) return;
    sequence.push(action.id);
    mutate(`${action.label} added. ${action.loopable ? "It can be used again." : "Optional one-off placed."}`);
  });

  sequenceEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step-command]");
    if (!button) return;
    const index = Number(button.closest("[data-index]").dataset.index);
    const command = button.dataset.stepCommand;
    const name = byId[sequence[index]].label;
    if (command === "remove") sequence.splice(index, 1);
    if (command === "up" && index > 0) [sequence[index - 1], sequence[index]] = [sequence[index], sequence[index - 1]];
    if (command === "down" && index < sequence.length - 1) [sequence[index + 1], sequence[index]] = [sequence[index], sequence[index + 1]];
    mutate(`${name} ${command === "remove" ? "removed" : `moved ${command}`}.`);
    sequenceEl.querySelector(`[data-index="${Math.min(index, sequence.length - 1)}"] button:not(:disabled)`)?.focus();
  });

  root.querySelector("[data-command='example']").addEventListener("click", () => {
    sequence = [...window.AI_COLLABORATION_EXAMPLE];
    mutate("Core example loaded: material, computation, human correction, recognition, Form, Reality, and return to the Field.");
  });
  root.querySelector("[data-command='clear']").addEventListener("click", () => {
    sequence = []; mutate("Program cleared. Load Field is a useful start, but every action remains available.");
  });

  function wait(ms) { return new Promise((resolve) => window.setTimeout(resolve, ms)); }

  async function runProgram() {
    if (!sequence.length) { consoleEl.textContent = "Nothing ran. Add any instruction to begin."; return; }
    cancelRun();
    const token = ++runToken;
    const snapshot = [...sequence];
    root.classList.add("is-running");
    statusEl.textContent = "RUNNING";
    runButton.disabled = true;
    consoleEl.textContent = `RUNNING · ${snapshot.length} instructions queued.`;
    const delay = reduceMotion.matches ? 0 : 360;
    for (let index = 0; index < snapshot.length; index += 1) {
      if (token !== runToken) return;
      root.querySelectorAll(".is-executing").forEach((node) => node.classList.remove("is-executing"));
      const step = sequenceEl.querySelector(`[data-index="${index}"]`);
      const lines = codeEl.querySelectorAll(`[data-code-step="${index}"]`);
      step?.classList.add("is-executing");
      lines.forEach((line) => line.classList.add("is-executing"));
      if (!reduceMotion.matches) step?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      consoleEl.textContent = `STEP ${String(index + 1).padStart(2, "0")} · ${byId[snapshot[index]].label.toUpperCase()} > ${byId[snapshot[index]].runMessage}`;
      await wait(delay);
    }
    if (token !== runToken) return;
    root.querySelectorAll(".is-executing").forEach((node) => node.classList.remove("is-executing"));
    root.classList.remove("is-running");
    statusEl.textContent = "COMPLETE";
    runButton.disabled = false;
    const hasVote = snapshot.some((id) => ["react", "hmmm_no_but", "add_correction", "ding"].includes(id));
    const hasDing = snapshot.includes("ding");
    const stored = snapshot.includes("store_result");
    const history = snapshot.includes("store_history");
    consoleEl.textContent = `RUN COMPLETE · ${hasVote ? "Human vote present" : "No human judgment step detected"} · ${hasDing ? "Ding recognized" : "No Ding detected"} · ${stored ? "Result returned to Field" : "Result not stored"}${history ? " · History retained" : ""}.`;
  }

  runButton.addEventListener("click", runProgram);
  renderPaletteGroup("loopable", "Loopable pieces", "ADD FREELY");
  renderPaletteGroup("occasional", "One-off / occasional", "ALL OPTIONAL");
  sequence = [...window.AI_COLLABORATION_EXAMPLE];
  render();
})();
