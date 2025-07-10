# Sanity + Next.js 15 Webhook Revalidation Sistemi - Güncel Kılavuz

Bu kılavuz, Sanity CMS ile Next.js 15 App Router arasında webhook tabanlı cache revalidation sisteminin nasıl kurulduğunu adım adım açıklar.

## 🎯 **1. ADIM: Paket Kurulumu**

```bash
# Sanity webhook paketi
bun add @sanity/webhook

# Sanity client (zaten var)
bun add next-sanity sanity
```

## 🔧 **2. ADIM: Environment Variables**

`.env.local` dosyasına ekle:

```bash
# Sanity credentials (zaten var)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Webhook secret (YENİ)
SANITY_REVALIDATE_SECRET=your-super-secret-webhook-key-123
```

## 📡 **3. ADIM: API Route Hazır!**

✅ API route hazırlandı: `src/app/api/revalidate/route.ts`

Bu endpoint:

- Sanity signature doğrulaması yapar
- Content type'a göre ilgili sayfaları revalidate eder
- Güvenli ve modern yaklaşım kullanır

## 🎪 **4. ADIM: Sanity Studio Webhook Kurulumu**

### Sanity Studio'da:

1. **Dashboard > Settings > API** bölümüne git
2. **Webhooks** sekmesini seç
3. **Add webhook** butonuna tıkla

### Webhook Ayarları:

```
Name: Next.js Revalidation
URL: https://yourdomain.com/api/revalidate
HTTP method: POST
API version: v2021-06-07

Secret: your-super-secret-webhook-key-123 (aynı secret)

Triggers:
☑️ Create
☑️ Update
☑️ Delete

Filter: _type in ["profile", "timeline", "techStack", "post"]
```

### Projection (Payload Template):

```javascript
{
  "_type": _type,
  "slug": slug
}
```

## 📋 **5. ADIM: Content Type Mapping**

Webhook şu content type'ları destekler:

| **Content Type** | **Revalidate Path**      | **Açıklama**                     |
| ---------------- | ------------------------ | -------------------------------- |
| `profile`        | `/`                      | Ana sayfa bio güncellemesi       |
| `timeline`       | `/`                      | Timeline/experience güncellemesi |
| `techStack`      | `/stack`                 | Tech stack sayfası               |
| `post`           | `/blog/{slug}` + `/blog` | Blog yazıları                    |

## 🧪 **6. ADIM: Test Etme**

### Local Test:

```bash
# Webhook endpoint'ini test et
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "sanity-webhook-signature: test" \
  -d '{"_type": "profile"}'
```

### Production Test:

1. Sanity Studio'da bir document güncelle
2. Webhook logs'a bak (Sanity dashboard)
3. Next.js logs'ı kontrol et

## 🔐 **7. ADIM: Production Deployment**

### Vercel'de Environment Variables:

```bash
SANITY_REVALIDATE_SECRET=your-super-secret-webhook-key-123
```

### Webhook URL'i Güncelle:

```
https://yourdomain.com/api/revalidate
```

## 🚨 **8. ADIM: Debug ve Monitoring**

### Console Logs:

```
✅ Revalidated: Homepage (profile updated)
✅ Revalidated: Tech Stack page
❌ Invalid signature
❌ No signature header found
```

### Sanity Webhook Logs:

- Dashboard > Settings > API > Webhooks
- Her webhook çağrısının durumunu görebilirsin

## 📊 **9. ADIM: ISR Cache Strategy**

Şu anda sayfa seviyesi revalidation sürelerin:

```typescript
// Ana sayfa
export const revalidate = 600; // 10 dakika

// GitHub sayfası
export const revalidate = 600; // 10 dakika

// Stack sayfası
export const revalidate = 600; // 10 dakika
```

### Önerilen Optimizasyon:

```typescript
// Static content - 1 saat
export const revalidate = 3600; // profile, stack

// Dynamic content - 10 dakika
export const revalidate = 600; // github, social feeds
```

## 🎉 **10. ADIM: Workflow**

1. **Editor** Sanity Studio'da content günceller
2. **Sanity** webhook tetikler → `/api/revalidate`
3. **Next.js** signature doğrular
4. **revalidatePath()** ile cache temizler
5. **User** siteyi ziyaret eder → fresh content!

## 🚀 **Ek Optimizasyonlar**

### Batch Revalidation:

```typescript
case 'profile':
  revalidatePath('/')
  revalidatePath('/about') // Eğer ayrı about sayfan varsa
  break
```

### Tag-based Revalidation:

```typescript
// Belirli tag'leri revalidate et
revalidateTag('profile');
revalidateTag('homepage');
```

### Error Handling:

```typescript
// Webhook hatalarını Slack'e gönder
if (error) {
    await notifySlack(`Webhook failed: ${error.message}`);
}
```

## 🔧 **Troubleshooting**

### Yaygın Sorunlar:

1. **"Invalid signature"**
    - Secret key'lerin eşleştiğini kontrol et
    - Webhook URL'in doğru olduğunu kontrol et

2. **"No signature header"**
    - Sanity webhook config'inde secret tanımlı mı?
    - HTTP method POST mu?

3. **"Revalidation failed"**
    - Path'ler doğru mu? (`/stack` vs `/stacks`)
    - ISR enabled mi? (`export const revalidate`)

## 📈 **Performance Benefits**

Bu sistem sayesinde:

- ⚡ **Instant content updates** (webhook revalidation)
- 💾 **Optimal cache usage** (ISR + selective invalidation)
- 🛡️ **Secure** (signature authentication)
- 📊 **Scalable** (CDN cache + on-demand revalidation)
- 🎯 **Selective** (sadece değişen sayfalar revalidate)

## ✅ **Kurulum Tamamlandı!**

Artık Sanity'de yaptığın değişiklikler **anında** sitende yansıyacak!

Test et:

1. Sanity Studio'da profile bio'nu değiştir
2. Birkaç saniye bekle
3. Ana sayfayı yenile → Değişiklik anında görülür!

Bu sistem **static site performance** + **dynamic content** güncellemelerinin mükemmel kombinasyonu! 🚀
