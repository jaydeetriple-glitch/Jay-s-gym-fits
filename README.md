# RouteWise Travels & Tourist Adventures – University Web Development Project

> **Academic Front-End Demonstration:** A modern, university-level intercity travel and tourist adventure booking platform built purely with semantic **HTML5**, **CSS3**, and **vanilla JavaScript (ES6+)**.

---

## 🌴 Project Overview

**RouteWise Travels** combines two core services into one executive travel platform across Ghana:
1. **Intercity Bus & Express Coach Booking:** Prompt, comfortable daily routes between major regional capitals (Accra, Kumasi, Cape Coast, Takoradi, Tamale, and Sunyani).
2. **Ghana Tourist Adventures & Outdooring Tours:** Curated weekend escapes, hiking expeditions, canopy walks, boat cruises, beach bonfires, and wildlife safaris with all-inclusive transparent Cedi pricing (`GH₵`).

The user interface adheres to luxury travel branding standards utilizing a rich color palette of **Dark Green**, **Warm Cream**, and **Metallic Gold**.

---

## 📁 File Structure

The project strictly adheres to the three-file separation of concerns requirement with zero external frontend frameworks:

```text
gtworks/
│
├── index.html        # Semantic HTML5 document structure and accessibility markers
├── style.css         # Pure CSS styling, responsive media queries, and print rules
├── script.js         # Modular vanilla JavaScript logic, route & tour repository
└── README.md         # Project documentation and local execution guide
```

- **`index.html`**: Contains all structure. Linked to `style.css` via `<link rel="stylesheet" href="style.css">` and `script.js` via `<script src="script.js" defer></script>`. Zero inline `<style>` or `<script>` tags.
- **`style.css`**: Configured with CSS custom properties (`:root`), flexible layout modules (CSS Grid & Flexbox), smooth transitions, e-ticket voucher & tour pass designs, and dedicated `@media print` rules.
- **`script.js`**: Pure vanilla JavaScript handling mode switching (Intercity vs Tourist), form validation, dynamic schedule filtering, state management, currency formatting in Ghana Cedis (`GH₵`), and random demo booking reference generation.

---

## ✨ Features & Ghana Tourist Sites Breakdown

### 1. Exciting Ghana Tourist Adventures (`#adventure-tours`)
Interactive showcase featuring iconic Ghanaian tourism hotspots with outdooring activities and filter pills (*All Adventures*, *Waterfalls & Hikes*, *Beach & Outdooring*, *Wildlife Safaris*, *Lake Cruise & Chill*):

- **Kakum National Park & Brenu Beach Party (Central Region)**
  - *Highlights:* 7 suspended rainforest canopy bridges 40m in the air, nature trail, beach volleyball, coconut refreshments, and evening beach bonfire at Brenu.
  - *Package:* Full-Day Adventure • From GH₵ 220 / person (Includes AC bus, canopy walk pass, jollof lunch).
- **Boti Falls, Umbrella Rock & Forest Hike (Eastern Region)**
  - *Highlights:* Mystical twin cascading waterfalls, forest trek to the natural Umbrella Rock lookout, 3-headed palm tree, swimming, and picnic games.
  - *Package:* 1-Day Fun Outing • From GH₵ 180 / person (Includes site entry pass, guide, snack pack).
- **Wli Waterfalls & Mount Afadjato Summit (Volta Region)**
  - *Highlights:* West Africa's tallest waterfall plunge pool swim, conquering Ghana's highest peak at Afadjato, mountain eco-lodge stay, BBQ and palm wine campfire.
  - *Package:* 2-Day Weekend Getaway • From GH₵ 480 / person (Includes bus, lodge stay, guides, meals).
- **Lake Volta Boat Cruise & Akosombo Chill (Eastern / Akosombo)**
  - *Highlights:* 2-hour scenic pontoon cruise on Lake Volta with live Afrobeat DJ, resort poolside buffet lunch, and historic Akosombo Dam viewpoint.
  - *Package:* Sunday Fun Cruise • From GH₵ 290 / person (Includes cruise pass, buffet lunch, transit).
