import Image from "next/image";
import styles from "../page.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.aboutIntro}>
        <div className={styles.aboutPortraitPanel}>
          <Image
            width={600}
            height={900}
            className={styles.aboutImage}
            priority
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-3.webp"
            alt="Andrew Davis, Minnesota Criminal Defense Attorney"
          />
          <div className={styles.contactCard}>
            <a href="mailto:andrew.davis@davisdefenselawyers.com">
              andrew.davis@davisdefenselawyers.com
            </a>
            <a href="tel:+19529941568">(952) 994-1568</a>
          </div>
        </div>

        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow}>Meet your attorney</p>
          <h2>Minnesota Criminal Defense Lawyer</h2>
          <p className={styles.aboutLead}>
            Experienced criminal defense representation across Minnesota.
          </p>
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

          <div className={styles.aboutInset}>
            <h3>Criminal Defense Experience That Matters</h3>
            <p>
              Andrew handles cases ranging from misdemeanors to serious felony
              charges. His practice focuses exclusively on criminal defense,
              giving clients direct access to a lawyer who understands Minnesota
              criminal law, court procedures, and how prosecutors build cases.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <p className={styles.eyebrow}>A clear way forward</p>
        <h2>A Practical, Client-Focused Defense Approach</h2>
        <div className={styles.aboutTextColumn}>
          <p>
            At Davis Defense Lawyers, the philosophy is straightforward: good
            people are accused of crimes every day, and everyone deserves a
            strong defense. Andrew approaches each case with care, preparation,
            and attention to detail, never treating a client like just another
            file.
          </p>
          <p>From the first conversation through resolution, clients can expect:</p>
          <ul className={styles.aboutList}>
            <li>Straightforward explanations of charges and potential outcomes</li>
            <li>Honest assessments of risk and strategy</li>
            <li>Prompt communication and availability</li>
            <li>Aggressive advocacy inside and outside the courtroom</li>
          </ul>
          <p>
            Every case is different, and Andrew tailors his defense strategy to
            the facts, the law, and the goals of the client, whether that means
            seeking a dismissal, negotiating reduced charges, or taking a case
            to trial.
          </p>
        </div>
      </section>

      <section className={styles.aboutFeature}>
        <div>
          <p className={styles.eyebrow}>Statewide representation</p>
          <h2>Serving the Twin Cities and Greater Minnesota</h2>
          <p>
            Davis Defense Lawyers represents clients in Minneapolis, St. Paul,
            Hennepin County, Ramsey County, Carver County, Duluth, St. Cloud,
            Rochester, and communities throughout Minnesota.
          </p>
          <p>
            No matter where a charge originates, Andrew works to ensure that
            clients receive the same level of attention, preparation, and
            advocacy.
          </p>
        </div>
        <Image
          width={680}
          height={520}
          className={styles.aboutMedia}
          alt="State of Minnesota"
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/minnesota.webp"
        />
      </section>

      <section
        className={[styles.aboutFeature, styles.aboutFeatureReverse].join(" ")}
      >
        <Image
          width={600}
          height={720}
          className={styles.aboutMedia}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-court-1.webp"
          alt="Andrew Davis in a courtroom"
        />
        <div>
          <p className={styles.eyebrow}>Direct attorney access</p>
          <h2>What Sets Andrew Davis Apart</h2>
          <ul className={styles.aboutList}>
            <li>Treats clients with respect and compassion</li>
            <li>Takes time to explain the process and options</li>
            <li>Is accessible and responsive when questions arise</li>
            <li>Focuses on real-world outcomes, not just legal theory</li>
          </ul>
          <p>
            Facing criminal charges can feel isolating. Andrew’s goal is to make
            sure clients never feel alone or uninformed while their case is
            pending.
          </p>
        </div>
      </section>

      <section className={styles.aboutCta}>
        <p className={styles.eyebrow}>Free and confidential</p>
        <h2>Speak Directly With a Minnesota Criminal Defense Lawyer</h2>
        <p>
          If you or a loved one is facing criminal charges, early action
          matters. Call or text Andrew directly to discuss what happened and
          understand the next step.
        </p>
        <a className={styles.primaryAction} href="tel:+19529941568">
          Call or text (952) 994-1568
        </a>
      </section>
    </div>
  );
}

export default About;
