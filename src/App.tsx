import './App.css'
import { Route, Routes } from 'react-router-dom';
import DishList from './containers/DishList/DishList.tsx';
import DishForm from './containers/DishForm/DishForm.tsx';
import Header from './containers/Header/Header.tsx';

const App = () => {


  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<DishList />} />
          <Route path="/admin/dishes" element={<DishList />} />
          <Route path="/admin/dishes/add" element={<DishForm />} />
          <Route path="/admin/dishes/edit/:id" element={<DishForm />} />
          </Routes>
    </>
  )
};

export default App
