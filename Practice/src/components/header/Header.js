import "./Header.scss";
import { Heading } from "@chakra-ui/layout";

const Header = ({ title, message, userName }) => (
  <header>
    <Heading as="h1" size="xl">
      {title} {userName}
    </Heading>
    <Heading as="h2" size="md">
      {message}
    </Heading>
  </header>
);

export default Header;
