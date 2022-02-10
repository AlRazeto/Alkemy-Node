const  boom  = require('@hapi/boom');
const express = require('express')
const {models} = require('./../libs/sequelize')

async function addToCharacters(id, movie){
    const target = await models.Characters.findByPk(id)
    if(!target){
        console.warn(id +' does not exist yet');
        return
    }else if(target.movies.includes(movie)){
        console.log(id+" up to date");
        return
    }else{
        models.Characters.update({
            movies :[
                ...target.movies,
                movie
            ]
        },{where: 
            {name: id}
        });
    }
}
async function removeFromCharacters(cast, movie){
    for(const actor of cast){
        const target = await models.Characters.findByPk(actor)
        console.log("actor: " + actor)
        if(!target){
        }else if(target.movies.includes(movie)){
            let arr = target.movies
            arr.splice(target.movies.indexOf(movie));
            await models.Characters.update({
                movies: arr
            },{
                where: {name: actor}
            });
            console.log("------------------")
            console.log(target.movies);
            console.log(target)
            console.log("------------------")
            
        }else if(!target.movies.includes(movie)) { }
    }
}

class MovieService{
    constructor(){

    }
    async getAll(){
        const movies = await models.Movie.findAll({
            include: 'actors'
        });
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
            throw boom.badRequest('invalid query value for order')
        }
        ;
    }
    async getbyGenre(gen){
        const genre = await models.Genre.findByPk(gen,{
            include: ['genre_movies']
        });
        if(!genre){
            throw boom.notFound('genre not found')
        }else{
            return genre.movies
        };
    }
    async getOne(id){
        const movie = await models.Movie.findByPk(id);
        if(!movie){
            throw boom.notFound('movie not found')
        }else{
            return movie
        }
    }
    async create(data){
        const newMovie = await models.Movie.create(data);
        for (const actor of data.characters){
            models.CharacterMovie.create({
                movies : data.title,
                actors : actor 
            });
            addToCharacters(actor, data.title)
        }
        return newMovie
    }
    async update(data,id){ 
        const prevCast = await (await models.Movie.findByPk(id)).getDataValue('characters');
        console.log("prevCast : "+ prevCast)
        await models.Movie.update(data, {
            where: { title: id }
        });
        if(data.characters){
            models.CharacterMovie.destroy({
                where: {movies: id}
            })
            .then(()=>{
                for(const actor of data.characters){
                    models.CharacterMovie.create({
                        movies: id,
                        actors: actor
                    });
                };
            })
            .catch(err=>{
                console.error(err)
            });
            for(const actor of data.characters){
                await removeFromCharacters(prevCast, id);
                addToCharacters(actor, id)
            }
        };
        const updated = await models.Movie.findByPk(id)
        if(!updated){
            throw boom.notFound('movie not found');
        }
        return updated
        
    }
    async delete(id) {
        const prevCast = await(await models.Movie.findByPk(id)).getDataValue('characters');
        await models.Movie.destroy({
            where: { title: id }
        })
        .then(()=>{
            removeFromCharacters(prevCast, id)
            return {movie : id}
        })
        .catch(err=>{
            console.error(err)
        });
    }
};

module.exports= MovieService