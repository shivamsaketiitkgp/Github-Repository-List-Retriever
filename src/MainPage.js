import React, { useEffect } from "react";
import "./MainPage.css";
import RepoCard from "./RepoCard";

function MainPage() {
  const totalCount = 1000;
  const [items, setItems] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("Javascript");
  const [searchType, setSearchType] = React.useState("language");
  const [sortType, setSortType] = React.useState("stars");
  const [sortValue, setSortValue] = React.useState("asc");
  const [loading, setLoading] = React.useState(false);

  const fetchRepos = async (pageNumber, pageSize) => {
    if (searchText.length === 0) {
      return;
    }
    setLoading(true);

    try {
      const url = `https://api.github.com/search/repositories?q=${
        searchType === "name" ? "" : searchType + ":"
      } ${searchText}&sort=${sortType}&order=${sortValue}&page=${pageNumber}&per_page=${pageSize}`;
      const result = await fetch(url);

      if (result.status === 200) {
        const data = await result.json();

        setItems(data.items);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRepos(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  return (
    <div>
      <h1>Repositories</h1>
      <br />
      <hr />
      <br />
      <p>
        Repositories showing: <b>{items.length ?? 0}</b>
      </p>

      <br />

      {/* Page Section */}
      <p className="page-controller">
        Page: &nbsp;
        <button
          onClick={() => {
            if (pageNumber >= 0) {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          Prev
        </button>
        &nbsp;
        <input
          type="number"
          value={pageNumber}
          onChange={(event) => {
            const newNum = parseInt(event.target.value);
            setPageNumber(newNum);
          }}
        />
        &nbsp; / {Math.ceil(totalCount / pageSize)}
        &nbsp;
        <button
          onClick={() => {
            if (pageNumber < totalCount / pageSize) {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          Next
        </button>
      </p>
      <br />

      {/* Page Size Section */}
      <p>
        Page Size: &nbsp;
        <input
          type="number"
          value={pageSize}
          onChange={(event) => {
            setPageSize(parseInt(event.target.value));
          }}
        />
      </p>
      <br />

      {/* Search Section */}
      <p>
        Search: &nbsp;
        <input
          type="text"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        &nbsp;
        <select
          name="search-type"
          onChange={(event) => setSearchType(event.target.value)}
        >
          <option value="language">Language</option>
          <option value="name">Name</option>
        </select>
        &nbsp;
        <button
          onClick={() => {
            fetchRepos(pageNumber, pageSize);
          }}
        >
          Search
        </button>
      </p>
      <br />

      {/* Sort Section */}
      <p>
        Sort: &nbsp;
        <select
          name="sort-type"
          onChange={(event) => setSortType(event.target.value)}
        >
          <option value="stars">Stars</option>
          <option value="name">Name</option>
        </select>
        &nbsp;
        <select
          name="sort-value"
          onChange={(event) => setSortValue(event.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        &nbsp;
        <button
          onClick={() => {
            fetchRepos(pageNumber, pageSize);
          }}
        >
          Filter
        </button>
      </p>

      {loading && <div className="loader"></div>}

      <br />
      <hr />
      <br />

      {/* List of Repositories */}
      <div className="repo-container">
        {items.map((item, index) => (
          <RepoCard key={`repo_${index}`} repo={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
