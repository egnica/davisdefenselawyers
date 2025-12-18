/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../[slug]/page.module.css";

function list({ object, index }) {
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
              <div>
                <p>{object.body}</p>
                <ul>
                  {object.items.map((item, i) => {
                    // 1) Normal bullet: string
                    if (typeof item === "string") {
                      return <li key={i}>{item}</li>;
                    }

                    // 2) Structured bullet: { lead, text } (or fallback keys)
                    const lead = item.lead || item.title || item.q || "";
                    const text = item.text || item.description || item.a || "";

                    return (
                      <li key={i}>
                        {lead ? <strong>{lead} </strong> : null}
                        {text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default list;
