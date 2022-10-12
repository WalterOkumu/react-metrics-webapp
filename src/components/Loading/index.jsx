import ReactLoading from 'react-loading';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ReactLoading type="bubbles" color="#4369b2" height={667} width={375} />
  </div>
);

export default Loading;
