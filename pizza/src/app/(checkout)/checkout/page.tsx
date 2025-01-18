import {
    CheckoutItemDetails,
    Title,
    WhiteBlock,
} from "@/shared/components/shared";

export default function CheckOutPage() {
    return (
        <>
            <Title
                text="Оформление заказа"
                className="font-extrabold mb-8 text-[36px]"
            />
            <div className="flex gap-10">
                <WhiteBlock>few</WhiteBlock>

                {/* Правая часть */}
                <div className="w-[250px]">
                    <WhiteBlock>
                        <CheckoutItemDetails title="details" value={321} />
                    </WhiteBlock>
                </div>
            </div>
        </>
    );
}
