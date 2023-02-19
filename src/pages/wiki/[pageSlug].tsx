import Head from 'next/head'
import { useEffect, useState } from 'react';
import wiki from 'wikipedia/dist'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const page = await wiki.page(router.query.pageSlug as string);
        const content = (await page.summary()).extract_html;

        setTitle(page.title);
        setContent(content);
      } catch (error: any) {
        if ((error.message as string).includes("No page with given title exists")) {
          setTitle("Page not found");
          setContent("The page you are looking for does not exist.");
        }
      }
    }
    load()
  })


  return (
    <>
      <Head>
        <title>{title ? title : 'Loading...'} | Simple Wikipedia</title>
        <meta name="description" content="Simplified Wikipedia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h2 className="title" dangerouslySetInnerHTML={
            { __html: title ? title : 'Loading...' }
          }></h2>
          <div className="content" dangerouslySetInnerHTML={{
            __html: content ? content : ''
          }}></div>
          <Link href="/" className="backButton">Back To Home</Link>
        </div>
      </main>
    </>
  )
}
