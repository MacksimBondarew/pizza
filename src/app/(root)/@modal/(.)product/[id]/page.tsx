import { ChooseProductModal } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
    params,
}: {
    params: { id: string };
}) {
    // Convert params.id to a number directly
    const id = Number(params.id);

    if (isNaN(id)) {
        return notFound(); // Handle invalid ID gracefully
    }

    // Query the database for the product
    const product = await prisma.product.findFirst({
        where: {
            id,
        },
        include: {
            ingredients: true,
            items: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} />;
}
