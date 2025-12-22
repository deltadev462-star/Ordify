import * as Yup from 'yup';
import { ProductStatus } from '@/types/product.types';
import i18n from '@/i18n';

export const productCreateSchema = Yup.object().shape({
  // Essential Information
  name: Yup.string()
    .required(() => i18n.t('validation.productNameRequired'))
    .min(3, () => i18n.t('validation.productNameMinLength'))
    .max(100, () => i18n.t('validation.productNameMaxLength')),
  
  slug: Yup.string()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, () => i18n.t('validation.slugPattern'))
    .max(100, () => i18n.t('validation.slugMaxLength')),
  
  shortDescription: Yup.string()
    .max(200, () => i18n.t('validation.shortDescriptionMaxLength')),
  
  description: Yup.string(),
  
  categoryId: Yup.string()
    .required(() => i18n.t('validation.categoryRequired')),
  
  // Pricing
  price: Yup.number()
    .required(() => i18n.t('validation.priceRequired'))
    .positive(() => i18n.t('validation.priceMustBePositive'))
    .min(0.01, () => i18n.t('validation.priceMinValue')),
  
  comparePrice: Yup.number()
    .positive(() => i18n.t('validation.comparePriceMustBePositive'))
    .min(0.01, () => i18n.t('validation.comparePriceMinValue'))
    .test('compare-price-greater', () => i18n.t('validation.comparePriceMustBeGreater'), function(value) {
      const { price } = this.parent;
      if (!value || !price) return true;
      return value > price;
    }),
  
  costPrice: Yup.number()
    .positive(() => i18n.t('validation.costPriceMustBePositive'))
    .min(0.01, () => i18n.t('validation.costPriceMinValue')),
  
  // Inventory
  sku: Yup.string()
    .max(50, () => i18n.t('validation.skuMaxLength')),
  
  barcode: Yup.string()
    .max(50, () => i18n.t('validation.barcodeMaxLength')),
  
  trackQuantity: Yup.boolean(),
  
  quantity: Yup.number()
    .when('trackQuantity', {
      is: true,
      then: (schema) => schema
        .required(() => i18n.t('validation.quantityRequiredWhenTracking'))
        .integer(() => i18n.t('validation.quantityMustBeInteger'))
        .min(0, () => i18n.t('validation.quantityCannotBeNegative')),
      otherwise: (schema) => schema
    }),
  
  lowStockAlert: Yup.number()
    .when('trackQuantity', {
      is: true,
      then: (schema) => schema
        .required(() => i18n.t('validation.lowStockAlertRequired'))
        .integer(() => i18n.t('validation.lowStockAlertMustBeInteger'))
        .min(0, () => i18n.t('validation.lowStockAlertCannotBeNegative')),
      otherwise: (schema) => schema
    }),
  
  // Product Details
  weight: Yup.number()
    .positive(() => i18n.t('validation.weightMustBePositive'))
    .min(0.01, () => i18n.t('validation.weightMinValue')),
  
  weightUnit: Yup.string()
    .oneOf(['kg', 'g', 'lb', 'oz'], () => i18n.t('validation.invalidWeightUnit')),
  
  // SEO
  metaTitle: Yup.string()
    .max(60, () => i18n.t('validation.metaTitleMaxLength')),
  
  metaDescription: Yup.string()
    .max(160, () => i18n.t('validation.metaDescriptionMaxLength')),
  
  metaKeywords: Yup.array()
    .of(Yup.string()),
  
  // Status
  status: Yup.mixed<ProductStatus>()
    .oneOf(Object.values(ProductStatus), () => i18n.t('validation.invalidProductStatus')),
  
  isActive: Yup.boolean(),
  isFeatured: Yup.boolean(),
});

export type ProductCreateFormValues = Yup.InferType<typeof productCreateSchema>;