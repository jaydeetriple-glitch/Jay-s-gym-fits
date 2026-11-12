/**
 * RouteWise Travels & Tourist Adventures - Main JavaScript Engine
 * University Project: Front-End Intercity Bus & Tourist Adventure Booking
 * 
 * Features:
 * - Intercity Bus & Tourist Outdooring Mode Switcher
 * - Ghana Tourist Sites Repository (Kakum, Boti, Wli, Mole, Akosombo, Shai Hills)
 * - Category Filtering for Adventure Tours (Waterfalls, Beach, Safari, Cruise)
 * - Origin & Destination City Swap with Animation
 * - Interactive Search Form with Validation
 * - Passenger Multiplier Fare Calculation in Ghana Cedis (GH₵)
 * - Booking Modal for both Bus Tickets and Adventure Tour Passes
 * - Dietary & Outdooring Preference Selection (Jollof, Kelewele, Chofi)
 * - Dynamic Demo Booking Reference & E-Ticket Voucher Generator
 * - Browser Print Integration
 * - Responsive Mobile Navigation Drawer
 * - Demo Contact & Tour Inquiries Form Feedback
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. Data Repositories & Configuration
     ========================================================================== */

  // Intercity Route Database
  const ROUTE_DATA = {
    "Accra-Kumasi": {
      duration: "4h 30m",
      distance: "250 km",
      baseFare: 130,
      originTerminal: "Circle VIP Interchange, Accra",
      destTerminal: "Asafo VIP Station, Kumasi",
      schedules: [
        { dep: "06:00 AM", arr: "10:30 AM", operator: "RouteWise Gold VIP", bus: "Scania Irizar i6", amenities: ["AC", "Wi-Fi", "USB Charging", "Recliner"], seats: 6, fareMod: 1.0 },
        { dep: "08:30 AM", arr: "01:00 PM", operator: "Royal Executive Coach", bus: "Volvo 9700 Luxury", amenities: ["AC", "Wi-Fi", "Bottled Water", "TV"], seats: 14, fareMod: 1.08 },
        { dep: "11:00 AM", arr: "03:30 PM", operator: "RouteWise Express", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "USB Charging", "Recliner"], seats: 3, fareMod: 0.95 },
        { dep: "02:00 PM", arr: "06:30 PM", operator: "Ashanti Royal Link", bus: "Scania Marcopolo", amenities: ["AC", "Wi-Fi", "USB Charging"], seats: 9, fareMod: 1.0 },
        { dep: "05:30 PM", arr: "10:00 PM", operator: "RouteWise Sunset VIP", bus: "Volvo B11R Premier", amenities: ["AC", "Wi-Fi", "Snack Pack"], seats: 8, fareMod: 1.15 }
      ]
    },
    "Kumasi-Accra": {
      duration: "4h 30m",
      distance: "250 km",
      baseFare: 130,
      originTerminal: "Asafo VIP Station, Kumasi",
      destTerminal: "Circle VIP Interchange, Accra",
      schedules: [
        { dep: "06:00 AM", arr: "10:30 AM", operator: "RouteWise Dawn Express", bus: "Scania Irizar i6", amenities: ["AC", "Wi-Fi", "USB Charging"], seats: 8, fareMod: 1.0 },
        { dep: "09:00 AM", arr: "01:30 PM", operator: "Capital City Link", bus: "Volvo 9700 Luxury", amenities: ["AC", "Wi-Fi", "Bottled Water"], seats: 11, fareMod: 1.08 },
        { dep: "01:30 PM", arr: "06:00 PM", operator: "RouteWise Gold VIP", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "USB Charging", "Recliner"], seats: 5, fareMod: 1.0 },
        { dep: "05:00 PM", arr: "09:30 PM", operator: "Ashanti Nightliner", bus: "Scania Marcopolo", amenities: ["AC", "Wi-Fi", "Recliner"], seats: 12, fareMod: 1.12 }
      ]
    },
    "Accra-Cape Coast": {
      duration: "3h 15m",
      distance: "148 km",
      baseFare: 95,
      originTerminal: "Kaneshie Express Hub, Accra",
      destTerminal: "Pedu Junction Station, Cape Coast",
      schedules: [
        { dep: "06:30 AM", arr: "09:45 AM", operator: "Coastal Voyager VIP", bus: "Scania Irizar i6", amenities: ["AC", "Wi-Fi", "USB Charging"], seats: 12, fareMod: 1.0 },
        { dep: "09:30 AM", arr: "12:45 PM", operator: "Heritage Express", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "Recliner", "Bottled Water"], seats: 7, fareMod: 1.05 },
        { dep: "01:00 PM", arr: "04:15 PM", operator: "RouteWise Coastliner", bus: "Volvo B8R Coach", amenities: ["AC", "Wi-Fi", "USB Charging"], seats: 15, fareMod: 0.95 },
        { dep: "04:30 PM", arr: "07:45 PM", operator: "Atlantic Breeze VIP", bus: "Scania Touring", amenities: ["AC", "Wi-Fi", "Recliner"], seats: 4, fareMod: 1.1 }
      ]
    },
    "Cape Coast-Accra": {
      duration: "3h 15m",
      distance: "148 km",
      baseFare: 95,
      originTerminal: "Pedu Junction Station, Cape Coast",
      destTerminal: "Kaneshie Express Hub, Accra",
      schedules: [
        { dep: "07:00 AM", arr: "10:15 AM", operator: "Capital Morning Cruiser", bus: "Scania Irizar i6", amenities: ["AC", "Wi-Fi", "USB Charging"], seats: 9, fareMod: 1.0 },
        { dep: "11:30 AM", arr: "02:45 PM", operator: "Heritage Express", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "USB Charging"], seats: 14, fareMod: 0.95 },
        { dep: "03:30 PM", arr: "06:45 PM", operator: "RouteWise Coastliner", bus: "Volvo 9700 Luxury", amenities: ["AC", "Wi-Fi", "Recliner"], seats: 6, fareMod: 1.05 }
      ]
    },
    "Accra-Takoradi": {
      duration: "4h 00m",
      distance: "220 km",
      baseFare: 115,
      originTerminal: "Circle VIP Interchange, Accra",
      destTerminal: "Market Circle Terminal, Takoradi",
      schedules: [
        { dep: "06:00 AM", arr: "10:00 AM", operator: "Oil City Executive", bus: "Volvo 9700 Luxury", amenities: ["AC", "Wi-Fi", "USB Charging", "Recliner"], seats: 10, fareMod: 1.0 },
        { dep: "10:00 AM", arr: "02:00 PM", operator: "Western Corridor VIP", bus: "Scania Irizar i6", amenities: ["AC", "Wi-Fi", "Bottled Water"], seats: 6, fareMod: 1.04 },
        { dep: "02:30 PM", arr: "06:30 PM", operator: "RouteWise West Express", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "USB Charging"], seats: 16, fareMod: 0.96 },
        { dep: "05:00 PM", arr: "09:00 PM", operator: "Twin City Twilight", bus: "Volvo B11R Premier", amenities: ["AC", "Wi-Fi", "Snack Pack"], seats: 5, fareMod: 1.12 }
      ]
    },
    "Takoradi-Accra": {
      duration: "4h 00m",
      distance: "220 km",
      baseFare: 115,
      originTerminal: "Market Circle Terminal, Takoradi",
      destTerminal: "Circle VIP Interchange, Accra",
      schedules: [
        { dep: "06:30 AM", arr: "10:30 AM", operator: "Capital Link Western", bus: "Volvo 9700 Luxury", amenities: ["AC", "Wi-Fi", "USB Charging"], seats: 8, fareMod: 1.0 },
        { dep: "12:00 PM", arr: "04:00 PM", operator: "RouteWise West Express", bus: "Scania Irizar i6", amenities: ["AC", "USB Charging"], seats: 12, fareMod: 0.98 },
        { dep: "04:30 PM", arr: "08:30 PM", operator: "Oil City Executive", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "Wi-Fi", "Recliner"], seats: 7, fareMod: 1.08 }
      ]
    },
    "Accra-Tamale": {
      duration: "11h 00m",
      distance: "610 km",
      baseFare: 260,
      originTerminal: "Circle VIP North Station, Accra",
      destTerminal: "Central Lorry Park, Tamale",
      schedules: [
        { dep: "05:30 AM", arr: "04:30 PM", operator: "Savannah Sunrise Express", bus: "Scania Marcopolo Sleeper", amenities: ["AC", "Wi-Fi", "Meal Rest Stop", "Recliner"], seats: 5, fareMod: 1.0 },
        { dep: "04:00 PM", arr: "03:00 AM (+1)", operator: "Northern Star Nightliner", bus: "Volvo 9700 Semi-Sleeper", amenities: ["AC", "Wi-Fi", "USB Charging", "Blanket"], seats: 11, fareMod: 1.08 },
        { dep: "06:30 PM", arr: "05:30 AM (+1)", operator: "RouteWise Royal Sleeper", bus: "Scania Irizar PB Luxury", amenities: ["AC", "Full Reclining Beds", "Snack Box"], seats: 4, fareMod: 1.2 }
      ]
    },
    "Tamale-Accra": {
      duration: "11h 00m",
      distance: "610 km",
      baseFare: 260,
      originTerminal: "Central Lorry Park, Tamale",
      destTerminal: "Circle VIP North Station, Accra",
      schedules: [
        { dep: "06:00 AM", arr: "05:00 PM", operator: "Capital South Voyager", bus: "Scania Marcopolo Sleeper", amenities: ["AC", "Wi-Fi", "Meal Rest Stop"], seats: 9, fareMod: 1.0 },
        { dep: "05:00 PM", arr: "04:00 AM (+1)", operator: "RouteWise Royal Sleeper", bus: "Volvo 9700 Semi-Sleeper", amenities: ["AC", "Wi-Fi", "Blanket"], seats: 7, fareMod: 1.15 }
      ]
    }
  };

  // Dedicated Ghana Tourist Adventures & Outdooring Database
  const TOURIST_DATA = {
    "Kakum National Park & Canopy Walk": {
      title: "Kakum Canopy Walk & Brenu Beach Party",
      duration: "Full-Day Adventure",
      baseFare: 220,
      originTerminal: "Accra Mall / Circle VIP Terminal",
      destTerminal: "Kakum National Park & Brenu Beach Resort",
      perks: "7-bridge Canopy Walk pass, beach volley & games, jollof lunch & bus DJ",
      schedules: [
        { dep: "06:00 AM", arr: "09:30 AM", operator: "RouteWise Adventure Coach", bus: "Scania Irizar Luxury", amenities: ["AC", "Wi-Fi", "Canopy Pass", "Beach Bonfire"], seats: 8, fareMod: 1.0 },
        { dep: "07:30 AM", arr: "11:00 AM", operator: "Coast & Canopy Fun Liner", bus: "Volvo 9700 Luxury", amenities: ["AC", "Tour Guide", "Lunch Box", "Beach Games"], seats: 14, fareMod: 1.0 }
      ]
    },
    "Boti Waterfalls & Umbrella Rock": {
      title: "Boti Falls, Umbrella Rock & Forest Hike",
      duration: "1-Day Fun Outdooring",
      baseFare: 180,
      originTerminal: "Accra Circle Terminal / Tema Comm 1",
      destTerminal: "Boti Falls Nature Reserve, Yilo Krobo",
      perks: "Waterfall entry pass, guided Umbrella Rock hike, 3-headed palm tree & picnic lunch",
      schedules: [
        { dep: "06:30 AM", arr: "09:00 AM", operator: "RouteWise Waterfall Express", bus: "Scania Explorer", amenities: ["AC", "Hike Guide", "Twin Falls Dip", "Board Games"], seats: 12, fareMod: 1.0 },
        { dep: "08:00 AM", arr: "10:30 AM", operator: "Krobo Eco-Adventure VIP", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "Wi-Fi", "Snack Pack", "Picnic Setup"], seats: 9, fareMod: 1.0 }
      ]
    },
    "Wli Waterfalls & Mount Afadjato": {
      title: "Wli Waterfalls & Mount Afadjato Summit",
      duration: "2-Day Weekend Getaway",
      baseFare: 480,
      originTerminal: "Accra Central Station / Tetteh Quarshie",
      destTerminal: "Wli Eco-Lodge, Volta Region",
      perks: "West Africa's tallest falls swim, mountain summit guide, lodge stay, BBQ & campfire",
      schedules: [
        { dep: "06:00 AM", arr: "11:30 AM", operator: "Volta Explorer Weekend Coach", bus: "Volvo B11R Premier", amenities: ["AC", "Lodge Stay", "Campfire BBQ", "Afadjato Guide"], seats: 10, fareMod: 1.0 }
      ]
    },
    "Lake Volta Cruise & Akosombo Dam": {
      title: "Lake Volta Boat Cruise & Akosombo Chill",
      duration: "Sunday Fun Cruise",
      baseFare: 290,
      originTerminal: "Accra Mall Terminal",
      destTerminal: "Akosombo Hydro Dam & Lake Basin",
      perks: "2-hour boat cruise, poolside resort buffet, live DJ karaoke, dam viewpoint",
      schedules: [
        { dep: "07:30 AM", arr: "09:45 AM", operator: "Dodi Island Luxury Cruiser", bus: "Scania Irizar i6", amenities: ["AC", "Boat Ticket", "Buffet Lunch", "Live DJ"], seats: 15, fareMod: 1.0 }
      ]
    },
    "Mole National Park Wildlife Safari": {
      title: "Mole Safari & Larabanga Eco-Expedition",
      duration: "3-Day Wildlife Safari",
      baseFare: 850,
      originTerminal: "Circle North Station / Kumasi Asafo",
      destTerminal: "Mole National Park Motel & Safari Ridge",
      perks: "Wild elephant walking safari, 4x4 Jeep game drive, 2 nights chalet, Larabanga mosque",
      schedules: [
        { dep: "05:00 AM", arr: "04:30 PM", operator: "Savannah Safari Sleeper", bus: "Scania Marcopolo Sleeper", amenities: ["AC", "Park Chalet", "Jeep Safari", "Park Ranger"], seats: 6, fareMod: 1.0 }
      ]
    },
    "Shai Hills Wildlife Reserve & Caves": {
      title: "Shai Hills Wildlife Reserve & Cave Exploration",
      duration: "Half-Day Express Outdooring",
      baseFare: 160,
      originTerminal: "Accra Shopping Mall / 37 Military Station",
      destTerminal: "Shai Hills Forest Reserve Gate",
      perks: "Baboon & zebra safari drive, ancestral cave hike, archery, bush BBQ lunch",
      schedules: [
        { dep: "07:30 AM", arr: "08:45 AM", operator: "Shai Safari Shuttle", bus: "Toyota Coaster VIP", amenities: ["AC", "Park Ranger", "Cave Climb", "Bush BBQ"], seats: 18, fareMod: 1.0 },
        { dep: "10:30 AM", arr: "11:45 AM", operator: "Shai Safari Shuttle", bus: "Toyota Coaster VIP", amenities: ["AC", "Archery", "Baboon Sighting", "Snack Pack"], seats: 12, fareMod: 1.0 }
      ]
    }
  };

  // State object managing active query, mode, and selected booking
  const appState = {
    mode: "intercity", // "intercity" or "tourist"
    origin: "Accra",
    destination: "Kumasi",
    travelDate: getFormattedDate(new Date()),
    passengerCount: 1,
    timeFilter: "all",
    tourCategory: "all",
    currentTrips: [],
    selectedTrip: null
  };

  /* ==========================================================================
     2. DOM Element Selectors
     ========================================================================== */

  // Mode tabs
  const tabIntercity = document.getElementById("tabIntercity");
  const tabTourist = document.getElementById("tabTourist");
  const searchDescText = document.getElementById("searchDescText");
  const destinationLabel = document.getElementById("destinationLabel");

  // Search & Filters
  const searchForm = document.getElementById("tripSearchForm");
  const departureSelect = document.getElementById("departureCity");
  const destinationSelect = document.getElementById("destinationCity");
  const travelDateInput = document.getElementById("travelDate");
  const passengerSelect = document.getElementById("passengerCount");
  const swapCitiesBtn = document.getElementById("swapCitiesBtn");
  const searchErrorNotice = document.getElementById("searchErrorNotice");

  // Results elements
  const resultsSectionTag = document.getElementById("resultsSectionTag");
  const resultsHeading = document.getElementById("resultsHeading");
  const resultsSubtext = document.getElementById("resultsSubtext");
  const activePassengerCountBadge = document.getElementById("activePassengerCountBadge");
  const tripsContainer = document.getElementById("tripsContainer");
  const tripsCountText = document.getElementById("tripsCountText");
  const noTripsState = document.getElementById("noTripsState");
  const resetSearchBtn = document.getElementById("resetSearchBtn");
  const filterPills = document.querySelectorAll(".filter-pill");

  // Tourist section filter pills & cards
  const tourFilterPills = document.querySelectorAll(".tour-filter-pill");
  const tourCards = document.querySelectorAll(".tour-card");
  const bookTourBtns = document.querySelectorAll(".book-tour-btn");

  // Quick route cards & footer links
  const quickRouteBtns = document.querySelectorAll(".quick-route-btn");
  const footerTourLinks = document.querySelectorAll(".footer-tour-link");

  // Modal elements
  const modalBackdrop = document.getElementById("bookingModalBackdrop");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelBookingBtn = document.getElementById("cancelBookingBtn");
  const doneBookingBtn = document.getElementById("doneBookingBtn");
  const printTicketBtn = document.getElementById("printTicketBtn");
  const modalStepForm = document.getElementById("modalStepForm");
  const modalStepConfirmation = document.getElementById("modalStepConfirmation");
  const passengerBookingForm = document.getElementById("passengerBookingForm");
  const confirmBookingBtn = document.getElementById("confirmBookingBtn");

  // Modal summary elements
  const modalTag = document.getElementById("modalTag");
  const modalTripTitle = document.getElementById("modalTripTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const summaryOriginLabel = document.getElementById("summaryOriginLabel");
  const summaryDestLabel = document.getElementById("summaryDestLabel");
  const summaryOrigin = document.getElementById("summaryOrigin");
  const summaryDestination = document.getElementById("summaryDestination");
  const summaryDepartureTime = document.getElementById("summaryDepartureTime");
  const summaryArrivalTime = document.getElementById("summaryArrivalTime");
  const summaryDuration = document.getElementById("summaryDuration");
  const summaryBusType = document.getElementById("summaryBusType");
  const summaryDate = document.getElementById("summaryDate");
  const summaryPassengers = document.getElementById("summaryPassengers");
  const summaryRate = document.getElementById("summaryRate");
  const summaryTotalFare = document.getElementById("summaryTotalFare");
  const adventurePerksBox = document.getElementById("adventurePerksBox");
  const tourPerkText = document.getElementById("tourPerkText");

  // E-ticket voucher tags
  const ticketTypeBadge = document.getElementById("ticketTypeBadge");
  const ticketRefCode = document.getElementById("ticketRefCode");
  const ticketOrigin = document.getElementById("ticketOrigin");
  const ticketDestination = document.getElementById("ticketDestination");
  const ticketDepTime = document.getElementById("ticketDepTime");
  const ticketArrTime = document.getElementById("ticketArrTime");
  const ticketBusClass = document.getElementById("ticketBusClass");
  const ticketDuration = document.getElementById("ticketDuration");
  const ticketPassengerName = document.getElementById("ticketPassengerName");
  const ticketPhone = document.getElementById("ticketPhone");
  const ticketDate = document.getElementById("ticketDate");
  const ticketPassengers = document.getElementById("ticketPassengers");
  const ticketSeat = document.getElementById("ticketSeat");
  const ticketTotalAmount = document.getElementById("ticketTotalAmount");
  const ticketBarcodeText = document.getElementById("ticketBarcodeText");
  const stampStatus = document.getElementById("stampStatus");

  // Mobile navigation
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");
  const drawerLinks = document.querySelectorAll(".drawer-link, .drawer-cta");

  // Top demo banner
  const demoBanner = document.getElementById("demoBanner");
  const dismissDemoBanner = document.getElementById("dismissDemoBanner");

  // Contact form
  const contactForm = document.getElementById("contactForm");
  const contactSuccessMsg = document.getElementById("contactSuccessMsg");

  /* ==========================================================================
     3. Helper & Formatting Functions
     ========================================================================== */

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getReadableDate(dateString) {
    if (!dateString) return "Today";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    const dateObj = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
    return dateObj.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function formatCurrency(amount) {
    return `GH₵ ${Math.round(amount).toLocaleString()}`;
  }

  function generateBookingReference(prefix = "RWT") {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let randomPart = "";
    for (let i = 0; i < 5; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const year = new Date().getFullYear();
    return `${prefix}-GH-${year}-${randomPart}`;
  }

  function allocateSeatOrPackage(preference, isTour = false) {
    if (isTour) {
      return `Tour Package #${Math.floor(Math.random() * 80) + 10} (${preference})`;
    }
    const seatNum = Math.floor(Math.random() * 28) + 1;
    const letter = preference.includes("Window") ? (Math.random() > 0.5 ? "A" : "D") : (Math.random() > 0.5 ? "B" : "C");
    return `Seat ${seatNum}${letter} (${preference})`;
  }

  /* ==========================================================================
     4. Mode Switcher (Intercity vs Ghana Tourist Outdooring)
     ========================================================================== */

  const INTERCITY_DESTINATIONS = [
    { value: "Kumasi", label: "Kumasi (Asafo / Kejetia)" },
    { value: "Accra", label: "Accra (Circle VIP / Kaneshie)" },
    { value: "Cape Coast", label: "Cape Coast (Pedu Junction)" },
    { value: "Takoradi", label: "Takoradi (Market Circle)" },
    { value: "Tamale", label: "Tamale (Central Lorry Park)" },
    { value: "Sunyani", label: "Sunyani (Main Station)" },
    { value: "Ho", label: "Ho (Central Terminal)" },
    { value: "Koforidua", label: "Koforidua (Main Station)" }
  ];

  const TOURIST_DESTINATIONS = [
    { value: "Kakum National Park & Canopy Walk", label: "Kakum National Park & Canopy Walk (Central Region)" },
    { value: "Boti Waterfalls & Umbrella Rock", label: "Boti Waterfalls & Umbrella Rock (Eastern Region)" },
    { value: "Wli Waterfalls & Mount Afadjato", label: "Wli Waterfalls & Mt. Afadjato (Volta Region)" },
    { value: "Lake Volta Cruise & Akosombo Dam", label: "Lake Volta Boat Cruise & Akosombo (Eastern Region)" },
    { value: "Mole National Park Wildlife Safari", label: "Mole National Park Wildlife Safari (Savannah Region)" },
    { value: "Shai Hills Wildlife Reserve & Caves", label: "Shai Hills Wildlife Reserve & Caves (Greater Accra)" }
  ];

  function setMode(mode) {
    appState.mode = mode;

    if (mode === "intercity") {
      tabIntercity.classList.add("active");
      tabTourist.classList.remove("active");
      tabIntercity.setAttribute("aria-selected", "true");
      tabTourist.setAttribute("aria-selected", "false");

      searchDescText.textContent = "Select your departure point, destination, date, and passenger count";
      destinationLabel.innerHTML = `<span class="label-icon">🏁</span> Destination City`;

      // Populate intercity options
      destinationSelect.innerHTML = `<option value="" disabled>Select destination</option>`;
      INTERCITY_DESTINATIONS.forEach(dest => {
        const opt = document.createElement("option");
        opt.value = dest.value;
        opt.textContent = dest.label;
        if (dest.value === "Kumasi") opt.selected = true;
        destinationSelect.appendChild(opt);
      });

      appState.origin = departureSelect.value || "Accra";
      appState.destination = "Kumasi";
      swapCitiesBtn.style.opacity = "1";
      swapCitiesBtn.style.pointerEvents = "auto";
    } else {
      tabTourist.classList.add("active");
      tabIntercity.classList.remove("active");
      tabTourist.setAttribute("aria-selected", "true");
      tabIntercity.setAttribute("aria-selected", "false");

      searchDescText.textContent = "Choose your departure point, famous Ghana tourist site, date, and traveler group size";
      destinationLabel.innerHTML = `<span class="label-icon">🌴</span> Ghana Tourist Attraction`;

      // Populate tourist attraction options
      destinationSelect.innerHTML = `<option value="" disabled>Select tourist attraction</option>`;
      TOURIST_DESTINATIONS.forEach(tour => {
        const opt = document.createElement("option");
        opt.value = tour.value;
        opt.textContent = tour.label;
        if (tour.value === "Kakum National Park & Canopy Walk") opt.selected = true;
        destinationSelect.appendChild(opt);
      });

      appState.origin = departureSelect.value || "Accra";
      appState.destination = "Kakum National Park & Canopy Walk";
      swapCitiesBtn.style.opacity = "0.5";
      swapCitiesBtn.style.pointerEvents = "none";
    }

    renderTrips();
  }

  tabIntercity.addEventListener("click", () => setMode("intercity"));
  tabTourist.addEventListener("click", () => setMode("tourist"));

  /* ==========================================================================
     5. Trip Generation & Search Handling
     ========================================================================== */

  function getTripsForRoute(origin, destination, mode = "intercity") {
    // If tourist mode, fetch from TOURIST_DATA
    if (mode === "tourist") {
      if (TOURIST_DATA[destination]) {
        return {
          ...TOURIST_DATA[destination],
          isTour: true
        };
      }
      // Fallback tourist itinerary
      return {
        title: `${destination} Adventure Tour`,
        duration: "Full-Day Outdooring",
        baseFare: 200,
        originTerminal: `${origin} Tour Assembly Point`,
        destTerminal: `${destination} Nature Reserve`,
        perks: "All park fees, certified nature guide, group outdooring games & picnic",
        isTour: true,
        schedules: [
          { dep: "06:30 AM", arr: "09:45 AM", operator: "RouteWise Adventure Cruiser", bus: "Scania Irizar Luxury", amenities: ["AC", "Wi-Fi", "Tour Guide", "Lunch Box"], seats: 12, fareMod: 1.0 }
        ]
      };
    }

    // Intercity Mode
    const routeKey = `${origin}-${destination}`;
    if (ROUTE_DATA[routeKey]) {
      return {
        ...ROUTE_DATA[routeKey],
        isTour: false
      };
    }

    // Fallback intercity route
    return {
      duration: "5h 15m",
      distance: "285 km",
      baseFare: 150,
      originTerminal: `${origin} Main Intercity Terminal`,
      destTerminal: `${destination} Central Station`,
      isTour: false,
      schedules: [
        { dep: "06:30 AM", arr: "11:45 AM", operator: "RouteWise Regional Link", bus: "Scania Irizar i6", amenities: ["AC", "Wi-Fi", "USB Charging"], seats: 10, fareMod: 1.0 },
        { dep: "10:00 AM", arr: "03:15 PM", operator: "Cross-Country Express", bus: "Volvo 9700 Luxury", amenities: ["AC", "Recliner", "Bottled Water"], seats: 7, fareMod: 1.05 },
        { dep: "02:30 PM", arr: "07:45 PM", operator: "RouteWise Standard VIP", bus: "Mercedes-Benz Tourismo", amenities: ["AC", "USB Charging"], seats: 14, fareMod: 0.98 },
        { dep: "05:00 PM", arr: "10:15 PM", operator: "Ghana Intercity Direct", bus: "Scania Touring", amenities: ["AC", "Wi-Fi"], seats: 5, fareMod: 1.1 }
      ]
    };
  }

  function filterTripsByTime(trips, filter) {
    if (filter === "all") return trips;

    return trips.filter(trip => {
      const isPM = trip.dep.includes("PM");
      let [hourStr] = trip.dep.split(":");
      let hour = parseInt(hourStr, 10);
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;

      if (filter === "morning") return hour >= 5 && hour < 12;
      if (filter === "afternoon") return hour >= 12 && hour < 17;
      if (filter === "evening") return hour >= 17;
      return true;
    });
  }

  function renderTrips() {
    const route = getTripsForRoute(appState.origin, appState.destination, appState.mode);
    const trips = route.schedules || [];
    const filteredTrips = filterTripsByTime(trips, appState.timeFilter);

    if (appState.mode === "tourist") {
      resultsSectionTag.textContent = "Tourist Adventure Results";
      resultsHeading.textContent = `Exciting Tour: ${appState.origin} to ${appState.destination}`;
      resultsSubtext.textContent = `All-inclusive outdooring package for ${getReadableDate(appState.travelDate)}. Calculated for ${appState.passengerCount} traveler${appState.passengerCount > 1 ? "s" : ""}.`;
    } else {
      resultsSectionTag.textContent = "Intercity Schedules";
      resultsHeading.textContent = `Available Trips: ${appState.origin} to ${appState.destination}`;
      resultsSubtext.textContent = `Showing scheduled coach departures for ${getReadableDate(appState.travelDate)}. Fares calculated for ${appState.passengerCount} traveler${appState.passengerCount > 1 ? "s" : ""}.`;
    }

    activePassengerCountBadge.textContent = `${appState.passengerCount} Person${appState.passengerCount > 1 ? "s" : ""}`;
    tripsCountText.textContent = `Found ${filteredTrips.length} departure${filteredTrips.length === 1 ? "" : "s"}`;

    if (filteredTrips.length === 0) {
      tripsContainer.innerHTML = "";
      noTripsState.classList.remove("hidden");
      return;
    }

    noTripsState.classList.add("hidden");
    tripsContainer.innerHTML = "";

    filteredTrips.forEach((trip, index) => {
      const perPersonFare = Math.round(route.baseFare * trip.fareMod);
      const totalFare = perPersonFare * appState.passengerCount;

      const card = document.createElement("article");
      card.className = "trip-card";
      card.setAttribute("data-trip-index", index);

      const amenitiesHtml = trip.amenities
        .map(amenity => `<span class="amenity-pill">${amenity}</span>`)
        .join("");

      const isLowSeats = trip.seats <= 5;
      const seatStatusClass = isLowSeats ? "seat-status seat-status-low" : "seat-status";
      const seatStatusText = isLowSeats ? `Only ${trip.seats} slots remaining!` : `${trip.seats} slots available`;

      const typeTag = route.isTour 
        ? `<span class="trip-bus-tag tour-pill-tag">🌴 Outdooring Tour Package</span>` 
        : `<span class="trip-bus-tag">Executive Coach</span>`;

      const ctaLabel = route.isTour ? "Book Adventure Pass" : "Book Ticket";

      card.innerHTML = `
        <!-- Column 1: Operator & Coach Model -->
        <div class="trip-col-operator">
          ${typeTag}
          <h3 class="trip-operator-name">${trip.operator}</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted);">${trip.bus}</p>
          <div class="trip-amenities-tags">
            ${amenitiesHtml}
          </div>
        </div>

        <!-- Column 2: Schedule & Station Track -->
        <div class="trip-col-schedule">
          <div class="schedule-point">
            <span class="point-time">${trip.dep}</span>
            <span class="point-terminal">${route.originTerminal}</span>
          </div>

          <div class="schedule-track">
            <span class="track-duration">${route.duration}</span>
            <div class="track-line-wrapper">
              <span class="track-dot start"></span>
              <div class="track-line"></div>
              <span class="track-dot end"></span>
            </div>
            <span class="track-stop-note">${route.isTour ? "Full Guided Tour Included" : "Direct Express (" + (route.distance || "Direct") + ")"}</span>
          </div>

          <div class="schedule-point" style="text-align: right;">
            <span class="point-time">${trip.arr}</span>
            <span class="point-terminal">${route.destTerminal}</span>
          </div>
        </div>

        <!-- Column 3: Fares & Booking CTA -->
        <div class="trip-col-action">
          <div class="price-box">
            <div class="unit-rate-text">${formatCurrency(perPersonFare)} / person</div>
            <div class="total-fare-text">${formatCurrency(totalFare)} <small>total (${appState.passengerCount}p)</small></div>
          </div>
          <div class="${seatStatusClass}">
            <span class="seat-dot"></span>
            <span>${seatStatusText}</span>
          </div>
          <button type="button" class="btn btn-gold btn-book-ticket" data-trip-id="${index}">
            ${ctaLabel}
          </button>
        </div>
      `;

      const bookBtn = card.querySelector(".btn-book-ticket");
      bookBtn.addEventListener("click", () => {
        openBookingModal({
          ...trip,
          isTour: route.isTour,
          title: route.title || `${appState.origin} to ${appState.destination}`,
          origin: appState.origin,
          destination: appState.destination,
          originTerminal: route.originTerminal,
          destTerminal: route.destTerminal,
          duration: route.duration,
          perks: route.perks || "All-inclusive road transport, certified driver and verified safety standards",
          perPersonFare: perPersonFare,
          totalFare: totalFare,
          date: appState.travelDate,
          passengerCount: appState.passengerCount
        });
      });

      tripsContainer.appendChild(card);
    });
  }

  function handleSearchSubmit(event) {
    if (event) event.preventDefault();

    const origin = departureSelect.value;
    const dest = destinationSelect.value;
    const dateVal = travelDateInput.value;
    const passengers = parseInt(passengerSelect.value, 10) || 1;

    searchErrorNotice.classList.add("hidden");
    searchErrorNotice.textContent = "";

    // Origin and Destination cannot be identical in intercity mode
    if (appState.mode === "intercity" && origin === dest) {
      searchErrorNotice.textContent = "Departure and destination cities cannot be the same. Please choose different cities.";
      searchErrorNotice.classList.remove("hidden");
      destinationSelect.focus();
      return;
    }

    if (!dateVal) {
      searchErrorNotice.textContent = "Please select a valid travel date.";
      searchErrorNotice.classList.remove("hidden");
      travelDateInput.focus();
      return;
    }

    appState.origin = origin;
    appState.destination = dest;
    appState.travelDate = dateVal;
    appState.passengerCount = passengers;

    renderTrips();

    const resultsSection = document.getElementById("trips-results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleSwapCities() {
    if (appState.mode === "tourist") return;

    const currentOrigin = departureSelect.value;
    const currentDest = destinationSelect.value;

    departureSelect.value = currentDest;
    destinationSelect.value = currentOrigin;

    const icon = swapCitiesBtn.querySelector(".swap-icon");
    if (icon) {
      icon.style.transform = "rotate(180deg)";
      setTimeout(() => {
        icon.style.transform = "";
      }, 300);
    }
  }

  /* ==========================================================================
     6. Adventure & Tourist Section Filtering
     ========================================================================== */

  tourFilterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      tourFilterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const category = pill.dataset.category;

      tourCards.forEach(card => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Direct "Book This Adventure" buttons on tourist tour cards
  bookTourBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tourTitle = btn.dataset.tourTitle;
      const tourPrice = parseInt(btn.dataset.tourPrice, 10);
      const origin = btn.dataset.origin;
      const destination = btn.dataset.destination;
      const travelers = parseInt(passengerSelect.value, 10) || 1;

      // Find matching tourist data
      let tourDetails = null;
      for (const [key, val] of Object.entries(TOURIST_DATA)) {
        if (val.title === tourTitle || key.includes(destination)) {
          tourDetails = val;
          break;
        }
      }

      const perks = tourDetails ? tourDetails.perks : "Canopy Walk & National Park Pass, Beach Outdooring & Jollof Lunch";
      const totalFare = tourPrice * travelers;

      openBookingModal({
        isTour: true,
        title: tourTitle,
        origin: origin,
        destination: destination,
        dep: "06:30 AM",
        arr: "09:45 AM",
        operator: "RouteWise Adventure Tours VIP",
        bus: "Scania Irizar Luxury Coach",
        duration: tourDetails ? tourDetails.duration : "Full-Day Outdooring",
        perks: perks,
        perPersonFare: tourPrice,
        totalFare: totalFare,
        date: appState.travelDate,
        passengerCount: travelers
      });
    });
  });

  /* ==========================================================================
     7. Booking Modal & E-Ticket / Tour Pass Generator
     ========================================================================== */

  function openBookingModal(tripInfo) {
    appState.selectedTrip = tripInfo;

    // Adjust modal labels depending on whether it's an Adventure Tour or Intercity Trip
    if (tripInfo.isTour) {
      modalTag.textContent = "🌴 Tourist Adventure Reservation";
      modalTripTitle.textContent = tripInfo.title;
      modalSubtitle.textContent = "Fill in your details below to generate your official demo Adventure Tour Pass.";
      summaryOriginLabel.textContent = "Departure Assembly";
      summaryDestLabel.textContent = "Tourist Attraction";
      adventurePerksBox.classList.remove("hidden");
      tourPerkText.textContent = tripInfo.perks;
      confirmBookingBtn.textContent = "Confirm & Generate Tour Pass";
    } else {
      modalTag.textContent = "Complete Your Reservation";
      modalTripTitle.textContent = "Book Your Ticket";
      modalSubtitle.textContent = "Review trip details and provide passenger information to generate your demo ticket.";
      summaryOriginLabel.textContent = "Departure Point";
      summaryDestLabel.textContent = "Destination";
      adventurePerksBox.classList.add("hidden");
      confirmBookingBtn.textContent = "Confirm & Generate E-Ticket";
    }

    summaryOrigin.textContent = tripInfo.origin;
    summaryDestination.textContent = tripInfo.destination;
    summaryDepartureTime.textContent = tripInfo.dep;
    summaryArrivalTime.textContent = tripInfo.arr;
    summaryDuration.textContent = tripInfo.duration;
    summaryBusType.textContent = `${tripInfo.operator} (${tripInfo.bus})`;
    summaryDate.textContent = getReadableDate(tripInfo.date);
    summaryPassengers.textContent = `${tripInfo.passengerCount} Person${tripInfo.passengerCount > 1 ? "s" : ""}`;
    summaryRate.textContent = formatCurrency(tripInfo.perPersonFare);
    summaryTotalFare.textContent = formatCurrency(tripInfo.totalFare);

    passengerBookingForm.reset();
    clearValidationErrors();
    modalStepForm.classList.remove("hidden");
    modalStepConfirmation.classList.add("hidden");

    modalBackdrop.classList.add("active");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const nameInput = document.getElementById("passengerName");
    if (nameInput) setTimeout(() => nameInput.focus(), 150);
  }

  function closeBookingModal() {
    modalBackdrop.classList.remove("active");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    appState.selectedTrip = null;
  }

  function clearValidationErrors() {
    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("emailError").textContent = "";

    document.getElementById("nameError").classList.remove("visible");
    document.getElementById("phoneError").classList.remove("visible");
    document.getElementById("emailError").classList.remove("visible");
  }

  function handleBookingSubmit(event) {
    event.preventDefault();
    clearValidationErrors();

    const nameInput = document.getElementById("passengerName");
    const phoneInput = document.getElementById("passengerPhone");
    const emailInput = document.getElementById("passengerEmail");
    const seatPref = document.getElementById("seatPreference").value;
    const mealPref = document.getElementById("mealPreference").value;

    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const emailVal = emailInput.value.trim();

    let isValid = true;

    if (nameVal.length < 3) {
      document.getElementById("nameError").textContent = "Please enter your full name (minimum 3 characters).";
      document.getElementById("nameError").classList.add("visible");
      nameInput.focus();
      isValid = false;
    }

    const phonePattern = /^(\+?233|0)[235]\d{8}$/;
    const sanitizedPhone = phoneVal.replace(/[\s-]/g, "");
    if (!phonePattern.test(sanitizedPhone)) {
      document.getElementById("phoneError").textContent = "Please enter a valid Ghana phone number (e.g. 0241234567 or +233241234567).";
      document.getElementById("phoneError").classList.add("visible");
      if (isValid) phoneInput.focus();
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      document.getElementById("emailError").classList.add("visible");
      if (isValid) emailInput.focus();
      isValid = false;
    }

    if (!isValid) return;

    confirmBookingBtn.disabled = true;
    confirmBookingBtn.textContent = "Processing Demo Pass...";

    setTimeout(() => {
      confirmBookingBtn.disabled = false;
      confirmBookingBtn.textContent = appState.selectedTrip.isTour ? "Confirm & Generate Tour Pass" : "Confirm & Generate E-Ticket";

      const prefix = appState.selectedTrip.isTour ? "RWT-TOUR" : "RWT-BUS";
      const referenceNumber = generateBookingReference(prefix);
      const allocatedPackage = allocateSeatOrPackage(seatPref, appState.selectedTrip.isTour);

      ticketRefCode.textContent = referenceNumber;
      ticketOrigin.textContent = appState.selectedTrip.origin;
      ticketDestination.textContent = appState.selectedTrip.destination;
      ticketDepTime.textContent = appState.selectedTrip.dep;
      ticketArrTime.textContent = appState.selectedTrip.arr;
      ticketBusClass.textContent = `${appState.selectedTrip.operator} • ${appState.selectedTrip.bus}`;
      ticketDuration.textContent = appState.selectedTrip.duration;
      ticketPassengerName.textContent = nameVal;
      ticketPhone.textContent = phoneVal;
      ticketDate.textContent = getReadableDate(appState.selectedTrip.date);
      ticketPassengers.textContent = `${appState.selectedTrip.passengerCount} Traveler${appState.selectedTrip.passengerCount > 1 ? "s" : ""}`;
      ticketSeat.textContent = `${allocatedPackage} • Meal: ${mealPref}`;
      ticketTotalAmount.textContent = formatCurrency(appState.selectedTrip.totalFare);
      ticketBarcodeText.textContent = `${referenceNumber.replace(/[^A-Z0-9]/g, "")}-GH`;

      if (appState.selectedTrip.isTour) {
        ticketTypeBadge.textContent = "Official Adventure Tour Pass";
        stampStatus.textContent = "VERIFIED TOUR PASS";
        document.getElementById("confirmTitle").textContent = "Adventure Pass Confirmed!";
      } else {
        ticketTypeBadge.textContent = "Official Demo E-Ticket";
        stampStatus.textContent = "VERIFIED DEMO";
        document.getElementById("confirmTitle").textContent = "Booking Confirmed!";
      }

      modalStepForm.classList.add("hidden");
      modalStepConfirmation.classList.remove("hidden");
      modalStepConfirmation.scrollTop = 0;
    }, 600);
  }

  /* ==========================================================================
     8. Mobile Drawer Navigation & UI Toggles
     ========================================================================== */

  function toggleMobileDrawer(open) {
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains("active");

    if (shouldOpen) {
      mobileDrawer.classList.add("active");
      mobileOverlay.classList.add("active");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      mobileDrawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    } else {
      mobileDrawer.classList.remove("active");
      mobileOverlay.classList.remove("active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileDrawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  /* ==========================================================================
     9. Contact & Tour Inquiry Submission
     ========================================================================== */

  function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMessage");

    let valid = true;

    if (!name.value.trim()) {
      document.getElementById("contactNameError").textContent = "Please enter your name.";
      document.getElementById("contactNameError").classList.add("visible");
      valid = false;
    } else {
      document.getElementById("contactNameError").classList.remove("visible");
    }

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      document.getElementById("contactEmailError").textContent = "Please enter a valid email address.";
      document.getElementById("contactEmailError").classList.add("visible");
      valid = false;
    } else {
      document.getElementById("contactEmailError").classList.remove("visible");
    }

    if (!message.value.trim()) {
      document.getElementById("contactMessageError").textContent = "Please enter your message.";
      document.getElementById("contactMessageError").classList.add("visible");
      valid = false;
    } else {
      document.getElementById("contactMessageError").classList.remove("visible");
    }

    if (!valid) return;

    contactSuccessMsg.classList.remove("hidden");
    contactForm.reset();

    setTimeout(() => {
      contactSuccessMsg.classList.add("hidden");
    }, 6000);
  }

  /* ==========================================================================
     10. Event Listeners Setup
     ========================================================================== */

  searchForm.addEventListener("submit", handleSearchSubmit);
  swapCitiesBtn.addEventListener("click", handleSwapCities);

  passengerSelect.addEventListener("change", () => {
    appState.passengerCount = parseInt(passengerSelect.value, 10) || 1;
    renderTrips();
  });

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", () => {
      setMode("intercity");
      departureSelect.value = "Accra";
      destinationSelect.value = "Kumasi";
      passengerSelect.value = "1";
      appState.timeFilter = "all";
      filterPills.forEach(pill => pill.classList.toggle("active", pill.dataset.timeFilter === "all"));
      handleSearchSubmit();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      appState.timeFilter = pill.dataset.timeFilter;
      renderTrips();
    });
  });

  quickRouteBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const orig = btn.dataset.origin;
      const dest = btn.dataset.destination;
      if (orig && dest) {
        setMode("intercity");
        departureSelect.value = orig;
        destinationSelect.value = dest;
        handleSearchSubmit();
      }
    });
  });

  footerTourLinks.forEach(link => {
    link.addEventListener("click", () => {
      const adventureSection = document.getElementById("adventure-tours");
      if (adventureSection) {
        adventureSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  passengerBookingForm.addEventListener("submit", handleBookingSubmit);
  closeModalBtn.addEventListener("click", closeBookingModal);
  cancelBookingBtn.addEventListener("click", closeBookingModal);
  doneBookingBtn.addEventListener("click", closeBookingModal);

  printTicketBtn.addEventListener("click", () => {
    window.print();
  });

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeBookingModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalBackdrop.classList.contains("active")) {
        closeBookingModal();
      }
      if (mobileDrawer.classList.contains("active")) {
        toggleMobileDrawer(false);
      }
    }
  });

  mobileMenuBtn.addEventListener("click", () => toggleMobileDrawer());
  closeDrawerBtn.addEventListener("click", () => toggleMobileDrawer(false));
  mobileOverlay.addEventListener("click", () => toggleMobileDrawer(false));

  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      toggleMobileDrawer(false);
    });
  });

  if (dismissDemoBanner && demoBanner) {
    dismissDemoBanner.addEventListener("click", () => {
      demoBanner.style.display = "none";
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  /* ==========================================================================
     11. Initial Setup & Launch
     ========================================================================== */

  const today = new Date();
  const todayStr = getFormattedDate(today);
  travelDateInput.min = todayStr;
  travelDateInput.value = todayStr;
  appState.travelDate = todayStr;

  // Initial intercity mode setup
  setMode("intercity");
});
