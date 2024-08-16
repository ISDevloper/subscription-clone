export const Card = ({ children }) => {
  return children;
};

const Title = () => {
  return <h1>title</h1>;
};

const Body = () => {
  return <div>Body</div>;
};

Card.Title = Title;
Card.Body = Body;
