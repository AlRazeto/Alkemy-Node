const { Boom } = require('@hapi/boom');
const express = require('express')
const {models} = require('./../libs/sequelize')

class MovieService{
    constructor(){

    }
    async getAll(){
        const movies = await models.Movie.findAll();
        return movies
    }
    async getAllOrd(ord){
        const movies = await models.Movie.findAll();
        const sortedMovies = movies.sort((a,b)=>a.title.localCompare(b.title));
        if(ord=='ABC'){
            return sortedMovies
        }else if(ord=='DESC'){
            return sortedMovies.reverse()
        }else{
            throw Boom.badRequest('invalid query value for order')
        }
        ;
    }
    async getbyGenre(gen){
        const genre = await models.Genre.findByPk(gen,{
            include: ['genre_movies']
        });
        if(!genre){
            throw Boom.notFound('genre not found')
        }else{
            return genre.movies
        };
    }
    async getOne(id){
        const movie = await models.Movie.findByPk(id);
        if(!movie){
            throw Boom.notFound('movie not found')
        }else{
            return movie
        }
    }
    async create(data){
        const newMovie = await models.Movie.create(data);
        return newMovie
    }
    async update(id, data){
        const updated = await models.Movies.update(data, {
            where: { title: id }
        });
        return updated
        
    }
    delete(id){
        models.Movie.destroy({
            where: { title: id }
        })
        .then()
        .catch(err=>{console.error(err)})
    }
};

module.exports= MovieService