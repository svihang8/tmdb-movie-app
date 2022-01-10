import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            genres:['h'],
            activeGenre: 'All Genres',
            movies:[],
            currSearch: "",
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {
        let favouritedata = JSON.parse(localStorage.getItem("favourites") || "[]");
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp = [];
        favouritedata.forEach((movieObj) => {
            if(!temp.includes(genreids[movieObj.genre_ids[0]]) && genreids[movieObj.genre_ids[0]] != undefined) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres')
        temp.push('Other')
        // this.setState({
        //     genres:[...temp]
        // })        
        this.setState({
            movies:[...favouritedata],
            genres:[...temp]
        }
        )
    }

    handleGenre = (genre) => {
        this.setState({
            activeGenre: genre
        })
    }

    sortPopulariyDesc = () => {
        let smovies = this.state.movies.sort((m1, m2) => (m1.popularity > m2.popularity) ? 1 : -1);
        this.setState({
            movies: smovies
        })
    }

    sortPopulariyAsc = () => {
        let smovies = this.state.movies.sort((m1, m2) => (m1.popularity < m2.popularity) ? 1 : -1);
        this.setState({
            movies: smovies
        })
    }

    sortRatingDesc = () => {
        let smovies = this.state.movies.sort((m1, m2) => (m1.vote_average < m2.vote_average) ? 1 : -1);
        this.setState({
            movies: smovies
        })
    }

    sortRatingAsc = () => {
        let smovies = this.state.movies.sort((m1, m2) => (m1.vote_average > m2.vote_average) ? 1 : -1);
        this.setState({
            movies: smovies
        })
    }

    render() {
            let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
            27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};    
            let displayMovies = [];
            if(this.state.activeGenre == 'All Genres') {
                displayMovies = this.state.movies
            } else if(this.state.activeGenre == 'Other') {
                displayMovies = this.state.movies.filter((movieObj) => {
                    return (typeof genreids[movieObj.genre_ids[0]]) !== "string"
                })
            } else {
                displayMovies = this.state.movies.filter((movieObj)=>{
                    return (genreids[movieObj.genre_ids[0]] == this.state.activeGenre)
                })               
            }
            console.log(displayMovies)
            displayMovies = displayMovies.filter((m)=>{
                let name = m.original_title || m.original_name;
                return name.includes(this.state.currSearch)
            })
            let pages = Math.ceil(displayMovies.length / this.state.limit)
            let pagesarr = [];
            for(let i = 1 ; i <= pages ; i++) {
                pagesarr.push(i)
            }
            let si = (this.state.currPage - 1) * this.state.limit;
            let ei = si + parseInt(this.state.limit);
            console.log(ei);
            displayMovies = displayMovies.slice(si, ei)

            
            return (
            <>
            <div className='row'>
                <div className='col-lg-3 col-sm-12 col-md-12'>
                    <ul class="list-group">
                        {
                            this.state.genres.map((genre) => {
                                if(genre == this.state.activeGenre) {
                                    return(
                                        <>
                                        <li class="list-group-item" style={{background:'#3f51b5', color:'white', fontWeight: 'bold'}}>{genre}</li>
                                        </>
    
                                    )    
                                } else {
                                    return(
                                        <>
                                        <li class="list-group-item" style={{background:'white', color:'#3f51b5'}} onClick={()=>this.handleGenre(genre)}>{genre}</li>
                                        </>
                                    )    
                                }
                            })
                        }
                    </ul>
                </div>
                <div className='col-lg-9 col-sm-12 col-md-12'>
                    <div className='row'>
                        <input type="text" class="input-group-text col" placeholder='Search Movie' value={this.state.currSearch} onChange={(e)=>this.setState({currSearch: e.target.value})}/>
                        <input type="number" class="input-group-text col" placeholder='Number of Movies' value={this.state.limit} onChange={(e)=>this.setState({limit: e.target.value})}/>
                    </div>
                    <div className='row'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><i className='fas fa-sort-up' onClick={this.sortPopulariyDesc}></i>Popularity<i className='fas fa-sort-down' onClick={this.sortPopulariyAsc}></i></th>
                                    <th scope="col"><i className='fas fa-sort-up' onClick={this.sortRatingDesc}></i>Rating<i className='fas fa-sort-down' onClick={this.sortRatingAsc}></i></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayMovies.map((movieObj)=>{
                                    return(
                                        <>
                                            <tr>
                                                <td scope='row'>
                                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width: '10rem'}}/>
                                                    {movieObj.original_title || movieObj.original_name}
                                                </td>

                                                <td scope='row'>{genreids[movieObj.genre_ids[0]] || 'Other'}</td>

                                                <td scope='row'>{movieObj.popularity}</td>

                                                <td scope='row'>{movieObj.vote_average}</td>

                                                <td><button type="button" class="btn btn-danger">Delete</button></td>


                                            </tr>
                                        </>
                
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#" onClick={()=>this.setState({currPage: Math.max(1, this.state.currPage - 1)})}>Previous</a></li>
                                {
                                    pagesarr.map((pageidx) => {
                                        return (
                                        <li class="page-item"><a class="page-link" href="#" onClick={()=>this.setState({currPage: pageidx})}>{pageidx}</a></li>
                                    )})
                                }
                                <li class="page-item"><a class="page-link" href="#" onClick={()=>this.setState({currPage: Math.min(pagesarr.length, this.state.currPage + 1)})}>Next</a></li>
                            </ul>
                        </nav>    
                    </div>
                </div>
            </div>

            
            
            </>
        )
    }
}
