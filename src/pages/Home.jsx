import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Card from "../components/Card";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [limit, steLimit] = useState(5);
  const [cars, setCars] = useState([]);
  async function getData(page = 1, limit = 5) {
    const resp = await fetch(
      `http://localhost:3000/machines?page=${page}&limit=${limit}`
    );
    const data = await resp.json();
    setTotal(data.total);
    setCars(data.results);
    console.log(data);
  }

  const [searchParams, setParams] = useSearchParams();

  useEffect(() => {
    getData(searchParams.get("page"), searchParams.get("limit"));
  }, [currentPage]);

  function handlePaginate(event, page) {
    navigate({
      pathname: "",
      search: `?${createSearchParams({
        page: page,
        limit: 5,
      })}`,
    });
    setCurrentPage(page);
  }
  return (
    <div>
      <div className="container mx-auto flex flex-wrap gap-4 justify-center mt-4">
        {cars.length &&
          cars.map((el, index) => {
            return <Card cars={el} key={index}></Card>;
          })}
      </div>
      <div className="container mx-auto text-right flex justify-end mt-20 mb-20">
        <Pagination
          count={Math.trunc(total / limit)}
          color="primary"
          onChange={handlePaginate}
        />
      </div>
    </div>
  );
}

export default Home;
