import React, { useState, useEffect } from "react";
import Card from "../components/Card";
function Scroll() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  function handleScroll(e) {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getData(page = 1) {
    try {
      const resp = await fetch(
        `http://localhost:3000/machines?page=${page}&limit=12`
      );
      const data = await resp.json();
      setCurrentPage(page);
      setCars([...cars, ...data.results]);
      setFetching(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData(currentPage);
  }, []);

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (fetching) {
      setCurrentPage(currentPage => currentPage + 1)
    }
  }, [fetching]);

  return (
    <div>
      <div className="container mx-auto flex flex-wrap gap-4 justify-center">
        {cars.length &&
          cars.map((el, index) => {
            return <Card cars={el} key={index}></Card>;
          })}
      </div>
    </div>
  );
}

export default Scroll;
