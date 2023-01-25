import React, { useState, useEffect } from 'react';

import './App.css';



const BOOKS = [
  { id: 1, name: 'Da Vinchi Code', status: true },
  { id: 2, name: 'Inception Point', status: true },
  { id: 3, name: 'Twisted LOve', status: true },
  { id: 4, name: 'Lion', status: true },
  { id: 5, name: 'Harry Potter', status: true },
];

function App() {

  const [allBooks, setallBooks] = useState(BOOKS);
  const [name, setName] = useState('');
  const [newBook, setnewBook] = useState('');

  const [foundBooks, setfoundBooks] = useState(allBooks);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = allBooks.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setfoundBooks(results);
    } else {
      setfoundBooks(allBooks);
    }
    setName(keyword);
  };

  const updateNewBook = (e) => {
    const newBook = e.target.value;
    setnewBook(newBook);
  }
  const addNewBook = () => {
    const generatedId = Math.floor(Math.random() * 100)
    setallBooks([...allBooks, { id: generatedId, name: newBook, status: true }]);
    setfoundBooks([...foundBooks, { id: generatedId, name: newBook, status: true }]);
  }

  const setStatus = (id) => {
    const ind = allBooks.map(x => x.id).indexOf(Number(id));
    const newList = [...allBooks];
    newList[ind] = { ...newList[ind], status: false }
    setallBooks(newList);
    setfoundBooks(newList);
    setnewBook('');
  }

  return (
    <div className="container">
      <input type="text" name="" value={newBook} onChange={updateNewBook} />
      <button onClick={addNewBook}>Add new book</button>
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />

      <div className="user-list">
        {foundBooks && foundBooks.length > 0 ? (
          foundBooks.map((user) => (
            <li key={user.id} className="user">
              <span className="user-id">{user.id}</span>
              <span className="user-name">{user.name}</span>
              <span className="user-age">{`${user.status ? 'Available' : 'Not available'} `} </span>

              <button onClick={() => { setStatus(user.id) }}>Rent</button>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
}

export default App;