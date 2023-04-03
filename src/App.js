import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';
import Collection from './components/Collection'

const cats = [
	{ "name": "Все" },
	{ "name": "Море" },
	{ "name": "Горы" },
	{ "name": "Архитектура" },
	{ "name": "Города" }
]

function App() {
	const [collections, setCollections] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [categoryID, setCategoryID] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)

	useEffect(() => {
		setIsLoading(true)
		fetch(`https://63fdfc1bcd13ced3d7c3e0a4.mockapi.io/collections?${categoryID ? `category=${categoryID}`: ''}`)
			.then(res => res.json())
			.then(json => setCollections(json))
			.catch(error => {
				console.log(error.message)
				alert('Коллекции не получены')})
			.finally(() => setIsLoading(false))
	}, [categoryID])	

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {/* <li className="active">Все</li> */}
          {isLoading 
						? <h2>Loading...</h2> 
						:	cats.map((obj, index) => <li className={categoryID === index ? 'active' : ''} onClick={() => setCategoryID(index)} key={obj.name}>{obj.name}</li>)
					}
        </ul>
        <input 
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className="search-input"
					placeholder="Поиск по названию" />
      </div>
      <div className="content">
				{
					collections
						.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
						.map((obj, index) => 
						<Collection
							key={index}
          		name={obj.name}
          		images={obj.photos}
        		/>
					)
				}
      </div>
      <ul className="pagination">
				{
					[...Array(5)].map((_, index) => <li onClick={() => setPage(index+1)} className={page === index+1 ? "active" : ''} >{index+1}</li>)
				}
      </ul>
    </div>
  );
}

export default App;

