
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

export async function getProducts() {
    const res = await fetch(`${API_URL}/api/products`);

    const data = await res.json();

    if(!res.ok) {
        throw {
            message: data.message || "Fehler beim Laden",
        };
    }
    return data.products;
}

export async function deleteProduct(id: string) {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Fehler beim Löschen");
    }

    return data;
}

export async function updateProduct(
    id: string,
    product: {
        name: string;
        price: string;
        image: string;
    }
) {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
        }),
      });
    
      const data = await res.json();
      console.log("UPDATE RESPONSE:", data);
    
      if (!res.ok) {
        throw new Error(data.message || "Fehler beim Bearbeiten");
      }
    
      return data.data;
    }