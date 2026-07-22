import { Product, Article, Order, StoreSettings } from '../types';

export const initialSettings: StoreSettings = {
  whatsappNumber: '+923116797819',
  whatsappChannel: 'https://whatsapp.com/channel/0029VbCmqXdFnSzBpUgQzz1T',
  ezToolboxLink: 'https://eztoolbox.xyz',
  youtubeLink: 'https://youtube.com/@HadiDigitalStore',
  instagramLink: 'https://instagram.com/hadidigital.store',
  email: 'raorafique2010@gmail.com',
  brandName: 'Hadi Digital Store',
  tagline: 'Premium Digital Solutions at Unbeatable Prices in Pakistan',
  brandStory: 'HDS is an ecosystem of trust. Join over 25,000+ elite creators who rely on our high-liquidity digital flows and dedicated 24/7 VIP concierge. Bilkul original services with replacement warranty.',
  adminPassword: 'admin123',
};

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Capcut Pro',
    price: '800 PKR',
    badge: 'DEAL',
    category: 'Tools',
    image: '🎬',
    description: 'Unlock all premium features, effects, motion tracking, cloud storage, and 4K exports without watermarks.',
    isHidden: false,
    featured: true,
  },
  {
    id: 2,
    name: 'ElevenLabs Pro',
    price: '1800 PKR',
    badge: 'DEAL',
    category: 'AI',
    image: '🎙️',
    description: 'Most advanced AI voice generator and speech synthesis software for ultra-realistic voiceovers.',
    isHidden: false,
    featured: true,
  },
  {
    id: 3,
    name: 'ChatGPT Plus',
    price: '1500 PKR',
    badge: 'DEAL',
    category: 'AI',
    image: '🤖',
    description: 'GPT-4o & GPT-4 Full Early Access, DALL-E 3 image generation, custom GPTs, and web browsing.',
    isHidden: false,
    featured: true,
  },
  {
    id: 4,
    name: 'Super Grok',
    price: 'DM to Buy',
    badge: 'AL',
    category: 'AI',
    image: '🧠',
    description: 'Super grok account with replace guarantee. Instant activation & unthrottled response speed.',
    isHidden: false,
    featured: true,
  },
  {
    id: 5,
    name: 'Copyright Watchtime Method',
    price: 'DM to Buy',
    badge: 'ELITE',
    category: 'YouTube',
    image: '⏱️',
    description: 'Elite 2024 secret method to complete 4000 watch hours safely, bypass copyright checks, and monetize.',
    isHidden: false,
    featured: true,
  },
  {
    id: 6,
    name: 'YouTube Automation Course',
    price: '2999 PKR',
    badge: 'NEW',
    category: 'Course',
    image: '📚',
    description: 'Complete step-by-step masterclass to launch faceless automated channels and earn passive income.',
    isHidden: false,
    featured: true,
  },
  {
    id: 7,
    name: 'Non-Drop Subscribers',
    price: 'DM to Buy',
    badge: 'GUARANTEED',
    category: 'YouTube',
    image: '👥',
    description: 'Life-time guaranteed organic subscriber growth. Fast execution & 100% replacement guarantee.',
    isHidden: false,
    featured: true,
  },
];

export const initialOrders: Order[] = [
  {
    id: 'HDS-1001',
    customerName: 'Muhammad Ali',
    customerWhatsApp: '+923019876543',
    productName: 'ChatGPT Plus',
    price: '1500 PKR',
    paymentMethod: 'JazzCash',
    notes: 'Please send login details via WhatsApp',
    status: 'Completed',
    date: '2026-07-20 14:30',
  },
  {
    id: 'HDS-1002',
    customerName: 'Usman Khan',
    customerWhatsApp: '+923124567890',
    productName: 'Capcut Pro',
    price: '800 PKR',
    paymentMethod: 'EasyPaisa',
    notes: 'Urgent activation required',
    status: 'Completed',
    date: '2026-07-21 11:15',
  },
  {
    id: 'HDS-1003',
    customerName: 'Hamza Sheikh',
    customerWhatsApp: '+923337654321',
    productName: 'YouTube Automation Course',
    price: '2999 PKR',
    paymentMethod: 'Bank Transfer',
    notes: 'Payment screenshot attached',
    status: 'Pending',
    date: '2026-07-22 09:45',
  },
];

