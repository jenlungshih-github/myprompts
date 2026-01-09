# Chinese Prompts Website (100+ Prompts)

I have expanded the website to include over **100 pure Chinese prompts** and added support for displaying sample images.

## Features
- **100+ Prompts**: A massive collection covering Style Transfer, Photography, Character Design, Scenes, Products, Food, and more.
- **Sample Images**: The website now displays generated sample images for prompts (where available).
- **Custom Prompt Interface**: A dedicated section to add custom prompts.
    - **Category Selection**: Choose a category for your prompt.
    - **Image Paste**: Paste sample images directly from the clipboard into a dedicated area.
- **Local Image Upload**: Users can now upload their own reference images for any prompt card. This is useful for replacing missing or broken images.
- **Quota Limitation**: Due to AI image generation quota limits, only a subset of prompts currently have generated images. The system is designed to gracefully handle missing images.

## Content Categories
- **風格轉換 (Style Transfer)**: 3D, Pixel Art, Claymation, etc.
- **攝影效果 (Photography)**: Macro, Drone, Tilt-shift, etc.
- **角色設計 (Character Design)**: Fantasy, Sci-Fi, Cute Monsters.
- **場景與環境 (Scenes)**: Cyberpunk City, Magic Forest, Space Station.
- **產品設計 (Product Design)**: Sneakers, Watches, Perfume.
- **美食攝影 (Food)**: Sushi, Burgers, Desserts.
- **動物與生物 (Animals)**: Cats, Tigers, Dragons.
- **抽象與概念 (Abstract)**: Fluid Art, Fractals.
- **節日慶典 (Festivals)**: CNY, Christmas.
- **情感表達 (Emotions)**: Joy, Sadness, Hope.
- **運動與動作 (Sports)**: Basketball, Surfing.
- **旅遊主題專業插畫 (Travel Illustration)**: Paris, Kyoto, Santorini, New York, Camping, **Japanese Itinerary Map**.
- **食譜 (Recipes)**: Healthy Salad, Steak Cooking, Baking Cookies, Cocktail Mixing.

## Recent Updates
- **Content Update**: Restored missing sample images for **Cyberpunk**, **Steampunk**, **iPhone Selfie**, **Polaroid**, **Macro**, **Drone**, and **Fisheye**.
- **Quota Reached**: Hit image generation quota limit. **Double Exposure** image could not be generated yet.
- **UX Improvement**: Added success alert and button text update ("✅ 圖片已更新") for local image uploads.
- **Bug Fix**: Fixed an issue where uploaded images were not appearing if the original image was broken.
- **New Feature**: Added **Local Image Upload** (📷 上傳參考圖) button to all prompt cards.
- **Bug Fix**: Fixed sample image display issues (cropping).
- **New Category**: Added **"食譜" (Recipes)**.

## Usage
The project is located in `c:\Gemini-AntiGravity\chinese-prompts`.
Run `npm run dev` to start the website.
