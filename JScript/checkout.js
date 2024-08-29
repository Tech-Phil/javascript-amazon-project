import { renderOrderSummary } from "./checkout/orderSection.js";
import { renderPaymentSummary } from "./checkout/paymentSection.js";
import {renderCheckoutHeader } from "./checkout/checkoutHead.js";

renderCheckoutHeader();
renderPaymentSummary();
renderOrderSummary();
