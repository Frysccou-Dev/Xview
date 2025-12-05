import ProductDetailView from '@/components/views/products/[productID]/ProductDetailView';

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <ProductDetailView productId={productId} />;
}
