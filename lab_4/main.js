let selectedDrink = null;

function renderDrinks(sortOrder = 'default') {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';

    let drinks = [...drinksData];

    if (sortOrder === 'alphabet') {
        drinks.sort((a, b) => a.name.localeCompare(b.name));
    }

    drinks.forEach(drink => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="${drink.image}" alt="${drink.name}" width="300" height="200">
            <h3>${drink.price}₽ ${drink.name}</h3>
            <p>${drink.count}</p>
            <button class="btn" type="button" data-drink="${drink.keyword}">Добавить</button>
        `;
        grid.appendChild(card);
    });
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    const drinkInput = document.getElementById('drink-input');

    if (!selectedDrink) {
        cartContainer.innerHTML = '<p class="empty">Ничего не выбрано</p>';
        drinkInput.value = '';
        return;
    }

    let html = '';
    html += `<div class="cart-item">
                <span class="cart-label">Суп</span>
                <span class="cart-value">Блюдо не выбрано</span>
            </div>`;
    html += `<div class="cart-item">
                <span class="cart-label">Главное блюдо</span>
                <span class="cart-value">Блюдо не выбрано</span>
            </div>`;
    html += `<div class="cart-item">
                <span class="cart-label">Напиток</span>
                <span class="cart-value">${selectedDrink.name} ${selectedDrink.price}₽</span>
            </div>`;
    html += `<div class="cart-item total">
                <span class="cart-label">Стоимость заказа</span>
                <span class="cart-value">${selectedDrink.price}₽</span>
            </div>`;

    cartContainer.innerHTML = html;
    drinkInput.value = selectedDrink.keyword;
}

function selectCard(keyword) {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
        const btn = card.querySelector('button');
        if (btn && btn.getAttribute('data-drink') === keyword) {
            card.classList.add('selected');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderDrinks();

    document.getElementById('sort').addEventListener('change', (e) => {
        renderDrinks(e.target.value);
    });

    document.querySelector('.grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn') && e.target.hasAttribute('data-drink')) {
            const keyword = e.target.getAttribute('data-drink');
            const drink = drinksData.find(d => d.keyword === keyword);
            if (drink) {
                selectedDrink = drink;
                updateCart();
                selectCard(keyword);
            }
        }
    });

    document.querySelector('button[type="reset"]').addEventListener('click', () => {
        selectedDrink = null;
        document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
        updateCart();
    });

    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('Данные для отправки на сервер:', data);

        alert('Заказ успешно оформлен!');

        form.reset();
        selectedDrink = null;
        document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
        updateCart();
    });
});