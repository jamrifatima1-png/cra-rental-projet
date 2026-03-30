document.addEventListener('DOMContentLoaded', () => { //refresh page
    const searchBtn = document.querySelector('.search-bar button');
    if (searchBtn) {
        searchBtn.addEventListener('click', filterCars);
    }

    function filterCars() { //filtrage
        const nameInput = document.getElementById('searchName').value.toLowerCase();
        const brandInput = document.getElementById('filterBrand').value;
        const capacityInput = document.getElementById('filterCapacity').value;
        const priceInput = document.getElementById('maxPrice').value;
        
        const cards = document.querySelectorAll('.car-card');
        let hasResults = false; //ckeck result

        cards.forEach(card => { 
            const name = card.getAttribute('data-name').toLowerCase();
            const brand = card.getAttribute('data-brand');
            const capacity = card.getAttribute('data-capacity');
            const price = parseInt(card.getAttribute('data-price'));

            const matchesName = name.includes(nameInput); 
            const matchesBrand = brandInput === "" || brand === brandInput;
            const matchesCapacity = capacityInput === "" || capacity === capacityInput;
            const matchesPrice = priceInput === "" || price <= parseInt(priceInput);

            if (matchesName && matchesBrand && matchesCapacity && matchesPrice) { //les condition pour comparer et filtrer
                card.style.display = "block";
                hasResults = true;
            } else {
                card.style.display = "none";
            }
        });

        document.getElementById('noResults').style.display = hasResults ? "none" : "block";
    }

    document.addEventListener('click', (e) => {
        if (e.target && e.target.innerText === 'Rent Now') {
            const card = e.target.closest('.car-card');
            const carName = card.querySelector('h3').innerText;
            
            openBookingModal(carName);
        }
    });

    const modal = document.getElementById('bookingModal'); //formulaire
    
    window.openBookingModal = function(name) {
        if (modal) {
            document.getElementById('dynamicCarName').innerText = name;
            modal.style.display = 'flex';
        }
    };

    window.closeBookingModal = function() {
        if (modal) modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) closeBookingModal();
    };

    const reserveForm = document.getElementById('reservationForm'); // like sending
    if (reserveForm) {
        reserveForm.onsubmit = (e) => {
            e.preventDefault();
            alert("Reservation Request Sent Successfully!");
            closeBookingModal();
        };
    }
});

function goToDetails(btn) {
    const card = btn.closest('.car-card');
    const params = new URLSearchParams({
        name: card.getAttribute('data-name'),
        brand: card.getAttribute('data-brand'),
        price: card.getAttribute('data-price'),
        capacity: card.getAttribute('data-capacity'),
        img: card.querySelector('img').src,
        year: card.getAttribute('data-year'),
        fuel: card.getAttribute('data-fuel'),
        doors: card.getAttribute('data-doors'),
        mileage: card.getAttribute('data-mileage'),
        features: card.getAttribute('data-features'),
        description: card.getAttribute('data-description')
    });
    window.location.href = `details.html?${params.toString()}`;
}

function toggleFavorite(btn) {
    const card = btn.closest('.car-card');
    const carData = {
        name: card.getAttribute('data-name'),
        price: card.getAttribute('data-price'),
        img: card.querySelector('img').src,
        year: card.getAttribute('data-year'),
        fuel: card.getAttribute('data-fuel'),
        doors: card.getAttribute('data-doors'),
        mileage: card.getAttribute('data-mileage'),
        features: card.getAttribute('data-features'),
        desc: card.getAttribute('data-description')
    };

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    btn.classList.toggle('active'); // the effect of heart favourite
    const icon = btn.querySelector('i');

    if (btn.classList.contains('active')) {
        icon.classList.replace('far', 'fas'); // heart color -----fas : heart vide
        
        const exists = favorites.some(fav => fav.name === carData.name);
        if (!exists) {
            favorites.push(carData);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            showPopup();
        }
    } else {
        icon.classList.replace('fas', 'far');
        favorites = favorites.filter(fav => fav.name !== carData.name);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

function showPopup() { // block alert favourite
    const popup = document.getElementById('favPopup');
    popup.style.display = 'block';
    setTimeout(() => { popup.style.display = 'none'; }, 3000 ); //delay 3000
}

function openBookingModal(carName) { //formulaire
    const modal = document.getElementById('bookingModal');
    const nameSpan = document.getElementById('dynamicCarName');
    
    if (modal && nameSpan) {
        nameSpan.innerText = carName;
        modal.style.display = 'flex';
    }
}

function closeBookingModal() { 
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeBookingModal();
    }
}

document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const carName = document.getElementById('dynamicCarName').innerText;
    alert("Success! Your request for " + carName + " has been sent.");
    closeBookingModal();
    this.reset();
});