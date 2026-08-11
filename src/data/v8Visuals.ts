const svgData = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

export const evidenceMatrixVisual = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 820">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#061225"/><stop offset="1" stop-color="#020713"/></linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#48dfd6"/><stop offset=".52" stop-color="#6b91ff"/><stop offset="1" stop-color="#9d6bff"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#000" flood-opacity=".38"/></filter>
  </defs>
  <rect width="1400" height="820" fill="url(#bg)"/>
  <g opacity=".18" stroke="#6f9cd4"><path d="M0 90H1400M0 180H1400M0 270H1400M0 360H1400M0 450H1400M0 540H1400M0 630H1400M0 720H1400"/><path d="M90 0V820M180 0V820M270 0V820M360 0V820M450 0V820M540 0V820M630 0V820M720 0V820M810 0V820M900 0V820M990 0V820M1080 0V820M1170 0V820M1260 0V820"/></g>
  <text x="68" y="74" fill="#68a0ff" font-family="Arial" font-size="20" font-weight="700" letter-spacing="3">ILLUSTRATIVE PREVIEW / EVIDENCE MATRIX</text>
  <text x="68" y="132" fill="#f5f8ff" font-family="Arial" font-size="42" font-weight="700">See what is supported — and where certainty ends.</text>
  <rect x="65" y="175" width="1270" height="570" rx="28" fill="#08182e" stroke="#345a8f" filter="url(#shadow)"/>
  <rect x="65" y="175" width="1270" height="70" rx="28" fill="#0d203b"/>
  <text x="108" y="218" fill="#829bc0" font-family="Arial" font-size="16" font-weight="700" letter-spacing="2">CLAIM</text>
  <text x="590" y="218" fill="#829bc0" font-family="Arial" font-size="16" font-weight="700" letter-spacing="2">STATE</text>
  <text x="795" y="218" fill="#829bc0" font-family="Arial" font-size="16" font-weight="700" letter-spacing="2">SOURCE</text>
  <text x="1060" y="218" fill="#829bc0" font-family="Arial" font-size="16" font-weight="700" letter-spacing="2">DECISION USE</text>
  <g font-family="Arial">
    <g><line x1="95" y1="280" x2="1305" y2="280" stroke="#244160"/><text x="108" y="325" fill="#f3f7ff" font-size="22" font-weight="700">Public list price shown</text><rect x="590" y="298" width="110" height="38" rx="18" fill="#123e44" stroke="#48dfd6"/><text x="617" y="323" fill="#48dfd6" font-size="15" font-weight="700">FACT</text><text x="795" y="323" fill="#c1cee0" font-size="18">Official pricing</text><text x="1060" y="323" fill="#e6eef9" font-size="18" font-weight="700">Compare mechanics</text></g>
    <g><line x1="95" y1="385" x2="1305" y2="385" stroke="#244160"/><text x="108" y="430" fill="#f3f7ff" font-size="22" font-weight="700">AI billing definition documented</text><rect x="590" y="403" width="110" height="38" rx="18" fill="#123e44" stroke="#48dfd6"/><text x="617" y="428" fill="#48dfd6" font-size="15" font-weight="700">FACT</text><text x="795" y="428" fill="#c1cee0" font-size="18">Official help centre</text><text x="1060" y="428" fill="#e6eef9" font-size="18" font-weight="700">Read charging model</text></g>
    <g><line x1="95" y1="490" x2="1305" y2="490" stroke="#244160"/><text x="108" y="535" fill="#f3f7ff" font-size="22" font-weight="700">Packaging may signal a shift</text><rect x="590" y="508" width="155" height="38" rx="18" fill="#4a3518" stroke="#f4a244"/><text x="607" y="533" fill="#f4a244" font-size="15" font-weight="700">INFERENCE</text><text x="795" y="533" fill="#c1cee0" font-size="18">Pricing + product</text><text x="1060" y="533" fill="#e6eef9" font-size="18" font-weight="700">Test hypothesis</text></g>
    <g><line x1="95" y1="595" x2="1305" y2="595" stroke="#244160"/><text x="108" y="640" fill="#f3f7ff" font-size="22" font-weight="700">Team-specific effective cost</text><rect x="590" y="613" width="135" height="38" rx="18" fill="#2d2150" stroke="#9d6bff"/><text x="607" y="638" fill="#bd9aff" font-size="15" font-weight="700">UNKNOWN</text><text x="795" y="638" fill="#c1cee0" font-size="18">Not established</text><text x="1060" y="638" fill="#e6eef9" font-size="18" font-weight="700">Ask before buy</text></g>
  </g>
  <rect x="95" y="690" width="1210" height="4" rx="2" fill="url(#glow)" opacity=".75"/>
  <text x="108" y="722" fill="#829bc0" font-family="Arial" font-size="16">Claim → evidence state → source → role in the decision</text>
