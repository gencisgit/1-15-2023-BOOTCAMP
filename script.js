const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

function signup(e) {
    event.preventDefault();


    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;


    var user = {
        email: email,
        username: username,
        password: pass,
    };

    var json = JSON.stringify(user);
    localStorage.setItem(username, json);
    console.log('user added');
}

function loginFunc(e) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var result = document.getElementById('result')

    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    console.log(data);

    if (user == null) {
        result.innerHTML = 'wrong username';
    } else if (username == data.username && pass == data.password) {
        result.innerHTML = 'logged in';
        window.location.href = "index.html"
    } else {
        result.innerHTML = 'wrong password';
    }

}


// CART WINODW

class CartItem {
    constructor(name, desc, price) {
        this.name = name
        this.desc = desc
        this.price = price
        this.quantity = 1
    }
}


class LocalCart {
    static key = 'cartItems'

    static getLocalCartItems() {
        let cartMap = new Map()
        const cart = localStorage.getItem(LocalCart.key)
        if (cart === null || cart.length === 0) return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item) {
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)) {
            let mapItem = cart.get(id)
            mapItem.quantity += 1
            cart.set(id, mapItem)
        }
        else
            cart.set(id, item)
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()

    }

    static removeItemFromCart(id) {
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)) {
            let mapItem = cart.get(id)
            if (mapItem.quantity > 1) {
                mapItem.quantity -= 1
                cart.set(id, mapItem)
            }
            else
                cart.delete(id)
        }
        if (cart.length === 0)
            localStorage.clear()
        else
            localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()

    }
}




const cartIcon = document.querySelector('.fa-cart-shopping')
const cartMenu = document.querySelector('.cart-menu')
cartMenu.inWindow = 0
const addToCartBtns = document.querySelectorAll('.addToCartBtns')
addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', addItemFunction)
})




function addItemFunction(e) {
    //     // const id = e.target.parentElement.getAttribute('data-id')
    //     // const name = e.target.parentElement.children[2].textContent
    //     // const desc = e.target.parentElement.children[7].textContent
    //     // const price = e.target.parentElement.children[6].textContent
    //     // // price = price.replace("Price: $", '')
    //     // const item = new CartItem(name, desc, price)
    //     // LocalCart.addItemToLocalCart(id, item)

    //     // console.log(price)
}



cartIcon.addEventListener('mouseover', () => {
    if (cartMenu.classList.contains('hide'))
        (cartMenu.classList.remove('hide'))
})

cartIcon.addEventListener('mouseleave', () => {
    // if (cartMenu.classList.contains('hide'))
    setTimeout(() => {
        if (cartMenu.inWindow === 0) {
            cartMenu.classList.add('hide')
        }
    }, 500)
})

cartMenu.addEventListener('mouseover', () => {
    cartMenu.inWindow = 1
})

cartMenu.addEventListener('mouseleave', () => {
    cartMenu.inWindow = 0
    cartMenu.classList.add('hide')
})