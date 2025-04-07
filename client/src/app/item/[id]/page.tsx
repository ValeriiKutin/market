import SportProductDetails from "@/src/components/sport-product-details/SportProductDetails";


const page = async ({ params }: any) => {
    const { id } = await params;

    return (
        <SportProductDetails id={id} />
    )
}

export default page
