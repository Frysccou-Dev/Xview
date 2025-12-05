import ProductView from "@/components/views/products/ProductView";
import { ApiService } from "@/services/api.service";
import { IProduct } from "@/types";

export default async function CatalogPage() {
	let initialProducts: IProduct[] = [];
	let initialError: string | null = null;

	try {
		initialProducts = await ApiService.getProducts();
	} catch (error) {
		initialError = "Error al cargar los productos.";
	}

	return <ProductView initialProducts={initialProducts} initialError={initialError} />;
}
