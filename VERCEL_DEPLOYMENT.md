# Vercel Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. Build Status
- [x] Production build successful
- [x] No TypeScript errors
- [x] No ESLint critical errors (warnings acceptable)
- [x] All routes generated correctly

### 2. Environment Variables
Required in Vercel Dashboard:
```
NEXT_PUBLIC_SUPABASE_URL=https://icyntgrtgmiisfzwnogj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeW50Z3J0Z21paXNmendub2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MDk3MTcsImV4cCI6MjA4MTE4NTcxN30.hAWTAXpYKYDTtUd_T01SM7skaNSDBCCuUA06CUw-TKs
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeW50Z3J0Z21paXNmendub2dqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTYwOTcxNywiZXhwIjoyMDgxMTg1NzE3fQ.unXkid4HENObw60zh5yxUNJXbl9oetLu07qzc-7m1VU
```

### 3. Database
- [x] Supabase project created
- [x] Schema deployed
- [x] RLS policies configured
- [x] Test data seeded

### 4. Storage
- [x] Storage bucket created: `products`
- [x] Bucket set to public
- [x] Upload functionality tested

### 5. Git Repository
- [x] Code committed to Git
- [x] `.env.local` in `.gitignore`
- [x] No sensitive data in repo

---

## 🚀 Deployment Steps

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: beauty-universe (or your choice)
# - Directory: ./
# - Override settings? No
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
5. Add Environment Variables (see above)
6. Click "Deploy"

---

## ⚙️ Post-Deployment Configuration

### 1. Environment Variables in Vercel
Go to: Project Settings → Environment Variables

Add all three variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Important**: Apply to all environments (Production, Preview, Development)

### 2. Domain Configuration (Optional)
- Vercel provides: `your-project.vercel.app`
- Custom domain: Project Settings → Domains

### 3. Supabase Configuration
Update Supabase Dashboard → Authentication → URL Configuration:
- Add your Vercel domain to "Site URL"
- Add to "Redirect URLs"

---

## 🧪 Post-Deployment Testing

After deployment, test:
- [ ] Home page loads
- [ ] Products display with images
- [ ] Search functionality works
- [ ] Language switching (FR/AR)
- [ ] Product detail pages
- [ ] Order form submission
- [ ] Admin panel access (if configured)

---

## 🐛 Common Issues & Solutions

### Images Not Loading
**Problem**: 404 on product images
**Solution**: 
- Check `public/images/products/` exists in Git
- Verify Supabase Storage bucket is public
- Check image URLs in database

### Build Fails
**Problem**: Build error on Vercel
**Solution**:
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`

### Database Connection Error
**Problem**: Can't connect to Supabase
**Solution**:
- Verify environment variables in Vercel
- Check Supabase project is not paused
- Verify RLS policies allow public read

### Font Loading Issues
**Problem**: Google Fonts timeout
**Solution**:
- This is a known Next.js 16 issue
- Fonts will be cached after first load
- Consider using local fonts if persistent

---

## 📊 Deployment Status

| Component | Status | Notes |
|-----------|--------|-------|
| Build | ✅ Ready | Tested locally |
| Database | ✅ Ready | Supabase configured |
| Storage | ✅ Ready | Bucket created |
| Env Vars | ⚠️ Manual | Add to Vercel |
| Git | ✅ Ready | Committed |

---

## 🎯 Final Checklist

Before clicking "Deploy":
- [ ] All environment variables ready to paste
- [ ] Git repository pushed to GitHub/GitLab
- [ ] Supabase project active
- [ ] Storage bucket public
- [ ] Local build successful

**You are ready to deploy!** 🚀

---

## 📞 Support

If deployment fails:
1. Check Vercel build logs
2. Verify environment variables
3. Test build locally: `npm run build`
4. Check Supabase dashboard for errors

**Estimated Deployment Time**: 2-5 minutes
