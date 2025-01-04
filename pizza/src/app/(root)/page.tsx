import {
    Container,
    Filters,
    ProductsGroupList,
    TopBar,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true,
                },
            },
        },
    });
    return (
        <>
            <TopBar categories={categories.filter((category) => category.products.length > 0)} />
            <Container className="pt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/* Filter */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/* Products list */}
                    <div className="flex-1 gap-8 flex flex-wrap">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            categoryId={category.id}
                                            title={category.name}
                                            key={category.name}
                                            items={category.products}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
