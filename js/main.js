document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.header');
    
    // Исправляем обработчик для мобильного меню
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            mainNav.classList.toggle('active');
            // Добавляем/убираем класс для иконки (опционально)
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                e.target !== mobileMenuToggle) {
                mainNav.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    }
    
    // Обработка прокрутки страницы
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Порог прокрутки для скрытия меню
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Определяем направление прокрутки
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Прокрутка вниз
            if (window.innerWidth <= 768) {
                // Для мобильных устройств
                header.classList.add('scrolled-mobile');
                header.classList.remove('scrolled');
            } else {
                // Для десктопов
                header.classList.add('scrolled');
                header.classList.remove('scrolled-mobile');
            }
        } else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) {
            // Прокрутка вверх или в начале страницы
            header.classList.remove('scrolled');
            header.classList.remove('scrolled-mobile');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Предотвращаем отр��цательные значения
    });
    
    // Фильтрация портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Удаляем активный класс со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс на нажатую кнопку
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Слайдер отзывов
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-controls .dot');
    let currentTestimonial = 0;
    
    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Автоматическое переключение слайдов
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
    

    
    // FAQ на странице цен
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                question.classList.toggle('active');
            });
        });
    }
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Зак��ываем мобильное меню при клике на ссылку
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle.querySelector('i')) {
                        mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                        mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    }
                }
            }
        });
    });
    
    // Валидация формы
    const contactForms = document.querySelectorAll('.contact-form');
    
    if (contactForms.length > 0) {
        contactForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // Здесь можно добавить отпра��ку формы через AJAX
                    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                    form.reset();
                } else {
                    alert('Пожалуйста, заполните все обязательные поля.');
                }
            });
        });
    }
});
