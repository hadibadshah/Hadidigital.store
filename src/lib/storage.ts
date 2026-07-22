import { Product, Article, Order, StoreSettings } from '../types';
import { initialProducts, initialArticles, initialOrders, initialSettings } from '../data/initialData';

const KEYS = {
  PRODUCTS: 'hds_products_v1',
  ARTICLES: 'hds_articles_v1',
  ORDERS: 'hds_orders_v1',
  SETTINGS: 'hds_settings_v1',
};

export const getSettings = (): StoreSettings => {
  try {
    const data = localStorage.getItem(KEYS.SETTINGS);
    if (data) {
      return { ...initialSettings, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Error reading settings from localStorage', e);
  }
  return initialSettings;
};

export const saveSettings = (settings: StoreSettings): void => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
};

export const getProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading products from localStorage', e);
  }
  return initialProducts;
};

export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products to localStorage', e);
  }
};

export const getArticles = (): Article[] => {
  try {
    const data = localStorage.getItem(KEYS.ARTICLES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading articles from localStorage', e);
  }
  return initialArticles;
};

export const saveArticles = (articles: Article[]): void => {
  try {
    localStorage.setItem(KEYS.ARTICLES, JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving articles to localStorage', e);
  }
};

export const getOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(KEYS.ORDERS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
  }
  return initialOrders;
};

export const saveOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage', e);
  }
};

export const addOrder = (newOrder: Omit<Order, 'id' | 'date' | 'status'>): Order => {
  const currentOrders = getOrders();
  const id = `HDS-${Math.floor(1000 + Math.random() * 9000)}`;
  const date = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const order: Order = {
    ...newOrder,
    id,
    date,
    status: 'Pending',
  };
  const updated = [order, ...currentOrders];
  saveOrders(updated);
  return order;
};

export const resetAllData = (): void => {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
  localStorage.setItem(KEYS.ARTICLES, JSON.stringify(initialArticles));
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialSettings));
};
