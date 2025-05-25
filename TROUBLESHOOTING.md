# Troubleshooting Water System Errors

## Error: "Cannot read properties of undefined (reading 'constructor')"

This error is typically related to Recharts and server-side rendering issues in Next.js. Here's how to fix it:

### Solution 1: Clear Cache and Reinstall Dependencies

1. **Stop your development server** (Ctrl+C)

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   ```

3. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Solution 2: Use Production Build

Sometimes the error only occurs in development mode. Try building for production:

```bash
npm run build
npm start
```

### Solution 3: Disable React Strict Mode (Temporary)

If the error persists, temporarily disable React Strict Mode:

1. Edit `next.config.mjs`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: false, // Temporarily disable
   };
   
   export default nextConfig;
   ```

2. Restart your development server

### Solution 4: Check Browser Console

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for more specific error messages
4. Check Network tab for failed requests

### Solution 5: Verify CSV Data Loading

The error might be related to data loading:

1. **Check if using sample data works:**
   - Go to Water System page
   - Click "Data Source" button
   - Click "Load Sample Data"
   - If this works, the issue is with CSV loading

2. **Verify CSV file format:**
   - Ensure CSV is UTF-8 encoded
   - Check for special characters
   - Verify column headers match exactly

### Solution 6: Environment Variables

Create a `.env.local` file in your project root:

```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Solution 7: Update Dependencies

Ensure all dependencies are up to date:

```bash
npm update
```

### Solution 8: Use Alternative Port

Sometimes port conflicts cause issues:

```bash
npm run dev -- -p 3001
```

## Other Common Issues

### CSV File Not Loading

1. **Check file location:**
   ```
   public/
   └── data/
       └── water/
           └── Master WA DB TableMaster WA 24  25 Apr.csv
   ```

2. **Check file permissions:**
   - Ensure the file is readable
   - No special characters in filename

3. **Check browser console for CORS errors**

### Charts Not Displaying

1. **Wait for page to fully load**
   - Charts load after initial render
   - Look for loading indicators

2. **Check if data is loaded:**
   - KPI cards should show numbers
   - If all values are 0, data isn't loaded

3. **Try different browser:**
   - Chrome/Edge usually work best
   - Disable browser extensions

### Memory Issues

If you get out of memory errors:

1. **Increase Node.js memory:**
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run dev
   ```

2. **Use smaller CSV files for testing**

## Still Having Issues?

1. **Check GitHub Issues:**
   - https://github.com/ARahim900/Muscatbay-front-page/issues

2. **Create a new issue with:**
   - Error message (full stack trace)
   - Browser and version
   - Node.js version (`node -v`)
   - npm version (`npm -v`)
   - Steps to reproduce

3. **Temporary Workaround:**
   - Use the sample data instead of CSV
   - The app will still function with demo data

## Quick Commands Reference

```bash
# Clean install
rm -rf node_modules .next
npm install
npm run dev

# Production build
npm run build
npm start

# Check for issues
npm run lint

# Update dependencies
npm update
```