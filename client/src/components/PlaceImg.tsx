import { PlaceImgPropsTypes } from '../types/interfaces';

const PlaceImg = ({ photos, index, className }: PlaceImgPropsTypes) => {
  if (photos?.length) {
    return <></>;
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <img
      className={className}
      src={'http://localhost:4000/uploads/' + photos[index]}
      alt=''
    />
  );
};

export default PlaceImg;
