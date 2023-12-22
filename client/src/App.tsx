import Header from "./components/Header.tsx";
import { useState } from "react";
import { useQuery, gql} from "@apollo/client";
import Movies from "./components/Movies.tsx";
import AddMovieModal from "./components/AddMovieModal.tsx";

function App() {

    // const {loading, error, data} = useQuery(GET_MOVIES);
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error :({error.message})</p>

return (
        <>
            <Header />
            <div className='container'>
                <AddMovieModal/>
                <Movies/>
            </div>
        </>
    );
}
export default App;
