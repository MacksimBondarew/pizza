import {
    Container,
    Filters,
    ProductsGroupList,
    TopBar,
} from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import { Stories } from "@/shared/components/shared/stories";

export default async function Home({
    searchParams,
}: {
    searchParams: GetSearchParams;
}) {
    const categories = await findPizzas(searchParams);
    return (
        <>
            <TopBar
                categories={categories.filter(
                    (category) => category.products.length > 0
                )}
            />
            <Stories />
            <Container className="pt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/* Filter */}
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters />
                        </Suspense>
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
