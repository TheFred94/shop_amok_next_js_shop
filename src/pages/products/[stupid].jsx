import Head from "next/head";
import Anchor from "@/components/Anchor";
export default function Product({ data }) {
  return (
    <>
      <Head>
        <title>{data.productdisplayname}</title>
      </Head>
      <Anchor href="/">Go back</Anchor>
      <h1>{data.productdisplayname}</h1>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.stupid;
  const api = "https://kea-alt-del.dk/t7/api/products/" + slug;
  const res = await fetch(api);
  /* if (res.status != 200) {
    return {
      notFound: true,
    };
  }
 */
  const data = await res.json();
  console.log(data);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const api = "https://kea-alt-del.dk/t7/api/products/";
  const res = await fetch(api);
  const data = await res.json();

  const paths = data.map((object) => {
    return { params: { stupid: String(object.id) } };
  });

  console.log(data);

  return {
    paths,
    // fallback: false,
  };
}
