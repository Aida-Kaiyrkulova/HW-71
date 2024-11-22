import { addDish, editDish } from '../../store/slices/dishesSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import React, { useEffect, useState } from 'react';

const DishForm: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const dishes = useSelector((state: RootState) => state.dishes.dishes);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (id) {
      const dish = dishes.find((dish) => dish.id === id);
      if (dish) {
        setTitle(dish.title);
        setPrice(dish.price);
        setImage(dish.image);
      }
    }
  }, [id, dishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dish = { title, price, image };
    if (id) {
      dispatch(editDish({ id, ...dish }));
    } else {
      dispatch(addDish(dish));
    }
    navigate('/admin/dishes');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>{id ? 'Edit' : 'Add'} Dish</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? 'Save Changes' : 'Add Dish'}</button>
      </form>
    </div>
  );
};

export default DishForm;