import { Heading } from "@chakra-ui/layout";

const Header = ({ title, message, userName }) => (
  <header>
    <Heading as="h1" size="xl" color="#111">
      {title} {userName}
    </Heading>
    <Heading as="h2" size="md" fontWeight="normal" color="#111">
      {message}
    </Heading>
  </header>
);

export default Header;
