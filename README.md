# 🚀 ROI Calculator AI - AI Automation Return on Investment Calculator

A modern and interactive Single Page Application (SPA) built with Next.js that helps businesses calculate the ROI (Return on Investment) of AI automation.

## ✨ Features

- **Multi-Step Form**: Guided user experience through 3 logical steps
- **Smooth Animations**: Elegant transitions powered by GSAP
- **Modern Design**: Clean interface with orange/white palette and professional typography
- **Dynamic ROI Calculation**: Custom algorithm to estimate annual losses
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Fast and customizable styling

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Form Management**: React Hook Form
- **Icons**: Lucide React
- **Language**: TypeScript
- **Fonts**: Instrument Serif (headlines) + Inter (body text)

## 📋 Prerequisites

Before starting, make sure you have installed:

- Node.js (version 18.x or higher)
- npm or yarn or pnpm

## 🚀 Installation and Setup

### 1. Install dependencies

```bash
npm install
```

or with yarn:

```bash
yarn install
```

or with pnpm:

```bash
pnpm install
```

### 2. Start the development server

```bash
npm run dev
```

or:

```bash
yarn dev
```

or:

```bash
pnpm dev
```

### 3. Open in browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

## 🏗️ Project Structure

```
roi-calculator-ai/
├── app/
│   ├── page.tsx              # Main page with state logic
│   ├── layout.tsx            # Root app layout
│   └── globals.css           # Global styles and fonts
├── components/
│   ├── Button.tsx            # Reusable button component
│   ├── InputField.tsx        # Reusable input field component
│   ├── Step1Form.tsx         # Form step 1 (Team Information)
│   ├── Step2Form.tsx         # Form step 2 (Business Metrics)
│   └── ResultDisplay.tsx     # ROI results display
├── lib/
│   ├── gsap-utils.ts         # GSAP animation utility functions
│   └── types.ts              # TypeScript type definitions
├── tailwind.config.js        # Tailwind configuration (colors, fonts)
├── package.json              # Dependencies and scripts
└── README.md                 # This documentation
```

## 🎨 Design & Branding

### Color Palette

- **Primary**: `#FF5722` (Bright orange)
- **Primary Light**: `#FF8C00`
- **Secondary**: `#FFFFFF` (White)
- **Dark Text**: `#1A1A1A`
- **Accent**: `#F0F0F0` (Light gray)

### Typography

- **Headlines**: Instrument Serif (Google Fonts)
- **Body**: Inter (Google Fonts)

## 📊 ROI Calculation Logic

The calculator uses the following formula:

```
Total Annual Loss = Salary Waste + Missed Revenue

Where:
- Salary Waste = (Hours/Day × 240 working days × Team Size × 40% AI Efficiency) × Hourly Cost
- Missed Revenue = (Leads/Month × 12 × Conversion Improvement) × Customer Lifetime Value
- Working Days Per Year = 48 weeks × 5 days = 240 days (accounting for vacation)
- AI Efficiency Gain = 40% (AI can automate approximately 40% of repetitive tasks)
- Conversion Improvement = 8% (realistic improvement with faster AI response times)
```

### Detailed Calculation Logic

**Salary Cost Calculation:**
1. Hours per person per year = Hours per day × 240 working days
2. Total hours for all team = Hours per person × Team size
3. Automatable hours = Total hours × 40% (AI efficiency)
4. Salary cost = Automatable hours × Hourly cost

**Missed Revenue Calculation:**
1. Current conversion rate (as decimal)
2. Improved rate = Current rate × 1.08 (8% improvement)
3. Conversion increase = Improved rate - Current rate
4. Leads lost per year = (Leads per month × 12) × Conversion increase
5. Missed revenue = Leads lost × Customer lifetime value
```

### Important Notes on Calculations

**These are approximate estimates only:**
- The calculator assumes AI can automate 40% of repetitive tasks (conservative estimate)
- Conversion improvement is calculated multiplicatively at 8% (realistic based on industry data)
- Working year is calculated as 48 weeks (240 days) to account for holidays and vacation
- Actual results will vary significantly based on:
  - Industry sector
  - Company size and structure
  - Quality of AI implementation
  - Team adoption and training
  - Specific business processes
  - Market conditions

**Legal Disclaimer:** This tool provides estimates for informational purposes only and does not constitute financial or professional advice. Always consult with professionals before making business decisions.

## 🚢 Production Build

To create an optimized production build:

```bash
npm run build
npm run start
```

This command:
1. Generates an optimized build in the `.next/` folder
2. Starts the production server

## 🎯 Customization

### Change Colors

Edit the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#FF5722',
        light: '#FF8C00',
        dark: '#E64A19',
      },
      // ... other colors
    }
  }
}
```

### Change Fonts

Edit the `app/globals.css` file to change the imported Google Fonts.

### Customize Calendly Link

In the `ResultDisplay.tsx` component, find the "Prenota Consulenza Gratuita" button and modify the URL:

```typescript
onClick={() => window.open('https://calendly.com/rayo-info/30min/rayo-info/30minYOUR_LINK', '_blank')}
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full grid layout
- **Tablet**: Adapted layout
- **Mobile**: Vertically stacked layout

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint linter

## 📝 Important Notes

1. **Google Fonts**: Fonts are loaded directly from Google Fonts via `globals.css`
2. **GSAP**: Animations are managed through utility functions in `lib/gsap-utils.ts`
3. **Validation**: Form validation is handled in the main page (`app/page.tsx`)
4. **Client Components**: All interactive components use the `'use client'` directive
5. **Legal Disclaimers**: Multiple disclaimers are included throughout the app to clarify that results are estimates
6. **Calculation Transparency**: The methodology is explained to users before they begin the calculation

## 🐛 Troubleshooting

### Error: "Module not found"

Make sure you have run `npm install` correctly.

### Animations not working

Verify that GSAP is installed correctly:

```bash
npm install gsap
```

### Font issues

Fonts are loaded from Google Fonts. Make sure you have an active internet connection during development.

### Favicon errors

If you see favicon errors, you can safely ignore them or add your own `favicon.ico` file in the `app/` directory.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! (Vercel will auto-detect Next.js settings)

### Deploy to other platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 📄 License

This project was created for demonstration and portfolio purposes.

## 🤝 Contributing

For suggestions or improvements, feel free to open an issue or pull request.

## 📧 Contact

For any questions or requests, contact the development team.

---

**Happy ROI calculating! 🎉**
