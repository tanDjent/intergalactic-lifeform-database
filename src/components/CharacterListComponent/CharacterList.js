import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./CharacterList.css";
import { DebounceInput } from "react-debounce-input";
import {
  Card,
  CardImg,
  CardTitle,
  List,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faHeartbeat,
  faQuestion,
  faSkullCrossbones,
  faVenusMars,
  faGlobeAsia,
  faMale,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
export default function CharacterList() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", checkScrollTop);

  //top scroll code ends here
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const apiUrl = "https://rickandmortyapi.com/api/character/";
  const [lastPage, setLastPage] = useState();
  const [characters, setCharacters] = useState([]);
  const [pagenum, setPagenum] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [numOfCharacters, setNumOfCharacters] = useState(0);
  const [modalCharacter, setModalCharacter] = useState({
    name: "",
    gender: "",
    status: "",
    location: { name: "" },
    species: "",
    origin: { name: "" },
  });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (pagenum != lastPage && searchQuery === "") {
            setIsLoading(true);
            setPagenum(pagenum + 1);
          } else {
            setHasMore(false);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  useEffect(() => {
    axios
      .get(apiUrl + "?page=" + pagenum)
      .then(({ data }) => {
        setIsLoading(false);
        setLastPage(data.info.pages);
        setCharacters(data.results);
        setNumOfCharacters(data.results.length);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (searchQuery === "") {
      setPagenum(1);
      axios
        .get(apiUrl + "?page=" + pagenum)
        .then(({ data }) => {
          setIsLoading(false);
          setCharacters(data.results);
          setNumOfCharacters(data.results.length);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      axios
        .get(apiUrl + "?name=" + searchQuery)
        .then(({ data }) => {
          setIsLoading(false);
          setCharacters(data.results);
          setNumOfCharacters(data.results.length);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setCharacters([]);
          setNumOfCharacters(0);
        });
    }
  }, [searchQuery]);
  useEffect(() => {
    if (pagenum === lastPage) setHasMore(false);
    axios
      .get(apiUrl + "?page=" + pagenum)
      .then(({ data }) => {
        setIsLoading(false);
        setCharacters([...characters, ...data.results]);
        setNumOfCharacters(data.results.length + numOfCharacters);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [pagenum]);
  return (
    <div className='container-fluid'>
      <Modal isOpen={modal} toggle={toggle} className='character-modal'>
        <ModalHeader toggle={toggle}>Character Details</ModalHeader>
        <ModalBody>
          <div className='row'>
            <div className='col-6'>
              {" "}
              <img
                src={modalCharacter.image}
                alt={modalCharacter.name}
                className='modal-image'
              />
            </div>
            <div className='col-6 modal-character-name'>
              <h4>{modalCharacter.name}</h4>
              <h4>
                {modalCharacter.status === "Alive" ? (
                  <FontAwesomeIcon icon={faHeartbeat} />
                ) : modalCharacter.status === "Dead" ? (
                  <FontAwesomeIcon icon={faSkullCrossbones} />
                ) : (
                  <FontAwesomeIcon icon={faQuestion} />
                )}{" "}
                {modalCharacter.status}- {modalCharacter.species}
              </h4>
            </div>
          </div>
          <hr className='solid'></hr>
          <div
            className='row'
            style={{ marginBottom: "2rem", marginTop: "1rem" }}
          >
            <div className='col-6'>
              <h6>
                <FontAwesomeIcon icon={faVenusMars} /> Gender:{" "}
                {modalCharacter.gender}
              </h6>
            </div>
            <div className='col-6'>
              <h6>
                <FontAwesomeIcon icon={faGlobeAsia} /> Location:{" "}
                {modalCharacter.location.name}
              </h6>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <h6>
                {" "}
                <FontAwesomeIcon icon={faMale} /> Species:{" "}
                {modalCharacter.species}
              </h6>
            </div>
            <div className='col-6'>
              <h6>
                <FontAwesomeIcon icon={faCircle} /> Origin:{" "}
                {modalCharacter.origin.name}
              </h6>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <FontAwesomeIcon
        className='scrollTop'
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "flex" : "none" }}
        icon={faArrowCircleUp}
      />
      <div className='row'>
        <div className='col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
          <DebounceInput
            className='search-field'
            placeholder=' Search Character'
            minLength={3}
            debounceTimeout={500}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
          <List type='unstyled'>
            {characters.map(
              (
                { image, name, location, gender, status, species, origin },
                index
              ) => {
                if (numOfCharacters === index + 1 && searchQuery === "") {
                  return (
                    <li key={index} ref={lastElement}>
                      <Card
                        onClick={() => {
                          setModalCharacter(characters[index]);
                          toggle();
                        }}
                      >
                        <div className='row'>
                          <div className='col-6'>
                            <CardImg
                              key={Date.now()}
                              className='card-image'
                              src={image}
                              alt={name}
                            />
                          </div>
                          <div className='col-6 character-status'>
                            <CardTitle tag='h3'>{name}</CardTitle>
                            <h4>
                              {status === "Alive" ? (
                                <FontAwesomeIcon icon={faHeartbeat} />
                              ) : status === "Dead" ? (
                                <FontAwesomeIcon icon={faSkullCrossbones} />
                              ) : (
                                <FontAwesomeIcon icon={faQuestion} />
                              )}{" "}
                              {status}- {species}
                            </h4>
                          </div>
                        </div>
                      </Card>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <Card
                      onClick={() => {
                        setModalCharacter(characters[index]);
                        toggle();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className='row'>
                        <div className='col-6'>
                          <CardImg
                            key={Date.now()}
                            className='card-image'
                            src={image}
                            alt={name}
                          />
                        </div>
                        <div className='col-6 character-status'>
                          <CardTitle tag='h3'>{name}</CardTitle>
                          <h4>
                            {status === "Alive" ? (
                              <FontAwesomeIcon icon={faHeartbeat} />
                            ) : status === "Dead" ? (
                              <FontAwesomeIcon icon={faSkullCrossbones} />
                            ) : (
                              <FontAwesomeIcon icon={faQuestion} />
                            )}{" "}
                            {status}- {species}
                          </h4>
                        </div>
                      </div>
                    </Card>
                  </li>
                );
              }
            )}
          </List>
          {hasMore && searchQuery === "" && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}
