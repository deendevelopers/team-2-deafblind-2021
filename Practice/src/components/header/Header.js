import "./Header.scss";

const Header = ({ title, message }) => (
    <header>
        <h1>{title}</h1>
        <p>{message}</p>
    </header>
);

export default Header;