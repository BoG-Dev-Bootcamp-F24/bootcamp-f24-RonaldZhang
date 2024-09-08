document.getElementById('togglebtn').addEventListener('click', function() {
    const moreInfo = document.getElementById('moreInfo');
    moreInfo.classList.toggle('visible');
});

document.getElementById('baseImg').addEventListener('click', function() {
    const overlayImg = document.getElementById('overlayImg');

    if (overlayImg.style.display === 'none' || overlayImg.style.display === '') {
        overlayImg.style.display = 'block';
    } else {
        overlayImg.style.display = 'none';
    }
});

document.addEventListener('mousemove', function(event) {
    const gradientOverlay = document.querySelector('.gradientbg');
    const x = event.clientX / window.innerWidth * 100;
    const y = event.clientY / window.innerHeight * 100;
    gradientOverlay.style.background = `radial-gradient(circle at ${x}% ${y}%, #ffffff 5%, transparent 15%)`;

    const card = document.getElementById('card');
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const deltaX = cardCenterX - mouseX;
    const deltaY = cardCenterY - mouseY;
    const forceFactor = 20;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const moveX = (deltaX / distance) * forceFactor;
    const moveY = (deltaY / distance) * forceFactor;
    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

function updateTime() {
    const timeDateContainer = document.getElementById('time-date');
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    timeDateContainer.textContent = `${date} ${time}`;
}

setInterval(updateTime, 1000);
updateTime();
