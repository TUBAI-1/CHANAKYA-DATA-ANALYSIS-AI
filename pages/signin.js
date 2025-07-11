import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Auth.module.css';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Chanakya AI - Sign In</title>
        <meta name="description" content="Sign in to Chanakya AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Chanakya AI</h1>
          <p className={styles.subtitle}>Welcome back</p>
          {/* Add sign-in form elements here */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className={styles.button}>Sign In</Button>
          </form>
          <p className={styles.linkText}>
            Don't have an account? <a href="/signup" className={styles.link}>Sign Up</a>
          </p>
        </div>
      </main>
    </div>
  );
}