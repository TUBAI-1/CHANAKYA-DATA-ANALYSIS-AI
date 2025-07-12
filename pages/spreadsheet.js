import Head from 'next/head';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FixedSizeGrid } from 'react-window';
import Link from 'next/link';

export default function Spreadsheet() {
  const NUM_ROWS = 1000;
  const NUM_COLUMNS = 2000;
  const COLUMN_WIDTH = 80; // pixels
  const ROW_HEIGHT = 25; // pixels

  const [gridData, setGridData] = useState(
    Array(NUM_ROWS)
      .fill(null)
      .map((_, rowIndex) =>
        Array(NUM_COLUMNS).fill(null).map((_, colIndex) => {
          return { value: '' };
        })
      )
  );
  const [selectedCell, setSelectedCell] = useState('A1');
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);
  const gridRef = useRef(null);
  const rowHeaderRef = useRef(null);

  const generateColumnHeaders = (count) => {
    const headers = [];
    for (let i = 0; i < count; i++) {
      let column = '';
      let num = i;
      while (num >= 0) {
        column = String.fromCharCode((num % 26) + 65) + column;
        num = Math.floor(num / 26) - 1;
      }
      headers.push(column);
    }
    return headers;
  };

  const columnHeaders = generateColumnHeaders(NUM_COLUMNS);
  const rowHeaders = Array.from({ length: NUM_ROWS }, (_, i) => i + 1);


  const handleCellClick = useCallback((rowIndex, colIndex) => {
    setSelectedCell(`${columnHeaders[colIndex]}${rowHeaders[rowIndex]}`);
    setInputValue(gridData[rowIndex][colIndex].value);
    inputRef.current?.focus();
  }, [gridData, columnHeaders, rowHeaders]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      const [colChar, ...rowNumArr] = selectedCell.split('');
      const colIndex = colChar.charCodeAt(0) - 65;
      const rowIndex = parseInt(rowNumArr.join('')) - 1;

      const newGridData = [...gridData];
      newGridData[rowIndex][colIndex] = { value: inputValue };
      setGridData(newGridData);
    }
  }, [selectedCell, inputValue, gridData]);

  const handleOpenAIAssistant = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('spreadsheetData', JSON.stringify(gridData));
      window.location.href = '/ai-assistant';
    }
  };

  const Cell = useCallback(({ rowIndex, columnIndex, style }) => {
    const cellValue = gridData[rowIndex][columnIndex].value;
    const isSelected = selectedCell === `${columnHeaders[columnIndex]}${rowHeaders[rowIndex]}`;

    return (
      <div
        style={style}
        className={`w-20 h-8 border border-gray-700 flex items-center justify-center text-sm ${isSelected ? 'bg-purple-700 border-purple-500' : 'hover:bg-gray-700'}`}
        onClick={() => handleCellClick(rowIndex, columnIndex)}
      >
        {cellValue}
      </div>
    );
  }, [gridData, selectedCell, handleCellClick, columnHeaders, rowHeaders]);

  const RowHeader = useCallback(({ index, style }) => (
    <div style={style} className="h-8 flex items-center justify-center border-b border-gray-700 text-gray-400 font-semibold text-sm">
      {rowHeaders[index]}
    </div>
  ), [rowHeaders]);

  const ColumnHeader = useCallback(({ index, style }) => (
    <div style={style} className="h-8 flex items-center justify-center border-b border-gray-700 text-gray-400 font-semibold text-sm">
      {columnHeaders[index]}
    </div>
  ), [columnHeaders]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Head>
        <title>Chanakya AI - Spreadsheet</title>
        <meta name="description" content="Chanakya AI Spreadsheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-2">Chanakya AI</h1>
          <p className="text-lg text-gray-400">Intelligent Spreadsheet</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 flex items-center space-x-2">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm">B</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm">I</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm">U</button>
          <div className="border-l border-gray-700 h-6"></div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm">☰</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm">≡</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm">≣</button>
          <div className="border-l border-gray-700 h-6"></div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm">🎨</button>
        </div>

        <div className="bg-gray-800 p-3 rounded-lg shadow-lg mb-4 flex items-center">
          <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded mr-2 text-sm font-mono">{selectedCell}</span>
          <input
            type="text"
            className="flex-1 bg-gray-700 text-gray-100 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={inputRef}
          />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <div className="w-12 flex-shrink-0 border-r border-gray-700">
              <div className="h-8"></div> {/* Corner empty cell */}
              <FixedSizeGrid
                columnCount={1}
                columnWidth={50}
                height={typeof window !== 'undefined' ? window.innerHeight - 280 : 500} // Adjust height as needed
                rowCount={NUM_ROWS}
                rowHeight={ROW_HEIGHT}
                width={50}
                ref={rowHeaderRef}
              >
                {RowHeader}
              </FixedSizeGrid>
            </div>
            <div className="flex-1">
              <FixedSizeGrid
                columnCount={NUM_COLUMNS}
                columnWidth={COLUMN_WIDTH}
                height={ROW_HEIGHT} // Height of a single row for column headers
                rowCount={1}
                rowHeight={ROW_HEIGHT}
                width={typeof window !== 'undefined' ? window.innerWidth - 100 : 800} // Adjust as needed
              >
                {ColumnHeader}
              </FixedSizeGrid>
              <FixedSizeGrid
                columnCount={NUM_COLUMNS}
                columnWidth={COLUMN_WIDTH}
                height={typeof window !== 'undefined' ? window.innerHeight - 280 - ROW_HEIGHT : 500 - ROW_HEIGHT} // Adjust height as needed
                rowCount={NUM_ROWS}
                rowHeight={ROW_HEIGHT}
                width={typeof window !== 'undefined' ? window.innerWidth - 100 : 800} // Adjust as needed
                ref={gridRef}
                onScroll={({ scrollLeft, scrollTop }) => {
                  if (rowHeaderRef.current) {
                    rowHeaderRef.current.scrollTo({ top: scrollTop });
                  }
                }}
              >
                {Cell}
              </FixedSizeGrid>
            </div>
          </div>
        </div>

        {selectedCell && (
          <input
            type="text"
            ref={inputRef}
            className="absolute bg-gray-700 text-gray-100 border border-purple-500 rounded py-1 px-2 text-sm focus:outline-none"
            style={{
              top: `${gridRef.current?.currentOffset.y + (selectedCell.split(/(\d+)/).filter(Boolean)[1] - 1) * ROW_HEIGHT + 200}px`, // Adjust based on actual layout
              left: `${gridRef.current?.currentOffset.x + (selectedCell.charCodeAt(0) - 65) * COLUMN_WIDTH + 60}px`, // Adjust based on actual layout
              width: `${COLUMN_WIDTH - 2}px`,
              height: `${ROW_HEIGHT - 2}px`,
            }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        )}

        <div className="mt-4 text-center">
          <button
            onClick={handleOpenAIAssistant}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Open AI Assistant
          </button>
        </div>
      </main>

      <nav className="bg-gray-800 p-4 flex justify-around items-center border-t border-gray-700">
        <Link href="/spreadsheet" className="flex flex-col items-center text-purple-400">
          <span className="text-2xl">📊</span>
          <span className="text-xs mt-1">Spreadsheet</span>
        </Link>
        <Link href="/analytics" className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition duration-300">
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