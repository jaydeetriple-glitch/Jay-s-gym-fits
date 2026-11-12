/**
 * JAY'S GYM FITS - FRONT-END INTERACTION ENGINE
 * Premium Athletic Apparel & Streetwear Closet
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STICKY & BLURRED HEADER ---
    const header = document.querySelector('.header');
    const promoBar = document.querySelector('.promo-bar');
    const promoBarHeight = promoBar ? promoBar.offsetHeight : 40;

    window.addEventListener('scroll', () => {
        if (window.scrollY > promoBarHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. MOBILE MENU DRAWER ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navCenter = document.querySelector('.nav-center');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && navCenter) {
        menuToggle.addEventListener('click', () => {
            navCenter.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = navCenter.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navCenter.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 3. SEARCH OVERLAY ---
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearchBtn = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-overlay-input');

    const openSearch = () => {
        if (!searchOverlay) return;
        searchOverlay.classList.add('active');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 300);
        }
        document.body.style.overflow = 'hidden';
    };

    const closeSearch = () => {
        if (!searchOverlay) return;
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

    // --- 4. SIDE PANELS (ACCOUNT & CART) ---
    const accountBtn = document.getElementById('account-btn');
    const cartBtn = document.getElementById('cart-btn');
    const accountPanel = document.getElementById('account-panel');
    const cartPanel = document.getElementById('cart-panel');
    const siteOverlay = document.querySelector('.site-overlay');
    const closePanelBtns = document.querySelectorAll('.close-panel');

    const openPanel = (panel) => {
        if (!panel) return;
        panel.classList.add('active');
        if (siteOverlay) siteOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeAllPanels = () => {
        if (accountPanel) accountPanel.classList.remove('active');
        if (cartPanel) cartPanel.classList.remove('active');
        if (siteOverlay) siteOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (accountBtn && accountPanel) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPanel(accountPanel);
        });
    }

    if (cartBtn && cartPanel) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPanel(cartPanel);
        });
    }

    closePanelBtns.forEach(btn => btn.addEventListener('click', closeAllPanels));
    if (siteOverlay) siteOverlay.addEventListener('click', closeAllPanels);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchOverlay && searchOverlay.classList.contains('active')) {
                closeSearch();
            } else {
                closeAllPanels();
            }
        }
    });

    // --- 5. WISHLIST TOGGLE ---
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
        });
    });

    // --- 6. QUICK ADD TO BAG INTERACTIVITY ---
    const addToCartBtns = document.querySelectorAll('.add-to-cart-quick');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = btn.textContent;
            btn.textContent = '✓ Added!';
            btn.style.backgroundColor = 'var(--color-volt)';
            btn.style.color = '#000';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                if (cartPanel) openPanel(cartPanel);
            }, 500);
        });
    });

    // --- 7. LAZY LOADING IMAGES ---
    const lazyImages = document.querySelectorAll('.lazy-load');
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    img.setAttribute('src', src);
                    img.classList.remove('lazy-load');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => lazyImageObserver.observe(img));
    }

    // --- 8. SECTION REVEAL ON SCROLL ---
    const revealSections = document.querySelectorAll('.campaign-grid, .product-showcase, .editorial-section');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(24px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            revealObserver.observe(section);
        });
    }

    // --- 9. SHOP PAGE FILTERING & URL PARAMS ---
    const filterCheckboxes = document.querySelectorAll('.filter-option input[name="category"]');
    const shopProducts = document.querySelectorAll('.shop-product-grid .product-card');
    const priceSlider = document.getElementById('price-slider');
    const priceMaxDisplay = document.getElementById('price-max-display');

    const applyFilters = () => {
        if (!shopProducts.length) return;

        const selectedCategories = [];
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedCategories.push(checkbox.value);
            }
        });

        const maxPrice = priceSlider ? parseFloat(priceSlider.value) : Infinity;

        shopProducts.forEach(product => {
            const productCategory = product.dataset.category;
            const productPrice = parseFloat(product.dataset.price) || 0;

            const categoryMatch = (selectedCategories.length === 0 || selectedCategories.includes(productCategory));
            const priceMatch = (productPrice <= maxPrice);

            if (categoryMatch && priceMatch) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    };

    if (filterCheckboxes.length > 0) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    if (priceSlider && priceMaxDisplay) {
        priceSlider.addEventListener('input', () => {
            priceMaxDisplay.textContent = `GH₵ ${parseInt(priceSlider.value, 10).toLocaleString()}`;
            applyFilters();
        });
    }

    // Check URL search parameters (e.g., ?category=pump-covers)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && filterCheckboxes.length > 0) {
        let matched = false;
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.value === categoryParam) {
                checkbox.checked = true;
                matched = true;
            }
        });
        if (matched) {
            applyFilters();
        }
    }
});
