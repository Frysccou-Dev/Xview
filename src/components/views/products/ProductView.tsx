import ProductContent from "@/components/views/content/ProductContent";
import { IProduct } from "@/types";

interface ProductViewProps {
	initialProducts: IProduct[];
	initialError: string | null;
}

export default function ProductView({
	initialProducts,
	initialError,
}: ProductViewProps) {
	return (
		<div className="container mx-auto py-8 px-4">
			<ProductContent
				initialProducts={initialProducts}
				initialError={initialError}
			/>
		</div>
	);
}
