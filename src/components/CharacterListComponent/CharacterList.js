import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CharacterList.css";
import { DebounceInput } from "react-debounce-input";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  List,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faQuestion,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
export default function CharacterList() {
  const apiUrl = "https://rickandmortyapi.com/api/character/?page=";
  const [characters, setCharacters] = useState([]);
  const [pagenum, setPagenum] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios.get(apiUrl + pagenum).then(({ data }) => {
      setCharacters([...characters, ...data.results]);
    });
  }, []);
  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 col-sm-4 offset-sm-4'>
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
        <div className='col-12 col-sm-4 offset-sm-4'>
          <List type='unstyled'>
            {characters.map(
              (
                { image, name, location, gender, status, species, origin },
                index
              ) => {
                return (
                  <li key={index}>
                    <Card>
                      <div className='row'>
                        <div className='col-6'>
                          <CardImg
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
        </div>
      </div>
    </div>
  );
}
