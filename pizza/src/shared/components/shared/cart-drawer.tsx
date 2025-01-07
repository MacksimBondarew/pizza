"use client";

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui";
import Link from "next/link";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { CartDrawerItem } from "./cart-drawer-item";

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
    children,
}) => {
    const state = useCartStore((state) => state);
    React.useEffect(() => {
        state.fetchCartItems();
    }, []);
    const onClickCountButton = async (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        console.log(id, newQuantity)
        state.updateItemQuantity(id, newQuantity);
    };
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">{state.items.length} товара</span>
                    </SheetTitle>
                </SheetHeader>
                <div className="-mx-6 mt-5 overflow-auto flex-1">
                    {state.items.map((item) => (
                        <div key={item.id} className="mb-2">
                            <CartDrawerItem
                                id={item.id}
                                imageUrl={item.imageUrl}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                details={
                                    item.pizzaSize && item.pizzaType
                                        ? getCartItemDetails(
                                            item.pizzaType as PizzaType,
                                            item.pizzaSize as PizzaSize,
                                            item.ingredients
                                        )
                                        : ""
                                }
                                disabled={item.disabled}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                // onClickCountButton={(type) =>
                                //     onClickCountButton(
                                //         item.id,
                                //         item.quantity,
                                //         type
                                //     )
                                // }
                                // onClickRemove={() => removeCartItem(item.id)}
                            />
                        </div>
                    ))}
                </div>
                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                            </span>

                            <span className="font-bold text-lg">
                                {state.totalAmount} ₽
                            </span>
                        </div>

                        <Link href="/checkout">
                            <Button
                                // onClick={() => setRedirecting(true)}
                                // loading={redirecting}
                                type="submit"
                                className="w-full h-12 text-base">
                                    Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
