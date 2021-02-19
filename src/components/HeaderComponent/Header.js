import React from "react";
import { Jumbotron } from "reactstrap";
import RAndMTitle from "../../assets/rickandmortytitle.png";
import "./Header.css";
export default function Header() {
  return (
    <Jumbotron>
      <img
        className='rick-and-morty-title'
        src={RAndMTitle}
        alt='logo'
        className='title-image'
      />
      <h2 className='schwifty-title' style={{ marginTop: "0.5rem" }}>
        Intergalactic Lifeform Database
      </h2>
    </Jumbotron>
  );
}
