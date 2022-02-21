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
        console.log(movies)
        movies.sort(async(a,b)=>{
            let first = await a.getDataValue('title');
            let second=await b.getDataValue('title');
            ()=>first.localCompare(second);
        });
        if(ord=='ABC'){
            return movies
        }else if(ord=='DESC'){
            return movies.reverse()
        }else{
            throw boom.badRequest('invalid query value for order')
        };
    }
    async getbyGenre(gen){
        const genre = await models.Genre.findByPk(gen,{
            include: ['genreMovies']
        });
        if(!genre){
            throw boom.notFound('genre not found')
        }else{
            return genre.genreMovies
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
        if(!newMovie){
            throw boom.conflict('Movie already exists')
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
            throw boom.notFound('movie not found')
        });
    }
    async servicesGenre(data, movie, service){
        const exists = await models.Movie.findByPk(movie)
        if(!exists){
            throw boom.notFound('movie not found');
        }else{
            if(service=="add"){
                for(const genre of data.genre){
                    const target = await models.Genre.findByPk(genre)
                    if(!target){
                        throw boom.notFound(genre+ ' not found')
                    };
                    if(target.movies.includes(movie)){
                        throw boom.conflict('movie is alredy in genre')
                    }else{
                        await models.Genre.update({
                            movies:[...target.movies, movie]
                        },{
                            where: {name : genre}
                        })
                        await models.MovieGenre.create({
                            movies: movie,
                            genres: genre
                        });
                    }
                }
                return await models.Genre.findAll()
            }else if(service=="remove"){
                for(const genre of data.genre){
                    const target = await models.Genre.findByPk(genre)
                    if(!target){
                        throw boom.notFound(genre +' not found')
                    };
                    if(target.movies.includes(movie)){
                        target.movies.splice(target.movies.indexOf(movie))
                        await models.Genre.update({
                            movies:target.movies
                        },{
                            where: {name : genre}
                        })
                        await models.MovieGenre.destroy({
                            where:{movies: movie}
                        });
                    }else{
                        console.log(movie +' was not in '+genre)
                    }
                }
            }else{
                throw boom.badRequest('invalid parameter')
            }
        };
    };
};

module.exports= MovieService