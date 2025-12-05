import ProductDetailsContent from "@/components/views/content/ProductDetailsContent";

export default function ProductDetailView({
	productId,
}: {
	productId: string;
}) {
	return <ProductDetailsContent productId={productId} />;
}
