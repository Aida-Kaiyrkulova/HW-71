import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { deleteDish, fetchDishes } from '../../store/slices/dishesSlice.ts';
import { RootState } from '../../app/store.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

const DishList: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state: RootState) => state.dishes.dishes);
  const status = useAppSelector((state: RootState) => state.dishes.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDishes());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteDish(id));
  };

  return (
    <div className="container">
      <div className="dish-title">
        <h2>Dishes</h2>
        <Link to="/admin/dishes/add">
          <button>Add New Dish</button>
        </Link>
      </div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <div className="dish-list">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-item">
              <img src={dish.image} alt={dish.title}/>
              <h3>{dish.title}</h3>
              <p>{dish.price} KGS</p>
              <Link to={`/admin/dishes/edit/${dish.id}`}>
                <button>Edit</button>
              </Link>
              <button className="delete" onClick={() => handleDelete(dish.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DishList;