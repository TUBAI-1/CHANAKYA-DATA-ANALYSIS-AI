import Link from 'next/link';
import Head from 'next/head';

export default function Analytics() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Head>
        <title>Chanakya AI - Analytics</title>
        <meta name="description" content="Advanced analytics for your spreadsheet data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">Analytics Dashboard</h1>
        <p className="text-lg text-gray-400 mb-8">Data insights from your spreadsheet</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <span className="text-4xl mb-2">📈</span>
            <p className="text-gray-300 text-sm">Sum</p>
            <p className="text-2xl font-bold text-green-400">0.00</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <span className="text-4xl mb-2">📊</span>
            <p className="text-gray-300 text-sm">Average</p>
            <p className="text-2xl font-bold text-blue-400">0.00</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <span className="text-4xl mb-2">📈</span>
            <p className="text-gray-300 text-sm">Maximum</p>
            <p className="text-2xl font-bold text-yellow-400">0.00</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <span className="text-4xl mb-2">📉</span>
            <p className="text-gray-300 text-sm">Minimum</p>
            <p className="text-2xl font-bold text-red-400">0.00</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Data Summary</h2>
          <p className="text-gray-300">Total Cells: 1</p>
          <p className="text-gray-300">Numeric Values: 0</p>
          <p className="text-gray-300">Non-empty Cells: 1</p>
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center">
          <span className="mr-2 text-xl">⚡</span> Generate AI Insights
        </button>
      </main>

      <nav className="bg-gray-800 p-4 flex justify-around items-center border-t border-gray-700">
        <Link href="/dashboard" className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition duration-300">
          <span className="text-2xl">📊</span>
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link href="/analytics" className="flex flex-col items-center text-purple-400">
          <span className="text-2xl">📈</span>
          <span className="text-xs mt-1">Analytics</span>
        </Link>
        <Link href="/ai-assistant" className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition duration-300">
          <img src="/ai-icon.svg" alt="AI" className="w-6 h-6" />
          <span className="text-xs mt-1">AI Assistant</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition duration-300">
          <span className="text-2xl">⚙️</span>
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
}