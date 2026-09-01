/* ==========================================================================
   Portfolio Master Script - Ahmed Mansour
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------------------------------------
    // 1. أنيميشن الظهور (AOS Library)
    // ----------------------------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // ----------------------------------------------------------------------
    // 2. شريط نسبة التصفح العلوي (Scroll Progress Bar)
    // ----------------------------------------------------------------------
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // ----------------------------------------------------------------------
    // 3. حركة الكتابة والتغيير التلقائي (Typing Effect)
    // ----------------------------------------------------------------------
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const roles = ["Front-End Developer", "UI/UX Specialist", "Data Analyst", "Computer Science Student"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // ----------------------------------------------------------------------
    // 4. الماوس التفاعلي (Custom Glowing Cursor)
    // ----------------------------------------------------------------------
    if (window.innerWidth > 991) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    // ----------------------------------------------------------------------
    // 5. حركة ميل الكروت 3D (Custom JS Tilt)
    // ----------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.card, .skill-card, .cert-card, .profile-img, .profile-img-hero');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // ----------------------------------------------------------------------
    // 6. الهيدر المتغير مع السكرول (Sticky Navbar)
    // ----------------------------------------------------------------------
    const navbar = document.querySelector(".navbar, .custom-navbar");
    if (navbar) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        });
    }

    // ----------------------------------------------------------------------
    // 7. التمرير الناعم للسكشنات (Smooth Scroll)
    // ----------------------------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link, .hero-buttons a, .footer-links a, .nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith("#") && href.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 8. تحديث الرابط النشط بالـ Navbar
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", function () {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    });

    // ----------------------------------------------------------------------
    // 9. عداد الأرقام الإحصائية (Stat Counters)
    // ----------------------------------------------------------------------
    const counters = document.querySelectorAll('.counter');
    let counterStarted = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const step = Math.max(1, target / 40);

            const updateCount = () => {
                count += step;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    window.addEventListener('scroll', () => {
        const counterSec = document.querySelector('.counter');
        if (counterSec && !counterStarted) {
            const pos = counterSec.getBoundingClientRect().top;
            if (pos < window.innerHeight) {
                runCounters();
                counterStarted = true;
            }
        }
    });

    // ----------------------------------------------------------------------
    // 10. نسخ البريد الإلكتروني (Copy to Clipboard)
    // ----------------------------------------------------------------------
    const emailElements = document.querySelectorAll('.copy-email');
    emailElements.forEach(elem => {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', () => {
            const emailText = elem.innerText.trim();
            navigator.clipboard.writeText(emailText).then(() => {
                alert(`تم نسخ الإيميل بنجاح: ${emailText}`);
            });
        });
    });

    // ----------------------------------------------------------------------
    // 11. تحميل الـ CV المباشر (Download Resume)
    // ----------------------------------------------------------------------
    const downloadBtn = document.getElementById("downloadResumeBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const link = document.createElement("a");
            link.href = "Ahmed_Mansour_CV.pdf";
            link.download = "Ahmed_Mansour_FrontEnd_CV.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i> Downloading...';
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
            }, 3000);
        });
    }

    // ----------------------------------------------------------------------
    // 12. معالجة نموذج الاتصال وإرسال إيميل حقيقي عبر EmailJS
    // ----------------------------------------------------------------------
    // تهيئة مكتبة EmailJS بالمفتاح الخاص بك
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // ضع المفتاح العام الخاص بك من EmailJS هنا
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // ضع معرف الخدمة Service ID هنا
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // ضع معرف القالب Template ID هنا

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // جلب مدخلات النموذج
            const inputs = contactForm.querySelectorAll(".custom-input, input, textarea");
            const name = inputs[0] ? inputs[0].value.trim() : "";
            const email = inputs[1] ? inputs[1].value.trim() : "";
            const subject = inputs[2] ? inputs[2].value.trim() : "New Portfolio Contact";
            const message = inputs[3] ? inputs[3].value.trim() : "";

            // التحقق المبدئي
            if (!name || !email || !message) {
                alert("يرجى ملء جميع الحقول المطلوبة (الاسم، البريد، والرسالة)");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Sending...`;

            // في حالة وجود مفاتيح EmailJS مفعلة
            if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: "mousaahmedmansourkaooo@gmail.com"
                };

                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                    .then(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `<i class="fas fa-check-circle me-2"></i> Sent Successfully!`;
                        contactForm.reset();
                        setTimeout(() => {
                            submitBtn.innerHTML = originalBtnText;
                        }, 4000);
                    })
                    .catch((err) => {
                        console.error('EmailJS Error:', err);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i> Failed to send`;
                        setTimeout(() => {
                            submitBtn.innerHTML = originalBtnText;
                        }, 4000);
                    });
            } else {
                // الحل البديل الخارجي (Mailto Fallback) عند عدم إعداد المفاتيح
                setTimeout(() => {
                    const mailtoLink = `mailto:mousaahmedmansourkaooo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                    window.location.href = mailtoLink;
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<i class="fas fa-check-circle me-2"></i> Sent Successfully!`;
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                    }, 3000);
                }, 800);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 13. التبديل بين Dark / Light Mode
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.id = 'theme-toggle-btn';
    themeToggleBtn.className = 'btn btn-sm btn-outline-light rounded-circle position-fixed bottom-0 start-0 m-4 z-3';
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggleBtn);

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    });

    // ----------------------------------------------------------------------
    // 14. فلترة المشاريع الناعمة (Smooth Projects Filter)
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-card-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                projectItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // ----------------------------------------------------------------------
    // 15. أصوات نقرات تفاعلية (Web Audio API Click Sound)
    // ----------------------------------------------------------------------
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playClickSound() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    }

    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .card, .filter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('click', playClickSound);
    });

    // ----------------------------------------------------------------------
    // 16. ربط API GitHub لعرض عدد المستودعات
    // ----------------------------------------------------------------------
    const githubRepoContainer = document.getElementById('github-repos-count');
    if (githubRepoContainer) {
        fetch('https://api.github.com/users/AhmedMansour-29')
            .then(response => response.json())
            .then(data => {
                if (data.public_repos) {
                    githubRepoContainer.innerText = data.public_repos;
                }
            })
            .catch(err => console.log('خطأ في استدعاء GitHub API:', err));
    }

    // ----------------------------------------------------------------------
    // 17. مساعد الشات الذكي (Interactive AI Widget)
    // ----------------------------------------------------------------------
    const chatWidget = document.createElement('div');
    chatWidget.id = 'ai-chat-widget';
    chatWidget.innerHTML = `
        <div id="chat-box" class="card shadow-lg d-none position-fixed bottom-0 end-0 m-4 z-3" style="width: 310px; background: #121826; border: 1px solid #00f2fe; color: #fff; border-radius: 12px;">
            <div class="card-header d-flex justify-content-between align-items-center" style="background: rgba(0,242,254,0.1); border-bottom: 1px solid rgba(0,242,254,0.2);">
                <span class="fw-bold fs-7"><i class="fas fa-robot text-info me-2"></i>مساعد أحمد الذكي</span>
                <button id="close-chat" class="btn-close btn-close-white btn-sm"></button>
            </div>
            <div class="card-body fs-7 p-3" id="chat-messages" style="max-height: 250px; overflow-y: auto;">
                <p class="mb-2">👋 أهلاً بك! كيف يمكنني مساعدتك اليوم؟</p>
                <div class="d-grid gap-2 mt-3" id="chat-options">
                    <button class="btn btn-outline-info btn-sm chat-opt text-start" data-msg="كيف يمكنني التواصل مع أحمد؟">📬 طرق التواصل المباشرة</button>
                    <button class="btn btn-outline-info btn-sm chat-opt text-start" data-msg="ما هي تقنيات أحمد الأساسية؟">💻 المهارات والتقنيات</button>
                    <button class="btn btn-outline-info btn-sm chat-opt text-start" data-msg="هل أحمد متاح للعمل الحر؟">🚀 العمل الحر والخدمات</button>
                </div>
            </div>
        </div>
        <button id="toggle-chat-btn" class="btn btn-info rounded-circle position-fixed bottom-0 end-0 m-4 z-3 shadow-lg" style="width: 52px; height: 52px; border: none;">
            <i class="fas fa-comments fs-5 text-dark"></i>
        </button>
    `;
    document.body.appendChild(chatWidget);

    const toggleBtn = document.getElementById('toggle-chat-btn');
    const chatBox = document.getElementById('chat-box');
    const closeBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');

    toggleBtn.addEventListener('click', () => chatBox.classList.toggle('d-none'));
    closeBtn.addEventListener('click', () => chatBox.classList.add('d-none'));

    document.querySelectorAll('.chat-opt').forEach(opt => {
        opt.addEventListener('click', function() {
            const userMsg = this.getAttribute('data-msg');
            let reply = "";
            if (userMsg.includes("التواصل")) {
                reply = "يمكنك التواصل مع أحمد عبر البريد الإلكتروني أو نموذج الاتصال المباشر بنهاية الصفحة.";
            } else if (userMsg.includes("تقنيات")) {
                reply = "أحمد متمرس في Front-End (HTML5, CSS3, JavaScript ES6+, Bootstrap, Responsive Design) و UI/UX و Data Analysis.";
            } else {
                reply = "نعم، أحمد متاح لبناء واجهات مواقع وإنجاز مشاريع الويب المختلفة!";
            }
            chatMessages.innerHTML += `
                <div class="mt-2 text-end text-info"><strong>أنت:</strong> ${userMsg}</div>
                <div class="mt-1 text-start"><strong>المساعد:</strong> ${reply}</div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });

    // ----------------------------------------------------------------------
    // 🌟 18. زر العودة للأعلى الذكي (Smart Back to Top Button)
    // ----------------------------------------------------------------------
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'btn btn-info position-fixed bottom-0 end-0 m-4 z-2 rounded-circle d-none shadow-lg';
    backToTopBtn.style.cssText = 'width: 45px; height: 45px; margin-bottom: 80px !important; border: none;';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up text-dark"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('d-none');
        } else {
            backToTopBtn.classList.add('d-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});

// ==========================================
// 19. تهيئة VanillaTilt لكارت NTI
// ==========================================
if (typeof VanillaTilt !== 'undefined') {
    const ntiCard = document.querySelector("#certifications .col-lg-12 .cert-card");
    if (ntiCard) {
        VanillaTilt.init(ntiCard, {
            max: 3,
            speed: 1000,
            glare: true,
            "max-glare": 0.1
        });
    }
}


// ======================================================================
// 1. فلترة المشاريع التفاعلية (Projects Filter)
// ======================================================================
const projectsSection = document.querySelector('#projects .container');
const projectsRow = document.querySelector('#projects .row.g-4');

if (projectsSection && projectsRow) {
    const projectFilterContainer = document.createElement('div');
    projectFilterContainer.className = 'd-flex justify-content-center gap-2 mb-4 flex-wrap';
    projectFilterContainer.innerHTML = `
        <button class="btn btn-sm btn-outline-custom filter-btn active" data-filter="all">All Projects</button>
        <button class="btn btn-sm btn-outline-custom filter-btn" data-filter="frontend">Front-End</button>
        <button class="btn btn-sm btn-outline-custom filter-btn" data-filter="uiux">UI/UX & Figma</button>
    `;
    projectsSection.insertBefore(projectFilterContainer, projectsRow);

    const projectCards = projectsRow.querySelectorAll('.col-lg-6');
    projectCards.forEach((card, index) => {
        card.classList.add('project-card-item');
        if (index % 2 === 0) {
            card.classList.add('frontend');
        } else {
            card.classList.add('uiux');
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ======================================================================
// 2. صوت تكة الماوس التقنية (Web Audio Click Sound)
// ======================================================================
function playTechClick() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        // تجاهل لو متصفح المستخدم منع التشغيل التلقائي
    }
}

document.querySelectorAll('.btn, .nav-link').forEach(el => {
    el.addEventListener('click', playTechClick);
});

// ======================================================================
// 3. جلب عدد المشاريع الحقيقي من جيت هب (Live GitHub Stats API)
// ======================================================================
async function fetchGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/users/AhmedMansour-29');
        const data = await response.json();
        
        const repoCountElement = document.querySelector('#github-repos-count');
        if (repoCountElement && data.public_repos) {
            repoCountElement.textContent = data.public_repos;
        }
    } catch (error) {
        console.log("GitHub API fetch error:", error);
    }
}
fetchGitHubStats();

// ======================================================================
// 4. إشعار ترحبي تفاعلي عند فتح الموقع (Welcome Toast)
// ======================================================================
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const toast = document.createElement('div');
        toast.className = 'tech-welcome-toast';
        toast.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span style="font-size: 1.2rem;">⚡</span>
                <div>
                    <strong class="d-block" style="color: #fff; font-size: 0.9rem;">System Online</strong>
                    <span style="color: #aaa; font-size: 0.8rem;">Welcome to my portfolio workspace!</span>
                </div>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }, 1500);
});

// ======================================================================
// 1. صوت تكة الماوس التقنية
// ======================================================================
function playTechClick() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
}

document.querySelectorAll('.btn, .nav-link').forEach(el => {
    el.addEventListener('click', playTechClick);
});

// ======================================================================
// 2. إشعار ترحبي تفاعلي عند فتح الموقع (Welcome Toast)
// ======================================================================
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const toast = document.createElement('div');
        toast.className = 'tech-welcome-toast';
        toast.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span style="font-size: 1.2rem;">⚡</span>
                <div>
                    <strong class="d-block" style="color: #fff; font-size: 0.9rem;">System Online</strong>
                    <span style="color: #aaa; font-size: 0.8rem;">Welcome to my portfolio workspace!</span>
                </div>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }, 1500);
});

// ======================================================================
// 3. زر العودة لأعلى الصفحة (Back to Top Button)
// ======================================================================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '▲';
backToTopBtn.className = 'back-to-top-btn';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======================================================================
// 4. شريط تقدم القراءة (Scroll Progress Bar)
// ======================================================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = progress + '%';
});


document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('#downloadResumeBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = 'cv.pdf';
            link.download = 'ahmed-mansour-cv.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});