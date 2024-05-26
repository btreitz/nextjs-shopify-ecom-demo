import CartProductList from '@/components/cart/cartProductOverview';
import CheckoutButton from '@/components/cart/checkoutButton';

type Props = {};

export default function Page({}: Props) {
	const SHIPPING_COST = 50;

	return (
		<div className=" w-full max-w-[1680px] md:px-12">
			<div className=" md:flex md:gap-12">
				<div className=" w-full relative md:w-3/5">
					<CartProductList />
				</div>
				<div className="md:w-2/5 flex flex-col pb-8">
					<div className=" p-4 w-full md:p-8 md:bg-light sticky top-20">
						<div className=" hidden md:block">
							<h1 className=" text-3xl font-light py-2">Order Summary</h1>
							<div className=" py-4">
								<div className=" flex justify-between">
									<div>Subtotal</div>
									<div>1000 €</div>
								</div>
								<div className=" h-[1px] w-full bg-gray-200 my-4" />
								<div className=" flex justify-between">
									<div>Shipping</div>
									<div>{SHIPPING_COST} €</div>
								</div>
								<div className=" h-[1px] w-full bg-gray-200 my-4" />
								<div className=" flex justify-between">
									<div>Total</div>
									<div>1050 €</div>
								</div>
							</div>
						</div>

						<div className=" hidden md:block pt-8">
							<CheckoutButton className=" rounded-lg w-full bg-primary text-center p-3 text-white hover:opacity-80 hover:cursor-pointer transition-opacity duration-150" />
						</div>
					</div>
				</div>
			</div>

			<div className=" md:hidden fixed bottom-0 w-full flex flex-col bg-light bg-opacity-95 text-primary p-4 z-20 border-t">
				<div className=" flex flex-col pb-4 px-1">
					<div className=" text-lg">Order Summary</div>
					<div className=" text-sm py-3">
						<div className=" flex justify-between">
							<div>Subtotal</div>
							<div>1000 €</div>
						</div>
						<div className=" flex justify-between">
							<div>Shipping</div>
							<div>50 €</div>
						</div>
						<div className=" flex justify-between">
							<div>Total</div>
							<div>1050 €</div>
						</div>
					</div>
				</div>
				<div className=" w-full">
					<CheckoutButton className=" rounded-lg w-full bg-primary text-center p-3 text-white hover:opacity-80 hover:cursor-pointer transition-opacity duration-150" />
				</div>
			</div>
		</div>
	);
}
