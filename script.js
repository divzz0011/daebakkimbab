const products = [
    {id:1,name:"Kimbab Original",price:13000,img:"images/kimbab1.jpg",desc:"Selain menyehatkan kimbab ini juga mengenyangkan karena di dalamnya berisi sayuran yang lezat dan juga segar dengan tambahkan sosis yang membuat rsanya semakin lezattt."},

  ];
  
  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  let cart = [];
  
  // Render produk
  function renderProducts(){
    products.forEach(product=>{
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Rp ${product.price.toLocaleString()}</p>
      `;
      card.addEventListener('click',()=>openPopup(product));
      productList.appendChild(card);
    });
  }
  
  // Pop-up produk
  const popup = document.getElementById('product-popup');
  const popupImg = document.getElementById('popup-img');
  const popupName = document.getElementById('popup-name');
  const popupPrice = document.getElementById('popup-price');
  const popupDesc = document.getElementById('popup-desc');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  let currentProduct = null;
  
  function openPopup(product){
    currentProduct = product;
    popup.style.display = 'flex';
    popupImg.src = product.img;
    popupName.textContent = product.name;
    popupPrice.textContent = `Rp ${product.price.toLocaleString()}`;
    popupDesc.textContent = product.desc;
  }
  
  document.querySelector('.close-btn').addEventListener('click',()=>{popup.style.display='none';});
  
  // Tambah ke troli
  addToCartBtn.addEventListener('click',()=>{
    const existing = cart.find(item => item.id === currentProduct.id);
    if(existing){
      existing.qty +=1;
    } else {
      cart.push({...currentProduct, qty:1});
    }
    updateCart();
    popup.style.display='none';
  });
  
  // Update troli
  function updateCart(){
    cartItems.innerHTML='';
    let total = 0;
    cart.forEach((item,index)=>{
      total += item.price * item.qty;
  
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          ${item.name} - Rp ${item.price.toLocaleString()}
        </div>
        <div class="qty-controls">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.qty}</span>
          <button class="increase" data-index="${index}">+</button>
          <button class="remove-btn" data-index="${index}">Hapus</button>
        </div>
      `;
      cartItems.appendChild(li);
    });
  
    totalPriceEl.textContent = `Total: Rp ${total.toLocaleString()}`;
  
    document.querySelectorAll('.remove-btn').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        const idx = e.target.getAttribute('data-index');
        cart.splice(idx,1);
        updateCart();
      });
    });
  
    document.querySelectorAll('.increase').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        const idx = e.target.getAttribute('data-index');
        cart[idx].qty +=1;
        updateCart();
      });
    });
  
    document.querySelectorAll('.decrease').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        const idx = e.target.getAttribute('data-index');
        if(cart[idx].qty > 1){
          cart[idx].qty -=1;
        } else {
          cart.splice(idx,1);
        }
        updateCart();
      });
    });
  }
  
  // Checkout via WhatsApp
  document.getElementById('checkout-btn').addEventListener('click',()=>{
    const name = document.getElementById('buyer-name').value;
    const address = document.getElementById('buyer-address').value;
    const note = document.getElementById('buyer-note').value;
    if(!name || !address || cart.length===0){
      alert('Isi nama, alamat/kelas dan pilih produk!');
      return;
    }
    let message = `Halo, saya ingin memesan:\n`;
    cart.forEach(item=>{
      message += `- ${item.name} x${item.qty} Rp ${item.price.toLocaleString()}\n`;
    });
    message += `Nama: ${name}\nAlamat/Kelas: ${address}\nCatatan: ${note}`;
    const phone = "6285860606828"; // ganti nomor WA
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url,'_blank');
  });
  
  // Toggle troli
  const cartToggleBtn = document.getElementById('cart-toggle');
  const cartSection = document.getElementById('cart-section');
  cartToggleBtn.addEventListener('click',()=>{
    cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
  });
  
  renderProducts();

  
