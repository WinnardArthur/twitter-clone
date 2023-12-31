import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
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
        <Header label="Home" />
        <Form placeholder="What's happening" />
        <PostFeed />
      </main>
    </>
  );
}
