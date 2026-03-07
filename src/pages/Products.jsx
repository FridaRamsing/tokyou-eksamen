
import products from '../data/products.json';

export default function Products() {
    return (
        <section>
            <h1>Products</h1>
            {products.map((p) => (
                <article key={p.id}>
                    <h2>{p.name}</h2>
                    <p>{p.description}</p>
                    <p>Price: ${p.price}</p>
                </article>
            ))}
        </section>
    )
}