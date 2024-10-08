import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allWordsApi } from '../apiService/wordsApi';

const BasicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      if (!searchTerm) return setSearch(false);
      const result = await allWordsApi(searchTerm);
      if (result && result.length) {
        setSearchResult(result);
      }
      return setSearch(false);
    };

    fetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = async () => {
    if (!search) setSearch(true);
  };

  return (
    <div className="basic-searchearch">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter a word to search..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResult.length > 0 &&
          searchResult.map((word) => (
            <Link
              to={`/words/${word.word}`}
              key={word.id}
              className="basic-searchearch-link"
            >
              {word.word}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BasicSearch;
