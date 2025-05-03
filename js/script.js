document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Product data
  const products = [
    {
      id: 1,
      name: "Industrial Coffee Table",
      price: 24999,
      category: "tables",
      description:
        "Handcrafted metal and reclaimed wood coffee table with a sleek industrial design. Perfect for modern living rooms.",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      name: "Metallic Dining Chair",
      price: 12999,
      category: "chairs",
      description:
        "Elegant metal-framed dining chair with comfortable upholstered seat. Available in multiple finishes.",
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      name: "Modern Study Desk",
      price: 32999,
      category: "tables",
      description:
        "Sleek metal and tempered glass study desk with built-in cable management. Perfect for home offices.",
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      id: 4,
      name: "Industrial Bookshelf",
      price: 27999,
      category: "storage",
      description:
        "Sturdy metal and wood bookshelf with adjustable shelves. Combines functionality with industrial aesthetics.",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 5,
      name: "Custom Console Table",
      price: 35999,
      category: "custom",
      description:
        "Made-to-order console table with your choice of metal finish and wood type. Perfect for entryways.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 6,
      name: "Metal Bar Stool",
      price: 14999,
      category: "chairs",
      description:
        "Contemporary metal bar stool with comfortable seat and backrest. Ideal for kitchen islands.",
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
    {
      id: 7,
      name: "Rustic Side Table",
      price: 18999,
      category: "tables",
      description:
        "Charming side table combining wrought iron with distressed wood. Adds character to any space.",
      image:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 8,
      name: "Media Console",
      price: 41999,
      category: "storage",
      description:
        "Modern media console with metal frame and wood shelves. Designed for entertainment centers.",
      image:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  ];

  // Cart functionality
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cartCount");
  const cartOffcanvas = new bootstrap.Offcanvas(
    document.getElementById("cartOffcanvas")
  );
  const productContainer = document.getElementById("productContainer");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartDelivery = document.getElementById("cartDelivery");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Display products
  function displayProducts(filter = "all") {
    productContainer.innerHTML = "";

    const filteredProducts =
      filter === "all"
        ? products
        : products.filter((product) => product.category === filter);

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-6 col-lg-4 col-xl-3";
      productCard.innerHTML = `
                <div class="card product-card h-100" data-id="${
                  product.id
                }" data-category="${product.category}">
                    <div class="product-img">
                        <img src="${product.image}" class="card-img-top" alt="${
        product.name
      }">
                    </div>
                    <div class="card-body product-body">
                        <h5 class="card-title product-title">${
                          product.name
                        }</h5>
                        <p class="card-text product-price">KSh ${product.price.toLocaleString()}</p>
                        <div class="product-actions">
                            <button class="btn btn-sm btn-outline-dark view-details" data-id="${
                              product.id
                            }">View Details</button>
                            <button class="btn btn-sm btn-orange add-to-cart" data-id="${
                              product.id
                            }">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
      productContainer.appendChild(productCard);
    });

    // Add event listeners to the new buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        showProductDetails(productId);
      });
    });

    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        addToCart(productId);
      });
    });
  }

  // Filter products
  document.querySelectorAll(".btn-filter").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".btn-filter")
        .forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      displayProducts(filter);
    });
  });

  // Show product details in modal
  function showProductDetails(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    document.getElementById("modalProductName").textContent = product.name;
    document.getElementById(
      "modalProductPrice"
    ).textContent = `KSh ${product.price.toLocaleString()}`;
    document.getElementById("modalProductDescription").textContent =
      product.description;
    document.getElementById("modalProductImage").src = product.image;
    document.getElementById("modalProductImage").alt = product.name;

    // Set up modal buttons
    document.getElementById("addToCartBtn").setAttribute("data-id", product.id);
    document
      .getElementById("orderWhatsAppBtn")
      .setAttribute("data-id", product.id);

    // Reset quantity
    document.getElementById("productQty").value = 1;

    // Show modal
    const productModal = new bootstrap.Modal(
      document.getElementById("productModal")
    );
    productModal.show();
  }

  // Add to cart
  function addToCart(productId, quantity = 1) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }

    updateCart();
    showAddedToCartAlert(product.name);
  }

  // Update cart
  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Update cart sidebar
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      cartItemsContainer.innerHTML = "";
      checkoutBtn.disabled = true;
    } else {
      emptyCartMessage.style.display = "none";
      renderCartItems();
      updateCartTotals();
      checkoutBtn.disabled = false;
    }
  }

  // Render cart items
  function renderCartItems() {
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h6 class="cart-item-title">${item.name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="cart-item-price">KSh ${(
                              item.price * item.quantity
                            ).toLocaleString()}</span>
                            <div class="d-flex align-items-center mt-1">
                                <button class="btn btn-sm btn-outline-secondary me-2 decrement-item" data-id="${
                                  item.id
                                }">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary ms-2 increment-item" data-id="${
                                  item.id
                                }">+</button>
                            </div>
                        </div>
                        <button class="btn btn-link cart-item-remove remove-item" data-id="${
                          item.id
                        }">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to cart item buttons
    document.querySelectorAll(".decrement-item").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        updateCartItemQuantity(productId, -1);
      });
    });

    document.querySelectorAll(".increment-item").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        updateCartItemQuantity(productId, 1);
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });
  }

  // Update cart item quantity
  function updateCartItemQuantity(productId, change) {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    updateCart();
  }

  // Remove from cart
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }

  // Update cart totals
  function updateCartTotals() {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const delivery = subtotal > 50000 ? 0 : 1500; // Free delivery for orders over 50,000

    cartSubtotal.textContent = `KSh ${subtotal.toLocaleString()}`;
    cartDelivery.textContent = `KSh ${delivery.toLocaleString()}`;
    cartTotal.textContent = `KSh ${(subtotal + delivery).toLocaleString()}`;
  }

  // Show "added to cart" alert
  function showAddedToCartAlert(productName) {
    // Create alert element
    const alert = document.createElement("div");
    alert.className =
      "alert alert-success alert-dismissible fade show added-to-cart-alert";
    alert.setAttribute("role", "alert");
    alert.innerHTML = `
            <strong>${productName}</strong> has been added to your cart.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

    // Add to body
    document.body.appendChild(alert);

    // Position alert
    alert.style.position = "fixed";
    alert.style.bottom = "20px";
    alert.style.right = "20px";
    alert.style.zIndex = "1100";
    alert.style.maxWidth = "350px";

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 3000);
  }

  // Quantity controls in modal
  document
    .getElementById("incrementQty")
    .addEventListener("click", function () {
      const qtyInput = document.getElementById("productQty");
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });

  document
    .getElementById("decrementQty")
    .addEventListener("click", function () {
      const qtyInput = document.getElementById("productQty");
      if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
      }
    });

  // Add to cart from modal
  document
    .getElementById("addToCartBtn")
    .addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      const quantity = parseInt(document.getElementById("productQty").value);
      addToCart(productId, quantity);

      // Close modal
      const productModal = bootstrap.Modal.getInstance(
        document.getElementById("productModal")
      );
      productModal.hide();
    });

  // Order via WhatsApp
  document
    .getElementById("orderWhatsAppBtn")
    .addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const quantity = parseInt(document.getElementById("productQty").value);
      const message = `Hi Metal Art Designers, I'd like to order ${quantity} of your ${
        product.name
      } (KSh ${product.price.toLocaleString()} each). Please let me know about availability and delivery options.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/254712345678?text=${encodedMessage}`,
        "_blank"
      );
    });

  // Checkout button
  checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) return;

    let message =
      "Hi Metal Art Designers, I would like to place an order for the following items:\n\n";

    cart.forEach((item) => {
      message += `- ${item.quantity}x ${
        item.name
      } @ KSh ${item.price.toLocaleString()} each\n`;
    });

    message += `\nSubtotal: ${cartSubtotal.textContent}\n`;
    message += `Delivery: ${cartDelivery.textContent}\n`;
    message += `Total: ${cartTotal.textContent}\n\n`;
    message += "Please confirm availability and provide payment details.";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254712345678?text=${encodedMessage}`, "_blank");
  });

  // Contact form submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // In a real application, you would send the form data to a server
      // For this demo, we'll just show a success message
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Show success alert
        const alert = document.createElement("div");
        alert.className = "alert alert-success alert-dismissible fade show";
        alert.setAttribute("role", "alert");
        alert.innerHTML = `
                <strong>Thank you!</strong> Your message has been sent. We'll get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

        const contactSection = document.getElementById("contact");
        contactSection.insertBefore(alert, contactSection.firstChild);

        // Reset form
        this.reset();

        // Auto dismiss after 5 seconds
        setTimeout(() => {
          const bsAlert = new bootstrap.Alert(alert);
          bsAlert.close();
        }, 5000);
      }, 1500);
    });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Initialize
  displayProducts();
  updateCart();
});
