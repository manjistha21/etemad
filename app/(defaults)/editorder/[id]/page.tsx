import EditOrderForm from "../../EditOrderForm";


const getOrderById = async (id:any) => {



    try {
        const url = `/api/order/${id}`;
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch order");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching order:", error);
        return null; 
    } 
};

export default async function EditOrder({ params }:any) {
    const { id } = params;

    try {
        const  orderData = await getOrderById(id);
        
        if (!orderData) {
            return <div>Error: Failed to fetch order</div>;
        }

        const { tags,customer,reasonfortransfer,foreigncurrency, country, sourceoffunds } = orderData;

        return (
            <EditOrderForm
                id={id}
                tags={tags}
                customer={customer}
                reasonfortransfer={reasonfortransfer}
                foreigncurrency={foreigncurrency}
                country={country}
                sourceoffunds ={sourceoffunds }
            />
        );
    } catch (error) {
        console.error("Error fetching order:", error);
        return <div>Error: Failed to fetch order</div>;
    }
}
