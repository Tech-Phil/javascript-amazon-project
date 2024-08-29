export const deliveryOptions = [
  {
    id: "id1",
    deliverDays: 7,
    priceCents: 0,
  },
  {
    id: "id2",
    deliverDays: 3,
    priceCents: 499,
  },
  {
    id: "id3",
    deliverDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}
