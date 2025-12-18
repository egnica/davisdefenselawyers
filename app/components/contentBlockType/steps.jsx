/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../[slug]/page.module.css";

function Steps({ object, index = 0 }) {
  const hasImage = !!object?.image;
  const bodyClass = hasImage ? styles.bodyImage : styles.bodyNoImage;

  const steps = Array.isArray(object?.steps) ? object.steps : [];

  const Media = hasImage ? (
    <img src={object.image} alt={object.title || ""} />
  ) : null;

  const TextAndSteps = (
    <>
      {object?.body ? <p>{object.body}</p> : null}

      {steps.length ? (
        <ol>
          {steps.map((s, i) => {
            const text =
              typeof s === "string" ? s : s?.step || s?.text || s?.body || "";

            if (!text) return null;

            return <li key={i}>{text}</li>;
          })}
        </ol>
      ) : null}
    </>
  );

  return (
    <div>
      {object?.title ? <h2>{object.title}</h2> : null}

      <div className={bodyClass}>
        {index % 2 === 0 ? (
          <>
            {TextAndSteps}
            {Media}
          </>
        ) : (
          <>
            {Media}
            {TextAndSteps}
          </>
        )}
      </div>
    </div>
  );
}

export default Steps;
