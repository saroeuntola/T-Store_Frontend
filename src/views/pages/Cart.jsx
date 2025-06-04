import React, { useContext} from "react";
import { CartContext } from "../pages/Context/CartProvider"; // Adjust if needed
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { urlProductImage } from "service/baseURL";
import Swal from "sweetalert2";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {BakongKHQR, khqrData, IndividualInfo} from
"bakong-khqr";
import QRCode from "qrcode"
import './Style.css';
import { checkTransaction } from "config_API/Bakong_API";
import bakongLogo from "./images/bakong_Logo.png"

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  const handleApprove = (data, actions) => {
    
    return actions.order.capture().then((details) => {
      Swal.fire({
        title: "Transaction Successful!",
        text: `Transaction completed by ${details.payer.name.given_name}`,
        icon: "success",
        confirmButtonText: "Ok",
      });

      clearCart();
    });
  };


 const checkoutBakong = async () => {
   const duration = 2 * 60;
   let timeLeft = duration;
   const total_amount = getCartTotal();
   const optionalData = {
     currency: khqrData.currency.usd,
     amount: total_amount,
     billNumber: "#0001",
     mobileNumber: "855889890692",
     storeLabel: "T-Store",
     terminalLabel: "Cashier_1",
     expirationTimestamp: Date.now() + duration * 1000,
   };
  
   const individualInfo = new IndividualInfo(
     "lim_laykuong@wing",
     "lim laykuong",
     "Phnom Penh",
     optionalData
   );

   const khqr = new BakongKHQR();
   const response = khqr.generateIndividual(individualInfo);
   const md5 = response?.data?.md5;

   if (response?.data?.qr) {
     const qrURL = await QRCode.toDataURL(response.data.qr);

     const formatTime = (seconds) => {
       const m = Math.floor(seconds / 60)
         .toString()
         .padStart(2, "0");
       const s = (seconds % 60).toString().padStart(2, "0");
       return `${m}:${s}`;
     };

     Swal.fire({
       title: "Scan to Pay with Bakong",
       html: `
        <div class="khqr-body">
          <div class="bebas-neue-regular" id="receiverName">Saroeun Tola</div>
          <div class="amount" id="amountDisplay">${total_amount}</div>
          <hr class="divider">
          <div class="qrcode-area">
            <div class="qrcode-wrapper">
              <div id="qrcode">
                <img src="${qrURL}" alt="Bakong QR"/>
              </div>
              <div class="qrcode-center-icon">
                <span class="currency-symbol">$</span>
              </div>
            </div>
          </div>  
        </div>
        <div style="font-size: 18px;">Expires in: <span id="countdown">${formatTime(
          timeLeft
        )}</span></div>
      `,
       showCancelButton: true,
       showConfirmButton: false,
       cancelButtonText: "Close",
       didOpen: () => {
         const countdownEl = Swal.getPopup().querySelector("#countdown");
         const interval = setInterval(() => {
           timeLeft--;
           if (timeLeft <= 0) {
             clearInterval(interval);
             Swal.update({
               html: `<div style="color:red;">QR Code Expired</div>`,
             });
           }
           if (countdownEl) countdownEl.textContent = formatTime(timeLeft);
         }, 1000);

         const checkInterval = setInterval(async () => {
           const result = await checkTransaction(
             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMWRiZDQwZTBjOGNiNGE2YyJ9LCJpYXQiOjE3NDU5MDg5MTUsImV4cCI6MTc1MzY4NDkxNX0.f3AcwjN5c6LKyT1wXcebEGupyzUtFiAGeXJpSW-WpeM", // replace with actual token logic
             { md5 }
           );
           console.log(result);
           if (result?.responseMessage === "Success") {
             clearInterval(checkInterval);
             clearInterval(interval);
             Swal.close(); 

             Swal.fire({
               title: "Payment Success!",
               text: "The transaction was successful via Bakong.",
               icon: "success",
               showConfirmButton: false,
               timer: 2500,
               toast: true,
               position: "center",
             });

             clearCart();
           }
         }, 5000);
       },
     });
   }
 };


  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <p className="text-gray-600">Your cart is currently empty.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Cart Items */}
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      item.image
                        ? `${urlProductImage}${item.image}`
                        : "https://via.placeholder.com/400x300"
                    }
                    className="h-20 w-20 rounded object-cover"
                    alt={item.name}
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-500">Price ${item.price}</p>

                    {/* ✅ Show selected colors */}
                    {item.selectedColors?.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Colors: {item.selectedColors.join(", ")}
                      </p>
                    )}

                    {/* ✅ Show selected sizes */}
                    {item.selectedSizes?.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Sizes: {item.selectedSizes.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(item, -1)}
                    className="rounded bg-gray-200 p-1 hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="rounded bg-gray-200 p-1 hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                clearCart();
                Swal.fire({
                  icon: "success",
                  title: "Clear Cart Success",
                  showConfirmButton: false,
                  timer: 2500,
                  toast: true,
                  position: "center",
                });
              }}
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Order Summary
            </h3>
            <div className="mb-2 flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${getCartTotal()}</span>
            </div>
            <div className="mb-2 flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-lg font-semibold">
              <span>Total</span>
              <span>${getCartTotal()}</span>
            </div>

            <button
              className="mb-3 mt-4 flex w-full items-center justify-center gap-2 rounded-3xl bg-red-800 px-4 py-2 text-white hover:bg-red-900"
              onClick={checkoutBakong}
            >
              <img
                src={bakongLogo}
                alt="Bakong"
                className="h-6 w-6 rounded-full"
              />
              Bakong
            </button>

            <div className="paypal_checkout">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AfjUa0dOYg8vM5cnRiolQskLrNG8X1vBvcVlqc0qVIYHUKjPxNpupL4zXOd64-V9_qKlK0m80IuDU7cn",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical", color: "gold", shape: "pill" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: getCartTotal(),
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={handleApprove}
                  onCancel={() => {
                    Swal.fire({
                      icon: "info",
                      title: "Payment cancelled",
                      showConfirmButton: false,
                      timer: 2500,
                      toast: true,
                      position: "center",
                    });
                    console.log("Payment cancelled.");
                  }}
                  onError={(err) => {
                    Swal.fire({
                      icon: "error",
                      title: "Payment error:",
                      showConfirmButton: false,
                      timer: 2500,
                      toast: true,
                      position: "center",
                    });
                    console.error("Payment error:", err);
                  }}
                />
              </PayPalScriptProvider>
            </div>
            <Link
              to="/products"
              className="mt-4 block text-center text-sm text-blue-500 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
