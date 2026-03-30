document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.1 };

    const revealObserver = new IntersectionObserver((entries) => { //animation
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.email, .address, .hours, .tel, .formule-contact, .address-maps');
    
    elementsToReveal.forEach(el => { //animation
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        revealObserver.observe(el);
    });

    const contactForm = document.getElementById('contactForm') || document.querySelector('.formule-contact form');
    const sendButton = document.getElementById('btn-comment');

    if (contactForm && sendButton) { // like sending
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const originalText = sendButton.innerText;
            sendButton.innerText = "Sending...";
            sendButton.style.backgroundColor = "#25d366";

            setTimeout(() => {
                alert("Thank you! Your message has been sent successfully.");
                sendButton.innerText = originalText;
                sendButton.style.backgroundColor = "#0000ff";
                contactForm.reset(); 
            }, 1500);
        });
    }
});