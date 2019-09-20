import React, {useState, useEffect} from 'react'
import axios from 'axios'


//styles
import { Button, Form } from 'semantic-ui-react'
const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: 89,
    stars: [],
}

export default function UpdateForm(props) {
    const [movie, setMovie] = useState(initialMovie);

    const { match, movies } = props;

    useEffect(() => {
      const id = match.params.id;
      const movieToUpdate = movies.find(movie => `${movie.id}` === id);
      if (movieToUpdate) {
        setMovie(movieToUpdate);
      }
    }, [match, movies]);

    const handleChanges = ev => {
        ev.persist();
        let value = ev.target.value;
        
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };


    const handleSubmit = () => {
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
        props.history.push(`/movies/${movie.id}`)
        setMovie(initialMovie)
        console.log(movies)
        props.updateMovies(movies.map(film => {
            if (film.id === movie.id) {
                return movie
             }
             return film;
        }))
        console.log(movies)
    }

    return (

        <Form onSubmit={handleSubmit} style={{padding: '5%'}}>
            <Form.Field>
                <label>Title</label>
                <input 
                placeholder='Title' 
                name='title'
                value={movie.title}
                onChange={handleChanges}
                />
            </Form.Field>
            <Form.Field>
                <label>Director</label>
                <input 
                placeholder='Director' 
                name='director'
                onChange={handleChanges}
                value={movie.director}

                />
            </Form.Field> 
            <Form.Field>         
                <label>Metascore</label>
                <input 
                placeholder='Metascore' 
                name='metascore'
                onChange={handleChanges}
                value={movie.metascore}

                />
            </Form.Field>                

            <Button type='submit'>Update</Button>
        </Form>
    )
        
}
        
