import Cart from '@/components/cart/cart';
import CartProductOverview from '@/components/cart/cartProductOverview';
import OrderSummary from '@/components/cart/orderSummary';
import OrderSummaryMobile from '@/components/cart/orderSummaryMobile';
import RedirectToCartProducts from '@/components/redirects/redirectToCartProducts';

type Props = {
	searchParams: {
		ids?: string[] | string;
	};
};

export default function Page({ searchParams }: Props) {
	const { ids: encodedProductIds } = searchParams;

	return (
		<RedirectToCartProducts currentIds={encodedProductIds}>
			{/* @ts-expect-error Server Component */}
			<Cart encodedProductIds={encodedProductIds || []} />
		</RedirectToCartProducts>
	);
}
