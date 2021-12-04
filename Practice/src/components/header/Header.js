import "./Header.scss";

const Header = ({ title, message, userName }) => (
    <header>
        <h1>{title} {userName}</h1>
        <p>{message}</p>
    </header>
);

export default Header;