</svg>`);

export const annotatedSourceVisual = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 820">
  <defs><linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#071526"/><stop offset="1" stop-color="#03101a"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="20" stdDeviation="20" flood-opacity=".32"/></filter></defs>
  <rect width="1400" height="820" fill="url(#bg2)"/>
  <text x="70" y="70" fill="#49ddd4" font-family="Arial" font-size="20" font-weight="700" letter-spacing="3">SOURCE ANNOTATION</text>
  <text x="70" y="128" fill="#f5f8ff" font-family="Arial" font-size="42" font-weight="700">Evidence starts at the source — not at the summary.</text>
  <rect x="70" y="180" width="850" height="555" rx="25" fill="#f5f8fc" filter="url(#s)"/>
  <rect x="70" y="180" width="850" height="64" rx="25" fill="#e7edf5"/>
  <text x="108" y="220" fill="#50617a" font-family="Arial" font-size="16" font-weight="700">PUBLIC COMPETITOR PAGE / ILLUSTRATIVE FORMAT</text>
  <text x="110" y="315" fill="#152135" font-family="Arial" font-size="38" font-weight="700">Enterprise support automation</text>
  <text x="110" y="365" fill="#607088" font-family="Arial" font-size="20">The research record captures what a page plainly shows</text><text x="110" y="397" fill="#607088" font-family="Arial" font-size="20">before any interpretation is added.</text>
  <rect x="108" y="455" width="690" height="132" rx="20" fill="#e2f8f5" stroke="#35bdb4" stroke-width="2"/>
  <text x="136" y="493" fill="#168e87" font-family="Arial" font-size="16" font-weight="700">OBSERVED STATEMENT</text>
  <text x="136" y="535" fill="#16343b" font-family="Arial" font-size="24" font-weight="700">“Capability is described on the public page.”</text>
  <rect x="962" y="230" width="355" height="350" rx="24" fill="#0b2036" stroke="#38d5cd" filter="url(#s)"/>
  <text x="1000" y="276" fill="#4be0d7" font-family="Arial" font-size="16" font-weight="700">SOURCE RECORD</text>
  <text x="1000" y="327" fill="#f5f8ff" font-family="Arial" font-size="28" font-weight="700">Observation</text>
  <text x="1000" y="371" fill="#aebed3" font-family="Arial" font-size="18">What the source plainly shows,</text><text x="1000" y="400" fill="#aebed3" font-family="Arial" font-size="18">without adding interpretation.</text>
  <rect x="1000" y="448" width="95" height="38" rx="18" fill="#123d43" stroke="#48dfd6"/><text x="1025" y="473" fill="#48dfd6" font-family="Arial" font-size="15" font-weight="700">FACT</text>
  <text x="1000" y="527" fill="#dce7f6" font-family="Arial" font-size="17" font-weight="700">Checked / dated / openable</text>
  <path d="M805 520 C900 515 930 445 962 405" fill="none" stroke="#48dfd6" stroke-width="4"/><circle cx="806" cy="520" r="9" fill="#48dfd6"/>
</svg>`);

