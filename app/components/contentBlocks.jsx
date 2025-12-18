import Section from "./contentBlockType/section";
import Steps from "./contentBlockType/steps";
import List from "./contentBlockType/list";

function ContentBlocks({ content, index }) {
  if (!content || !content.type) return null;

  switch (content.type) {
    case "section":
      return <Section object={content} index={index} />;

    case "steps-section":
      return <Steps object={content} index={index} />;

    case "list-section":
      return <List object={content} index={index} />;

    default:
      return null; // or return <div>Unknown block type: {content.type}</div>;
  }
}

export default ContentBlocks;
