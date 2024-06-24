import { Gouvernorat } from "./gouvernorat";
import { TypeTribunal } from "./typeTribunal";

export class Tribunal {
    id?;
    
    nom_tribunal: string;


    typeTribunal:TypeTribunal;
    gouvernorat :Gouvernorat;
}