- **Mole National Park Safari & Larabanga Mosque (Savannah Region)**
  - *Highlights:* Walking safari alongside wild elephants and baboons, 4x4 open-roof Jeep game drive, 2 nights at park motel overlooking watering holes, and ancient 1421 AD Larabanga mud mosque.
  - *Package:* 3-Day Wildlife Safari • From GH₵ 850 / person (Includes sleeper coach, chalet stay, safari drives).
- **Shai Hills Wildlife Reserve & Caves (Greater Accra)**
  - *Highlights:* Playful baboon troops, ostriches and zebras, ancestral warrior cave climb, archery, and bush BBQ lunch just 45 minutes from Accra.
  - *Package:* Half-Day Express Outdooring • From GH₵ 160 / person (Includes park ranger, cave climb, BBQ lunch).

### 2. Dual-Mode Search Engine
- **Tab 1: Intercity Bus Booking**: Origin and Destination city selectors with swap button and scheduled daily express departures.
- **Tab 2: Ghana Tourist Sites & Fun Outings**: Dropdown dynamically updates with Ghana's premier tourist sites and all-inclusive adventure packages.
- **Traveler Multiplier**: Automatically recalculates total fares (`Base Fare × Travelers = Total in GH₵`).

### 3. Booking Modal & E-Ticket / Tour Pass Generator
- Adapts to whether an Intercity ticket or an Adventure Tour package was selected:
  - **Adventure Tour Mode**: Displays included outdooring perks (Canopy passes, BBQ lunches, guided hikes), seating preferences, and local Ghanaian food selections (Ghanaian Jollof & Grilled Chicken, Kelewele & Groundnuts, Fried Yam & Chofi).
  - **Form Validation**: Full name validation, Ghanaian phone number pattern checking (`024`, `050`, `020` or `+233`), and email verification.
  - **Confirmation Screen**: Generates a simulated barcode, unique reference code (`RWT-TOUR-GH-2026-XXXXX` or `RWT-BUS-GH-2026-XXXXX`), passenger details, and print action.

### 4. Group Outdooring & Charter Section
- Dedicated squad banner catering to university student unions, church fellowships, office retreats, and birthday squads requesting custom coach charters and outdooring itineraries.

---

## 🎨 Color Palette & Typography

| Color Role | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Dark Green** | `#0D281E` / `#144233` | Brand identity, headers, footers, buttons |
| **Warm Cream** | `#FAF7F0` / `#EFE7D5` | Backgrounds, cards, clean contrast surfaces |
| **Luxury Gold** | `#D4AF37` / `#C59B27` | Accent badges, borders, CTA buttons, highlights |
| **Dark Charcoal** | `#14221D` | High-contrast body typography |
| **Muted Slate** | `#566960` | Secondary labels, descriptions, metadata |

- **Headings**: `Playfair Display` (Classic, elegant serif)
- **Body & UI**: `Plus Jakarta Sans` (Clean, modern geometric sans-serif)

---

## 🚀 How to Open and Run the Website Locally

No build tools, Node.js, or package installations are required.

### Method 1: Direct Browser Launch (Easiest)
1. Open the project folder:
   ```text
   C:\Users\Jayden Tetteh\Desktop\gtworks
   ```
2. Double-click **`index.html`** or right-click `index.html` and select **Open with** -> **Google Chrome** (or Edge, Firefox, Safari).
3. The website will immediately load with full functionality.

### Method 2: Visual Studio Code Live Server
1. Open Visual Studio Code.
2. Go to **File** → **Open Folder...** and choose the `gtworks` folder.
3. Right-click on `index.html` in the file explorer and click **"Open with Live Server"**.
4. Your browser will automatically open to `http://127.0.0.1:5500/index.html`.

---

## 🎓 Academic Demonstration Disclaimer

This project was developed strictly for academic evaluation and demonstration of front-end web development skills.
- No real database transactions or credit card/mobile money payments are performed.
- All telephone numbers, email addresses, and booking references are mock simulations.
- All fares are quoted in Ghana Cedis (`GH₵`) for realistic regional representation.
