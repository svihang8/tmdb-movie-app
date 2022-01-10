import { movies } from "./getMovies";
import axios from "axios";
import React, { Component } from 'react'

export default class Movies extends Component {

    constructor() {
        super();
        this.state = {
            hover:'',
            parr:[1],
            currPage: 1,
            movies: [],
            favourites:[...JSON.parse(localStorage.getItem("favourites") || "[]")]
        }
    }


    changeMovies= async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a1fd0bc98f7b4afebfc14ed3c1e68845&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        console.log(data);
        this.setState ({
            movies:[...data.results]
        })       
    }

    handleright = () => {
        let tempparr =[];
        for(let i = 1 ; i <= this.state.parr.length + 1 ; i++) {
            tempparr.push(i);
        }
        this.setState({
            parr:tempparr,
            currPage: this.state.currPage+1
        }, this.changeMovies)
    }

    handleleft = () => {
        if(this.state.currPage!=1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }

    handleClick = (index) => {
        this.setState({
            currPage: index
        }, this.changeMovies)
    }

    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a1fd0bc98f7b4afebfc14ed3c1e68845&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        console.log(data);
        this.setState ({
            movies:[...data.results]
        })
    }

    handlefavourites = (movie) => {
        let olddata = JSON.parse(localStorage.getItem("favourites") || "[]");
        if(this.state.favourites.includes(movie.id)) {
            olddata = olddata.filter((m)=>{return m.id != movie.id});
        } else {
            olddata.push(movie);
        }
        localStorage.setItem("favourites", JSON.stringify(olddata));
        console.log(olddata);
        let temp = [];
        olddata.forEach(m => {
            temp.push(m.id);
        });
        this.setState({
            favourites:[...temp]
        })
    }


    render() {
        // let listofmovies = movies.results;
        return (
            <>
            <center><h3>Center</h3></center>
            {
                this.state.movies.length == 0 ? 
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <div className="d-flex justify-content-around movie-card-container flex-wrap">
                {this.state.movies.map((movie) => {
                    return (
                        <>
                        <div class="card movie-card" onMouseEnter={()=>this.setState({hover: movie.id})}>
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} class="card-img-top movie-img" alt="..."/>
                            {/* <div class="card-body"> */}
                                <h5 class="card-title movie-title">{
                                    movie.title == undefined ?
                                    `${movie.original_name}` :
                                    `${movie.original_title}`
                                }</h5>
                                {/* <p class="card-text">{`${movie.overview}`}</p> */}
                                <div className="button-wrapper" style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                    {
                                        this.state.hover == movie.id &&
                                        
                                        <a class="btn btn-primary movie-button" onClick={()=>{this.handlefavourites(movie)}}>{this.state.favourites.includes(movie.id) ? 'Remove Favourites' : 'Add to Favourites'}</a> 
                                    }
                                </div>
                            {/* </div> */}
                        </div>
                        </>                        
                    )
                })}
                </div>
            }
            <div style={{display: "flex", justifyContent : "center"}}>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handleleft} href="#">Previous</a></li>
                        {
                            this.state.parr.map((idx) => {
                                return (
                                <li class="page-item"><a class="page-link" onClick={()=>{this.handleClick(idx)}} href="#">{idx}</a></li>
                                )
                            })
                        }
                        {/* <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li> */}
                        <li class="page-item"><a class="page-link" onClick={this.handleright} href="#">Next</a></li>
                    </ul>
                </nav>
            </div>           
            
            
            
            
            
            
            </>
        )
    }
}
