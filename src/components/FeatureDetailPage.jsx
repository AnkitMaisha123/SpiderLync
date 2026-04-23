import { useState, useEffect, useRef } from "react";

const featuresData = {
  "parse-integration": {
    name: "Parse Integration",
    tagline: "Scalable backend, zero boilerplate.",
    color: "#38bdf8",
    colorDim: "rgba(56,189,248,0.12)",
    colorGlow: "rgba(56,189,248,0.25)",
    icon: "⚡",
    category: "Backend",
    badge: "Core",
    howItWorks: {
      intro: "SpiderLync wraps Parse Server into a fully managed, auto-scaling backend so you never touch infra.",
      steps: [
        { title: "Initialize SDK", desc: "Call Parse.initialize() with your App ID. One line, you're connected to a globally distributed Parse cluster." },
        { title: "Define your schema", desc: "Create Parse Objects that map directly to your database. No migrations, no DDL—schema is inferred automatically." },
        { title: "Read & write data", desc: "Use the fluent Query and Object APIs. Changes propagate in milliseconds to every connected client." },
        { title: "Scale automatically", desc: "SpiderLync monitors load and provisions resources transparently. Sleep well." },
      ],
    },
    subFeatures: [
      { name: "Auto-generated APIs", desc: "Every Parse class instantly gets REST + GraphQL endpoints with zero config.", icon: "🔌" },
      { name: "Cloud Code hooks", desc: "beforeSave, afterSave, cloud functions—run logic server-side, securely.", icon: "☁️" },
      { name: "ACL & CLP security", desc: "Row-level and class-level permissions out of the box.", icon: "🔒" },
      { name: "File storage", desc: "Upload and serve files via Parse.File, backed by S3-compatible storage.", icon: "🗂️" },
      { name: "Relations & Pointers", desc: "Model complex data relationships natively without joins.", icon: "🔗" },
      { name: "Indexes & analytics", desc: "Compound indexes and query telemetry from the dashboard.", icon: "📊" },
    ],
    codeExamples: [
      {
        label: "Initialize",
        code: `import Parse from "parse";\n\nParse.initialize("YOUR_APP_ID", "YOUR_JS_KEY");\nParse.serverURL = "https://api.spiderlync.com/1";`,
      },
      {
        label: "Write data",
        code: `const Product = Parse.Object.extend("Product");\nconst item = new Product();\n\nitem.set("name", "Wireless Headphones");\nitem.set("price", 79.99);\nitem.set("inStock", true);\n\nconst saved = await item.save();\nconsole.log("Created:", saved.id);`,
      },
      {
        label: "Query data",
        code: `const query = new Parse.Query("Product");\nquery.equalTo("inStock", true);\nquery.greaterThan("price", 50);\nquery.limit(20);\n\nconst results = await query.find();\nresults.forEach(p => console.log(p.get("name")));`,
      },
      {
        label: "Cloud Code",
        code: `// server-side cloud function\nParse.Cloud.define("getTopProducts", async (request) => {\n  const query = new Parse.Query("Product");\n  query.descending("sales");\n  query.limit(5);\n  return await query.find({ useMasterKey: true });\n});`,
      },
    ],
    useCases: [
      { title: "SaaS apps", desc: "Multi-tenant data isolation with ACLs—perfect for B2B products with per-org data.", icon: "🏢" },
      { title: "Mobile backends", desc: "iOS and Android SDKs mean one backend serves all clients without custom REST work.", icon: "📱" },
      { title: "Rapid prototyping", desc: "From idea to working data layer in under 10 minutes. Iterate without infra debt.", icon: "🚀" },
      { title: "Content platforms", desc: "Dynamic schemas let editors add fields without deploying code changes.", icon: "✍️" },
    ],
    faq: [
      { q: "Is SpiderLync fully compatible with Parse Server?", a: "Yes. SpiderLync is a managed wrapper around open-source Parse Server. Any SDK or client that targets Parse Server works without modification." },
      { q: "Can I migrate an existing Parse app?", a: "Absolutely. Export your MongoDB data, point your SDK to api.spiderlync.com, and you're live. We provide a migration CLI to handle schema mapping." },
      { q: "How is pricing calculated?", a: "By API request volume and storage. Free tier includes 1M requests/month and 5 GB storage. No credit card required to start." },
      { q: "Is the data encrypted at rest?", a: "Yes. All data is AES-256 encrypted at rest and TLS 1.3 in transit. SOC 2 Type II audit in progress." },
      { q: "Can I run Cloud Code in any language?", a: "Currently JavaScript/TypeScript. Python and Go runtimes are on the roadmap for Q3." },
    ],
  },
  "push-notifications": {
    name: "Push Notifications",
    tagline: "Reach users wherever they are, instantly.",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.12)",
    colorGlow: "rgba(167,139,250,0.25)",
    icon: "🔔",
    category: "Engagement",
    badge: "Popular",
    howItWorks: {
      intro: "A unified API sits in front of APNs, FCM, and Web Push so you send once and every platform receives.",
      steps: [
        { title: "Register devices", desc: "SDK auto-registers device tokens. No manual token management needed." },
        { title: "Build your payload", desc: "Compose title, body, image, deep-link, and custom data in one object." },
        { title: "Target your audience", desc: "Send to a user, a segment, or a topic channel. Dynamic segmentation supported." },
        { title: "Track delivery", desc: "Real-time delivery, open, and conversion metrics per notification." },
      ],
    },
    subFeatures: [
      { name: "Scheduled sends", desc: "Queue notifications to fire at the user's local optimal time.", icon: "⏰" },
      { name: "Segmentation", desc: "Target by device OS, location, custom attributes, or behavior.", icon: "🎯" },
      { name: "Rich media", desc: "Attach images, action buttons, and carousels natively.", icon: "🖼️" },
      { name: "A/B testing", desc: "Split test titles and content to maximize open rates.", icon: "🧪" },
      { name: "Webhooks", desc: "Fire webhooks on delivery, open, or dismiss events.", icon: "📡" },
      { name: "Do Not Disturb", desc: "Respect quiet hours automatically per user timezone.", icon: "🌙" },
    ],
    codeExamples: [
      {
        label: "Send notification",
        code: `await fetch("https://api.spiderlync.com/push", {\n  method: "POST",\n  headers: { "X-App-Id": "YOUR_APP_ID" },\n  body: JSON.stringify({\n    title: "Your order shipped!",\n    body: "Arrives Thursday by 8pm",\n    data: { orderId: "ORD-8821" },\n    channels: ["user_42"]\n  })\n});`,
      },
      {
        label: "Schedule send",
        code: `await spiderlync.push.send({\n  title: "Flash sale ends in 1 hour",\n  body: "50% off everything — today only",\n  scheduledAt: new Date("2025-08-01T18:00:00Z"),\n  segment: { country: "US", lastActive: "7d" }\n});`,
      },
      {
        label: "Subscribe & listen",
        code: `// Subscribe device to a topic\nawait Parse.Push.subscribe("breaking_news");\n\n// Listen for incoming push\nParse.Push.on("receive", (notification) => {\n  console.log(notification.title, notification.data);\n});`,
      },
    ],
    useCases: [
      { title: "E-commerce", desc: "Cart abandonment, shipment updates, flash sales—all automated.", icon: "🛒" },
      { title: "News apps", desc: "Breaking alerts delivered to millions in under 2 seconds.", icon: "📰" },
      { title: "SaaS workflows", desc: "Notify collaborators of comments, assignments, and approvals.", icon: "🤝" },
      { title: "Gaming", desc: "Energy-refill reminders and challenge nudges that drive re-engagement.", icon: "🎮" },
    ],
    faq: [
      { q: "Which platforms are supported?", a: "iOS (APNs), Android (FCM), macOS, Web (Chrome, Firefox, Safari), and Windows PWAs." },
      { q: "What's the delivery latency?", a: "Median delivery is under 1.5 seconds globally. Outliers are almost always caused by device-side power management." },
      { q: "How do I handle token rotation?", a: "SpiderLync SDK handles token refresh automatically. Stale tokens are pruned from your install list nightly." },
      { q: "Is there a message size limit?", a: "Payload is capped at 4 KB to stay within APNs/FCM limits. Rich media is hosted on our CDN and referenced by URL." },
    ],
  },
  "realtime-database": {
    name: "Realtime Database",
    tagline: "Live data. No polling. No complexity.",
    color: "#34d399",
    colorDim: "rgba(52,211,153,0.12)",
    colorGlow: "rgba(52,211,153,0.25)",
    icon: "🗄️",
    category: "Data",
    badge: "New",
    howItWorks: {
      intro: "A persistent WebSocket connection between your client and SpiderLync means every write is broadcast to all subscribers in under 50 ms.",
      steps: [
        { title: "Open subscription", desc: "Call query.subscribe() and SpiderLync upgrades to a Live Query WebSocket channel automatically." },
        { title: "Receive events", desc: "onCreate, onUpdate, onDelete events fire in your handler with the full object—no diffing needed." },
        { title: "Offline cache", desc: "Missed events are buffered server-side and replayed on reconnect. Zero data loss." },
        { title: "Conflict resolution", desc: "Last-writer-wins by default; vector clock merge available for collaborative apps." },
      ],
    },
    subFeatures: [
      { name: "Live Queries", desc: "Subscribe to any Parse Query and receive push updates instantly.", icon: "📡" },
      { name: "Presence system", desc: "Track which users are online in a room or document.", icon: "🟢" },
      { name: "Optimistic UI", desc: "SDK applies writes locally before server confirmation for instant UX.", icon: "⚡" },
      { name: "Conflict merge", desc: "Built-in CRDT merge strategies for collaborative editing scenarios.", icon: "🔀" },
      { name: "Rate limiting", desc: "Per-connection message throttling prevents runaway clients.", icon: "🛡️" },
      { name: "Multi-region", desc: "WebSocket servers in 12 regions for sub-50ms latency worldwide.", icon: "🌍" },
    ],
    codeExamples: [
      {
        label: "Subscribe",
        code: `const query = new Parse.Query("Message");\nquery.equalTo("room", "general");\n\nconst subscription = await query.subscribe();\n\nsubscription.on("create", (msg) => {\n  appendToChat(msg.get("text"), msg.get("author"));\n});\n\nsubscription.on("update", (msg) => {\n  updateMessage(msg.id, msg.get("text"));\n});`,
      },
      {
        label: "Presence",
        code: `// Mark current user online\nawait spiderlync.presence.join("room_42");\n\n// Listen for others joining / leaving\nspiderlync.presence.on("join", ({ userId }) => {\n  showOnlineIndicator(userId);\n});\nspiderlync.presence.on("leave", ({ userId }) => {\n  hideOnlineIndicator(userId);\n});`,
      },
      {
        label: "Raw WebSocket",
        code: `const ws = new WebSocket("wss://api.spiderlync.com/live");\n\nws.onopen = () => ws.send(JSON.stringify({\n  op: "subscribe",\n  className: "Score",\n  where: { gameId: "G99" }\n}));\n\nws.onmessage = ({ data }) => {\n  const { op, object } = JSON.parse(data);\n  if (op === "update") renderScore(object);\n};`,
      },
    ],
    useCases: [
      { title: "Live chat", desc: "Sub-100ms message delivery with presence, typing indicators, and read receipts.", icon: "💬" },
      { title: "Collaborative docs", desc: "Multi-cursor editing with conflict-free merge, no Operational Transform complexity.", icon: "📝" },
      { title: "Live dashboards", desc: "Metrics that update as events arrive—no cron jobs polling your DB.", icon: "📈" },
      { title: "Multiplayer games", desc: "Game state sync at 60Hz with latency compensation built in.", icon: "🎮" },
    ],
    faq: [
      { q: "How many concurrent subscribers can one query handle?", a: "Up to 100,000 concurrent subscribers per query on the Pro plan. Enterprise has no hard limit." },
      { q: "Does it work offline?", a: "Yes. The SDK queues mutations locally (IndexedDB / AsyncStorage) and syncs when connectivity resumes." },
      { q: "Can I filter what gets pushed to a subscriber?", a: "Absolutely. The subscription respects the full Parse Query where clause—clients only receive documents matching their query." },
      { q: "What happens if the WebSocket drops?", a: "Exponential back-off reconnect kicks in immediately. Buffered events replay so clients are fully consistent on reconnect." },
    ],
  },
  "cloud-functions": {
    name: "Cloud Functions",
    tagline: "Serverless logic that scales to zero.",
    color: "#fb7185",
    colorDim: "rgba(251,113,133,0.12)",
    colorGlow: "rgba(251,113,133,0.25)",
    icon: "☁️",
    category: "Compute",
    badge: "Core",
    howItWorks: {
      intro: "Define JavaScript functions and deploy them in seconds. SpiderLync handles cold starts, concurrency, and retries.",
      steps: [
        { title: "Write your function", desc: "Use Parse.Cloud.define() with async logic. Full Node.js runtime with npm support." },
        { title: "Deploy instantly", desc: "Push via CLI or dashboard. Zero downtime deployments with instant rollback." },
        { title: "Trigger anywhere", desc: "Call from any SDK, HTTP, a cron schedule, or as a Parse hook." },
        { title: "Monitor & debug", desc: "Real-time logs, error tracking, and execution traces in the dashboard." },
      ],
    },
    subFeatures: [
      { name: "HTTP triggers", desc: "Expose functions as HTTP endpoints—no API gateway needed.", icon: "🌐" },
      { name: "Parse hooks", desc: "beforeSave, afterSave, beforeDelete fire automatically on data mutations.", icon: "🪝" },
      { name: "Cron jobs", desc: "Schedule functions with cron syntax. No separate scheduler required.", icon: "⏱️" },
      { name: "npm packages", desc: "Full npm ecosystem available. Bundle size up to 50 MB per function.", icon: "📦" },
      { name: "Secrets manager", desc: "Inject env vars and secrets securely without hardcoding credentials.", icon: "🗝️" },
      { name: "Execution logs", desc: "Structured JSON logs with search, filtering, and 30-day retention.", icon: "📋" },
    ],
    codeExamples: [
      {
        label: "Basic function",
        code: `Parse.Cloud.define("greet", async (request) => {\n  const { name } = request.params;\n  return { message: \`Hello, \${name}!\` };\n});\n\n// Call from client\nconst result = await Parse.Cloud.run("greet", { name: "World" });`,
      },
      {
        label: "beforeSave hook",
        code: `Parse.Cloud.beforeSave("Order", async (request) => {\n  const order = request.object;\n  if (order.get("total") <= 0) {\n    throw new Parse.Error(400, "Total must be positive");\n  }\n  order.set("status", "pending");\n});`,
      },
      {
        label: "Scheduled job",
        code: `// Runs every day at midnight UTC\nParse.Cloud.job("dailyCleanup", async (request) => {\n  const cutoff = new Date();\n  cutoff.setDate(cutoff.getDate() - 30);\n  const query = new Parse.Query("TempLog");\n  query.lessThan("createdAt", cutoff);\n  const stale = await query.find({ useMasterKey: true });\n  await Parse.Object.destroyAll(stale, { useMasterKey: true });\n});`,
      },
    ],
    useCases: [
      { title: "Business logic", desc: "Validate, enrich, and transform data before it hits your database.", icon: "⚙️" },
      { title: "Third-party webhooks", desc: "Receive Stripe, Twilio, or GitHub webhooks and act on them instantly.", icon: "📥" },
      { title: "Scheduled reports", desc: "Generate and email daily digests without any background worker infra.", icon: "📊" },
      { title: "AI processing", desc: "Run ML inference or call OpenAI asynchronously after user actions.", icon: "🤖" },
    ],
    faq: [
      { q: "What runtime is available?", a: "Node.js 20 LTS. TypeScript is supported via automatic transpilation. Deno support is planned." },
      { q: "Is there a cold start penalty?", a: "Functions that are invoked within 5 minutes of their last execution are kept warm. Cold starts average under 200ms." },
      { q: "How is billing calculated?", a: "Per invocation + GB-seconds of execution time. Free tier includes 500,000 invocations/month." },
      { q: "Can functions call other functions?", a: "Yes. Use Parse.Cloud.run() from within a function. Depth limit is 10 nested calls to prevent infinite loops." },
    ],
  },
  "authentication": {
    name: "Authentication",
    tagline: "Identity that just works, out of the box.",
    color: "#a3e635",
    colorDim: "rgba(163,230,53,0.12)",
    colorGlow: "rgba(163,230,53,0.25)",
    icon: "🔐",
    category: "Security",
    badge: "Core",
    howItWorks: {
      intro: "Drop-in auth covering every flow your app needs—email, social, magic links, and enterprise SSO.",
      steps: [
        { title: "Enable providers", desc: "Toggle auth providers in the dashboard. Each takes under a minute to configure." },
        { title: "Implement sign-in UI", desc: "Use the pre-built components or build custom UI with our headless hooks." },
        { title: "Session management", desc: "JWTs with automatic refresh. Revoke individual sessions from the dashboard." },
        { title: "Access control", desc: "Attach roles and permissions to users. Enforce via ACLs on all data operations." },
      ],
    },
    subFeatures: [
      { name: "Email + password", desc: "Secure bcrypt hashing, email verification, and password reset flows.", icon: "📧" },
      { name: "OAuth providers", desc: "Google, GitHub, Apple, Facebook, Twitter out of the box.", icon: "🔑" },
      { name: "Magic links", desc: "Passwordless email login—no friction, no forgotten passwords.", icon: "✨" },
      { name: "MFA / TOTP", desc: "Time-based OTP and SMS second factors with recovery codes.", icon: "📲" },
      { name: "RBAC", desc: "Role-based access control with hierarchical role inheritance.", icon: "🎭" },
      { name: "SSO / SAML", desc: "Enterprise single sign-on with SAML 2.0 and OIDC support.", icon: "🏢" },
    ],
    codeExamples: [
      {
        label: "Sign up",
        code: `const user = new Parse.User();\nuser.set("username", "alice@example.com");\nuser.set("password", "s3cur3P@ss!");\nuser.set("email", "alice@example.com");\n\nawait user.signUp();\nconsole.log("Signed up:", user.id);`,
      },
      {
        label: "OAuth login",
        code: `// Google OAuth\nconst authData = await getGoogleAuthData();\n\nconst user = await Parse.User.logInWith("google", {\n  authData: {\n    id: authData.sub,\n    access_token: authData.access_token\n  }\n});\nconsole.log("Logged in as:", user.get("email"));`,
      },
      {
        label: "RBAC",
        code: `// Assign role to user\nconst roleQuery = new Parse.Query(Parse.Role);\nroleQuery.equalTo("name", "admin");\nconst adminRole = await roleQuery.first();\n\nadminRole.getUsers().add(currentUser);\nawait adminRole.save(null, { useMasterKey: true });`,
      },
    ],
    useCases: [
      { title: "Consumer apps", desc: "Social login reduces sign-up friction by 60%—Google and Apple in one config.", icon: "📱" },
      { title: "Enterprise SaaS", desc: "SAML SSO lets enterprise customers use their existing identity provider.", icon: "🏢" },
      { title: "Internal tools", desc: "RBAC ensures each team only sees and edits what they're authorized for.", icon: "🔧" },
      { title: "Healthcare / finance", desc: "MFA and audit logs satisfy HIPAA and SOC 2 compliance requirements.", icon: "🏥" },
    ],
    faq: [
      { q: "Are passwords stored securely?", a: "Passwords are hashed with bcrypt (cost factor 12) and never stored in plaintext. We support pepper rotation." },
      { q: "Can I customize the email templates?", a: "Yes. Verification, password reset, and magic link emails are fully customizable with Handlebars templates." },
      { q: "What session expiry options are available?", a: "Configurable per app: sliding window (default 14 days) or absolute expiry. Idle sessions are purged automatically." },
      { q: "Is SSO available on all plans?", a: "SAML / OIDC SSO is available on Business and Enterprise plans. OAuth social providers are available on all plans including Free." },
    ],
  },
  "live-stream": {
    name: "Live Stream",
    tagline: "Broadcast to millions with single-digit latency.",
    color: "#60a5fa",
    colorDim: "rgba(96,165,250,0.12)",
    colorGlow: "rgba(96,165,250,0.25)",
    icon: "📹",
    category: "Media",
    badge: "Beta",
    howItWorks: {
      intro: "WebRTC + HLS hybrid lets you broadcast live video globally. Viewers join via browser or mobile with zero plugin installation.",
      steps: [
        { title: "Capture media", desc: "Access camera and microphone via browser MediaDevices API—one line of code." },
        { title: "Start broadcast", desc: "Call stream.start() and SpiderLync handles WebRTC negotiation and CDN distribution automatically." },
        { title: "Viewers join", desc: "Share a room URL. Viewers open it in any browser and receive the stream in under 3 seconds." },
        { title: "Interact live", desc: "Built-in chat, reactions, and polls run alongside the stream with zero extra setup." },
      ],
    },
    subFeatures: [
      { name: "WebRTC + HLS", desc: "Ultra-low latency WebRTC for small rooms; HLS fallback for massive audiences.", icon: "📡" },
      { name: "Recording", desc: "Auto-record streams to cloud storage. MP4 available within 60 seconds of stream end.", icon: "⏺️" },
      { name: "Live chat", desc: "Integrated real-time chat with moderation controls baked in.", icon: "💬" },
      { name: "Adaptive bitrate", desc: "ABR automatically adjusts quality to each viewer's bandwidth.", icon: "📶" },
      { name: "Screen sharing", desc: "Share screen, window, or tab alongside webcam with one API call.", icon: "🖥️" },
      { name: "RTMP ingest", desc: "Accept streams from OBS, Streamlabs, or any RTMP encoder.", icon: "🎙️" },
    ],
    codeExamples: [
      {
        label: "Start stream",
        code: `const stream = await navigator.mediaDevices.getUserMedia({\n  video: { width: 1280, height: 720 },\n  audio: true\n});\n\nvideo.srcObject = stream;\n\nconst broadcast = await spiderlync.stream.start({\n  roomId: "room_abc",\n  media: stream\n});\nconsole.log("RTMP URL:", broadcast.rtmpUrl);`,
      },
      {
        label: "Join as viewer",
        code: `const viewer = await spiderlync.stream.join("room_abc");\n\nviewer.on("track", (track) => {\n  remoteVideo.srcObject = new MediaStream([track]);\n});\n\nviewer.on("chat", (msg) => {\n  appendChatMessage(msg.user, msg.text);\n});`,
      },
      {
        label: "Send chat",
        code: `// Broadcaster sends a message\nawait broadcast.chat.send({\n  text: "Welcome everyone!",\n  type: "announcement"\n});\n\n// React to stream events\nbroadcast.on("viewerJoined", ({ count }) => {\n  updateViewerCount(count);\n});`,
      },
    ],
    useCases: [
      { title: "Live commerce", desc: "Product demos with instant purchase links overlaid on the stream.", icon: "🛍️" },
      { title: "Online events", desc: "Conferences, town halls, and webinars with interactive Q&A.", icon: "🎤" },
      { title: "Fitness classes", desc: "Instructor sees and hears students; adaptive bitrate survives mobile networks.", icon: "🏋️" },
      { title: "Gaming streams", desc: "Low-latency screen capture with integrated viewer chat and donations.", icon: "🎮" },
    ],
    faq: [
      { q: "What's the maximum viewer count?", a: "HLS mode scales to unlimited viewers. WebRTC mesh mode supports up to 50 concurrent participants in a room." },
      { q: "How long can a stream run?", a: "No hard limit. Streams over 6 hours are automatically segmented for recording. Billing is per GB of bandwidth." },
      { q: "Is end-to-end encryption available?", a: "WebRTC streams are DTLS-SRTP encrypted in transit by default. E2EE with Insertable Streams is available on Enterprise." },
      { q: "Can I integrate with OBS?", a: "Yes. SpiderLync provides an RTMP ingest URL you paste directly into OBS or any compatible encoder." },
    ],
  },
  "graphql-rest": {
    name: "GraphQL & REST APIs",
    tagline: "Every endpoint, auto-generated, always fresh.",
    color: "#c084fc",
    colorDim: "rgba(192,132,252,0.12)",
    colorGlow: "rgba(192,132,252,0.25)",
    icon: "🔧",
    category: "API",
    badge: "Core",
    howItWorks: {
      intro: "Define your schema once in Parse and get production-ready REST and GraphQL APIs with docs, introspection, and auth baked in.",
      steps: [
        { title: "Create your schema", desc: "Define Parse classes in the dashboard or via code. No YAML, no annotations." },
        { title: "APIs appear instantly", desc: "REST and GraphQL endpoints are live immediately—no codegen step required." },
        { title: "Authenticate requests", desc: "Every endpoint respects Parse ACLs. Attach your session token or API key." },
        { title: "Explore with Playground", desc: "Built-in GraphQL Playground and Swagger UI for interactive exploration." },
      ],
    },
    subFeatures: [
      { name: "Auto REST", desc: "Full CRUD REST endpoints generated per class with filtering and pagination.", icon: "🔄" },
      { name: "GraphQL schema", desc: "Introspectable schema with queries, mutations, and subscriptions.", icon: "📐" },
      { name: "SDK clients", desc: "JavaScript, Swift, Kotlin, Flutter, and Unity SDKs available.", icon: "📱" },
      { name: "Pagination", desc: "Cursor-based and offset pagination on all list endpoints.", icon: "📄" },
      { name: "Field selection", desc: "GraphQL fields and REST ?keys= param reduce payload size.", icon: "⚡" },
      { name: "Rate limiting", desc: "Per-key rate limits configurable per endpoint from the dashboard.", icon: "🛡️" },
    ],
    codeExamples: [
      {
        label: "REST fetch",
        code: `// GET all Products in stock\nconst res = await fetch(\n  "https://api.spiderlync.com/1/classes/Product?where={\"inStock\":true}&limit=20",\n  { headers: { "X-Parse-Application-Id": "APP_ID",\n               "X-Parse-Session-Token": sessionToken } }\n);\nconst { results } = await res.json();`,
      },
      {
        label: "GraphQL query",
        code: `const QUERY = \`\n  query GetProducts($inStock: Boolean!) {\n    products(where: { inStock: { equalTo: $inStock } }) {\n      edges {\n        node { id name price }\n      }\n    }\n  }\n\`;\n\nconst data = await spiderlync.graphql(QUERY, { inStock: true });`,
      },
      {
        label: "GraphQL mutation",
        code: `const CREATE = \`\n  mutation CreateProduct($name: String!, $price: Float!) {\n    createProduct(input: {\n      fields: { name: $name, price: $price, inStock: true }\n    }) {\n      product { id name createdAt }\n    }\n  }\n\`;\n\nconst result = await spiderlync.graphql(CREATE, {\n  name: "Noise Cancelling Buds",\n  price: 129.99\n});`,
      },
    ],
    useCases: [
      { title: "Mobile apps", desc: "GraphQL lets mobile clients fetch only the fields they render—faster screens.", icon: "📱" },
      { title: "Third-party integrations", desc: "REST endpoints are ready-made for Zapier, Make, and no-code tools.", icon: "🔌" },
      { title: "Microservices", desc: "Services communicate via typed GraphQL contracts with automatic validation.", icon: "🏗️" },
      { title: "Data science", desc: "Pull data into notebooks via REST with cursor pagination for large datasets.", icon: "🔬" },
    ],
    faq: [
      { q: "Can I customize the generated schema?", a: "Yes. Use Cloud Code hooks to add virtual fields, restrict visibility, or transform responses before they leave the server." },
      { q: "Is GraphQL subscriptions supported?", a: "Yes via WebSocket. Subscribe to any query and receive push updates when underlying data changes." },
      { q: "What pagination modes are available?", a: "Offset (?skip=&limit=) and cursor-based (after: cursor in GraphQL). Cursor mode is recommended for large collections." },
      { q: "Are there SDK type definitions?", a: "TypeScript definitions are auto-generated from your schema and available as an npm package scoped to your app." },
    ],
  },
  "web-development": {
    name: "Web Development",
    tagline: "Full-stack apps, SpiderLync-powered, globally deployed.",
    color: "#818cf8",
    colorDim: "rgba(129,140,248,0.12)",
    colorGlow: "rgba(129,140,248,0.25)",
    icon: "🌐",
    category: "Hosting",
    badge: "New",
    howItWorks: {
      intro: "Connect your Git repo and SpiderLync builds, deploys, and scales your frontend globally—backend included.",
      steps: [
        { title: "Connect your repo", desc: "Link GitHub, GitLab, or Bitbucket. Every push to main triggers a build." },
        { title: "Configure build", desc: "Auto-detected for Next.js, Remix, Vite, Astro, and CRA. Override with a single YAML line." },
        { title: "Deploy globally", desc: "Distributed to 45 edge PoPs in under 90 seconds. Custom domains with auto-SSL." },
        { title: "Preview branches", desc: "Every PR gets a unique preview URL. Share with stakeholders before merging." },
      ],
    },
    subFeatures: [
      { name: "Edge deployment", desc: "Static assets and SSR functions run at the edge, closest to your users.", icon: "⚡" },
      { name: "Preview URLs", desc: "Unique URL per branch. Perfect for design reviews and QA.", icon: "🔗" },
      { name: "Auto SSL", desc: "Free TLS certificates provisioned and renewed automatically.", icon: "🔒" },
      { name: "Custom domains", desc: "Point your apex and subdomains with one-click DNS guidance.", icon: "🌍" },
      { name: "Environment vars", desc: "Per-branch env configuration. Secrets never exposed in build logs.", icon: "🗝️" },
      { name: "Build cache", desc: "Intelligent cache invalidation cuts average build time by 70%.", icon: "⚙️" },
    ],
    codeExamples: [
      {
        label: "Next.js page",
        code: `// pages/index.tsx\nimport Parse from "parse";\n\nexport async function getServerSideProps() {\n  Parse.initialize(process.env.APP_ID);\n  Parse.serverURL = process.env.SERVER_URL;\n\n  const query = new Parse.Query("Post");\n  query.descending("createdAt");\n  const posts = await query.find({ useMasterKey: true });\n\n  return { props: { posts: posts.map(p => p.toJSON()) } };\n}`,
      },
      {
        label: "API route",
        code: `// pages/api/posts.ts\nimport type { NextApiRequest, NextApiResponse } from "next";\nimport Parse from "parse/node";\n\nexport default async function handler(\n  req: NextApiRequest,\n  res: NextApiResponse\n) {\n  Parse.initialize(process.env.APP_ID!, process.env.MASTER_KEY!);\n  Parse.serverURL = process.env.SERVER_URL!;\n\n  const query = new Parse.Query("Post");\n  const results = await query.find({ useMasterKey: true });\n  res.json(results.map(r => r.toJSON()));\n}`,
      },
      {
        label: "spiderlync.json",
        code: `{\n  "framework": "nextjs",\n  "buildCommand": "next build",\n  "outputDirectory": ".next",\n  "env": {\n    "NEXT_PUBLIC_APP_ID": "@spiderlync-app-id",\n    "NEXT_PUBLIC_SERVER_URL": "https://api.spiderlync.com/1"\n  },\n  "regions": ["iad1", "sfo1", "lhr1", "sin1"]\n}`,
      },
    ],
    useCases: [
      { title: "Marketing sites", desc: "Astro or Next.js static export with global edge CDN. Lighthouse 100 by default.", icon: "📣" },
      { title: "SaaS dashboards", desc: "SSR with Parse session auth. No separate API layer needed.", icon: "📊" },
      { title: "E-commerce storefronts", desc: "ISR keeps product pages fresh without full rebuilds on every change.", icon: "🛒" },
      { title: "Internal tools", desc: "Ship internal CRUD apps in hours using SpiderLync's auto-generated UI components.", icon: "🔧" },
    ],
    faq: [
      { q: "Which frameworks are supported?", a: "Next.js, Remix, Nuxt, SvelteKit, Astro, Vite, and Create React App. Custom build commands are also supported." },
      { q: "How fast are deployments?", a: "First deploy averages 90 seconds. Subsequent deploys with cached builds average under 30 seconds." },
      { q: "Can I use custom build commands?", a: "Yes. Set buildCommand, installCommand, and outputDirectory in spiderlync.json or the dashboard." },
      { q: "What's the bandwidth limit on the free plan?", a: "Free tier includes 100 GB bandwidth/month. Beyond that, $0.03 per GB. No traffic surprises—we alert before you exceed limits." },
    ],
  },
  "qr-generator": {
    name: "QR Generator",
    tagline: "Dynamic, trackable QR codes at API speed.",
    color: "#fbbf24",
    colorDim: "rgba(251,191,36,0.12)",
    colorGlow: "rgba(251,191,36,0.25)",
    icon: "⬛",
    category: "Utilities",
    badge: "New",
    howItWorks: {
      intro: "Generate pixel-perfect QR codes via REST API. Dynamic codes let you update the destination URL without reprinting.",
      steps: [
        { title: "Call the API", desc: "POST your URL and options. Receive a PNG, SVG, or base64 string in response." },
        { title: "Customize appearance", desc: "Set size, error correction, foreground/background color, and embed a logo." },
        { title: "Dynamic redirect", desc: "Use a dynamic code to change the destination URL at any time from the dashboard." },
        { title: "Track scans", desc: "Every scan records timestamp, device type, and location for analytics." },
      ],
    },
    subFeatures: [
      { name: "SVG + PNG output", desc: "Crisp vector SVG for print or raster PNG for web at any DPI.", icon: "🖼️" },
      { name: "Logo embed", desc: "Place your brand logo in the QR center without breaking scannability.", icon: "🏷️" },
      { name: "Dynamic codes", desc: "Update destination URL without changing the printed QR code.", icon: "🔄" },
      { name: "Scan analytics", desc: "Track scans with geolocation, device, and referrer data.", icon: "📊" },
      { name: "Bulk generation", desc: "Generate thousands of unique codes in one API call via CSV input.", icon: "⚡" },
      { name: "Error correction", desc: "L, M, Q, H error correction levels to balance density and durability.", icon: "🛡️" },
    ],
    codeExamples: [
      {
        label: "Generate PNG",
        code: `import QRCode from "qrcode";\n\n// Simple generation\nconst dataUrl = await QRCode.toDataURL("https://spiderlync.com", {\n  width: 400,\n  margin: 2,\n  color: { dark: "#1a1a2e", light: "#ffffff" },\n  errorCorrectionLevel: "H"\n});\n\n// Render in browser\ndocument.getElementById("qr").src = dataUrl;`,
      },
      {
        label: "REST API",
        code: `const res = await fetch("https://api.spiderlync.com/qr/generate", {\n  method: "POST",\n  headers: { "X-App-Id": "APP_ID", "Content-Type": "application/json" },\n  body: JSON.stringify({\n    url: "https://myapp.com/promo/summer",\n    dynamic: true,\n    size: 512,\n    format: "svg",\n    logo: "https://myapp.com/logo.png"\n  })\n});\nconst { qrId, imageUrl, scanUrl } = await res.json();`,
      },
      {
        label: "Track scans",
        code: `// Get scan analytics for a dynamic QR\nconst analytics = await fetch(\n  "https://api.spiderlync.com/qr/QR123/analytics?period=30d",\n  { headers: { "X-App-Id": "APP_ID" } }\n);\n\nconst { totalScans, byDevice, byCountry } = await analytics.json();\nconsole.log("Total scans:", totalScans);`,
      },
    ],
    useCases: [
      { title: "Print marketing", desc: "Menus, flyers, and business cards with QR codes linking to dynamic landing pages.", icon: "🖨️" },
      { title: "Product packaging", desc: "Embed batch or serial number data. Update the destination after packaging.", icon: "📦" },
      { title: "Event check-in", desc: "Unique QR per attendee ticket, validated at the door via scan API.", icon: "🎟️" },
      { title: "Contactless menus", desc: "Restaurant menus that update in real time without reprinting QR codes.", icon: "🍽️" },
    ],
    faq: [
      { q: "What image formats are supported?", a: "PNG, SVG, and base64 data URL. PDF export is available on Business plans." },
      { q: "Can I white-label the QR scan redirect?", a: "Yes. Use a custom subdomain (qr.yourdomain.com) on Business plans. Fully white-labeled with your SSL cert." },
      { q: "What's the scan analytics retention period?", a: "90 days on Free, 2 years on Pro, and unlimited on Enterprise." },
      { q: "How many codes can I generate per month?", a: "Free: 1,000 static codes. Pro: 100,000. Dynamic codes are metered separately at $0.001 per code." },
    ],
  },
  "tiny-url": {
    name: "Tiny URL",
    tagline: "Short links with deep analytics.",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.12)",
    colorGlow: "rgba(34,211,238,0.25)",
    icon: "✂️",
    category: "Utilities",
    badge: "New",
    howItWorks: {
      intro: "Turn any long URL into a compact, trackable link in one API call. Dynamic routing means you control where it goes.",
      steps: [
        { title: "Submit your URL", desc: "POST the long URL to /api/shorten with optional custom slug and expiry." },
        { title: "Receive short link", desc: "Get back a short URL like spdr.ly/abc123. Ready to share immediately." },
        { title: "Update destination", desc: "Change where the link redirects at any time without breaking existing shares." },
        { title: "Analyze clicks", desc: "Every click is logged with referrer, browser, device, and location." },
      ],
    },
    subFeatures: [
      { name: "Custom slugs", desc: "Choose your own short path instead of a random string.", icon: "✏️" },
      { name: "Link expiry", desc: "Set links to expire after a date or a number of clicks.", icon: "⏳" },
      { name: "Password protection", desc: "Require a password before redirecting visitors.", icon: "🔒" },
      { name: "Click analytics", desc: "Referrer, country, device, OS, and browser tracking per click.", icon: "📊" },
      { name: "Redirect rules", desc: "Route mobile vs desktop to different destinations from one link.", icon: "🔀" },
      { name: "Branded domains", desc: "Use your own domain as the shortener base.", icon: "🌐" },
    ],
    codeExamples: [
      {
        label: "Shorten URL",
        code: `const res = await fetch("https://api.spiderlync.com/shorten", {\n  method: "POST",\n  headers: { "X-App-Id": "APP_ID", "Content-Type": "application/json" },\n  body: JSON.stringify({\n    url: "https://example.com/very/long/path?with=params",\n    slug: "summer-sale",\n    expiresAt: "2025-09-01"\n  })\n});\n\nconst { shortUrl, id } = await res.json();\n// shortUrl: "https://spdr.ly/summer-sale"`,
      },
      {
        label: "Update destination",
        code: `await fetch("https://api.spiderlync.com/links/LINK_ID", {\n  method: "PATCH",\n  headers: { "X-App-Id": "APP_ID", "Content-Type": "application/json" },\n  body: JSON.stringify({\n    url: "https://example.com/new-destination"\n  })\n});\n\nconsole.log("Link destination updated");`,
      },
      {
        label: "Click analytics",
        code: `const stats = await fetch(\n  "https://api.spiderlync.com/links/LINK_ID/analytics",\n  { headers: { "X-App-Id": "APP_ID" } }\n);\n\nconst { totalClicks, topCountries, devices } = await stats.json();\nconsole.log("Clicks this month:", totalClicks);`,
      },
    ],
    useCases: [
      { title: "Email campaigns", desc: "Short branded links in emails. Track click-through per campaign.", icon: "📧" },
      { title: "Social media", desc: "Character-limited platforms need short links with UTM parameters.", icon: "📱" },
      { title: "SMS marketing", desc: "Every character costs money in SMS—short links maximize message space.", icon: "💬" },
      { title: "Affiliate programs", desc: "Unique short links per affiliate track conversions accurately.", icon: "💰" },
    ],
    faq: [
      { q: "Can I use my own domain?", a: "Yes. Configure your domain in the dashboard and point a CNAME to spdr.ly. Auto-SSL included." },
      { q: "How long are free links valid?", a: "Free links never expire unless you set an explicit expiry. Inactive links (no clicks in 90 days) are archived after 1 year on Free." },
      { q: "Is there a redirect delay?", a: "No. Redirects are served from the edge with p99 latency under 10ms globally." },
      { q: "Are there bulk creation APIs?", a: "Yes. POST an array of up to 1,000 objects to /shorten/bulk. Great for campaign link generation." },
    ],
  },
  "sms-mail": {
    name: "SMS Mail Gateway",
    tagline: "One API for every message channel.",
    color: "#f472b6",
    colorDim: "rgba(244,114,182,0.12)",
    colorGlow: "rgba(244,114,182,0.25)",
    icon: "✉️",
    category: "Messaging",
    badge: "Popular",
    howItWorks: {
      intro: "A single SDK call sends via SMS, email, or both. Delivery receipts and open tracking work the same way across channels.",
      steps: [
        { title: "Configure channels", desc: "Connect your Twilio or AWS SES account, or use SpiderLync's built-in number pool." },
        { title: "Build templates", desc: "Create reusable templates with dynamic variables in the dashboard or via API." },
        { title: "Send messages", desc: "Call sendMessage() with channel, recipient, and template ID. That's it." },
        { title: "Monitor delivery", desc: "Real-time delivery receipts, bounce tracking, and click analytics across all channels." },
      ],
    },
    subFeatures: [
      { name: "Unified API", desc: "Same interface for SMS and email—switch channels with one parameter change.", icon: "🔄" },
      { name: "Templates", desc: "Handlebars templates with dynamic variable injection and A/B variants.", icon: "📝" },
      { name: "Delivery receipts", desc: "Real-time DLR webhooks for every SMS. Open and click tracking for email.", icon: "✅" },
      { name: "Two-way SMS", desc: "Receive replies via webhook and build conversational flows.", icon: "↩️" },
      { name: "Spam compliance", desc: "Automatic opt-out handling, unsubscribe links, and list hygiene.", icon: "🛡️" },
      { name: "Automation flows", desc: "Trigger message sequences based on user actions or schedule.", icon: "⚡" },
    ],
    codeExamples: [
      {
        label: "Send SMS",
        code: `await spiderlync.messages.send({\n  channel: "sms",\n  to: "+14155552671",\n  body: "Your verification code is {{code}}",\n  data: { code: "847291" }\n});\n\n// Or use a saved template\nawait spiderlync.messages.send({\n  channel: "sms",\n  to: "+14155552671",\n  template: "otp_verification",\n  data: { code: generateOTP() }\n});`,
      },
      {
        label: "Send email",
        code: `await spiderlync.messages.send({\n  channel: "email",\n  to: "user@example.com",\n  from: "noreply@yourapp.com",\n  template: "welcome_email",\n  data: {\n    name: "Alice",\n    ctaUrl: "https://app.com/onboarding"\n  }\n});`,
      },
      {
        label: "Receive replies",
        code: `// Webhook endpoint — receives inbound SMS replies\nexport async function POST(req) {\n  const { from, body, messageId } = await req.json();\n\n  if (body.toLowerCase() === "stop") {\n    await spiderlync.contacts.optOut(from);\n    return Response.json({ ok: true });\n  }\n\n  await handleReply(from, body);\n  return Response.json({ ok: true });\n}`,
      },
    ],
    useCases: [
      { title: "OTP / 2FA", desc: "Deliver time-sensitive verification codes via SMS with guaranteed delivery.", icon: "🔐" },
      { title: "Transactional email", desc: "Order confirmations, receipts, and shipping updates with open tracking.", icon: "📧" },
      { title: "Marketing campaigns", desc: "Bulk SMS with opt-out handling and delivery analytics per send.", icon: "📢" },
      { title: "Appointment reminders", desc: "Automated multi-channel reminders reduce no-show rates by up to 40%.", icon: "📅" },
    ],
    faq: [
      { q: "Which SMS carriers are supported?", a: "SpiderLync routes via Tier-1 carriers in 190+ countries. Deliverability is negotiated at the carrier level, not via aggregators." },
      { q: "Can I use my own phone number?", a: "Yes. Port your number or buy a dedicated long code, short code, or toll-free number from the dashboard." },
      { q: "How are unsubscribes handled?", a: "STOP replies are automatically captured and contacts are removed from future sends. TCPA/GDPR compliance is handled for you." },
      { q: "What's the email sending limit?", a: "Free tier: 10,000 emails/month. Pro: 1M. There is no sending rate limit—we handle burst traffic automatically." },
    ],
  },
  "deep-linking": {
    name: "Deep Linking",
    tagline: "Every link routes to exactly the right place.",
    color: "#fb923c",
    colorDim: "rgba(251,146,60,0.12)",
    colorGlow: "rgba(251,146,60,0.25)",
    icon: "🔗",
    category: "Growth",
    badge: "Popular",
    howItWorks: {
      intro: "Smart links detect the user's context—app installed, OS, browser—and route them to the deepest relevant destination.",
      steps: [
        { title: "Create a deep link", desc: "Specify a destination path and fallback URL. SpiderLync generates a smart link." },
        { title: "Share anywhere", desc: "Use the link in emails, SMS, ads, or social. It works everywhere." },
        { title: "Smart routing", desc: "App installed → deep link into app. Not installed → App Store with deferred deep link after install." },
        { title: "Attribution tracking", desc: "See which campaigns drive installs and which referrers generate the most conversions." },
      ],
    },
    subFeatures: [
      { name: "Deferred deep links", desc: "Deep link intent survives app install—users land on the right screen after first launch.", icon: "📲" },
      { name: "Universal Links", desc: "iOS Universal Links and Android App Links for seamless web-to-app transitions.", icon: "🍎" },
      { name: "Attribution", desc: "Last-touch and multi-touch attribution models with campaign UTM support.", icon: "📊" },
      { name: "Smart banners", desc: "Auto-inject app download smart banners on your mobile web pages.", icon: "🏷️" },
      { name: "QR integration", desc: "Generate QR codes that deep link directly—combine with QR Generator feature.", icon: "⬛" },
      { name: "Link previews", desc: "OG tag injection for rich previews when links are shared on social.", icon: "🖼️" },
    ],
    codeExamples: [
      {
        label: "Create deep link",
        code: `const link = await spiderlync.deepLink.create({\n  path: "/product/SKU-9821",\n  campaign: "summer_email",\n  referrer: "user_456",\n  fallback: "https://myapp.com/product/SKU-9821"\n});\n\nconsole.log(link.url);\n// https://spdr.ly/d/abc123`,
      },
      {
        label: "Handle in app",
        code: `// iOS / React Native\nimport { Linking } from "react-native";\nimport spiderlync from "@spiderlync/sdk";\n\nLinking.addEventListener("url", async ({ url }) => {\n  const params = await spiderlync.deepLink.parse(url);\n  if (params?.path) {\n    navigation.navigate(params.path, params.data);\n  }\n});`,
      },
      {
        label: "Attribution API",
        code: `// Check attribution on first launch\nconst attribution = await spiderlync.attribution.getInstall();\n\nif (attribution) {\n  console.log("Channel:", attribution.channel);\n  console.log("Campaign:", attribution.campaign);\n  console.log("Referrer:", attribution.referrer);\n\n  analytics.track("install_attributed", attribution);\n}`,
      },
    ],
    useCases: [
      { title: "User referrals", desc: "Each user gets a unique referral deep link that tracks installs back to them.", icon: "👥" },
      { title: "Email campaigns", desc: "Links in emails open the app directly to the promoted product page.", icon: "📧" },
      { title: "Ad attribution", desc: "Track installs from Meta, Google, and TikTok ads down to the ad creative.", icon: "📢" },
      { title: "Onboarding flows", desc: "Invite links deposit new users directly into the onboarding flow, pre-filled.", icon: "🚀" },
    ],
    faq: [
      { q: "Does deferred deep linking work after app update?", a: "Yes. The deferred intent is stored server-side and matched by device fingerprint for up to 30 days after click." },
      { q: "Is iOS Universal Links setup required?", a: "SpiderLync hosts the apple-app-site-association file for you. You only need to add the Associated Domains entitlement in Xcode." },
      { q: "Can I use custom domains for deep links?", a: "Yes. Configure a subdomain like go.yourapp.com and SpiderLync handles the AASA, assetlinks.json, and TLS automatically." },
      { q: "What's the attribution window?", a: "Default is 7-day click, 1-day view. Configurable per campaign from 1 day up to 30 days on Pro." },
    ],
  },
};

