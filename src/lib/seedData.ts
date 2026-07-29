import { db } from "./db";

export async function seedDatabaseIfNeeded() {
  try {
    // 1. Check and Seed Services
    const serviceCount = await db.service.count();
    if (serviceCount === 0) {
      await db.service.createMany({
        data: [
          {
            title: "Web Development",
            icon: "Globe",
            description: "Engineered with Next.js, React, and modern microfrontends. Ultra-fast, responsive, and conversion-optimized.",
            order: 1,
          },
          {
            title: "Mobile Development",
            icon: "Smartphone",
            description: "High-performance iOS & Android applications using React Native, Flutter, and native Swift/Kotlin.",
            order: 2,
          },
          {
            title: "Blockchain Solutions",
            icon: "Link",
            description: "Decentralized apps (dApps), secure smart contracts, token design, and Solidity integrations.",
            order: 3,
          },
          {
            title: "Game Development",
            icon: "Gamepad2",
            description: "Immersive games using Unity and Unreal Engine, spanning cross-platform, VR/AR, and WebGL.",
            order: 4,
          },
          {
            title: "Custom AI Systems",
            icon: "Brain",
            description: "Custom LLM integrations, retrieval-augmented generation (RAG), and predictive analytics pipelines.",
            order: 5,
          },
          {
            title: "UI/UX Design",
            icon: "Layers",
            description: "Figma-to-code precision, high-fidelity prototypes, and comprehensive visual design systems.",
            order: 6,
          },
          {
            title: "Cloud & DevOps",
            icon: "Cloud",
            description: "Automated CI/CD, container orchestration (Docker/K8s), and serverless infrastructure scaling.",
            order: 7,
          },
          {
            title: "Enterprise Software",
            icon: "Cpu",
            description: "Monolithic migrations, secure APIs, and bespoke ERP/CRM software built to scale infinitely.",
            order: 8,
          },
        ],
      });
      console.log("Seeded services table.");
    }

    // 2. Check and Seed Portfolio
    const portfolioCount = await db.portfolio.count();
    if (portfolioCount === 0) {
      await db.portfolio.createMany({
        data: [
          {
            title: "DeFi Yield Protocol",
            tags: "Blockchain, FinTech",
            tech: "Solidity, Next.js, Tailwind",
            link: "#",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800",
            featured: true,
          },
          {
            title: "AI Medical Diagnostics",
            tags: "AI & Machine Learning",
            tech: "Python, TensorFlow, React",
            link: "#",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
            featured: true,
          },
          {
            title: "Spatial Real Estate Platform",
            tags: "WebGL, UI/UX",
            tech: "Three.js, Next.js, Tailwind",
            link: "#",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
            featured: true,
          },
          {
            title: "Nebula Gaming Hub",
            tags: "Game Dev, WebGL",
            tech: "Unity, WebGL, C#",
            link: "#",
            image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800",
            featured: true,
          },
        ],
      });
      console.log("Seeded portfolio table.");
    }

    // 3. Check and Seed Testimonials
    const testimonialCount = await db.testimonial.count();
    if (testimonialCount === 0) {
      await db.testimonial.createMany({
        data: [
          {
            name: "Sarah Jenkins",
            role: "CTO",
            company: "Aether FinTech",
            content: "Prime App Solutions delivered our smart contract suite and frontend in record time. The code quality is flawless, and the performance exceeds all targets.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
          },
          {
            name: "Marcus Aurelius",
            role: "Founder",
            company: "SynthAI",
            content: "Their engineering capabilities in AI integration are top-notch. They built our customer support AI agent and reduced our response time by 80%.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
          },
          {
            name: "Liam Nguyen",
            role: "Director of Product",
            company: "Apex Interactive",
            content: "The WebGL portal they constructed is a showstopper. It has dramatically increased user session length and engagement.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
          },
        ],
      });
      console.log("Seeded testimonials table.");
    }

    // 4. Check and Seed FAQs
    const faqCount = await db.faq.count();
    if (faqCount === 0) {
      await db.faq.createMany({
        data: [
          {
            question: "What is your project development process?",
            answer: "We follow an optimized 5-step engineering process: Discovery & scoping, UI/UX framing, Agile engineering, Rigorous QA/testing, and Deployment with post-launch optimization.",
            order: 1,
          },
          {
            question: "Which technologies do you specialize in?",
            answer: "Our core stack includes Next.js, React, Node.js, TypeScript, Solidity, Rust, Python, Unity, Docker, AWS, and GCP.",
            order: 2,
          },
          {
            question: "How do you handle project pricing and budgets?",
            answer: "We offer both fixed-price contracts for well-defined project scopes and time-and-materials arrangements for agile, evolving requirements.",
            order: 3,
          },
          {
            question: "Do you provide post-launch support?",
            answer: "Yes, every project includes a 30-day post-launch support phase for bug fixes, performance monitoring, and minor updates, with optional SLA maintenance packages.",
            order: 4,
          },
          {
            question: "How do we get started with Prime App?",
            answer: "Click any 'Get Consultation' button to share your requirements. We will schedule a scoping call, generate a design blueprint, and give you an estimate.",
            order: 5,
          },
        ],
      });
      console.log("Seeded FAQs table.");
    }

    // 5. Check and Seed Blog Posts
    const blogCount = await db.blogPost.count();
    if (blogCount === 0) {
      await db.blogPost.createMany({
        data: [
          {
            title: "The Future of Web Interfaces: WebGL and 3D Interaction",
            slug: "future-of-web-interfaces",
            summary: "How 3D design and WebGL are transforming modern SaaS websites into interactive experiences.",
            content: `WebGL is reshaping how we view websites. Traditional flat layouts are being replaced with reactive, physics-based 3D assets that captivate users and tell stories. 

### Why 3D Matters in Modern Web Design
1. **Dwell Time**: Interactive elements double the average time a user spends on a landing page.
2. **Branding**: Immersive design positions companies as engineering leaders.
3. **Information Density**: 3D models can pack complex interactions into intuitive visual interfaces.

At Prime App Solutions, we integrate Three.js and custom shader code into web projects to deliver interactive experiences that load in milliseconds. We do this by utilizing texture compression, viewport calculations, and rendering fallbacks.`,
            published: true,
          },
          {
            title: "Integrating Custom LLMs in Enterprise Applications",
            slug: "integrating-custom-llms",
            summary: "A deep dive into standard retrieval-augmented generation (RAG) architectures and deployment.",
            content: `Artificial intelligence is no longer optional. Moving beyond simple third-party API wrappers, enterprise software requires secure, custom LLM solutions using Retrieval-Augmented Generation (RAG) to prevent data leaks.

### Core Architecture of RAG
* **Document Parser**: Ingests files (PDFs, docs, databases) and extracts content.
* **Vector Embeddings**: Converts text into vector representation via models like OpenAI Text-Embedding-3 or Cohere.
* **Vector Database**: Stores embeddings for semantic search (using pgvector, Pinecone, or Qdrant).
* **LLM Engine**: Generates responses using context fetched from the vector store.

By deploying secure LLMs locally on AWS VPCs, Prime App Solutions allows clients to utilize private intelligence without exposing customer records to public APIs.`,
            published: true,
          },
          {
            title: "Smart Contract Security: Lessons from DeFi Exploits",
            slug: "smart-contract-security",
            summary: "An engineering-first guide to avoiding reentrancy, overflow, and oracle manipulation in Web3.",
            content: `Web3 development offers unmatched permissionless architecture, but contract vulnerabilities can result in total capital loss. 

### Critical Vulnerabilities to Guard Against
1. **Reentrancy**: Occurs when an external contract call interrupts current execution to withdraw assets. Always use the Checks-Effects-Interactions pattern.
2. **Oracle Manipulation**: Relying on thin liquidity pools for asset pricing. Always integrate decentralized pricing oracles like Chainlink.
3. **Integer Overflow/Underflow**: Handled natively in Solidity 0.8.x, but still critical when using low-level assembly (Yul).

At Prime App Solutions, our smart contract audits follow strict static analysis (Slither, Mythril) and formal verification checklists to guarantee your protocol's safety.`,
            published: true,
          },
        ],
      });
      console.log("Seeded blog posts table.");
    }
  } catch (error) {
    console.error("Database seeding failed:", error);
  }
}
