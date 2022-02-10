const boom  = require('@hapi/boom')
const express = require('express')
const {models} = require('./../libs/sequelize')

async function addToMovies(movie, actor){
    const target = await models.Movie.findByPk(movie)
    if(!target){
        console.warn(movie +' does not exist yet');
        return
    }else if(target.characters.includes(actor)){
        console.log(movie+" up to date");
        return
    }else{
        models.Movie.update({
            characters :[
                ...target.characters,
                actor
            ]
        },{where: 
            {title: movie}
        });
    }
}

async function removeFromMovies(movies, actor){
    for(const movie of movies){
        const target = await models.Movie.findByPk(movie)
        console.log("movie: " + movie)
        if(!target){
        }else if(target.characters.includes(actor)){
            let arr = target.characters
            arr.splice(target.characters.indexOf(actor));
            await models.Movie.update({
                characters: arr
            },{
                where: {title: movie}
            });
            console.log("------------------")
            console.log(target.characters);
            console.log(target)
            console.log("------------------")
            
        }else if(!target.characters.includes(actor)) { }
    }
}

class CharacterService {
    constructor(){

    }
    async create(data){
        const newChar = await models.Characters.create(data);
        for (const movie of data.movies){
            models.CharacterMovie.create({
                movies : data.title,
                actors : actor 
            });
            addToMovies(movie, data.name)
        }
        return newChar
    }
    async getAll(){
        const response = await models.Characters.findAll({
            include: 'moviesIn'
        })
        return response
    };
    async getByMovie(id){
        const response = await models.Characters.findAll({
            where:{ movie: id }
        })
        if(!response){
            throw boom.notFound('no one in that movie or movie does not exist')
        }
        else{
        return response
        };
    };
    async getByAge(id){
        const response = await models.Characters.findAll({
            where:{ age: id },
        });
        if(!response){
            throw boom.notFound('no one with that age was found')
        }
        else{
        return response
        };
    };
    async getOne(id){
        const response = await models.Characters.findByPk(id);
        if(!response){
            throw boom.notFound('character not found')
        };
        return response
    };
    async update(id,data){ 
        const prevMovies = await (await models.Characters.findByPk(id)).getDataValue('movies');
        console.log("prevMovies : "+ prevMovies)
        await models.Characters.update(data, {
            where: { name: id }
        });
        if(data.movies){
            models.CharacterMovie.destroy({
                where: {actors: id}
            })
            .then(()=>{
                for(const movie of data.movies){
                    models.CharacterMovie.create({
                        actors: id,
                        movies: movie
                    });
                };
            })
            .catch(err=>{
                console.error(err)
            });
            for(const movie of data.movies){
                await removeFromMovies(prevMovies, id);
                addToMovies(movie, id)
            }
        };
        const updated = await models.Characters.findByPk(id)
        if(!updated){
            throw boom.notFound('character not found');
        }
        return updated
    };
    async delete(id){
        const prevMovies = await(await models.Characters.findByPk(id)).getDataValue('characters');
        await models.Characters.destroy({
            where: { name: id }
        })
        .then(()=>{
            removeFromMovies(prevMovies, id)
            return {name : id}
        })
        .catch(err=>{
            console.error(err)
        });
    };
};

module.exports = CharacterService