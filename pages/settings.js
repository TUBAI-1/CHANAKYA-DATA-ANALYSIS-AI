import Link from 'next/link';
import Head from 'next/head';

export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Head>
        <title>Chanakya AI - Settings</title>
        <meta name="description" content="Manage your application settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">Settings</h1>
        <p className="text-lg text-gray-400 mb-8">Customize your experience.</p>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">General Settings</h2>
          <div className="mb-4">
            <label htmlFor="theme" className="block text-gray-300 text-sm font-bold mb-2">Theme:</label>
            <select id="theme" name="theme" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="notifications" className="block text-gray-300 text-sm font-bold mr-2">Email Notifications:</label>
            <input type="checkbox" id="notifications" name="notifications" className="form-checkbox h-5 w-5 text-purple-600" />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Account</h2>
          <div className="mb-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Change Password</button>
          </div>
          <div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete Account</button>
          </div>
        </section>
      </main>

      <nav className="bg-gray-800 p-4 flex justify-around items-center border-t border-gray-700">
        <Link href="/dashboard" className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition duration-300">
          <span className="text-2xl">📊</span>
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link href="/analytics" className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition duration-300">
          <span className="text-2xl">📈</span>
          <span className="text-xs mt-1">Analytics</span>
        </Link>
        <Link href="/ai-assistant" className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition duration-300">
          <img src="/ai-icon.svg" alt="AI" className="w-6 h-6" />
          <span className="text-xs mt-1">AI Assistant</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center text-purple-400">
          <span className="text-2xl">⚙️</span>
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
}