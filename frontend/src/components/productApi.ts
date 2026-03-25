
const API_URL = import.meta.env.VITE_API_URL;

export async function createProduct(product: {
    name: string;
    price: string;
    image: string;
}) {
    const res = await fetch (`${API_URL}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...product,
            price: Number(product.price),
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw {
          message: data.message || "Fehler beim Erstellen",
          errors: data.errors || [],
        };
    }

    return data;
    
}