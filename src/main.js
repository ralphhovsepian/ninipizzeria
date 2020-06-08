import '@fortawesome/fontawesome-free/css/all.css';
import Swal from 'sweetalert2';
const mobileBtn = document.getElementById('mobileBtn');
const mobilenavUl = document.getElementById('mobilenav');

const shoppingcart = document.querySelectorAll('#shoppingcart');
const cart = document.querySelector('.cart');

const pepperoniPizza = document.querySelector('#pepperoni');
const hawaiianPizza = document.querySelector('#hawaiian');
const bbqPizza = document.querySelector('#bbq');
const margheritaPizza = document.querySelector('#margherita');
const summary = document.getElementById('summary');
const totalparag = document.getElementById('totalparag');
const pizzaBtns = [pepperoniPizza, hawaiianPizza, bbqPizza, margheritaPizza];

const pepperonisummary = document.getElementById('pepperonisummary');
const hawaiiansummary = document.getElementById('hawaiiansummary');
const bbqsummary = document.getElementById('bbqsummary');
const margheritasummary = document.getElementById('margheritasummary');

let price = 0;

const pizza = {
  pepperoni: {
    name: 'pepperoni',
    price: 5,
    quantity: 0,
    total: 0,
  },
  bbq: {
    name: 'bbq',
    price: 8,
    quantity: 0,
    total: 0,
  },
  hawaiian: {
    name: 'hawaiian',
    price: 10,
    quantity: 0,
    total: 0,
  },
  margherita: {
    name: 'margherita',
    price: 6,
    quantity: 0,
    total: 0,
  },
};

//add to cart
const addtocart = () => {
  pizzaBtns.forEach((pizzaBtn) => {
    pizzaBtn.addEventListener('click', () => {
      pizza[pizzaBtn.id].quantity++;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Added to cart',
      });
    });
  });
};

//calculate total cart price
const getPrice = (pizzaType) => {
  return (pizza[pizzaType].total =
    pizza[pizzaType].price * pizza[pizzaType].quantity);
};

//show items in the shopping cart + total
const showItems = () => {
  price = 0;
  Object.entries(pizza).forEach((type) => {
    if (type[1].quantity > 0) {
      price += getPrice(type[1].name);

      //summary.innerHTML = `<br>${type[1].quantity} ${type[1].name} pizza`;
    }
  });

  if (pizza.pepperoni.quantity > 0) {
    pepperonisummary.innerHTML = `<br>${pizza.pepperoni.quantity} ${pizza.pepperoni.name} pizza`;
  }

  if (pizza.bbq.quantity > 0) {
    bbqsummary.innerHTML = `<br>${pizza.bbq.quantity} ${pizza.bbq.name} pizza`;
  }

  if (pizza.hawaiian.quantity > 0) {
    hawaiiansummary.innerHTML = `<br>${pizza.hawaiian.quantity} ${pizza.hawaiian.name} pizza`;
  }

  if (pizza.margherita.quantity > 0) {
    margheritasummary.innerHTML = `<br>${pizza.margherita.quantity} ${pizza.margherita.name} pizza`;
  }

  totalparag.innerHTML = `Total: $${price}`;
};

//shopping cart show, hide
shoppingcart.forEach((shopping) => {
  shopping.addEventListener('click', (e) => {
    console.log(e.target.value);
    if (cart.id == 'cart') {
      cart.style.display = 'block';
      cart.id += 'opened';
      showItems();
    } else {
      cart.style.display = 'none';
      cart.id = 'cart';
    }
  });

  document.addEventListener('scroll', (e) => {
    if (cart.id == 'cartopened') {
      cart.style.display = 'none';
      cart.id = 'cart';
    }
  });
});

//navbar for mobile
mobileBtn.addEventListener('click', () => {
  if (mobilenavUl.className == 'mobilenav') {
    mobilenavUl.style.display = 'flex';
    mobilenavUl.classList += 'opened';
  } else {
    mobilenavUl.style.display = 'none';
    mobilenavUl.classList = 'mobilenav';
  }
});

//call functions
addtocart();
