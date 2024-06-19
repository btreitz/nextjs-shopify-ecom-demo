import Cart from '@/components/cart/cart';
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
			<Cart encodedProductIds={encodedProductIds || []} />
		</RedirectToCartProducts>
	);
}
