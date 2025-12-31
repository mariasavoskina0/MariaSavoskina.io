// resume-website/script.js
// JavaScript для сайта-визитки Марії Савоськіної

// Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. МОБИЛЬНОЕ МЕНЮ ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Переключаем классы для анимации
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Меняем иконку гамбургера на крестик и обратно
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.classList.remove('menu-open');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // ========== 2. ПЛАВНАЯ ПРОКРУТКА ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Рассчитываем позицию с учетом фиксированного меню
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ========== 3. ФОРМА ОБРАТНОЙ СВЯЗИ ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            
            // Имитация отправки (в реальном проекте здесь был бы AJAX запрос)
            console.log('Данные формы:', {
                имя: formData.get('name') || name,
                email: formData.get('email'),
                сообщение: formData.get('message')
            });
            
            // Показываем сообщение об успехе
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Відправляється...';
            submitBtn.disabled = true;
            
            // Имитация задержки отправки
            setTimeout(() => {
                alert(`Дякую, ${name || 'шановний(а)'}! Ваше повідомлення відправлено. Я зв'яжуся з вами найближчим часом.`);
                
                // Сброс формы
                this.reset();
                
                // Возвращаем кнопку в исходное состояние
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Прокручиваем к верху формы
                window.scrollTo({
                    top: contactForm.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 1500);
        });
    }
    
    // ========== 4. АДАПТИВНОСТЬ МЕНЮ ==========
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Мобильная версия
            if (navMenu) {
                navMenu.classList.add('mobile');
            }
            if (menuToggle) {
                menuToggle.style.display = 'block';
            }
        } else {
            // Десктопная версия
            if (navMenu) {
                navMenu.classList.remove('mobile', 'active');
            }
            if (menuToggle) {
                menuToggle.style.display = 'none';
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
            body.classList.remove('menu-open');
        }
    }
    
    // Слушаем изменение размера окна
    window.addEventListener('resize', handleResize);
    
    // Инициализация при загрузке
    handleResize();
    
    // ========== 5. АНИМАЦИЯ ПРИ ПРОКРУТКЕ ==========
    // Добавляем класс при прокрутке для фиксированного меню
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Анимация появления элементов при прокрутке
        animateOnScroll();
    });
    
    // Функция для анимации элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .service-card, .feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация анимации
    setTimeout(animateOnScroll, 300);
    
    // ========== 6. ПОДСВЕТКА АКТИВНОГО РАЗДЕЛА В МЕНЮ ==========
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // ========== 7. ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ ==========
    // Эффект при наведении на карточки услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Анимация цифр в статистике
    function animateStats() {
        const stats = document.querySelectorAll('.number');
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let startValue = 0;
            const duration = 2000;
            const increment = finalValue / (duration / 16);
            
            const timer = setInterval(() => {
                startValue += increment;
                if (startValue >= finalValue) {
                    stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(startValue) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 16);
        });
    }
    
    // Запускаем анимацию статистики когда она попадает в видимую область
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    console.log('Сайт Марії Савоськіної успешно загружен!');
});

// Добавляем поддержку старых браузеров
if (!Element.prototype.scrollTo) {
    Element.prototype.scrollTo = function(options) {
        if (options.behavior === 'smooth') {
            const start = this.scrollTop;
            const change = options.top - start;
            const duration = 500;
            let currentTime = 0;
            
            const animateScroll = function() {
                currentTime += 16;
                const val = Math.easeInOutQuad(currentTime, start, change, duration);
                this.scrollTop = val;
                if (currentTime < duration) {
                    requestAnimationFrame(animateScroll.bind(this));
                }
            }.bind(this);
            
            animateScroll();
        } else {
            this.scrollTop = options.top;
        }
    };
    
    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
}