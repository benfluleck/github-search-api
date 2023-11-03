import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button aria-label="goBack" onClick={() => navigate(-1)}>
      <svg height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h48v48h-48z" fill="none" />
        <path
          d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z"
          fill="#C0C0C0"
        />
      </svg>
    </button>
  );
};

export default BackButton;
