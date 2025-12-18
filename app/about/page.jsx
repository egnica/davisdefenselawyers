/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
function about() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.splitTwo}>
        <div>
          <Image
            width={600}
            height={900}
            className={styles.aboutImage}
            priority
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-3.webp"
            alt="Andrew Davis, Minnesota Criminal Defense Attorney"
          />
          <div className={styles.contact}>
            <a href="mailto:andrew.davis@davisdefenselawyers.com">
              <p>andrew.davis@davisdefenselawyers.com</p>
            </a>
            <a href="tel:+19529941568">
              <p>(952) 994-15688</p>
            </a>
          </div>
        </div>
        <div className={styles.splitText}>
          <h2>Minnesota Criminal Defense Lawyer</h2>
          <h3>Experienced Criminal Defense Representation Across Minnesota</h3>
          <p>
            Andrew Davis is a Minnesota criminal defense lawyer dedicated to
            protecting the rights, freedom, and futures of people facing
            criminal charges. For more than a decade, Davis Defense Lawyers has
            represented clients throughout the Twin Cities and greater
            Minnesota, including Minneapolis, St. Paul, Hennepin County, and
            surrounding communities.
          </p>
          <p>
            Being accused of a crime is often one of the most stressful and
            uncertain moments in a person’s life. Andrew understands that most
            clients have never been in trouble before and are suddenly facing a
            system that feels intimidating, confusing, and unforgiving. His role
            is to step in immediately, explain what is happening, and build a
            clear plan forward.
          </p>
          <h3>Criminal Defense Experience That Matters</h3>
          <p>
            Andrew Davis has experience handling a wide range of criminal cases,
            from misdemeanors to serious felony charges. He understands
            Minnesota criminal law, court procedures, and how prosecutors build
            their cases. This experience allows him to anticipate challenges
            early and position clients for the strongest possible outcome.
          </p>
          <p>
            His practice focuses exclusively on criminal defense, giving clients
            the benefit of a lawyer who is deeply familiar with the system and
            fully committed to defending their rights.
          </p>
        </div>
      </div>

      <h3>A Practical, Client-Focused Defense Approach</h3>
      <p>
        At Davis Defense Lawyers, the philosophy is simple: good people are
        accused of crimes every day, and everyone deserves a strong defense.
        Andrew approaches each case with care, preparation, and attention to
        detail—never treating a client like just another file.
      </p>
      <p>From the first conversation through resolution, clients can expect:</p>
      <ul>
        <li>Straightforward explanations of charges and potential outcomes</li>
        <li>Honest assessments of risk and strategy</li>
        <li>Prompt communication and availability</li>
        <li>Aggressive advocacy inside and outside the courtroom</li>
      </ul>

      <p>
        Every case is different, and Andrew tailors his defense strategy to the
        facts, the law, and the goals of the client whether that means seeking a
        dismissal, negotiating reduced charges, or taking a case to trial.
      </p>
      <hr />
      <h3>Serving the Twin Cities and Greater Minnesota</h3>
      <p>
        Davis Defense Lawyers proudly serves clients across Minnesota,
        including:
      </p>
      <div className={styles.splitTwo}>
        <ul>
          <li>Minneapolis and St. Paul</li>
          <li>Hennepin County, MN and surrounding counties</li>
          <li>Ramsey County, MN and surrounding counties</li>
          <li>Carver County, MN and surrounding counties</li>
          <li>Duluth, St. Cloud, Rochester, and outstate communities</li>
        </ul>
        <img
          width={240}
          alt="state of MN"
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/minnesota.webp"
        />
      </div>
      <p>
        No matter where a charge originates, Andrew works to ensure that clients
        receive the same high level of attention, preparation, and advocacy.
      </p>
      <hr />
      <h3>What Sets Andrew Davis Apart</h3>
      <p>Clients often choose Andrew Davis because he:</p>
      <ul>
        <li>Treats clients with respect and compassion</li>
        <li>Takes time to explain the process and options</li>
        <li>Is accessible and responsive when questions arise</li>
        <li>Focuses on real-world outcomes, not just legal theory</li>
        <p>
          Facing criminal charges can feel isolating. Andrew’s goal is to make
          sure clients never feel alone or uninformed while their case is
          pending.
        </p>
      </ul>
      <h2>Speak Directly With a Minnesota Criminal Defense Lawyer</h2>
      <p>
        If you or a loved one is facing criminal charges, early action matters.
        A conversation with an experienced criminal defense attorney can make a
        meaningful difference in how a case unfolds.
      </p>
      <p>
        <strong>
          📞 Call or text Attorney Andrew Davis directly at{" "}
          <a href="tel:+19529941568">(952) 994-1568</a> to schedule a free,
          confidential consultation.
        </strong>
      </p>
    </div>
  );
}

export default about;
