// script.js

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------
    // 1. DATA STORE (Computing & Informatics Context)
    // -------------------------------------------------------
    const DATA = {
        skills: [
            { name: "Python & OOP", level: 90, icon: "ri-code-s-slash-line" },
            { name: "HTML & CSS", level: 95, icon: "ri-html5-line" },
            { name: "Networking (Cisco)", level: 80, icon: "ri-router-line" },
            { name: "Database Design (SQL)", level: 85, icon: "ri-database-2-line" },
            { name: "Curriculum Design", level: 90, icon: "ri-book-read-line" }
        ],
        projects: [
            {
                id: 'project-1',
                title: "CBC-Aligned Plan: Python Functions",
                category: "lesson",
                tag: "Lesson Design",
                desc: "Comprehensive lesson plan integrating problem-based learning for 2nd-year Programming students.",
                links: [
                    { text: "Plan Doc", icon: "ri-file-word-line", url: "#" },
                    { text: "Reflection", icon: "ri-quill-pen-line", url: "reflections.html" }
                ]
            },
            {
                id: 'project-2',
                title: "H5P: Network Topologies",
                category: "media",
                tag: "Instructional Media",
                desc: "Interactive branching scenario teaching Star, Bus, and Mesh topologies with quizzes.",
                links: [
                    { text: "Interactive Demo", icon: "ri-play-circle-line", url: "#" }
                ]
            },
            {
                id: 'project-3',
                title: "Auto-Grading Script (Python)",
                category: "assessment",
                tag: "Assessment Tool",
                desc: "A custom Python script utilizing RegEx to automatically grade student SQL queries.",
                links: [
                    { text: "Repository", icon: "ri-github-line", url: "#" }
                ]
            }
        ],
        logs: [
            { day: "Day 1", date: "Monday", title: "Introduction to OOP", desc: "Delivered an introductory lesson on Object-Oriented Programming concepts using Python.", evidence: "#" },
            { day: "Day 2", date: "Tuesday", title: "Networking Lab: Cabling", desc: "Hands-on practical session on Ethernet cabling standards (T568A/B).", evidence: "#" },
            { day: "Day 3", date: "Wednesday", title: "Database Normalization", desc: "Covered 1NF, 2NF, and 3NF. Students worked in groups to normalize data tables.", evidence: "#" }
        ]
    };

    // -------------------------------------------------------
    // 2. RENDERING FUNCTIONS
    // -------------------------------------------------------

    // Render Skill Bars
    const skillsContainer = document.getElementById('skills-render');
    if (skillsContainer) {
        DATA.skills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skill-item';
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <div style="font-weight: 600;"><i class="${skill.icon}" style="color: var(--primary); margin-right: 8px;"></i> ${skill.name}</div>
                    <div style="font-weight: 700; color: var(--primary);">${skill.level}%</div>
                </div>
                <div style="width: 100%; height: 8px; background: var(--bg); border-radius: 10px; overflow: hidden;">
                    <div class="progress-fill" data-width="${skill.level}" style="height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); width: 0%; transition: width 1.5s ease-out;"></div>
                </div>
            `;
            skillsContainer.appendChild(item);
        });
    }

    // Render Projects
    const projectsContainer = document.getElementById('projects-render');
    if (projectsContainer) {
        DATA.projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'p-card card';
            card.setAttribute('data-category', proj.category);
            card.setAttribute('data-aos', 'fade-up');
            
            let linksHtml = proj.links.map(l => `<a href="${l.url}" class="btn btn-sm btn-outline"><i class="${l.icon}"></i> ${l.text}</a>`).join('');
            
            card.innerHTML = `
                <span class="project-tag tag-${proj.category}">${proj.tag}</span>
                <h3 style="margin-top: 0.5rem;">${proj.title}</h3>
                <p class="text-muted" style="font-size: 0.9rem; flex-grow: 1;">${proj.desc}</p>
                <div class="project-links" style="margin-top: 1rem;">${linksHtml}</div>
                <div class="card-footer">
                   <div></div>
                   <button class="btn btn-sm btn-request" data-project="${proj.title}"><i class="ri-chat-new-line"></i> Feedback</button>
                </div>
            `;
            projectsContainer.appendChild(card);
        });
    }

    // Render Daily Logs
    const logsContainer = document.getElementById('logs-render');
    if (logsContainer) {
        DATA.logs.forEach((log, index) => {
            const card = document.createElement('article');
            card.className = 'card activity-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);
            card.innerHTML = `
                <div class="card-header">
                    <span class="day-badge">${log.day}</span>
                    <span class="text-muted">${log.date}</span>
                </div>
                <h3>${log.title}</h3>
                <p class="text-muted">${log.desc}</p>
                <div class="tag-group">
                    <span class="tag">Computing</span>
                </div>
                <div class="project-links">
                    <a href="${log.evidence}" class="btn btn-sm btn-outline"><i class="ri-file-pdf-line"></i> View Log</a>
                </div>
            `;
            logsContainer.appendChild(card);
        });
    }

    // -------------------------------------------------------
    // 3. CORE UI LOGIC
    // -------------------------------------------------------

    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // Theme Toggle
    const toggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = htmlElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        if (toggle) toggle.innerHTML = theme === 'dark' ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
    }

    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }

    // Typewriter Effect
    const typedTitle = document.getElementById('typed-title');
    if (typedTitle) {
        const titles = ["Hello, I'm Alex.", "I Teach Computing.", "I Build Curricula.", "I Develop Solutions."];
        let titleIndex = 0, charIndex = 0, isDeleting = false;
        
        function type() {
            const current = titles[titleIndex];
            typedTitle.innerHTML = current.substring(0, charIndex) + '<span class="typewriter-cursor"></span>';
            if (!isDeleting && charIndex < current.length) {
                charIndex++;
                setTimeout(type, 80);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 40);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(type, 1200);
            }
        }
        type();
    }

    // Intersection Observer for Skill Bars
    const skillBars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            
            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.p-card');
            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = (filter === 'all' || category === filter) ? 'flex' : 'none';
            });
        });
    });

    // Event Listeners for Dynamic Elements
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-request')) {
            const btn = e.target.closest('.btn-request');
            const projectName = btn.getAttribute('data-project');
            openModal(projectName);
        }
    });

    // Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="ri-arrow-up-line"></i>';
    backToTop.className = 'btn btn-primary';
    backToTop.id = 'backToTopBtn';
    backToTop.style.cssText = 'position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; border-radius: 50%; display: none; align-items: center; justify-content: center; z-index: 99; box-shadow: var(--shadow-lg);';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


    // -------------------------------------------------------
    // 4. PAGE SPECIFIC ENHANCEMENTS
    // -------------------------------------------------------

    // Counter Animation (Index Page)
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        let counted = false;
        const animateCounter = () => {
            if (counted) return;
            const rect = counterElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                counted = true;
                let count = 0;
                const target = 5; 
                const interval = setInterval(() => {
                    if (count >= target) clearInterval(interval);
                    else {
                        count++;
                        counterElement.innerText = count;
                    }
                }, 250);
            }
        };
        window.addEventListener('scroll', animateCounter);
        animateCounter();
    }

    // Scroll Progress Bar (Index Page)
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // === NEW: Timeline Accordion Logic (Reflections Page) ===
    const timelineCards = document.querySelectorAll('.accordion-card');
    if (timelineCards.length > 0) {
        timelineCards.forEach(card => {
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                
                // Close all cards first (Accordion behavior)
                timelineCards.forEach(c => c.classList.remove('active'));
                
                // If the clicked card wasn't active, open it
                if (!isActive) {
                    card.classList.add('active');
                }
            });
        });
    }

});

// -------------------------------------------------------
// 5. GLOBAL FUNCTIONS (Accessible from HTML onclick)
// -------------------------------------------------------

function openModal(projectName) {
    const modal = document.getElementById('feedbackModal');
    const input = document.getElementById('project-name');
    
    if (input) input.value = projectName || 'General Inquiry';
    
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// Global Event Listeners for Modal
document.addEventListener('click', (e) => {
    if (e.target.id === 'feedbackModal') closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});