import Realm from "realm";
import _ from "lodash";

class FlickrImageSchema extends Realm.Object {
    static schema: { name: string; primaryKey: string; properties: { id: string; title: string, link: string; }; };
}

FlickrImageSchema.schema = {
    name: "Image",
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string',
        link: 'string'
    }
}

// Create realm
let realm = new Realm({ schema: [FlickrImageSchema], schemaVersion: 1 });

let getAllSavedImage = () => {
    return realm.objects('Image');
}

let getSavedImageById = (_id: number) => {
    return realm.objects('Image').filtered(`id = ${_id}`);
}

let addImage = (_title: string, _link: string) => {
    let _id: number = 0;
    const imagesLenth = (getAllSavedImage() as any).length;
    _id = imagesLenth  + 1;

    realm.write(() => {
        const image = realm.create('Image', {
            id: _id,
            title: _title,
            link: _link
        });
    });
}

let deleteImageById = (_id: number) => {
    return realm.write(() => {
        realm.delete(getSavedImageById(_id));
    });
}

export default realm;

export {
    getAllSavedImage,
    getSavedImageById,
    addImage,
    deleteImageById
}