const allFeatures = [
  { id: "parse-integration", name: "Parse Integration", color: "#38bdf8", icon: "⚡" },
  { id: "push-notifications", name: "Push Notifications", color: "#a78bfa", icon: "🔔" },
  { id: "realtime-database", name: "Realtime Database", color: "#34d399", icon: "🗄️" },
  { id: "cloud-functions", name: "Cloud Functions", color: "#fb7185", icon: "☁️" },
  { id: "authentication", name: "Authentication", color: "#a3e635", icon: "🔐" },
  { id: "live-stream", name: "Live Stream", color: "#60a5fa", icon: "📹" },
  { id: "graphql-rest", name: "GraphQL & REST", color: "#c084fc", icon: "🔧" },
  { id: "web-development", name: "Web Development", color: "#818cf8", icon: "🌐" },
  { id: "qr-generator", name: "QR Generator", color: "#fbbf24", icon: "⬛" },
  { id: "tiny-url", name: "Tiny URL", color: "#22d3ee", icon: "✂️" },
  { id: "sms-mail", name: "SMS Mail Gateway", color: "#f472b6", icon: "✉️" },
  { id: "deep-linking", name: "Deep Linking", color: "#fb923c", icon: "🔗" },
];

function CodeBlock({ examples, color }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(examples[active].code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div style={{ background: "#0d0d14", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 6, padding: "14px 0", marginRight: 16 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }}>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: "10px 16px", fontSize: 12, fontFamily: "monospace",
              background: "transparent", border: "none",
              borderBottom: active === i ? `2px solid ${color}` : "2px solid transparent",
              color: active === i ? color : "rgba(255,255,255,0.35)",
              cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{ex.label}</button>
          ))}
        </div>
        <button onClick={copy} style={{
          fontSize: 11, fontFamily: "monospace", padding: "6px 14px",
          borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
          background: copied ? `${color}22` : "rgba(255,255,255,0.04)",
          color: copied ? color : "rgba(255,255,255,0.35)",
          cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
        }}>{copied ? "✓ copied" : "copy"}</button>
      </div>
      <pre style={{
        margin: 0, padding: "24px 28px",
        fontFamily: "monospace", fontSize: 13, lineHeight: 1.8,
        color: "#7dd3fc", overflowX: "auto", whiteSpace: "pre",
      }}><code>{examples[active].code}</code></pre>
    </div>
  );
}

