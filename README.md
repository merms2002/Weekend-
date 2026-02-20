# لوحة SaaS لإدارة التعلُّم (LMS)

الريبو ده متظبط بحيث تقدر تشغّل وتعمل Deploy من **جذر المشروع**، مع إن التطبيق الفعلي موجود جوه `app/`.

## تقسيمة المشروع

- `app/` → كود الواجهة (Vite + React + TypeScript).
- `package.json` (في الجذر) → سكربتات وسيطة بتشغّل الأوامر داخل `app/`.
- `vercel.json` و `netlify.toml` → إعدادات جاهزة للنشر.

## التشغيل محليًا

```bash
npm run install:app
npm run dev
```

## البناء والاختبار

```bash
npm run build
npm run preview
```

الأوامر دي شغّالة من جذر المشروع، وبتطلع نسخة النشر في `app/dist`.

## النشر

### Vercel
- Framework preset: Vite (متضبط بالفعل في `vercel.json`)
- Build command: `npm run build`
- Output directory: `app/dist`

### Netlify
- Build command: `npm run build`
- Publish directory: `app/dist`
- الإعدادات جاهزة بالفعل في `netlify.toml`
