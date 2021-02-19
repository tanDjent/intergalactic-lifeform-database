import React from "react";

function Footer() {
  return (
    <div
      className=' container-fluid pt-3 position-absolute bottom-0'
      style={{ backgroundColor: "black", color: "white" }}
    >
      <div className='row'>
        <div className='col-12  text-center' style={{ lineHeight: "75%" }}>
          <h4>© No Copyrights, managed by the Council of Ricks</h4>
          <p>
            Credits:{" "}
            <a href='https://rickandmortyapi.com/' target='blank'>
              Rick and Morty API
            </a>
          </p>
          <p>
            Check out more projects by :{" "}
            <a href='https://tandjent.github.io/' target='blank'>
              Tanmay Verma
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
