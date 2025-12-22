/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../[slug]/page.module.css";

export default function ListSection({ object, index }) {
  const bodyClass =
    object.image && object.image !== "" ? styles.bodyImage : styles.bodyNoImage;

  const hasImage = Boolean(object.image);
  const hasItems = Array.isArray(object.items) && object.items.length > 0;
  const imageEl = hasImage ? (
    <img src={object.image} alt={object.title || ""} />
  ) : null;

  return (
    <div>
      {object.title && <h2>{object.title}</h2>}

      <div className={bodyClass}>
        {/* Left / Right layout */}
        {index % 2 === 0 ? (
          <>
            <div>
              {object.body && <p>{object.body}</p>}

              {hasItems && (
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
              )}
            </div>

            {imageEl}
          </>
        ) : (
          <>
            {imageEl}

            <div>
              {object.body && <p>{object.body}</p>}

              {hasItems && (
                <ul>
                  {object.items.map((item, i) => {
                    if (typeof item === "string") {
                      return <li key={i}>{item}</li>;
                    }

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
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
