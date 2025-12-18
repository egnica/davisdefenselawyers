/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../[slug]/page.module.css";

function Section({ object, index }) {
  const bodyClass =
    object.image && object.image !== "" ? styles.bodyImage : styles.bodyNoImage;
  return (
    <div>
      {object.title && <h2>{object.title}</h2>}
      <div className={bodyClass}>
        <>
          {index % 2 === 0 ? (
            <>
              <p>{object.body}</p>
              {object.image && <img src={object.image} alt={object.title} />}
            </>
          ) : (
            <>
              {object.image && <img src={object.image} alt={object.title} />}
              <p>{object.body}</p>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Section;
