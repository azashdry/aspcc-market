// ========= Part 4: script.js =========
import { 
  auth, db, 
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  collection, addDoc, onSnapshot, query, orderBy
} from './firebase.js';

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const msg = document.getElementById('msg');
const productList = document.getElementById('productList');
const saveBtn = document.getElementById('saveBtn');

// 1. LOGIN
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    msg.textContent = '';
  } catch (error) {
    msg.textContent = 'Email ko Password ba daidai ba ne';
  }
});

// 2. LOGOUT
logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

// 3. DUBA IDAN ADMIN YA SHIGA KO BAI SHIGA BA
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginPage.style.display = 'none';
    dashboard.style.display = 'block';
    loadProducts(); // Loda kayayyaki
  } else {
    loginPage.style.display = 'flex';
    dashboard.style.display = 'none';
  }
});

// 4. AJIYE SABON PRODUCT
saveBtn.addEventListener('click', async () => {
  const category = document.getElementById('category').value;
  const item = document.getElementById('item').value;
  const shop = document.getElementById('shop').value;
  const price = document.getElementById('price').value;
  const location = document.getElementById('location').value;
  const phone = document.getElementById('phone').value;

  if(!category || !item || !shop || !price){
    alert('Cika Category, Item, Shop, da Price');
    return;
  }

  await addDoc(collection(db, "products"), {
    category, item, shop, price: Number(price), location, phone, timestamp: Date.now()
  });

  alert('An ajiye Product!');
  document.querySelector('.form').reset();
});

// 5. LODA PRODUCTS REAL-TIME
function loadProducts(){
  const q = query(collection(db, "products"), orderBy("timestamp", "desc"));
  onSnapshot(q, (snapshot) => {
    productList.innerHTML = '';
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const div = document.createElement('div');
      div.style.cssText = "background:white;padding:12px;border-radius:8px;box-shadow:0 2px 5px rgba(0,0,0,.1)";
      div.innerHTML = `
        <h4 style="color:#0d47a1;margin:0 0 5px 0">${data.item}</h4>
        <p style="margin:3px 0"><b>Category:</b> ${data.category}</p>
        <p style="margin:3px 0"><b>Shop:</b> ${data.shop}</p>
        <p style="margin:3px 0"><b>Price:</b> ₦${data.price}</p>
        <p style="margin:3px 0"><b>Location:</b> ${data.location}</p>
        <p style="margin:3px 0"><b>Phone:</b> ${data.phone}</p>
      `;
      productList.appendChild(div);
    });
  });
}