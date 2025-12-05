import productsData from './products.json';
import categoriesData from './categories.json';
import { IProduct, ICategory, IUser, IOrder, Role } from '@/types';

export const products: IProduct[] = productsData as IProduct[];
export const categories: ICategory[] = categoriesData as ICategory[];

const ORDERS_STORAGE_KEY = 'xview_orders';
const USERS_STORAGE_KEY = 'xview_users';
const USER_ID_COUNTER_KEY = 'xview_user_id_counter';

const getStoredOrders = (): IOrder[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveOrders = (orders: IOrder[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
};

const getStoredUsers = (): (IUser & { password: string })[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: (IUser & { password: string })[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

const getNextUserId = (): number => {
  if (typeof window === 'undefined') return 1;
  const stored = localStorage.getItem(USER_ID_COUNTER_KEY);
  const nextId = stored ? parseInt(stored) + 1 : 1;
  localStorage.setItem(USER_ID_COUNTER_KEY, nextId.toString());
  return nextId;
};

export const DataService = {
  getProducts: (): IProduct[] => {
    return products;
  },

  getProductById: (id: number): IProduct | undefined => {
    return products.find((p) => p.id === id);
  },

  getCategories: (): ICategory[] => {
    return categories;
  },

  registerUser: (userData: {
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string;
  }): IUser => {
    const users = getStoredUsers();
    const existingUser = users.find((u) => u.email === userData.email);

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const newUser: IUser & { password: string } = {
      id: getNextUserId(),
      name: userData.name,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
      role: Role.USER,
      password: userData.password,
      orders: [],
    };

    users.push(newUser);
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  loginUser: (
    email: string,
    password: string
  ): { user: IUser; token: string } => {
    const users = getStoredUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = `local_token_${user.id}_${Date.now()}`;

    return {
      user: userWithoutPassword,
      token,
    };
  },

  createOrder: (userId: number, productIds: number[]): IOrder => {
    const orders = getStoredOrders();
    const orderProducts = productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is IProduct => p !== undefined);

    const newOrder: IOrder = {
      id: orders.length + 1,
      status: 'approved',
      date: new Date(),
      userId,
      products: orderProducts,
    };

    orders.push(newOrder);
    saveOrders(orders);

    return newOrder;
  },

  getUserOrders: (userId: number): IOrder[] => {
    const orders = getStoredOrders();
    return orders
      .filter((o) => o.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
};
