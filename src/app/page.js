import SpinningBall from '@/components/SpinningBall';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spinning Ball with React Three Fiber</title>
        <meta name='description' content='A spinning ball using React Three Fiber in Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'transparent' }}>
        <SpinningBall />
      </main>
    </div>
  );
}
