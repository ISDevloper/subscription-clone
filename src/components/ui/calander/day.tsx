export const Day = ({ children, day }: any) => {
  const isToday = true;
  const isSelected = true;
  const isWithinRange = true;
  return children({ isToday, isSelected, day, isWithinRange });
};

export const DayRow = ()=>{
    return <tr></tr>
}