function FAQItem({ q, a, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.5 }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          border: `1px solid ${open ? color : "rgba(255,255,255,0.12)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: open ? color : "rgba(255,255,255,0.4)", fontSize: 18, flexShrink: 0,
          transition: "all 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)",
          background: open ? `${color}15` : "transparent",
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, paddingBottom: 20, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FeatureDetailPage() {
  const [activeFeatureId, setActiveFeatureId] = useState("parse-integration");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const blobRef = useRef(null);

  const feature = featuresData[activeFeatureId] || featuresData["parse-integration"];
  const { color, colorDim, colorGlow } = feature;

  useEffect(() => {
    const move = (e) => {
      if (blobRef.current) {
        blobRef.current.style.left = e.clientX + "px";
        blobRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const selectFeature = (id) => {
    setActiveFeatureId(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#080810", minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0d0d1a; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .hover-lift:hover { transform: translateY(-2px); }
        .nav-item:hover { background: rgba(255,255,255,0.04) !important; }
        .section-mono { font-family: monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 12px; }
        @media (max-width: 860px) {
          .layout-row { flex-direction: column !important; }
          .sidebar-panel { display: none; }
          .sidebar-panel.open { display: block !important; position: fixed; inset: 0; z-index: 200; background: #0d0d18; overflow-y: auto; padding: 24px 16px; }
          .mobile-btn { display: flex !important; }
        }
        @media (min-width: 861px) { .mobile-btn { display: none !important; } }
      `}</style>

      <div ref={blobRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        width: 420, height: 420, borderRadius: "50%", background: colorGlow,
        filter: "blur(95px)", opacity: 0.15, transform: "translate(-50%,-50%)",
        transition: "background 0.5s ease", left: "50%", top: "50%",
      }} />

      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(8,8,16,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `linear-gradient(135deg, ${color}, ${color}66)`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
          }}>🕷</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>SpiderLync</span>
          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 2px" }}>/</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Docs</span>
        </div>
        <button className="mobile-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13,
          alignItems: "center", gap: 6,
        }}>☰ Features</button>
      </nav>

      <div className="layout-row" style={{ display: "flex", maxWidth: 1240, margin: "0 auto", padding: "0 12px" }}>

        <aside className={`sidebar-panel${sidebarOpen ? " open" : ""}`} style={{
          width: 224, flexShrink: 0, position: "sticky", top: 60,
          height: "calc(100vh - 60px)", overflowY: "auto",
          padding: "24px 8px", borderRight: "1px solid rgba(255,255,255,0.05)",
        }}>
          <p className="section-mono" style={{ paddingLeft: 10 }}>Features</p>
          {allFeatures.map((f) => {
            const isActive = activeFeatureId === f.id;
            return (
              <button key={f.id} className="nav-item" onClick={() => selectFeature(f.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 9,
                padding: "8px 10px", borderRadius: 10, border: "none",
                background: isActive ? `${f.color}18` : "transparent",
                cursor: "pointer", textAlign: "left", transition: "all 0.15s", marginBottom: 2,
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 7, fontSize: 13,
                  background: isActive ? `${f.color}25` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? f.color + "44" : "rgba(255,255,255,0.06)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{f.icon}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? f.color : "rgba(255,255,255,0.45)",
                  transition: "color 0.15s",
                }}>{f.name}</span>
              </button>
            );
          })}
        </aside>

        <main style={{ flex: 1, minWidth: 0, padding: "0 28px 80px" }}>

          {/* Breadcrumb */}
          <div style={{ padding: "18px 0 0", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {["SpiderLync", "Docs", "Features", feature.category, feature.name].map((crumb, i, arr) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontFamily: "monospace", color: i === arr.length - 1 ? color : "rgba(255,255,255,0.25)" }}>{crumb}</span>
                {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 12 }}>›</span>}
              </span>
            ))}
          </div>

          {/* Hero */}
          <div style={{ paddingTop: 36, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: colorDim, border: `1px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>{feature.icon}</div>
              <span style={{
                fontSize: 11, fontFamily: "monospace", letterSpacing: "0.14em",
                padding: "3px 10px", borderRadius: 20,
                background: `${color}18`, color: color, border: `1px solid ${color}33`, textTransform: "uppercase",
              }}>{feature.badge}</span>
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(28px, 4.5vw, 48px)", lineHeight: 1.1,
              color: "#fff", marginBottom: 12,
            }}>{feature.name}</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300, color: "rgba(255,255,255,0.5)", maxWidth: 500, lineHeight: 1.65 }}>
              {feature.tagline}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <button style={{
                padding: "11px 28px", borderRadius: 10, border: "none",
                background: color, color: "#000",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}>Get started free</button>
              <button style={{
                padding: "11px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer",
              }}>View full docs →</button>
            </div>
          </div>

          {/* How it works */}
          <section style={{ paddingTop: 52, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="section-mono">How it works</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: "#fff", marginBottom: 10 }}>
              From setup to production in minutes
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
              {feature.howItWorks.intro}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              {feature.howItWorks.steps.map((step, i) => (
                <div key={i} className="hover-lift" style={{
                  background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14, padding: "20px 18px", transition: "transform 0.2s", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}88, transparent)` }} />
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `${color}18`, color: color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "monospace", fontSize: 13, marginBottom: 14,
                  }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sub features */}
          <section style={{ paddingTop: 52, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="section-mono">Capabilities</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: "#fff", marginBottom: 36 }}>
              Everything included
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
              {feature.subFeatures.map((sf, i) => (
                <div key={i} className="hover-lift" style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12, padding: "16px 16px", transition: "transform 0.2s",
                }}>
                  <span style={{ fontSize: 20, display: "block", marginBottom: 10 }}>{sf.icon}</span>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: color, marginBottom: 6 }}>{sf.name}</h4>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.65 }}>{sf.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Code examples */}
          <section style={{ paddingTop: 52, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="section-mono">Code examples</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: "#fff", marginBottom: 10 }}>Copy, paste, ship.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", marginBottom: 28, lineHeight: 1.7 }}>
              Production-ready snippets. No modification needed for most use cases.
            </p>
            <CodeBlock examples={feature.codeExamples} color={color} />
          </section>

          {/* Use cases */}
          <section style={{ paddingTop: 52, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="section-mono">Use cases</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: "#fff", marginBottom: 36 }}>
              Built for real products
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {feature.useCases.map((uc, i) => (
                <div key={i} className="hover-lift" style={{
                  background: "rgba(255,255,255,0.025)", border: `1px solid ${color}22`,
                  borderRadius: 14, padding: "22px 20px", transition: "transform 0.2s",
                }}>
                  <span style={{ fontSize: 26, display: "block", marginBottom: 12 }}>{uc.icon}</span>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 8 }}>{uc.title}</h4>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>{uc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ paddingTop: 52, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="section-mono">FAQ</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: "#fff", marginBottom: 8 }}>Common questions</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", marginBottom: 32, lineHeight: 1.7 }}>
              Can't find what you need? Ping us on Discord — we reply fast.
            </p>
            {feature.faq.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} color={color} />
            ))}
          </section>

          {/* CTA */}
          <section style={{ paddingTop: 52 }}>
            <div style={{
              background: `radial-gradient(ellipse at 25% 55%, ${colorGlow}, transparent 60%), rgba(255,255,255,0.02)`,
              border: `1px solid ${color}30`, borderRadius: 20, padding: "48px 44px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: -50, right: -50,
                width: 220, height: 220, borderRadius: "50%",
                background: colorGlow, filter: "blur(60px)", opacity: 0.35,
              }} />
              <p className="section-mono">Get started</p>
              <h2 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 36px)", color: "#fff",
                lineHeight: 1.2, maxWidth: 460, marginBottom: 12,
              }}>Ready to ship with {feature.name}?</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", maxWidth: 400, lineHeight: 1.7, marginBottom: 32 }}>
                Free tier included. No credit card. Production-grade infrastructure from day one.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
                <button style={{
                  padding: "12px 30px", borderRadius: 10, border: "none",
                  background: color, color: "#000",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer",
                }}>Start for free</button>
                <button style={{
                  padding: "12px 26px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.65)",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 15, cursor: "pointer",
                }}>Book a demo</button>
              </div>
              <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
                {["Free 1M API calls/month", "No credit card required", "Deploy in 60 seconds"].map((t, i) => (
                  <span key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ color: color }}>✓</span> {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
