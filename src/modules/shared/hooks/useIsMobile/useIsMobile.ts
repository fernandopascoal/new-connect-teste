import { useMedia } from 'react-use';

const useIsMobile = () => {
  return useMedia('(max-width: 768px)', true);
};

export default useIsMobile;
