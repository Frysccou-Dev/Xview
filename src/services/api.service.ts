import {
  CreateOrderData,
  IOrder,
  IProduct,
  IUser,
  LoginData,
  LoginResponse,
  RegisterData,
} from '../types';
import { DataService } from '@/data';
import { StorageService } from './storage.service';

export const ApiService = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const result = DataService.loginUser(data.email, data.password);
    StorageService.setToken(result.token);
    StorageService.setUserData(result.user);
    return {
      login: true,
      user: result.user,
      token: result.token,
    };
  },

  register: async (data: RegisterData): Promise<IUser> => {
    return DataService.registerUser({
      email: data.email,
      password: data.password,
      name: data.name,
      address: data.address,
      phone: data.phone,
    });
  },

  getCurrentUser: async (): Promise<IUser | null> => {
    const userData = StorageService.getUserData();
    return userData as IUser;
  },

  getProducts: async (): Promise<IProduct[]> => {
    return DataService.getProducts();
  },

  createOrder: async (data: CreateOrderData): Promise<IOrder> => {
    const userData = StorageService.getUserData();
    if (!userData) throw new Error('Usuario no autenticado');

    const productIds = data.products.map((p) => p.id);
    return DataService.createOrder(userData.id, productIds);
  },

  getUserOrders: async (): Promise<IOrder[]> => {
    const userData = StorageService.getUserData();
    if (!userData) throw new Error('Usuario no autenticado');

    return DataService.getUserOrders(userData.id);
  },

  logout: (): void => {
    StorageService.clearSession();
    StorageService.clearCart();
  },
};
