import { Type } from './type';
import { GenreDTO } from './models/genreDTO';

export class Anime {
    id: string;
    name: string;
    originalName: string;
    duration: number;
    rating: number;
    imageUrl: string;
    desc: string;
    player: string;
    type: Type;
    genres: GenreDTO[];

    constructor(id: string, name: string, rating: number, originalName: string, duration: number, imageUrl: string, desc: string, type: Type, genres: GenreDTO[], player: string) {
        this.id = id;
        this.name = name;
        this.originalName = originalName;
        this.rating = rating;
        this.duration = duration;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.type = type;
        this.genres = genres;
        this.player = player;
    }

}
