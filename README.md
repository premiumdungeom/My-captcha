# Ton Bot Global CAPTCHA

## 🚀 What is this?

A stylish CAPTCHA frontend that verifies Telegram users via a webhook. Supports VPN detection simulation and unlimited usage.

## 📦 Features
- Glassmorphism design
- VPN simulation toggle
- Dynamic webhook support
- Deployable to Vercel in 1 click

## 🛠 How to Use

1. Import this repo into [Vercel](https://vercel.com)
2. Set the URL like:
   ```
   https://your-vercel-app.vercel.app/?webhook=https://yourbot.com/onWebhook
   ```
3. Hook it to your Telegram bot `/captcha` command

## ✅ Payload Sent

```json
{
  "results": {
    "user_hash": "random123",
    "captcha": "ok",
    "vpn": "yes"
  }
}
```

## 🖼️ Preview
Logo: [TON Logo](assets/ton-logo.png)
