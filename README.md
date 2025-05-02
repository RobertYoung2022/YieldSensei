# YieldSensei

**Smart DeFi Yield Optimization Tool**

YieldSensei is an AI-powered DeFi advisor that helps users find the best yield opportunities across multiple blockchains, estimate gas costs, and assess protocol risk. Built with Next.js, Tailwind CSS, and integrates live data from DefiLlama and the OpenAI API.

---

## Features

- Live yield discovery via DefiLlama (APY, TVL, minimum deposit)
- Real-time gas fee estimates
- Protocol risk analysis (audit history, TVL stability, insurance)
- Natural language queries powered by OpenAI
- Mobile-responsive, modern UI with Tailwind CSS
- Comprehensive unit and integration tests

---

## Prerequisites

- Node.js v16 or higher
- npm (or Yarn)
- DefiLlama API key
- OpenAI API key

---

## Quick Start

1. Clone this repository:

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/yield-sensei.git
   cd yield-sensei
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root with:

   ```env
   NEXT_PUBLIC_DEFILLAMA_API_KEY=your_defillama_key
   OPENAI_API_KEY=your_openai_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 in your browser.

---

## Testing

Run the full test suite with:

```bash
npm test
```

To watch files and re-run tests:

```bash
npm run test:watch
```

---

## Building & Deployment

1. Build for production:

   ```bash
   npm run build
   ```

2. Run the optimized server:

   ```bash
   npm start
   ```

---

## Contributing

Contributions are welcome! Please open issues or pull requests.

---

## License

MIT © 2024 RedeploySensei Team 