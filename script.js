// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 移动端菜单
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

function calculateMenuHeight() {
    let totalHeight = 0;
    navItems.forEach(item => {
        totalHeight += item.offsetHeight;
    });
    return totalHeight;
}

function toggleMenu() {
    menuBtn.classList.toggle('active');
    if (!navLinks.classList.contains('active')) {
        navLinks.style.height = '0';
        setTimeout(() => {
            navLinks.classList.add('active');
            navLinks.style.height = calculateMenuHeight() + 'px';
        }, 10);
    } else {
        navLinks.style.height = '0';
        navLinks.addEventListener('transitionend', function handler() {
            navLinks.classList.remove('active');
            navLinks.removeEventListener('transitionend', handler);
        });
    }
}

// 点击菜单按钮
menuBtn.addEventListener('click', toggleMenu);

// 点击导航链接时关闭菜单
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// 监听窗口大小变化
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.style.height = '';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 技能进度条动画
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', progress + '%');
    });
}

// 监听滚动事件
function handleSkillAnimation() {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
        skillBars.forEach(bar => bar.classList.add('animate'));
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
    handleSkillAnimation();
    window.addEventListener('scroll', handleSkillAnimation);
});

// 检查元素是否在视口中
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 滚动处理函数
function handleScroll() {
    const skillsSection = document.querySelector('.skills');
    if (isElementInViewport(s skillsSection)) {
        animateSkillBars();
    }
}

// 监听滚动事件
window.addEventListener('scroll', handleScroll);
// 页面加载时也执行一次
handleScroll();

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // 这里添加表单提交逻辑
    alert('消息已发送！');
    contactForm.reset();
});

// 页面加载完成后的动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    handleScroll();
});

// 添加滚动动画
function revealOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-card, .stat-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始化元素样式
document.querySelectorAll('.project-card, .skill-card, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

// 监听滚动事件
window.addEventListener('scroll', revealOnScroll);
// 页面加载时也执行一次
revealOnScroll();

// 返回顶部功能
const backToTop = document.getElementById('back-to-top');

// 监听滚动事件
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// 点击返回顶部
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 添加悬停效果
backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'scale(1.1)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'scale(1)';
});

// 页面加载进度条
document.addEventListener('DOMContentLoaded', function() {
    // 创建进度条元素
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = 'var(--primary-color)';
    progressBar.style.zIndex = '1001';
    progressBar.style.transition = 'width 0.3s ease';
    document.body.appendChild(progressBar);

    // 模拟加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(progressBar);
                }, 300);
            }, 500);
        }
    }, 50);
});

// 添加滚动百分比指示器
function addScrollPercentage() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.id = 'scroll-percentage';
    scrollIndicator.style.position = 'fixed';
    scrollIndicator.style.bottom = '90px';
    scrollIndicator.style.right = '30px';
    scrollIndicator.style.width = '50px';
    scrollIndicator.style.height = '50px';
    scrollIndicator.style.backgroundColor = 'var(--primary-color)';
    scrollIndicator.style.color = 'white';
    scrollIndicator.style.borderRadius = '50%';
    scrollIndicator.style.display = 'flex';
    scrollIndicator.style.alignItems = 'center';
    scrollIndicator.style.justifyContent = 'center';
    scrollIndicator.style.fontWeight = 'bold';
    scrollIndicator.style.zIndex = '998';
    scrollIndicator.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
        scrollIndicator.textContent = scrollPercent + '%';
    });
}

// 添加暗色模式切换按钮
function addDarkModeToggle() {
    const darkModeToggle = document.createElement('div');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '150px';
    darkModeToggle.style.right = '30px';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.backgroundColor = 'var(--primary-color)';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.display = 'flex';
    darkModeToggle.style.alignItems = 'center';
    darkModeToggle.style.justifyContent = 'center';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.zIndex = '998';
    darkModeToggle.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // 检查本地存储
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    addScrollPercentage();
    addDarkModeToggle();
});