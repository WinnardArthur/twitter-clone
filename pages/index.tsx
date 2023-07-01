import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl text-white">Initial Setup</h1>
      </main>
    </>
  );
}
