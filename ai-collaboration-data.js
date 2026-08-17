window.AI_COLLABORATION_ACTIONS = [
  { id: "load_field", label: "Load Field", group: "occasional", loopable: false, actor: "FLETCHER", description: "Bring retained context and material into working memory.", code: "Pieces = Fletcher.LoadField()" },
  { id: "retrieve", label: "Retrieve", group: "occasional", loopable: false, actor: "AI", description: "Recover an artifact, conversation, file, or prior idea.", code: "Pieces.Add AI.Archaeologist.Retrieve()" },
  { id: "ask_weird", label: "Ask Weird Question", group: "occasional", loopable: false, actor: "BOTH", description: "Introduce a question that may cause unexpected contact.", code: "Pieces.Add Collaboration.AskWeirdQuestion()" },
  { id: "ding", label: "Ding 💡", group: "occasional", loopable: false, actor: "FLETCHER", description: "Recognize that a candidate or collision rings.", code: "Ding = Fletcher.Recognizes(Candidate)" },
  { id: "name", label: "Name", group: "occasional", loopable: false, actor: "FLETCHER", description: "Give the recognized pattern a handle.", code: "Form.Name = Fletcher.NameWhatRang()" },
  { id: "model", label: "Model", group: "occasional", loopable: false, actor: "AI", description: "Turn approved thinking into a structure or framework.", code: "Form = AI.Model(WhatRang)" },
  { id: "draft", label: "Draft", group: "occasional", loopable: false, actor: "AI", description: "Create prose from an approved direction.", code: "Form = AI.Draft(WhatRang)" },
  { id: "specify", label: "Specify", group: "occasional", loopable: false, actor: "AI", description: "Translate a concept into bounded requirements.", code: "Specification = AI.SpecWriter.Define(Form)" },
  { id: "build", label: "Build", group: "occasional", loopable: false, actor: "AI", description: "Implement the approved Form.", code: "Artifact = AI.Builder.Build(Specification)" },
  { id: "meet_reality", label: "Meet Reality", group: "occasional", loopable: false, actor: "REALITY", description: "Expose the Form to constraints, users, tests, or production.", code: "Reality.Run(Form)" },
  { id: "store_result", label: "Store Result", group: "occasional", loopable: false, actor: "FIELD", description: "Return the artifact or lesson to the Field.", code: "Field.Store Form" },
  { id: "store_history", label: "Store Collaboration", group: "occasional", loopable: false, actor: "FIELD", description: "Preserve the reasoning history as future material.", code: "Field.Store CollaborationHistory" },
  { id: "mix", label: "Mix", group: "loopable", loopable: true, actor: "AI", description: "Synthesize or compare the supplied pieces.", code: "Candidate = AI.Mixer.Mix(Pieces)" },
  { id: "propose", label: "Propose", group: "loopable", loopable: true, actor: "AI", description: "Offer a candidate pattern, interpretation, or solution.", code: "Candidate = AI.Propose(Pieces)" },
  { id: "react", label: "React", group: "loopable", loopable: true, actor: "FLETCHER", description: "Inspect the candidate and cast the human vote.", code: "Vote = Fletcher.React(Candidate)" },
  { id: "hmmm_no_but", label: "Hmmm No But…", group: "loopable", loopable: true, actor: "FLETCHER", description: "Reject the answer while noticing a useful new distinction.", code: "If Candidate.IsWrong But Candidate.IsInteresting Then\n    NewPiece = Fletcher.ResponseTo(Candidate)\nEnd If" },
  { id: "add_correction", label: "Add Correction", group: "loopable", loopable: true, actor: "FLETCHER", description: "Add the distinction or missing context to the active material.", code: "Pieces.Add Fletcher.NewDistinction" },
  { id: "mix_again", label: "Mix Again", group: "loopable", loopable: true, actor: "AI", description: "Run another synthesis with enriched material.", code: "Candidate = AI.Mixer.Mix(Pieces) ' again" },
  { id: "challenge", label: "Challenge", group: "loopable", loopable: true, actor: "AI", description: "Stress-test an emerging idea or Form.", code: "AI.Challenger.StressTest Form" },
  { id: "refine", label: "Refine", group: "loopable", loopable: true, actor: "BOTH", description: "Revise a candidate without starting over.", code: "Candidate = Collaboration.Refine(Candidate)" }
];

window.AI_COLLABORATION_EXAMPLE = ["load_field", "retrieve", "mix", "propose", "react", "hmmm_no_but", "add_correction", "mix_again", "react", "ding", "model", "challenge", "specify", "build", "meet_reality", "store_result", "store_history"];
