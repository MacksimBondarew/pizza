type ProductPageProps = {
    params: {
        id: string;
    };
};

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = params;
    return <p>Product {id}</p>;
}
