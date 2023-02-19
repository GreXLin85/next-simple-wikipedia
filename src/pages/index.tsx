import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import wiki from 'wikipedia/dist'

export default function Home() {
  const [title, setTitle] = useState('');
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    async function search() {
      if (title.length > 3) {
        const search = await wiki.search(title);

        const searchTitles = search.results.map((item: any) => item.title);

        setSearchList(searchTitles as any);
      }else {
        setSearchList([]);
      }

    }
    search()
  }, [title])

  return (
    <>
      <Head>
        <title>Simple Wikipedia</title>
        <meta name="description" content="Simplified Wikipedia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h1>Simple Wiki</h1>
          <h3>Search Something</h3>
          <input type="text" onChange={(e) => setTitle(e.target.value)} className="searchInput" />
          <div className='dataList' style={{
            display: searchList.length > 3 ? 'block' : 'none'
          }}>
            {searchList.map((item: any, index: number) => (
              <Link href={`/wiki/${item}`} key={index}>
                <div className="dataListElement">
                  {item}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
