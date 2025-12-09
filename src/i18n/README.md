# Internationalization (i18n) Guide for Ordify

This guide explains how to use the internationalization (i18n) system to translate components throughout the Ordify application.

## Overview

The application uses `react-i18next` for internationalization with support for:
- English (en) - Default
- Arabic (ar) - RTL support
- Spanish (es)
- French (fr)

## Quick Start

### 1. Import the translation hook in your component:

```typescript
import { useTranslation } from 'react-i18next';
```

### 2. Initialize the translation hook:

```typescript
const { t } = useTranslation();
```

### 3. Use translations in your component:

```typescript
<h1>{t('dashboard.title')}</h1>
<p>{t('common.welcome')}</p>
```

## Step-by-Step Guide to Translate a Component

### Example: Translating a Product List Component

**Before (without translation):**

```typescript
import React from 'react';

export function ProductList() {
  return (
    <div>
      <h1>Products</h1>
      <button>Add Product</button>
      <p>Showing 10 products</p>
    </div>
  );
}
```

**After (with translation):**

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

export function ProductList() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('products.title')}</h1>
      <button>{t('products.addProduct')}</button>
      <p>{t('products.showingCount', { count: 10 })}</p>
    </div>
  );
}
```

## Adding New Translation Keys

### 1. Add keys to all language files:

**src/i18n/locales/en/translation.json:**
```json
{
  "products": {
    "title": "Products",
    "addProduct": "Add Product",
    "showingCount": "Showing {{count}} products"
  }
}
```

**src/i18n/locales/ar/translation.json:**
```json
{
  "products": {
    "title": "المنتجات",
    "addProduct": "إضافة منتج",
    "showingCount": "عرض {{count}} منتجات"
  }
}
```

**src/i18n/locales/es/translation.json:**
```json
{
  "products": {
    "title": "Productos",
    "addProduct": "Añadir producto",
    "showingCount": "Mostrando {{count}} productos"
  }
}
```

**src/i18n/locales/fr/translation.json:**
```json
{
  "products": {
    "title": "Produits",
    "addProduct": "Ajouter un produit",
    "showingCount": "Affichage de {{count}} produits"
  }
}
```

## Advanced Features

### 1. Interpolation (Dynamic Values)

```typescript
// In translation file:
"welcome": "Welcome, {{name}}!"

// In component:
{t('welcome', { name: userName })}
```

### 2. Pluralization

```typescript
// In translation file:
"items": {
  "one": "{{count}} item",
  "other": "{{count}} items"
}

// In component:
{t('items', { count: itemCount })}
```

### 3. Nested Keys

```typescript
// Access nested translations:
{t('settings.general.storeName')}
```

### 4. Default Values

```typescript
// Provide fallback if translation is missing:
{t('missingKey', 'Default text')}
```

### 5. Formatting

```typescript
// Date formatting:
{t('date', { date: new Date(), formatParams: { date: { weekday: 'long' } } })}

// Number formatting:
{t('price', { value: 99.99, formatParams: { value: { style: 'currency', currency: 'USD' } } })}
```

## Language Switching

The `LangSwitcher` component is already integrated in the header. To add it elsewhere:

```typescript
import LangSwitcher from '@/components/common/LangSwitcher';
// or for compact version:
import { LangSwitcherCompact } from '@/components/common/LangSwitcher';

// Use in your component:
<LangSwitcher />
```

## RTL Support

Arabic language automatically switches the document direction to RTL. The language switcher handles this automatically.

## Best Practices

1. **Organize translations by feature/module:**
   ```json
   {
     "dashboard": { ... },
     "products": { ... },
     "orders": { ... },
     "settings": { ... }
   }
   ```

2. **Keep translation keys descriptive:**
   - Good: `products.editProduct.saveButton`
   - Bad: `btn1`

3. **Use consistent naming conventions:**
   - Titles: `*.title`
   - Buttons: `*.saveButton`, `*.cancelButton`
   - Messages: `*.successMessage`, `*.errorMessage`
   - Placeholders: `*.placeholder`
   - Tooltips: `*.tooltip`

4. **Extract all hardcoded strings:**
   - Search for quoted strings in JSX
   - Replace with translation keys
   - Don't forget `alt` attributes, `aria-label`, `placeholder`, etc.

5. **Handle missing translations gracefully:**
   - Always test with different languages
   - Provide meaningful fallbacks
   - Use development mode to spot missing keys

## Common Translation Patterns

### Forms
```typescript
<form>
  <label>{t('forms.email.label')}</label>
  <input placeholder={t('forms.email.placeholder')} />
  <span className="error">{t('forms.email.error')}</span>
  <button type="submit">{t('common.save')}</button>
</form>
```

### Tables
```typescript
<table>
  <thead>
    <tr>
      <th>{t('table.columns.name')}</th>
      <th>{t('table.columns.price')}</th>
      <th>{t('table.columns.actions')}</th>
    </tr>
  </thead>
</table>
```

### Dialogs/Modals
```typescript
<Dialog>
  <DialogTitle>{t('dialog.confirmDelete.title')}</DialogTitle>
  <DialogContent>{t('dialog.confirmDelete.message')}</DialogContent>
  <DialogActions>
    <Button>{t('common.cancel')}</Button>
    <Button>{t('common.confirm')}</Button>
  </DialogActions>
</Dialog>
```

### Notifications/Toasts
```typescript
// Success
toast.success(t('messages.saveSuccess'));

// Error
toast.error(t('messages.error'));
```

## Testing Translations

1. **Check all languages:** Switch between languages to ensure all keys are translated
2. **Test RTL:** Verify Arabic layout displays correctly
3. **Test interpolation:** Ensure dynamic values work in all languages
4. **Check pluralization:** Test with different counts

## Adding a New Language

1. Create a new translation file: `src/i18n/locales/[lang]/translation.json`
2. Copy structure from an existing language file
3. Update `src/i18n/i18n.ts` to import the new language
4. Add language to `LangSwitcher` component

## Troubleshooting

### Translation not showing:
- Check if key exists in translation file
- Verify correct key path (use dots for nesting)
- Ensure useTranslation hook is imported

### Wrong language displayed:
- Check browser language settings
- Clear localStorage (language preference is stored there)
- Verify i18n initialization in main.tsx

### RTL issues:
- Ensure document.dir is set correctly
- Check CSS for hardcoded left/right values
- Use logical properties (start/end instead of left/right)

## Resources

- [react-i18next documentation](https://react.i18next.com/)
- [i18next documentation](https://www.i18next.com/)
- Translation files location: `/src/i18n/locales/`
- Language switcher component: `/src/components/common/LangSwitcher.tsx`

---

For questions or issues, please refer to the main project documentation or contact the development team.