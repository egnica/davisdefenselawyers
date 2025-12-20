import React from "react";
import styles from "../page.module.css";
import HeroPractice from "../components/heroPractice";
import Form from "../components/ContactForm";

function contact() {
  return (
    <>
      <HeroPractice
        title={"Contact Andrew Davis Minnesota Defense Attorney"}
        tag={"Confidential, judgment-free legal guidance when it matters most"}
      />
      <div className={styles.defenseContain}>
        <p>
          Being charged with a crime or even facing the possibility can feel
          overwhelming. You may be unsure of your rights, worried about what
          comes next, or hesitant to reach out. At Davis Criminal Defense, we
          understand that good people find themselves in difficult situations
          every day.
        </p>
        <p>
          Attorney Andrew Davis provides experienced, straightforward criminal
          defense representation across Minnesota. Whether you are dealing with
          a DUI, assault charge, drug offense, or another criminal matter,
          taking action early can make a meaningful difference in the outcome of
          your case.
        </p>
        <p>
          Use the form below to request a free, confidential case evaluation.
          Your information is kept private, and there is no obligation. If your
          situation is urgent, calling or texting directly is always encouraged.
        </p>
      </div>
      <Form />
      <div className={styles.defenseContain}>
        <p>
          Once your message is received, our office will review your information
          promptly and reach out to discuss next steps. You will speak directly
          with Andrew Davis—not a call center or assistant—so you can get clear
          answers and honest guidance about your situation.
        </p>
        <p>
          If you are facing criminal charges in Minnesota and need trusted legal
          representation, don’t wait. The sooner you act, the more options you
          may have available.
        </p>
        <p>
          <strong>Call or text today</strong> to take the first step toward
          protecting your rights and your future.
        </p>
      </div>
    </>
  );
}

export default contact;
