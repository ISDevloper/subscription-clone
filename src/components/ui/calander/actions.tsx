export const Actions = ({ children }: any) => {
  return children;
};

export const Previous = () => {
  return <button className="py-2 bg-black text-white">move prev month</button>;
};

export const Next = () => {
  return <button className="py-2 bg-black text-white">move next month</button>;
};
