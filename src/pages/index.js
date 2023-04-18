import Head from "next/head";
import { Inter } from "next/font/google";
import Anchor from "@/components/Anchor";

export default function Home({ products }) {
  console.log(products);
  return (
    <>
      <Head>
        <title>Welcome to a random dog page</title>
      </Head>
      <main>
        <h1>Hello from home</h1>
        <ProductList products={products} />
      </main>
    </>
  );
}

function ProductList(props) {
  return (
    <ul>
      <h2>List of products</h2>
      {props.products.map((product) => (
        <Product product={{ ...product }} />
      ))}
    </ul>
  );
}

function Product(props) {
  return (
    <li>
      <article>
        <p>{props.product.productdisplayname}</p>
        <Anchor href={`/products/${props.product.id}`}>Read More</Anchor>
      </article>
    </li>
  );
}

// BACKEND
export async function getServerSideProps() {
  const api = "https://kea-alt-del.dk/t7/api/products/";
  const res = await fetch(api);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      products: data,
    },
  };
}
