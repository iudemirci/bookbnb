import HomeCard from "./HomeCard.jsx";

function HomeList() {
  return (
    <ul className="">
      {[...Array(2)].map((_, idx) => (
        <HomeCard key={idx} />
      ))}
    </ul>
  );
}

export default HomeList;
