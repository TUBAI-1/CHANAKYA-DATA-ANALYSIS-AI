import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import Spreadsheet from './spreadsheet';

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Chanakya AI Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="flex justify-between items-center w-full">
          <h1 className={styles.title}>Welcome to Chanakya AI Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </div>
        <p className={styles.description}>Your data analysis insights at a glance.</p>
        <Spreadsheet />
      </main>
    </div>
  );
}