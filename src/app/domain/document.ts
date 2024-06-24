import { Accusation } from "./accusation";
import { Affaire } from "./affaire";
import { Arrestation } from "./arrestation";
import { ArretProvisoire } from "./arretProvisoire";
import { DocumentId } from "./documentId";
import { Enfant } from "./enfant";
import { Tribunal } from "./tribunal";
import { TypeAffaire } from "./typeAffaire";
import { TypeJuge } from "./typeJuge";

export class Document {
    // protected  documentId: DocumentId;
    // protected  typeDocument: string;
   documentId: DocumentId;
       typeDocument: string;
       
    constructor(documentId: DocumentId, typeDocument: string) {

        this.documentId = documentId;
        this.typeDocument = typeDocument;
    }


}












