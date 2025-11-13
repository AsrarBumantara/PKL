// Interactive.js - Menambahkan interaktivitas ke website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Interactive.js loaded successfully!');
    
    // 1. Navigation Enhancements
    enhanceNavigation();
    
    // 2. Form Validation
    setupFormValidation();
    
    // 3. FAQ Toggle for About Page
    setupFAQToggle();
    
    // 4. Image Hover Effects
    setupImageEffects();
    
    // 5. Toast Notifications
    setupToastSystem();
    
    // 6. Responsive Navigation
    setupResponsiveNav();
    
    // 7. Dynamic Content for Empty Pages
    enhanceEmptyPages();
    
    // 8. Form Enhancement
    enhanceForms();
});
form.addEventListener('submit', function(e) {
    console.log('Form submitted - isValid:', isValid);
    console.log('Form action:', this.action);
    
    // ... kode validasi lainnya
});
// Navigation Enhancements
function enhanceNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    // Highlight active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'beranda.php') ||
            (linkPage.includes(currentPage.replace('.html', '')) && currentPage !== 'beranda.php')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}
// Form Validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            // Reset previous errors
            inputs.forEach(input => input.classList.remove('error'));
            // Validate required fields
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    showToast('Mohon isi semua field yang diperlukan', 'error');
                    input.classList.add('error');
                    isValid = false;
                    return;
                }
                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        showToast('Format email tidak valid', 'error');
                        input.classList.add('error');
                        isValid = false;
                        return;
                    }
                }
                // Password confirmation (only for register forms)
                if (input.type === 'password' && input.placeholder && input.placeholder.includes('Konfirmasi')) {
                    const password = form.querySelector('input[type="password"]:not([placeholder*="Konfirmasi"])');
                    if (password && input.value !== password.value) {
                        showToast('Password tidak cocok', 'error');
                        input.classList.add('error');
                        isValid = false;
                        return;
                    }
                }
            });
            if (!isValid) {
                e.preventDefault(); // Hanya stop jika tidak valid
            } else {
            // JANGAN panggil e.preventDefault() - biarkan form submit
            // Loading state (optional)
                const button = form.querySelector('button[type="submit"]');
                    if (button) {
                        button.disabled = true;
                        button.textContent = 'Memproses...';
                    }
                // Form akan otomatis submit ke server
            }
        });
    });
}
// FAQ Toggle
function setupFAQToggle() {
    const faqSection = document.querySelector('section[aria-labelledby="faq"]');
    if (faqSection) {
        const faqItems = faqSection.querySelectorAll('p');
        faqItems.forEach(item => {
            if (item.innerHTML.includes('<strong>')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    this.classList.toggle('expanded');
                });
            }
        });
    }
}
// Image Hover Effects
function setupImageEffects() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
// Toast Notification System
function setupToastSystem() {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    document.body.appendChild(toastContainer);
}
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        padding: 12px 20px;
        background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
    `;
    const toastContainer = document.querySelector('.toast-container');
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
// Responsive Navigation
function setupResponsiveNav() {
    const nav = document.querySelector('nav');
    if (nav) {
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #333;
        `;
        nav.parentNode.insertBefore(menuButton, nav);
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        // Check screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
                nav.style.display = 'none';
            } else {
                menuButton.style.display = 'none';
                nav.style.display = 'block';
            }
        }
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    }
}
// Dynamic Content for Empty Pages
function enhanceEmptyPages() {
    const profilePage = document.querySelector('body h1:contains("Belum ada profil")');
    const historyPage = document.querySelector('body h1:contains("Belum ada history")');
    if (profilePage) {
        const profileContent = `
            <div class="profile-content">
                <div class="profile-header">
                    <img src="https://via.placeholder.com/150" alt="Profile Picture" class="profile-pic">
                    <h2>Profil Pengguna</h2>
                </div>
                <div class="profile-info">
                    <p><strong>Nama:</strong> User Name</p>
                    <p><strong>Email:</strong> user@example.com</p>
                    <p><strong>Bergabung:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
                </div>
                <button class="edit-profile">Edit Profil</button>
            </div>
        `;
        profilePage.insertAdjacentHTML('afterend', profileContent);
    }
    if (historyPage) {
        const historyContent = `
            <div class="history-content">
                <h3>Riwayat Aktivitas</h3>
                <ul class="activity-list">
                    <li>Login - ${new Date().toLocaleString('id-ID')}</li>
                    <li>Mengunjungi halaman About - ${new Date(Date.now() - 3600000).toLocaleString('id-ID')}</li>
                    <li>Registrasi akun - ${new Date(Date.now() - 86400000).toLocaleString('id-ID')}</li>
                </ul>
            </div>
        `;
        historyPage.insertAdjacentHTML('afterend', historyContent);
    }
}
// Form Enhancement
function enhanceForms() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3742fa';
            this.style.boxShadow = '0 0 5px rgba(55, 66, 250, 0.3)';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
        // Real-time validation
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}
// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .active {
        background-color: #3742fa !important;
        color: white !important;
        border-radius: 5px;
        padding: 5px 10px;
    }
    .error {
        border-color: #ff4757 !important;
        box-shadow: 0 0 5px rgba(255, 71, 87, 0.3) !important;
    }
    .expanded {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 5px;
        border-left: 4px solid #3742fa;
    }
    @media (max-width: 768px) {
        nav.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
    }
    .profile-content, .history-content {
        margin: 20px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
    }
    .profile-pic {
        border-radius: 50%;
        margin-bottom: 15px;
    }
    .edit-profile {
        background: #3742fa;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 15px;
    }
    .activity-list {
        list-style: none;
        padding: 0;
    }
    .activity-list li {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        background: white;
        margin-bottom: 5px;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);
