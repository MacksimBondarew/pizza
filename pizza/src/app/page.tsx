import { Container, Filters, Title, TopBar } from "@/components/shared";

export default function Home() {
    return <>
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
                <div className="flex-1">
                    <div className="flex flex-col gap-16">Список товаров</div>
                </div>
            </div>
        </Container>
    </>;
}
