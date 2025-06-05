import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditTask from './EditTask';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMovieList } from '../slices/MovieSlice';
import { fetchMovies, deleteMovie } from '../slices/MovieSlice';
import dayjs from "dayjs";
const MovieTables = () => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.tasks);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  useEffect(() => {
  console.log("Fetched movie list:", movieList);
}, [movieList]);

  const editTask = (task) => {
  setModalShow(true);
  console.log(task.yearOfRelease)
  dispatch(setSelectedMovieList({
    id: task.id,
    movie: task.name,
    producer: task.Producer?.name || "",
    yearOfRelease: task.releaseDate,
    actors: task.Actors?.map(actor => actor.name) || []
  }));
};

  const deleteTask = (task) => {
  const confirmed = window.confirm("Are you sure you want to delete this movie?");
  if (confirmed) {
    dispatch(deleteMovie(task.id))
      .then(() => {
        toast.success("Movie deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete movie.");
      });
  }
};

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>Movie Name</th>
            <th>Producer Name</th>
            <th>Year Of Release</th>
            <th>Actors</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {movieList && movieList.map((task, index) => (
          
    <tr className='text-center' key={task.id}>
    
      <td>{index + 1}</td>
      <td>{task.name}</td>
      <td>{task.Producer?.name || 'N/A'}</td>
     <td>{dayjs(task.releaseDate).format("YYYY-MM-DD")}</td>
      <td>{task.Actors?.map(actor => actor.name).join(', ') || 'N/A'}</td>
      <td>
        <Button variant="primary" className='mx-3' onClick={() => editTask(task)}>Edit</Button>
        <Button variant="danger" className='mx-3' onClick={() => deleteTask(task)}>Delete</Button>
      </td>
    </tr>
  ))}
        </tbody>
      </Table>

      <EditTask
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch(fetchMovies());
        }
        }
      />
    </div>
  );
};

export default MovieTables;