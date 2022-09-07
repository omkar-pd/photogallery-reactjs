import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./Loader";
import { Input } from "./Input";
import { Images } from "./Images";
import { Header } from "./Header";

export const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  const [query, setQuery] = useState();
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(200);

  const isMounted = useRef(false);
  const CLIENT_ID = process.env.REACT_APP_UNSPLASH_CLIENT_ID;
  const BASE_URL = `https://api.unsplash.com`;

  useEffect(() => {
    fetchImagesonLoad();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      fetchQueryImages();
    } else {
      isMounted.current = true;
    }
  }, [query]);

  const fetchImagesonLoad = async () => {
    if (status !== 200) return;
    if (imagesOnLoad.length >= 120) {
      setHasMore(false);
      return;
    }
    const res = await axios
      .get(`${BASE_URL}/photos/random?client_id=${CLIENT_ID}&count=30`)
      .catch(function (error) {
        setStatus(error.response.status);
      });
    const data = res.data;
    setImagesOnLoad((prevImages) => {
      return [...prevImages, ...data];
    });
  };

  const fetchQueryImages = async () => {
    if (status !== 200) return;
    setImagesOnLoad([]);
    if (images.length >= 120) {
      setHasMore(false);
      return;
    }
    const res = await axios
      .get(
        `${BASE_URL}/search/photos?query=${query}&page=${page}&per_page=30&client_id=${CLIENT_ID}`
      )
      .catch(function (error) {
        setStatus(error.response.status);
      });
    const data = res.data.results;
    setImages((prevImages) => {
      return [...prevImages, ...data];
    });
    setPage((prev) => {
      return prev + 1;
    });
  };

  return (
    <div className="font-header">
      <Header></Header>
      <Input
        query={query}
        setQuery={setQuery}
        setImages={setImages}
        setHasMore={setHasMore}
      ></Input>
      {query && (
        <h2 className="text-center font-bold text-3xl p-3">
          {" "}
          Search result for {query}
        </h2>
      )}
      {imagesOnLoad.length > 0 && (
        <InfiniteScroll
          className="mx-3 p-5"
          dataLength={imagesOnLoad.length}
          next={fetchImagesonLoad}
          hasMore={hasMore}
          loader={<Loader></Loader>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                Yay! You have seen it all, Results are limited to 120 photos due
                to limited number of API Requests
              </b>
            </p>
          }
        >
          <Images data={imagesOnLoad} />
        </InfiniteScroll>
      )}
      {images.length > 0 && (
        <InfiniteScroll
          className="mx-3 p-5"
          dataLength={images.length}
          next={fetchQueryImages}
          hasMore={hasMore}
          loader={<Loader></Loader>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                Yay! You have seen it all, Results are limited to 120 photos due
                to limited number of API Requests
              </b>
            </p>
          }
        >
          <Images data={images} />
        </InfiniteScroll>
      )}
      {status === 200 || (
        <p className="text-center text-black text-bold text-4xl p-5 mt-6">
          Images Not Found or API Limit exceeded
        </p>
      )}
    </div>
  );
};
