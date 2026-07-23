import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  writeBatch,
  deleteDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Product, Article, Order, StoreSettings } from '../types';
import { initialProducts, initialArticles, initialOrders, initialSettings } from '../data/initialData';

const KEYS = {
  PRODUCTS: 'hds_products_v1',
  ARTICLES: 'hds_articles_v1',
  ORDERS: 'hds_orders_v1',
  SETTINGS: 'hds_settings_v1',
};

// LocalStorage Fallbacks
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
    // Sync to Firestore asynchronously
    setDoc(doc(db, 'settings', 'general'), settings).catch((err) => {
      console.error('Error saving settings to Firestore:', err);
    });
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

export const saveProducts = async (products: Product[]): Promise<void> => {
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));

    // Sync to Firestore
    const batch = writeBatch(db);
    products.forEach((prod) => {
      const ref = doc(db, 'products', String(prod.id));
      batch.set(ref, prod, { merge: true });
    });

    // Clean up deleted products if any
    const existingSnap = await getDocs(collection(db, 'products'));
    const currentIds = new Set(products.map((p) => String(p.id)));
    existingSnap.docs.forEach((d) => {
      if (!currentIds.has(d.id)) {
        batch.delete(d.ref);
      }
    });

    await batch.commit();
  } catch (e) {
    console.error('Error saving products to Firestore/localStorage', e);
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

export const saveArticles = async (articles: Article[]): Promise<void> => {
  try {
    localStorage.setItem(KEYS.ARTICLES, JSON.stringify(articles));

    const batch = writeBatch(db);
    articles.forEach((art) => {
      const ref = doc(db, 'articles', String(art.id));
      batch.set(ref, art, { merge: true });
    });

    const existingSnap = await getDocs(collection(db, 'articles'));
    const currentIds = new Set(articles.map((a) => String(a.id)));
    existingSnap.docs.forEach((d) => {
      if (!currentIds.has(d.id)) {
        batch.delete(d.ref);
      }
    });

    await batch.commit();
  } catch (e) {
    console.error('Error saving articles to Firestore/localStorage', e);
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

export const saveOrders = async (orders: Order[]): Promise<void> => {
  try {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));

    const batch = writeBatch(db);
    orders.forEach((ord) => {
      const ref = doc(db, 'orders', ord.id);
      batch.set(ref, ord, { merge: true });
    });
    await batch.commit();
  } catch (e) {
    console.error('Error saving orders to Firestore/localStorage', e);
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
  
  // Local cache
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));

  // Write directly to Firestore
  setDoc(doc(db, 'orders', order.id), order).catch((err) => {
    handleFirestoreError(err, OperationType.WRITE, `orders/${order.id}`);
  });

  return order;
};

export const resetAllData = async (): Promise<void> => {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
  localStorage.setItem(KEYS.ARTICLES, JSON.stringify(initialArticles));
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialSettings));

  await saveProducts(initialProducts);
  await saveArticles(initialArticles);
  await saveOrders(initialOrders);
  saveSettings(initialSettings);
};

// Seed initial data if Firestore is empty
const seedFirestoreIfEmpty = async () => {
  try {
    const prodSnap = await getDocs(collection(db, 'products'));
    if (prodSnap.empty) {
      console.log('Seeding initial products into Firestore...');
      await saveProducts(initialProducts);
    }

    const artSnap = await getDocs(collection(db, 'articles'));
    if (artSnap.empty) {
      console.log('Seeding initial articles into Firestore...');
      await saveArticles(initialArticles);
    }

    const setSnap = await getDocs(collection(db, 'settings'));
    if (setSnap.empty) {
      console.log('Seeding initial settings into Firestore...');
      saveSettings(initialSettings);
    }
  } catch (err) {
    console.warn('Unable to seed initial Firestore data automatically:', err);
  }
};

// Real-time Firestore Subscriptions
export const subscribeToFirestore = (callbacks: {
  onProducts: (products: Product[]) => void;
  onArticles: (articles: Article[]) => void;
  onOrders: (orders: Order[]) => void;
  onSettings: (settings: StoreSettings) => void;
}) => {
  seedFirestoreIfEmpty();

  // Products real-time listener
  const unsubProducts = onSnapshot(
    collection(db, 'products'),
    (snapshot) => {
      if (!snapshot.empty) {
        const prods = snapshot.docs.map((doc) => doc.data() as Product);
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(prods));
        callbacks.onProducts(prods);
      }
    },
    (err) => handleFirestoreError(err, OperationType.GET, 'products')
  );

  // Articles real-time listener
  const unsubArticles = onSnapshot(
    collection(db, 'articles'),
    (snapshot) => {
      if (!snapshot.empty) {
        const arts = snapshot.docs.map((doc) => doc.data() as Article);
        localStorage.setItem(KEYS.ARTICLES, JSON.stringify(arts));
        callbacks.onArticles(arts);
      }
    },
    (err) => handleFirestoreError(err, OperationType.GET, 'articles')
  );

  // Orders real-time listener
  const unsubOrders = onSnapshot(
    collection(db, 'orders'),
    (snapshot) => {
      if (!snapshot.empty) {
        const ords = snapshot.docs.map((doc) => doc.data() as Order);
        localStorage.setItem(KEYS.ORDERS, JSON.stringify(ords));
        callbacks.onOrders(ords);
      }
    },
    (err) => handleFirestoreError(err, OperationType.GET, 'orders')
  );

  // Settings real-time listener
  const unsubSettings = onSnapshot(
    doc(db, 'settings', 'general'),
    (snapshot) => {
      if (snapshot.exists()) {
        const setts = { ...initialSettings, ...snapshot.data() } as StoreSettings;
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(setts));
        callbacks.onSettings(setts);
      }
    },
    (err) => handleFirestoreError(err, OperationType.GET, 'settings/general')
  );

  return () => {
    unsubProducts();
    unsubArticles();
    unsubOrders();
    unsubSettings();
  };
};
