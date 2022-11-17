import ElementWrapper from '../components/ElementWrapper';

const NotFound = (): JSX.Element | null => {
  return (
    <ElementWrapper width="m">
      <h1>Not found</h1>
      <p>Ohh no! That page was not found :(</p>
    </ElementWrapper>
  );
};

export default NotFound;
