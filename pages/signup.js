import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, simulate a successful sign-up
    if (password === confirmPassword) {
      // In a real application, you would send this data to your backend
      console.log('Sign Up Data:', { name, email, password });
      router.push('/dashboard');
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Chanakya AI - Sign Up</title>
        <meta name="description" content="Sign up for Chanakya AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Chanakya AI</h1>
          <p className={styles.subtitle}>Create your account</p>
          {/* Add sign-up form elements here */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
          <p className={styles.linkText}>
            Already have an account? <a href="/signin" className={styles.link}>Sign In</a>
          </p>
        </div>
      </main>
    </div>
  );
}