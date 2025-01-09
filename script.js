const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('.close');
const themeToggler = document.querySelector('.theme-toggler');

// Menu toggle functionality
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = "block";
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = "none";
});

// Theme toggler functionality


    themeToggler.addEventListener('click', () => {
        console.log('Theme toggler clicked');
        document.body.classList.toggle('dark-theme-variables');
    
    

    // Toggle active class for theme toggler icons
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active'); // 🌞
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active'); // 🌙
});