export const decisionBriefVisual = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 820">
  <defs><linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#080d1d"/><stop offset="1" stop-color="#071b2b"/></linearGradient><filter id="sh"><feDropShadow dx="0" dy="24" stdDeviation="24" flood-opacity=".38"/></filter></defs>
  <rect width="1400" height="820" fill="url(#bg3)"/>
  <text x="70" y="70" fill="#ad84ff" font-family="Arial" font-size="20" font-weight="700" letter-spacing="3">DECISION BRIEF</text>
  <text x="70" y="128" fill="#f5f8ff" font-family="Arial" font-size="42" font-weight="700">The output is built for a move, not a reading pile.</text>
  <g filter="url(#sh)"><rect x="115" y="180" width="620" height="550" rx="22" fill="#f7f9fc"/><rect x="690" y="145" width="585" height="555" rx="22" fill="#edf2f8"/></g>
  <text x="155" y="230" fill="#526b9b" font-family="Arial" font-size="15" font-weight="700">EVIDENCE AXIS</text><text x="155" y="282" fill="#17243a" font-family="Arial" font-size="38" font-weight="700">Decision Summary</text>
  <text x="155" y="333" fill="#71819b" font-family="Arial" font-size="15" font-weight="700">QUESTION</text><text x="155" y="372" fill="#27364d" font-family="Arial" font-size="21" font-weight="700">Which option is better supported</text><text x="155" y="402" fill="#27364d" font-family="Arial" font-size="21" font-weight="700">for the decision at hand?</text>
  <g font-family="Arial"><rect x="155" y="455" width="520" height="58" rx="15" fill="#eaf5f4" stroke="#45cfc7"/><text x="178" y="490" fill="#1b9d96" font-size="15" font-weight="700">FACT</text><text x="290" y="490" fill="#506177" font-size="16">What public evidence directly supports</text><rect x="155" y="530" width="520" height="58" rx="15" fill="#fff5e8" stroke="#efa04a"/><text x="178" y="565" fill="#d47f22" font-size="15" font-weight="700">INFERENCE</text><text x="310" y="565" fill="#506177" font-size="16">What the evidence reasonably suggests</text><rect x="155" y="605" width="520" height="58" rx="15" fill="#f2edff" stroke="#9669ed"/><text x="178" y="640" fill="#8155da" font-size="15" font-weight="700">UNKNOWN</text><text x="305" y="640" fill="#506177" font-size="16">What cannot be established publicly</text></g>
  <text x="745" y="215" fill="#536c9b" font-family="Arial" font-size="15" font-weight="700">DECISION IMPLICATIONS</text><text x="745" y="270" fill="#17243a" font-family="Arial" font-size="34" font-weight="700">What changes if</text><text x="745" y="310" fill="#17243a" font-family="Arial" font-size="34" font-weight="700">this evidence is true?</text>
  <g font-family="Arial" font-size="18" font-weight="700" fill="#33445e"><rect x="745" y="365" width="470" height="72" rx="16" fill="#fff" stroke="#d7dfeb"/><circle cx="785" cy="401" r="12" fill="#48dfd6"/><text x="820" y="408">What becomes safer to do</text><rect x="745" y="460" width="470" height="72" rx="16" fill="#fff" stroke="#d7dfeb"/><circle cx="785" cy="496" r="12" fill="#f4a244"/><text x="820" y="503">What still needs validation</text><rect x="745" y="555" width="470" height="72" rx="16" fill="#fff" stroke="#d7dfeb"/><circle cx="785" cy="591" r="12" fill="#9d6bff"/><text x="820" y="598">What could change the answer</text></g>
  <text x="745" y="665" fill="#6d84aa" font-family="Arial" font-size="14" font-weight="700">SOURCE → OBSERVATION → FACT → INFERENCE → MOVE</text>
</svg>`);

export const workflowVisual = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 820"><defs><linearGradient id="bg4"><stop stop-color="#051120"/><stop offset="1" stop-color="#080d1b"/></linearGradient></defs><rect width="1400" height="820" fill="url(#bg4)"/><text x="70" y="72" fill="#f2a049" font-family="Arial" font-size="20" font-weight="700" letter-spacing="3">WHY THE WORKFLOW MATTERS</text><text x="70" y="130" fill="#f5f8ff" font-family="Arial" font-size="42" font-weight="700">A summary is not the same as a defensible brief.</text><rect x="70" y="190" width="575" height="535" rx="28" fill="#111a2a" stroke="#394b66"/><rect x="755" y="190" width="575" height="535" rx="28" fill="#082335" stroke="#36cfc7"/><text x="110" y="245" fill="#8999b1" font-family="Arial" font-size="18" font-weight="700">GENERIC MODEL OUTPUT</text><text x="795" y="245" fill="#48dfd6" font-family="Arial" font-size="18" font-weight="700">EVIDENCE AXIS WORKFLOW</text><g font-family="Arial" font-size="22" font-weight="700"><g fill="#cbd5e3"><circle cx="125" cy="330" r="14" fill="#56677f"/><text x="165" y="338">Summarize pages</text><circle cx="125" cy="425" r="14" fill="#56677f"/><text x="165" y="433">Write a confident synthesis</text><circle cx="125" cy="520" r="14" fill="#56677f"/><text x="165" y="528">Blend evidence and assumptions</text><circle cx="125" cy="615" r="14" fill="#56677f"/><text x="165" y="623">Leave discipline to the prompt</text></g><g fill="#f4f8ff"><circle cx="810" cy="330" r="14" fill="#48dfd6"/><text x="850" y="338">Record the source</text><circle cx="810" cy="425" r="14" fill="#48dfd6"/><text x="850" y="433">Separate Fact / Inference / Unknown</text><circle cx="810" cy="520" r="14" fill="#48dfd6"/><text x="850" y="528">Keep unresolved questions visible</text><circle cx="810" cy="615" r="14" fill="#48dfd6"/><text x="850" y="623">Trace implications back to evidence</text></g></g></svg>`);
