import SearchBar from "./SearchBar.jsx";
import HeaderCarousel from "./HeaderCarousel.jsx";

function Header() {
  return (
    <>
      <header className="mt-3 w-full px-6 shadow-md shadow-gray-200/50">
        <SearchBar />
        <HeaderCarousel />
      </header>
    </>
  );
}

export default Header;
