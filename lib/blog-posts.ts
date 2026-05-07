export type BlogPostPreview = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  /** Approximate reading time in seconds */
  timeToRead: number;
  content: string;
  /** Cover image — local `/public/...` or remote URL if configured in `next.config.js` */
  image: string;
};

/** Cover image URL used across sample posts (Blockworks / imgix). */
export const LEGACY_BLOG_COVER_IMAGE =
  "https://blockworks.co/_next/image?url=https://blockworks-co.imgix.net/wp-content/uploads/2024/11/btc-pastel-stripes.jpg&w=1920&q=75&webp=false";

/**
 * Long-form sample posts for layout / typography testing.
 * `content` is sanitized HTML authored by us (not user input).
 */
export const BLOG_POSTS: BlogPostPreview[] = [
  {
    slug: "why-fintech-startups-are-moving-on-chain",
    title: "Why Fintech Startups Are Moving On-Chain",
    excerpt:
      "Capital flows, regulatory pressure, and customer expectations are pushing product teams to treat blockchain as infrastructure—not a novelty. Here is how we see the shift playing out in 2026 and what it means for builders.",
    publishedAt: "2026-03-12",
    author: "Hoasen Team",
    timeToRead: 780,
    image: LEGACY_BLOG_COVER_IMAGE,
    content: `
<p>For the past decade, “blockchain” in fintech usually meant experiments: a pilot stablecoin, a loyalty token, or a proof-of-concept that never survived a serious security review. That posture has changed. Today, teams ask a different question—not whether distributed ledgers are interesting, but which workflows deserve programmable settlement, shared state, and auditability by design.</p>
<p>We work with startups and enterprises across payments, custody, and asset issuance. The pattern we see repeatedly is simple on the surface and difficult in practice: products want <strong>global reach</strong>, <strong>near-real-time settlement</strong>, and <strong>transparent reconciliation</strong>, without rebuilding their entire stack every time they enter a new market.</p>

<h2>From APIs to assets: why settlement became the bottleneck</h2>
<p>Traditional banking rails were built for batch windows, correspondent banking, and manual exception handling. That model conflicts with user expectations shaped by instant messaging and same-day commerce. When your competitor can move value in seconds, “T+2” stops being an operational detail and becomes a churn risk.</p>
<p>Blockchains do not magically remove compliance or operational risk. What they can do—when architected carefully—is reduce reconciliation overhead by creating a shared source of truth for balances and obligations. The win is not “decentralization” as ideology; it is fewer mismatched spreadsheets and fewer midnight incidents caused by two databases disagreeing about reality.</p>
<blockquote>Teams that succeed treat chain choice, custody, and key management as product decisions—not infrastructure footnotes decided late in the roadmap.</blockquote>

<h2>What changes when you treat chain infrastructure seriously</h2>
<p>First, your threat model expands: private keys, upgrades, oracle dependencies, and bridge risk become part of release planning. Second, your observability stack must evolve: you need transaction tracing, anomaly detection, and runbooks that match how incidents manifest on-chain versus in a typical microservice mesh.</p>
<p>Third, your partnership landscape shifts. Issuers, custodians, auditors, and regulators increasingly speak the language of addresses, proofs, and attestations. Product teams that can translate between business requirements and chain mechanics ship faster—because they avoid architectural churn caused by mismatched assumptions.</p>
<ul>
<li><strong>Design for failure:</strong> assume RPC instability, partial outages, and mempool variability—especially during volatility.</li>
<li><strong>Define “finality” for your product:</strong> user-facing UX should not promise instant certainty unless your protocol choices actually provide it.</li>
<li><strong>Instrument everything:</strong> chain events should be first-class signals in your monitoring and customer support tooling.</li>
<li><strong>Keep an upgrade path:</strong> bridges, standards, and custody models evolve; avoid hard-coding a single vendor into your core domain model.</li>
</ul>

<h2>How we evaluate whether “on-chain” is worth it</h2>
<p>Not every feature belongs on a ledger. We start with the workflow: who needs to trust whom, what needs to be proven, and what can remain off-chain. If the primary win is simply cheaper database hosting, a blockchain is usually the wrong tool. If the primary win is <strong>stronger audit trails</strong>, <strong>programmable escrow</strong>, or <strong>global interoperability</strong>, the conversation changes.</p>
<p>We also pressure-test roadmaps against regulatory realities in the jurisdictions that matter. The goal is not “maximum decentralization,” but <strong>defensible operations</strong>: clear roles, enforceable policies, and engineering controls that match the risk profile of the asset and customer segment.</p>
<p>If you are exploring an on-chain product direction—whether payments infrastructure, tokenized instruments, or hybrid workflows—we are happy to help you stress-test architecture early. The cheapest time to fix a chain strategy mistake is before it ships.</p>
    `.trim(),
  },

  {
    slug: "building-secure-smart-contracts",
    title: "Building Secure Smart Contracts: Lessons From Real Projects",
    excerpt:
      "A practical walkthrough of how we approach audits, testing, and operational safety when shipping contracts that hold real user funds—from threat modeling to release discipline.",
    publishedAt: "2026-03-20",
    author: "Hoasen Engineering",
    timeToRead: 720,
    image: LEGACY_BLOG_COVER_IMAGE,
    content: `
<p>Smart contract failures are unusual in one respect: they are often irreversible. A bug in a backend service can be patched; a bug in a deployed contract may cost users money and trust before anyone can react. That asymmetry forces a different engineering culture—one where security is not a gate at the end, but a constraint throughout design.</p>
<p>This article summarizes patterns we use across DeFi-style applications, tokenized assets, and payment flows. It is not a generic checklist; it is the distilled residue of incidents avoided, surprises discovered in testnets, and lessons learned from working alongside auditors.</p>

<h2>Start with assets, actors, and adversaries</h2>
<p>Every contract system has a story: who can mint, who can pause, who can upgrade, and what happens when keys are compromised. We write that story explicitly—sometimes as diagrams, sometimes as threat models—before we debate implementation details. If the story contains ambiguous authority, the code will encode ambiguity, and ambiguity becomes exploit surface.</p>
<p>We pay special attention to “small” functions: admin toggles, fee switches, token rescue utilities, and emergency withdrawal paths. These often look boring until they become the only escape hatch during an incident.</p>

<h2>Testing is necessary but not sufficient</h2>
<p>Automated tests protect against regressions; they do not guarantee absence of economic attacks. We combine unit tests with property-based tests where feasible, and we still assume we missed something. That is why we layer static analysis and differential reviews on critical paths—especially anything touching accounting, rounding, or oracle-dependent pricing.</p>
<p>We also treat deployment as part of safety: bytecode verification, constructor parameters, initialization sequencing, and migration plans are rehearsed like a launch checklist—not improvised at the last minute.</p>
<ul>
<li><strong>Isolate complexity:</strong> separate upgrade logic from business logic when practical.</li>
<li><strong>Minimize privilege:</strong> prefer narrow roles and explicit delays for sensitive actions.</li>
<li><strong>Prefer boring libraries:</strong> well-audited standards beat clever custom math.</li>
<li><strong>Run drill incidents:</strong> rehearse key rotation, pausing, and communications workflows.</li>
</ul>

<h2>Audits: how to get real value</h2>
<p>An audit is not a certificate; it is a time-boxed collaboration. The best outcomes happen when teams arrive with crisp documentation, reproducible builds, and candid disclosure of known shortcuts. We aim to make auditors productive by reducing treasure-hunt time—clear architecture notes, explicit assumptions, and threat modeling notes help everyone.</p>
<p>Finally, security does not end at deployment. We plan monitoring hooks and operational signals so teams can detect anomalies early—because in production, safety is also uptime, incident response, and customer trust.</p>
    `.trim(),
  },

  {
    slug: "tokenized-real-world-assets",
    title: "The Rise of Tokenized Real-World Assets (RWA)",
    excerpt:
      "Tokenization is moving from demo decks to operational platforms. Here is what actually matters for issuers, investors, and the engineering teams bridging TradFi workflows with on-chain settlement.",
    publishedAt: "2026-04-02",
    author: "Hoasen Research",
    timeToRead: 690,
    image: LEGACY_BLOG_COVER_IMAGE,
    content: `
<p>Real-world asset tokenization has been “the next big thing” for years. What feels different now is the maturity of the surrounding plumbing: custody interfaces, identity workflows, reporting expectations, and investor onboarding patterns are converging toward repeatable playbooks rather than one-off experiments.</p>
<p>That does not mean the space is easy. It means the failures are increasingly ordinary product failures—unclear ownership, fragile operations, and mismatched regulatory narratives—rather than confusion about what a token is.</p>

<h2>What tokenization solves—and what it does not</h2>
<p>Tokenization can improve discoverability, streamline settlement, and reduce friction for eligible investors. It does not automatically create liquidity. Markets remain governed by economics: depth requires counterparties, credible pricing, and operational reliability.</p>
<p>Teams succeed when they define the investor journey end-to-end: subscription, redemption, corporate actions, disclosures, and customer support. The chain is one layer in that journey—not the entire product.</p>

<h2>Compliance as an engineering constraint</h2>
<p>In many programs, compliance is not an abstract policy deck; it becomes concrete requirements for eligibility proofs, transfer restrictions, jurisdiction-aware UX, and audit trails. We encourage teams to translate regulatory obligations into explicit system requirements early—because retrofitting controls after launch is expensive and risky.</p>
<blockquote>The strongest programs combine legal clarity with operational discipline: who can hold what, under what conditions, and how exceptions are handled without bypassing controls.</blockquote>

<h2>Architecture patterns we see winning</h2>
<p>Healthy architectures separate issuance logic from distribution surfaces, maintain traceability for lifecycle events, and avoid “one giant contract” designs that become impossible to reason about under pressure.</p>
<p>We also recommend planning for evolution: standards mature, custodians change, and reporting formats tighten. A domain model that treats tokens as long-lived financial instruments—not disposable NFT-style objects—ages better.</p>
<p>If you are evaluating RWA infrastructure choices—custody models, permissioning, investor portals, and chain strategy—we recommend validating assumptions with a prototype that includes Operations and Legal early, not only Engineering.</p>
    `.trim(),
  },

  {
    slug: "frontend-web3-applications",
    title: "Frontend Development for Modern Web3 Applications",
    excerpt:
      "Wallet UX, chain abstraction, and resilient interfaces: how we build web apps that feel fast and trustworthy even when the underlying network is messy.",
    publishedAt: "2026-04-15",
    author: "Frontend Team",
    timeToRead: 660,
    image: LEGACY_BLOG_COVER_IMAGE,
    content: `
<p>Web3 frontends look like normal React apps until they are not. Users encounter confusing wallet prompts, unexpected chain switches, RPC failures, and transactions that pend for minutes. The product’s job is to make those realities legible—without turning every screen into a technical manual.</p>
<p>Our approach is to treat wallet connectivity as part of the core UX system: states, errors, retries, and recovery paths should be designed—not improvised when QA finds an edge case.</p>

<h2>Design for uncertainty at the edges</h2>
<p>Networks fluctuate. RPC endpoints degrade. Wallets differ in behavior. A resilient UI assumes variance: show pending states honestly, surface actionable errors, and avoid irreversible actions without confirmation paths that users can understand quickly.</p>
<p>We bias toward progressive disclosure: beginners see simple flows; advanced users can access details (hashes, explorers, advanced gas controls) without cluttering the default path.</p>

<h2>Performance is trust</h2>
<p>Slow interfaces feel unsafe. Code-splitting, caching strategies for chain reads, and careful rendering discipline matter as much as visual polish. We also pay attention to perceived performance: skeleton states, optimistic UI where appropriate, and clear transitions reduce anxiety during waits.</p>
<ul>
<li><strong>Centralize chain reads:</strong> avoid accidental request storms from scattered hooks.</li>
<li><strong>Normalize errors:</strong> map technical failures into human guidance.</li>
<li><strong>Test on real devices:</strong> wallet flows break differently on mobile browsers.</li>
<li><strong>Instrument UX:</strong> measure drop-off at connect, sign, and confirm steps.</li>
</ul>

<h2>Engineering culture that ships</h2>
<p>Finally, great Web3 UX is a cross-functional outcome. Designers need enough chain literacy to prototype realistic states; engineers need enough product taste to reject “good enough” error handling.</p>
<p>If you are building a customer-facing crypto product and want your frontend to feel as polished as the best fintech apps—while remaining honest about chain constraints—we would love to compare notes on architecture and release discipline.</p>
    `.trim(),
  },

  {
    slug: "ai-blockchain-fintech",
    title: "AI + Blockchain: The Next Evolution of Fintech",
    excerpt:
      "Practical intersections between AI and decentralized systems—from compliance automation to operational monitoring—and why the hardest problems are rarely purely technical.",
    publishedAt: "2026-04-28",
    author: "Hoasen AI Lab",
    timeToRead: 750,
    image: LEGACY_BLOG_COVER_IMAGE,
    content: `
<p>Artificial intelligence did not replace financial infrastructure overnight—but it is reshaping how teams detect fraud, automate documentation, and operate complex systems at scale. Meanwhile, blockchain adoption continues to grow in domains where provenance, auditability, and coordination across organizations matter.</p>
<p>The interesting opportunities appear where these trends overlap: systems that must be both intelligent and verifiable, automated yet accountable.</p>

<h2>Where AI adds leverage</h2>
<p>In operations, models can assist with anomaly detection, summarization, and triage—especially when paired with structured signals from on-chain monitors and internal ledgers. In customer experience, carefully bounded assistants can explain transactions, guide onboarding, and reduce support load—if grounded with accurate product facts and strong guardrails.</p>
<p>What remains hard is not generating text—it is ensuring reliability under adversarial pressure. Financial products attract abuse; models must not become social-engineering multipliers.</p>

<h2>Where chains still matter</h2>
<p>Blockchains do not “solve AI trust” automatically. They can anchor commitments, enable transparent audit trails for certain workflows, and support cryptographic attestations where standards exist. The engineering task is to identify what should be on-chain versus what should remain in traditional systems—based on cost, privacy, and enforceability.</p>
<blockquote>The strongest roadmap is honest about scope: ship narrow, measurable wins before promising autonomous agents that move money.</blockquote>

<h2>How we prototype responsibly</h2>
<p>We start with workflow mapping and risk classification: what decisions are irreversible, what data is sensitive, and what human oversight is required. From there, we design evaluations: not only accuracy metrics, but operational drills—what happens when the model is wrong, delayed, or unavailable.</p>
<p>If you are exploring AI features for a regulated or crypto-adjacent product, we recommend pairing ML experimentation with clear governance—because in production, reliability is safety.</p>
    `.trim(),
  },

  {
    slug: "solana-vs-ethereum",
    title: "Choosing Between Solana and Ethereum for Your Product",
    excerpt:
      "A founder-friendly framework for comparing ecosystems—throughput, tooling, liquidity, and operational reality—without treating the decision like a religion.",
    publishedAt: "2026-05-05",
    author: "Hoasen Engineering",
    timeToRead: 720,
    image: LEGACY_BLOG_COVER_IMAGE,
    content: `
<p>“Which chain should we use?” is usually asked too early—before the team clarifies what they are optimizing for: cost structure, time-to-market, composability, liquidity access, or operational complexity. Ethereum and Solana both host serious ecosystems, but they impose different engineering constraints and operational rhythms.</p>
<p>This article will not crown a winner. It will give you a structured way to decide—and to revisit the decision as your product grows.</p>

<h2>Start from product constraints, not headlines</h2>
<p>If your product depends on deep DeFi liquidity and a massive wallet footprint, Ethereum’s ecosystem strengths may dominate the calculus—even if fees require smarter UX and scaling strategies. If your product needs high-frequency interactions and low per-action costs, Solana may fit comfortably—assuming your team can handle distinct tooling and operational realities.</p>
<p>Also consider team expertise: shipping successfully matters more than theoretical peak throughput.</p>

<h2>Ethereum: liquidity, standards, and complexity</h2>
<p>Ethereum’s advantage is often ecosystem depth: protocols, auditors, custody integrations, and battle-tested patterns. The tradeoff is typically higher fees and more intricate scaling approaches for consumer-scale interactions—unless you lean on L2s, which introduce their own bridging and UX considerations.</p>

<h2>Solana: throughput, cadence, and discipline</h2>
<p>Solana can feel incredibly responsive when applications are engineered with its execution model in mind. That responsiveness comes with responsibility: performance-sensitive patterns, careful testing, and operational maturity matter—because users notice variance quickly.</p>
<ul>
<li><strong>Benchmark realistically:</strong> measure end-to-end UX, not isolated TPS marketing numbers.</li>
<li><strong>Plan operations:</strong> incidents and upgrades should have clear ownership.</li>
<li><strong>Question assumptions:</strong> migrate when constraints change—your first choice is not a marriage.</li>
</ul>

<h2>A decision you can revisit</h2>
<p>Chain strategy should be treated like any major platform bet: revisit it when your user scale, risk profile, or partnership landscape changes. The goal is not perfection on day one—it is a defensible choice with a credible plan for evolution.</p>
<p>If you want an architecture review or a neutral comparison tailored to your roadmap constraints, reach out—this is work we do with teams every quarter.</p>
    `.trim(),
  },
];

export function formatReadLabel(seconds: number): string {
  const mins = Math.max(1, Math.round(seconds / 60));
  return `${mins} Mins Read`;
}
