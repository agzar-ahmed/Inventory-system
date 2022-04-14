import * as yup from 'yup';

export const inventoryItemSchema = yup.object({
    itemId: yup.number().typeError('Product is required').required().positive(),
    inventoryId: yup.number().typeError('Inventory is required').required().positive(),
    totalQuantity: yup.number().typeError('Total quantity is required').required().positive('Must be positive number').integer(),
  });
  