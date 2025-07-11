import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/AIAssistant.module.css';

export default function AIAssistant() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spreadsheetData, setSpreadsheetData] = useState(null);
  const chatboxRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem('spreadsheetData');
    if (storedData) {
      setSpreadsheetData(JSON.parse(storedData));
    }

    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (message === "") return;

    const newUserMessage = ['User', message];
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setUserInput('');
    setLoading(true);

    const promptToSend = spreadsheetData ? `Analyze the following spreadsheet data: ${JSON.stringify(spreadsheetData)}. ${message}` : message;

    try {
      const response = await fetch('https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm9ZNDlUUXhRX1BxdzdNb0JBYWFNdjRHbGhPLXp6YkVJRlpoMG5DeWUweHphS3VtN1FUbWZ6YUFpODNOVk1NNmp0LXVxOFhjN2p5aHFrUEJ1Yl94S3cyRF9hRVE9PQ==', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptToSend }),
      });
      const data = await response.json();

      setLoading(false);
      if (data.status === "success") {
        const aiMessage = ['CHANAKYA GPT', data.text];
        setChatHistory((prevHistory) => [...prevHistory, aiMessage]);
      } else {
        console.error('Error response from API:', data);
        const errorMessage = ['CHANAKYA GPT', data.error || 'Sorry, there was an error processing your request.'];
        setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
      const errorMessage = ['CHANAKYA GPT', 'Unable to connect to the server. Please try again later.'];
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CHANAKYA GPT</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.3/dist/tailwind.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-gray-100 leading-normal tracking-normal">
        <div className="max-w-2xl mx-auto p-4">
          <header style={{ backgroundColor: '#d9f0ff' }} className="text-center p-4 rounded">
            <h1 className="text-2xl font-bold">CHANAKYA GPT</h1>
            <p className="text-sm">Experience AI Conversations</p>
          </header>

          <div id="chatbox" ref={chatboxRef} className="bg-white shadow-md rounded p-4 mt-6 h-96 overflow-y-scroll">
            {chatHistory.length === 0 && !loading && (
              <div className={styles.initialMessage}>
                Hello! I'm your AI assistant for Chanakya AI. I can help you with formulas, data analysis, and spreadsheet insights. What would you like to know?
              </div>
            )}
            {chatHistory.map(([sender, msg], index) => (
              <div key={index} className="mb-4">
                {sender === 'User' ? (
                  <div className="text-right">
                    <span style={{ backgroundColor: '#a3d5ff' }} className="text-white p-2 rounded-lg inline-block">{msg}</span>
                  </div>
                ) : (
                  <div className="text-left">
                    <span style={{ backgroundColor: '#83c9f4' }} className="text-white p-2 rounded-lg inline-block">{msg}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center mt-4">
            <input
              id="userInput"
              type="text"
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-l"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              disabled={loading}
            />
            <button onClick={sendMessage} style={{ backgroundColor: '#a3d5ff' }} className="text-white p-2 rounded-r" disabled={loading}>
              Send
            </button>
            {loading && <div id="spinner" className={styles.spinner + ' ml-2'}></div>}
          </div>
        </div>
      </div>
    </div>
  );
}