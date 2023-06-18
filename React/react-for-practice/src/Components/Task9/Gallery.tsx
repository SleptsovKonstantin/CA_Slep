import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import "./style.css";

interface Idata {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IHandleClick {
  selected: number;
}

const Gallery = () => {
  const [photos, setPhotos] = useState<Idata[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PER_PAGE: number = 10;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${PER_PAGE}`
      );
      setPhotos(result.data);
      setPageCount(Math.ceil(result.headers["x-total-count"] / PER_PAGE));
    };
    fetchData();
  }, [currentPage]);

  const handlePageClick = (data: IHandleClick) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <>
      <div className="gallery">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.url} alt={photo.title} />
        ))}
      </div>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={2}
        previousLabel="< previous"
        nextLabel="next >"
      />
    </>
  );
};

export default Gallery;
