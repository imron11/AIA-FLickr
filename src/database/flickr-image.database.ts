import Realm from "realm";
import _ from "lodash";

class FlickrImageSchema extends Realm.Object {
    static schema: { name: string; primaryKey: string; properties: { id: string; url: string, title: string, link: string; }; };
}

FlickrImageSchema.schema = {
    name: "Image",
    primaryKey: 'id',
    properties: {
        id: 'int',
        url: 'string',
        title: 'string',
        link: 'string'
    }
}

// Create realm
let realm = new Realm({ schema: [FlickrImageSchema], schemaVersion: 2 });

let getAllSavedImage = () => {
    return realm.objects('Image');
}

let getSavedImageById = (_id: number) => {
    return realm.objects('Image').filtered(`id = ${_id}`);
}

let addImage = async (_url: string, _title: string, _link: string) => {
    let _id: number = 0;
    const images = await (getAllSavedImage() as any);
    const imagesLenth = images.length;
    
    if (imagesLenth > 0) {
        const maxId = _.get(_.maxBy(images, 'id'), 'id');
        _id = maxId + 1;
    }

    realm.write(() => {
        const image = realm.create('Image', {
            id: _id,
            url: _url,
            title: _title,
            link: _link
        });

        return image;
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