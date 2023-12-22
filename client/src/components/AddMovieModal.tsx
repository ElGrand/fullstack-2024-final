import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import {Fa0} from "react-icons/fa6";
import {CREATE_MOVIE} from "../mutations/movieMutations.tsx";
import {GET_MOVIES} from "../queries/movieQueries.tsx";
export default function AddMovieModal() {
    const [title, setTitle] = useState('');
    // const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    // const [director, setDirector] = useState('');
    const [actors, setActors] = useState('');
    // const [description, setDescription] = useState('');
    // const [poster, setPoster] = useState('');
    // const [imdbRating, setImdbRating] = useState('');

    const [createMovie] = useMutation(CREATE_MOVIE, {
        variables: {title: title, year: year, actors: actors },
        update(cache, { data: { createMovie } }) {
            const { movies }: any = cache.readQuery({ query: GET_MOVIES });
            cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: [...movies, createMovie] },
            });
        }
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title === '' || year === '') {
            return alert('Please add a movie');
        }

        // Convert the year to an integer
        const yearAsInt = parseInt(year, 10);

        // Call the createMovie mutation with the integer year value
        createMovie({
            variables: {
                title: title,
                year: yearAsInt,
                actors: actors,
            },
        }).then(() => {
            // Additional logic after successful mutation
            setTitle('');
            setYear('');
            setActors('');
        }).catch((error) => {
            console.error('Error creating movie:', error);
            // Handle error appropriately (e.g., show an error message)
        });
    };

    return (
      <>
          <button type="button" className="btn btn-seondary" data-bs-toggle="modal" data-bs-target="#addMovieModal">
              <div className="d-flex align-items-center">
                  <FaUser className='icon'/>
                    <div>Add Movie</div>
              </div>
          </button>

          <div className="modal fade" id="addMovieModal" aria-labelledby="addMovieModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="addMovieModalLabel">Add Movie</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} aria-describedby="titleHelp"/>
                                    <div id="titleHelp" className="form-text">Enter the title of the movie</div>
                                </div>
                                {/*<div className="mb-3">*/}
                                {/*    <label htmlFor="genre" className="form-label">Genre</label>*/}
                                {/*    <input type="text" className="form-control" id="genre" value={genre} onChange={e => setGenre(e.target.value)} aria-describedby="genreHelp"/>*/}
                                {/*    <div id="genreHelp" className="form-text">Enter the genre of the movie</div>*/}
                                {/*</div>*/}
                                <div className="mb-3">
                                    <label htmlFor="year" className="form-label">Year</label>
                                    <input type="number" className="form-control" id="year" value={year} onChange={e => setYear(e.target.value)} aria-describedby="yearHelp"/>
                                    <div id="yearHelp" className="form-text">Enter the year of the movie</div>
                                </div>
                                {/*<div className="mb-3">*/}
                                {/*    <label htmlFor="director" className="form-label">Director</label>*/}
                                {/*    <input type="text" className="form-control" id="director" value={director} onChange={e => setDirector(e.target.value)} aria-describedby="directorHelp"/>*/}
                                {/*    <div id="directorHelp" className="form-text">Enter the director of the movie</div>*/}
                                {/*</div>*/}
                                <div className="mb-3">
                                    <label htmlFor="actors" className="form-label">Actors</label>
                                    <input type="text" className="form-control" id="actors" value={actors} onChange={e => setActors(e.target.value)} aria-describedby="actorsHelp"/>
                                    <div id="actorsHelp" className="form-text">Enter the actors of the movie</div>
                                </div>
                                {/*<div className="mb-3">*/}
                                {/*    <label htmlFor="description" className="form-label">Description</label>*/}
                                {/*    <textarea className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3}></textarea>*/}
                                {/*</div>*/}
                                {/*<div className="mb-3">*/}
                                {/*    <label htmlFor="poster" className="form-label">Poster</label>*/}
                                {/*    <input type="text" className="form-control" id="poster" aria-describedby="posterHelp"/>*/}
                                {/*    <div id="posterHelp" className="form-text">Enter the poster of the movie</div>*/}
                                {/*</div>*/}
                                {/*<div className="mb-3">*/}
                                {/*    <label htmlFor="imdbRating" className="form-label">IMDB Rating</label>*/}
                                {/*    <input type="number" className="form-control" id="imdbRating" value={imdbRating} onChange={e => setImdbRating(e.target.value)} aria-describedby="imdbRatingHelp"/>*/}
                                {/*    <div id="imdbRatingHelp" className="form-text">Enter the IMDB Rating of the movie</div>*/}
                                {/*</div>*/}
                              <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">
                                  Submit
                              </button>
                          </form>
                      </div>
                      {/*<div className="modal-footer">*/}
                      {/*    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
                      {/*    <button type="button" className="btn btn-primary">Save changes</button>*/}
                      {/*</div>*/}
                  </div>
              </div>
          </div>
      </>
    );
}