export const initialArticles: Article[] = [
  {
    id: 1,
    title: 'How to Get 4000 Watch Hours on YouTube in 2024 – Proven Strategies',
    slug: 'how-to-get-4000-watch-hours-youtube-2024',
    summary: 'A comprehensive guide explaining proven organic methods, audience retention secrets, and high-converting content formats to hit YouTube monetization threshold fast.',
    category: 'YouTube',
    author: 'Hadi Digital Store Team',
    date: '2026-07-15',
    readTime: '6 min read',
    keywords: ['YouTube watch time', '4000 watch hours', 'YouTube monetization', 'watchtime hack', 'YouTube growth'],
    content: `Hitting the 4,000 watch hours mark is the biggest milestone for any new creator aiming to unlock the YouTube Partner Program (YPP). While the requirement seems daunting, leveraging algorithmic principles and strategic video structure allows creators to achieve this target in a fraction of the time.

### 1. Focus on Audience Retention Over Video Length
YouTube's recommendation system prioritizes Audience Retention and Average View Duration (AVD). A 10-minute video with a 60% retention rate generates 6 minutes of watch time per viewer, whereas a 30-minute video with a 10% retention rate yields only 3 minutes.
- **Hook in the First 15 Seconds:** State the core value proposition immediately. Avoid slow intro animations or long personal greetings.
- **Pattern Interrupts:** Use visual cuts, text overlays, sound effects, and graphics every 15–20 seconds to reset viewer attention spans.

### 2. Create Binge-Worthy Playlists and Series
Connecting related videos through end screens, cards, and structured playlists creates a continuous viewing loop.
- **End Screen Strategy:** Do not announce that the video is ending ("In conclusion..."). Instead, seamlessly bridge to the next video: *"Now that you understand script writing, watch this video to see how to generate AI voiceovers in seconds."*
- **Curated Playlists:** Group 4–6 videos on a specific topic. Sharing playlist links instead of single video links ensures consecutive video playback.

### 3. Leverage High-Search Intent Evergreen Topics
Evergreen content continues to gather views for months and years. Use YouTube Search autosuggest, Google Trends, and competitors' top-performing videos to identify evergreen tutorial topics.
- Write clear, step-by-step guides that solve specific problems.
- Optimize titles, descriptions, and tags with relevant search terms like *YouTube watch time*, *4000 watch hours*, and *YouTube monetization*.

### 4. Utilize Livestreams for Massive Watch Time Boosts
Live streams count directly toward the 4,000 public watch hours requirement. Hosting Q&A sessions, live tutorials, or continuous music/study streams creates hours of accumulated watch time from dedicated viewers.

### 5. Professional Boosts & Verified Methods
For creators who want to accelerate their growth safely without risking channel flags, Hadi Digital Store offers specialized YouTube Growth packages including non-drop watch time methods and subscriber boosts. Ensure you work only with trusted providers that provide organic, policy-compliant execution.`
  },
  {
    id: 2,
    title: 'Top 10 AI Tools for Content Creators in 2024',
    slug: 'top-10-ai-tools-content-creators-2024',
    summary: 'Discover the most powerful artificial intelligence software for scripting, voice synthesis, video editing, thumbnail design, and social media automation.',
    category: 'AI Tools',
    author: 'Hadi Digital Store Team',
    date: '2026-07-18',
    readTime: '7 min read',
    keywords: ['AI tools', 'content creation', 'video editing AI', 'ElevenLabs', 'ChatGPT Plus', 'Capcut Pro'],
    content: `Artificial intelligence has transformed content creation from a labor-intensive endeavor into a fast, scalable workflow. Creators who harness modern AI tools produce higher quality content in a fraction of the time. Here are the top 10 AI tools leading the industry in 2024.

### 1. ChatGPT Plus (GPT-4o)
The ultimate creative co-pilot. ChatGPT Plus handles channel strategy, script writing, video titles, description SEO, and custom GPT workflows. Accessing GPT-4o unlocks vision capabilities, real-time data analysis, and image generation with DALL-E 3.

### 2. ElevenLabs Pro
The gold standard for AI voice generation. ElevenLabs provides hyper-realistic text-to-speech with natural inflection, emotional resonance, and voice cloning in over 29 languages. Essential for faceless YouTube automation channels.

### 3. Capcut Pro AI
Capcut Pro integrates advanced AI editing features like auto-captioning with stylish animated presets, background removal, voice enhancement, AI video upscale, and automated script-to-video generation.

### 4. Super Grok AI
X's flagship AI tool provides real-time access to trending internet data, news sentiment analysis, and uncensored deep research capability—giving creators immediate context on breaking topics.

### 5. Midjourney v6
The leading image generation tool for YouTube thumbnails, concept art, and high-resolution channel branding. Produces unmatched photorealism and typography control.

### 6. Runway Gen-2
Transform text prompts and still photos into cinema-grade 4K video clips. Ideal for generating B-roll footage without buying stock assets.

### 7. Opus Clip
Automatically analyzes long-form videos and extracts viral short clips for TikTok, YouTube Shorts, and Instagram Reels with automatic subtitles and reframing.

### 8. Descript
Text-based video editor that allows creators to edit video by editing the transcript text. Includes filler word removal ("ums" and "ahs") and AI voice cloning.

### 9. Canva Magic Studio
All-in-one visual design suite powered by AI. Generate banner art, social posts, presentation decks, and branding kits in seconds.

### 10. Perplexity AI
An AI search engine that synthesizes web information with cited sources, making fact-checking and research effortless for educational video creators.`
  },
  {
    id: 3,
    title: 'YouTube Automation: Complete Beginner\'s Guide to Passive Income',
    slug: 'youtube-automation-beginners-guide-passive-income',
    summary: 'Learn how to run faceless YouTube channels using AI scripting, realistic voiceovers, video editing, and outsourced teams to generate predictable passive income.',
    category: 'Course & Guides',
    author: 'Hadi Digital Store Team',
    date: '2026-07-19',
    readTime: '8 min read',
    keywords: ['YouTube automation', 'passive income', 'YouTube channel growth', 'faceless channel', 'AI YouTube'],
    content: `YouTube Automation (also known as Cash Cow Channels) is a business model where you build and scale YouTube channels without ever appearing on camera or speaking into a microphone. By outsourcing or using AI tools for scriptwriting, voiceover, editing, and thumbnail creation, you turn a YouTube channel into a self-sustaining digital asset.

### Step 1: Selecting a High-CPM Niche
Your choice of niche dictates your income potential per 1,000 views (RPM/CPM).
- **High CPM Niches ($10–$30 CPM):** Finance, Real Estate, Technology, Crypto, Business, and Software Tutorials.
- **Medium CPM Niches ($4–$10 CPM):** Luxury Living, Psychology, Crime Documentaries, and Celebrity News.
- Choose a niche with high advertiser demand and consistent search interest.

### Step 2: Building the Production Pipeline
A standard YouTube Automation workflow consists of four core components:
1. **Scripting:** Generate structured 8-to-12 minute scripts using ChatGPT Plus or hire specialized scriptwriters.
2. **Voiceover:** Generate studio-grade humanlike audio using ElevenLabs Pro voices.
3. **Editing:** Assemble stock footage, animations, and transitions using Capcut Pro or Premiere Pro.
4. **Thumbnails:** Design high CTR (Click-Through Rate) thumbnails combining bold typography and expressive visual elements.

### Step 3: Monetization Beyond AdSense
While YouTube AdSense is the baseline revenue source, top automation creators multiply earnings through:
- **Affiliate Marketing:** Placing software referral links in descriptions.
- **Sponsorships:** Negotiating brand deals once subscriber counts cross 10K.
- **Digital Product Sales:** Promoting specialized guides, templates, and courses.

### Get Fast-Tracked with HDS Courses & Tools
Starting YouTube Automation can feel overwhelming without guidance. Hadi Digital Store provides complete access to premium creation tools (ChatGPT Plus, ElevenLabs Pro, Capcut Pro) and our flagship **YouTube Automation Master Course** to guide you from zero to $1,000+/month.`
  },
  {
    id: 4,
    title: 'Capcut Pro vs Adobe Premiere Pro – Which is Better for Beginners?',
    slug: 'capcut-pro-vs-adobe-premiere-pro-beginners',
    summary: 'Detailed side-by-side comparison between Capcut Pro and Adobe Premiere Pro covering system requirements, learning curve, features, pricing, and rendering speed.',
    category: 'Tools',
    author: 'Hadi Digital Store Team',
    date: '2026-07-20',
    readTime: '5 min read',
    keywords: ['Capcut Pro review', 'video editing software', 'Capcut vs Premiere Pro', 'Capcut Pro Pakistan'],
    content: `Choosing the right video editing software can make or break your content creation speed. While Adobe Premiere Pro has long been the industry standard for professional filmmakers, Capcut Pro has taken the creator economy by storm. Here is a definitive breakdown for beginners.

### 1. Ease of Use & Learning Curve
- **Capcut Pro:** Designed with an intuitive drag-and-drop interface. Beginners can learn to edit full videos with transitions, effects, and captions in under 30 minutes.
- **Adobe Premiere Pro:** Steep learning curve requiring weeks of practice to master keyframing, color grading, audio routing, and workspace configurations.

### 2. AI Features & Automation
- **Capcut Pro:** Built natively with cutting-edge AI features. Includes one-click AI captions, auto background remover, AI script generation, speech cleanup, and smart velocity tracking.
- **Adobe Premiere Pro:** Integrates Adobe Sensei AI, but many complex effects require separate plug-ins or integration with Adobe After Effects.

### 3. Hardware Requirements & Speed
- **Capcut Pro:** Extremely lightweight. Runs smoothly on mid-tier laptops, Macs, and smartphones without lagging or overheating. Rendering 4K video is surprisingly fast.
- **Adobe Premiere Pro:** Heavy software requiring high-end GPUs, at least 16GB–32GB RAM, and dedicated fast SSD storage. Frequent crash risks on underpowered systems.

### 4. Pricing Comparison
- **Adobe Premiere Pro:** Costs roughly $22.99/month ($270+/year) under Adobe Creative Cloud subscription.
- **Capcut Pro:** Premium activation available at **Hadi Digital Store for only 800 PKR**, offering all pro effects, 4K export, and templates at an unbeatable rate in Pakistan.

### Final Verdict
For creators producing YouTube Shorts, Reels, TikToks, or YouTube Automation videos where speed and AI capabilities matter most, **Capcut Pro** is the clear winner for beginners.`
  },
  {
    id: 5,
    title: 'How to Use ChatGPT Plus for Content Creation – Advanced Tips',
    slug: 'chatgpt-plus-content-creation-advanced-tips',
    summary: 'Master advanced prompt engineering techniques, custom GPT building, and SEO script templates to turn ChatGPT Plus into a 24/7 content strategy agency.',
    category: 'AI Tools',
    author: 'Hadi Digital Store Team',
    date: '2026-07-21',
    readTime: '6 min read',
    keywords: ['ChatGPT Plus', 'AI content writing', 'ChatGPT prompts', 'GPT-4o', 'content strategy'],
    content: `ChatGPT Plus powered by OpenAI's GPT-4o model is vastly superior to the free GPT-3.5 version. It offers internet browsing, data analysis, visual comprehension, image generation, and custom instructions. Here is how advanced creators leverage ChatGPT Plus for maximal output.

### 1. Use Persona & Constraint Prompting
Avoid generic prompts like "write a YouTube script about financial planning." Instead, assign a precise persona, context, constraints, and target audience:

> *"Act as an elite YouTube scriptwriter who specializes in personal finance for Gen Z. Write an engaging, 10-minute video script titled '5 Money Mistakes to Avoid in Your 20s'. Include hook variations for the first 15 seconds, pattern interrupt notes, and conversational tone. Do not use corporate jargon."*

### 2. Build Custom GPTs for Brand Consistency
ChatGPT Plus allows you to build custom GPT bots trained on your exact writing style, channel guidelines, and product information. Once built, you can generate perfectly formatted scripts or emails with a single click.

### 3. SEO Metadata Optimization
Generate high-CTR titles and meta descriptions tailored for YouTube and Google algorithms:
- Request 10 catchy YouTube title variations focused on curiosity and high search volume.
- Generate a 200-word SEO description rich with primary keywords, timestamp placeholders, and social links.

### 4. Repurposing Long-Form Content
Paste your full transcript into ChatGPT Plus and instruct it to:
- Extract 5 viral quotes for Instagram graphics.
- Generate a 300-word newsletter summarizing key takeaways.
- Draft 3 short Twitter/X threads.

### Unlock ChatGPT Plus at Unbeatable Prices
Get full access to **ChatGPT Plus (GPT-4o)** for just **1500 PKR** at Hadi Digital Store. Join thousands of creators using original accounts with instant customer support.`
  }
];
