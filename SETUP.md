# 🚀 Quick Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- Framer Motion (animations)
- GSAP (timeline animations)
- Three.js & React Three Fiber (3D graphics)
- Canvas Confetti (celebration effects)
- Lucide React (icons)
- Tailwind CSS (styling)

### 2. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
diwali-celebration/
├── public/
│   └── diya.svg                 # Diya favicon
├── src/
│   ├── components/
│   │   ├── AudioControl.jsx     # Sound toggle control
│   │   ├── BestFriendMode.jsx   # Special friendship mode overlay
│   │   ├── CinematicIntro.jsx   # Opening animation sequence
│   │   ├── FireworksCanvas.jsx  # Interactive fireworks
│   │   ├── FriendshipQuiz.jsx   # Fun quiz section
│   │   ├── GiftBoxSection.jsx   # Interactive gift boxes
│   │   ├── GrandFinale.jsx      # Final celebration
│   │   ├── InteractiveDiyas.jsx # Light the diyas section
│   │   ├── LoadingScreen.jsx    # Initial loading
│   │   ├── MemoryLane.jsx       # Memory timeline
│   │   └── ReducedMotionToggle.jsx # Accessibility
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js               # Vite configuration
└── README.md

```

## 🎨 Customization Guide

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  diwali: {
    gold: '#YOUR_COLOR',
    orange: '#YOUR_COLOR',
    // ...
  }
}
```

### Modify Messages

Each component has editable message arrays:

- **Diyas**: `src/components/InteractiveDiyas.jsx` - `funnyMessages` array
- **Quiz**: `src/components/FriendshipQuiz.jsx` - `questions` array
- **Gifts**: `src/components/GiftBoxSection.jsx` - `gifts` array
- **Memories**: `src/components/MemoryLane.jsx` - `memories` array

### Add More Diyas

In `InteractiveDiyas.jsx`, add to the `diyas` array:

```javascript
const diyas = [
  // existing diyas...
  { id: 6, x: 50, y: 80, delay: 1.0 },
]
```

### Change Animation Speed

Modify `transition` durations in any component:

```javascript
transition={{ duration: 0.8 }} // Change 0.8 to your value
```

## 🎯 Features Checklist

- ✅ Cinematic intro with matchstick and diya
- ✅ Interactive click-to-light diyas
- ✅ Canvas-based fireworks system
- ✅ Funny friendship quiz
- ✅ 3D gift box animations
- ✅ Best friend mode overlay
- ✅ Memory lane timeline
- ✅ Grand finale celebration
- ✅ Sound effects with toggle
- ✅ Reduced motion support
- ✅ Mobile responsive
- ✅ Touch gestures
- ✅ Smooth animations
- ✅ Confetti celebrations

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
npm run dev -- --port 3000
```

### Build Errors

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Slow Performance

1. Check browser console for errors
2. Enable hardware acceleration in browser
3. Close other tabs
4. Reduce particle counts in components

### Animations Not Working

1. Check if reduced motion is enabled in OS
2. Clear browser cache
3. Try different browser
4. Check console for errors

## 📱 Mobile Testing

### Local Network Testing

1. Find your local IP:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Access on mobile:
   ```
   http://YOUR_IP:5173
   ```

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag dist folder to netlify.com
```

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🎉 Performance Tips

1. **Lazy Loading**: Components are already lazy-loaded
2. **Code Splitting**: Vite automatically splits code
3. **Image Optimization**: Use WebP format for any images
4. **Reduce Particles**: Lower particle counts for mobile
5. **Disable Animations**: Respect `prefers-reduced-motion`

## 🔧 Advanced Configuration

### Custom Webpack Config

Edit `vite.config.js` to add plugins or modify build settings.

### Environment Variables

Create `.env` file:

```
VITE_API_URL=your_url
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify all dependencies installed
3. Ensure Node.js version >= 16
4. Try clearing cache and rebuilding

## 🎊 Have Fun!

Enjoy creating an amazing Diwali celebration! 🪔✨

Feel free to modify, enhance, and share your version!
