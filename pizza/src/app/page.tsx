import {
    Container,
    Filters,
    ProductGroupList,
    Title,
    TopBar,
} from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extralight" />
            </Container>
            <TopBar />
            <Container className="pt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/* Filter */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/* Products list */}
                    <div className="flex-1 gap-8 flex flex-wrap">
                        <div className="flex flex-col gap-16">
                            <ProductGroupList
                                categoryId={1}
                                title="Пицца"
                                items={[
                                    {
                                        id: 1,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 2,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 3,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 4,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 5,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 6,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },                                  {
                                        id: 7,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                ]}
                            />
                        </div>
                        <div className="flex flex-col gap-16">
                            <ProductGroupList
                                categoryId={2}
                                title="Комбо"
                                items={[
                                    {
                                        id: 1,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 2,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 3,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 4,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 5,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                    {
                                        id: 6,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },                                  {
                                        id: 7,
                                        name: "piza",
                                        price: 321,
                                        imageUrl: "https://media.dodostatic.com/image/r:292x292/11eee23f6e2e1634b8788fab140d56b7.avif",
                                        ingredients: "piza pizza pizza",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
