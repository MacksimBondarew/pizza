import {
    Container,
    GroupVariants,
    ProductImage,
    Title,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type ProductPageProps = {
    params: {
        id: string;
    };
};

export default async function ProductPage({
    params: { id },
}: ProductPageProps) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
    });
    if (!product) {
        return notFound();
    }
    return (
        <Container className="flex flex-col my-10">
            <div className="flex">
                <ProductImage imageUrl={product.imageUrl} size={20} />
                <div className="max-w-[490px] bg-[#FCFCFC] gap-10">
                    <Title
                        size="md"
                        className="font-bold"
                        text={product.name}
                    />
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis, non? Sapiente corporis nam perspiciatis quas
                        asperiores eum consequatur inventore at repellendus ex,
                        quod a repudiandae quibusdam laudantium facilis est
                        praesentium?
                    </p>
                    <GroupVariants
                        value="2"
                        items={[
                            {
                                name: "Small",
                                value: "1",
                            },
                            {
                                name: "Medium",
                                value: "2",
                            },
                            {
                                name: "Large",
                                value: "3",
                            },
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
