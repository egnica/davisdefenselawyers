import Nav from "../components/nav";
import Hero from "../components/heroPractice.jsx";
export const metadata = {
  title: "About Andrew Davis | Minnesota Criminal Defense Lawyer",
  description:
    "Learn about Andrew Davis, a Minnesota criminal defense attorney dedicated to protecting clients facing serious criminal charges across Hennepin County and the Twin Cities.",
};

export default function AboutLayout({ children }) {
  return (
    <>
      <Nav />
      <Hero
        title={"About Andrew Davis"}
        tag={
          "Learn about Andrew Davis, a Minnesota criminal defense attorney."
        }
      />
      <section>{children}</section>
    </>
  );
}
