# 🚀 Quick Start Instructions - ROI Calculator AI

## Step-by-Step Setup

### 1️⃣ Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

**What this does:** Installs all required packages including Next.js, React, GSAP, Tailwind CSS, Lucide React icons, and TypeScript.

### 2️⃣ Start Development Server

```bash
npm run dev
```

**What this does:** Starts the Next.js development server with hot-reloading enabled.

### 3️⃣ Open in Browser

Navigate to: [http://localhost:3000](http://localhost:3000)

You should see the ROI Calculator AI application running!

## 📱 Testing the Application

1. **Intro Screen**: Click "Inizia il Calcolo"
2. **Step 1**: Fill in team information (team size, hours, hourly cost)
3. **Step 2**: Enter business metrics (leads, customer value, closing rate)
4. **Result**: View the calculated ROI with detailed breakdown

## 🎨 What to Expect

- **Smooth Animations**: GSAP-powered transitions between steps
- **Progress Bar**: Visual indicator at the top showing your progress
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Professional UI**: Orange gradient theme with clean typography

## 🛠️ Customization Tips

### Change Calendly Link

Edit `components/ResultDisplay.tsx` line ~195:

```typescript
onClick={() => window.open('https://calendly.com/rayo-info/30min/rayo-info/30minYOUR_LINK', '_blank')}
```

### Adjust Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
primary: {
  DEFAULT: '#FF5722',  // Change this to your brand color
  // ...
}
```

### Modify Calculation Logic

The ROI calculation is in `app/page.tsx` in the `calculateROI()` function. You can adjust:
- Working days per month (default: 20)
- AI conversion increase percentage (default: 20%)
- Any other calculation parameters

## 🚢 Production Deployment

### Build for Production

```bash
npm run build
```

### Test Production Build Locally

```bash
npm run start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! (Vercel will auto-detect Next.js)

## 📊 Key Features

✅ Multi-step form with validation  
✅ Real-time ROI calculation  
✅ Animated number counting  
✅ Responsive design  
✅ Professional UI with gradients  
✅ TypeScript for type safety  
✅ GSAP animations  

## 🐛 Common Issues

**Issue**: Animations not working  
**Solution**: Make sure GSAP is installed: `npm install gsap`

**Issue**: Fonts not loading  
**Solution**: Check internet connection (fonts load from Google Fonts CDN)

**Issue**: TypeScript errors  
**Solution**: Run `npm install` to ensure all type definitions are installed

## 📁 File Structure Overview

```
app/
├── page.tsx          → Main logic and state management
├── layout.tsx        → Root layout with metadata
└── globals.css       → Global styles and fonts

components/
├── Button.tsx        → Reusable button component
├── InputField.tsx    → Reusable input component
├── Step1Form.tsx     → Team information form
├── Step2Form.tsx     → Business metrics form
└── ResultDisplay.tsx → ROI results with animations

lib/
└── gsap-utils.ts     → Animation helper functions
```

## 💡 Tips for Success

1. **Test with realistic data**: Use actual numbers from your business for accurate results
2. **Customize the CTA**: Update the Calendly link to your own booking page
3. **Adjust branding**: Change colors and fonts to match your brand
4. **Add analytics**: Consider adding Google Analytics or similar
5. **SEO optimization**: Update metadata in `app/layout.tsx`

## 🎯 Next Steps

- [ ] Replace placeholder favicon with your logo
- [ ] Update Calendly URL with your booking link
- [ ] Customize colors to match your brand
- [ ] Add your own domain (if deploying)
- [ ] Test on multiple devices
- [ ] Share with potential customers!

---

**Need help?** Check the main README.md for more detailed documentation.

**Ready to launch?** Your ROI calculator is ready to help convert visitors into customers! 🎉

