document.addEventListener('DOMContentLoaded', () => { //refresh the page
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const brandSelect = document.getElementById('brandSelect');
    const durationSelect = document.getElementById('durationSelect');
    
    
    if (priceRange) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `${priceRange.value} DH`;
        });
    }

    
    window.goToResults = function() { //filter
        const maxPrice = parseInt(priceRange.value);
        const selectedBrand = brandSelect.value.toLowerCase();
        const selectedDuration = durationSelect.value; 
        
        const offerSectionCards = document.querySelectorAll('.offers-section .offer-card');

        offerSectionCards.forEach(card => {
            const carTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardText = card.innerText;
            
           
            const priceMatch = cardText.match(/Price:\s*(\d+)/);
            const carPrice = priceMatch ? parseInt(priceMatch[1]) : 0;

            const validityMatch = cardText.match(/Validity:\s*(\d+)/);
            const carDuration = validityMatch ? parseInt(validityMatch[1]) : 0;
            const matchesPrice = carPrice <= maxPrice;
            const matchesBrand = (selectedBrand === "" || carTitle.includes(selectedBrand));
            
            
            let matchesDuration = true;
            if (selectedDuration !== "") {
                matchesDuration = carDuration >= parseInt(selectedDuration);
            }
            if (matchesPrice && matchesBrand && matchesDuration) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        document.querySelector('.offers-section').scrollIntoView({ behavior: 'smooth' });
    };

    const modal = document.getElementById('modal'); //formulaire
    const cancelBtn = document.getElementById('cancelBtn');
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-claim') || e.target.classList.contains('reserve-btn')) {
            const parent = e.target.closest('.offer-card');
            const name = parent.querySelector('h3').textContent;
            
            modal.style.display = 'flex';
            modal.querySelector('h3').innerText = `Register for ${name}`;
        }
    });

    if (cancelBtn) cancelBtn.onclick = () => modal.style.display = 'none';
    
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    document.getElementById('registerForm').onsubmit = (e) => { //sending
        e.preventDefault();
        alert("Reservation Request Sent Successfully!");
        modal.style.display = 'none';
        e.target.reset();
    };
});