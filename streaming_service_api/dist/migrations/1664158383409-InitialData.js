"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialData1664158383409 = void 0;
const fs = require("fs");
const NodeID3 = require("node-id3");
const imageThumbnail = require("image-thumbnail");
class InitialData1664158383409 {
    async up(queryRunner) {
        var _a, _b;
        const path = 'static/songs/';
        const coversPath = 'static/artists/';
        if (!fs.existsSync(path) || !fs.existsSync(coversPath))
            return;
        const fileNames = await fs.promises.readdir(path);
        const covers = await fs.promises.readdir(coversPath);
        const artistsData = new Map();
        for (const fileName of fileNames) {
            const file = fs.readFileSync(path + fileName);
            const tags = NodeID3.read(file);
            const artistTag = (_a = tags.artist) === null || _a === void 0 ? void 0 : _a.replace(/\//g, ':');
            const image = tags.image;
            if (!artistsData.has(artistTag)) {
                const coverName = covers.find((coverName) => coverName.includes(artistTag));
                artistsData.set(artistTag, {
                    albums: new Map(),
                    image: coverName ? await this.getCover(coversPath + coverName) : '',
                });
            }
            const artistData = artistsData.get(artistTag);
            if (!artistData.albums.has(tags.album)) {
                artistData.albums.set(tags.album, []);
            }
            const albumData = (_b = artistData.albums.get(tags.album)) !== null && _b !== void 0 ? _b : [];
            albumData.push({
                buffer: file,
                name: tags.title,
                fileName: fileName.replace(/'/g, `''`),
                duration: parseInt(tags.length),
                image: image && typeof image !== 'string'
                    ? await this.getThumbnail(image.imageBuffer, image.mime)
                    : '',
            });
        }
        await queryRunner.query(`INSERT INTO "artist" ("name", "image") VALUES ${Array.from(artistsData.entries())
            .map(([name, data]) => `('${name.replace(/'/g, `''`).replace(/:/g, `/`)}', '${data.image}')`)
            .join(', ')};`);
        const artists = await queryRunner.query('SELECT "a"."id", "a"."name", "a"."image" FROM "artist" "a"');
        await queryRunner.query(`INSERT INTO "album" ("name", "image", "artistId") VALUES ${Array.from(artistsData.entries())
            .reduce((acc, [artistName, { albums }]) => {
            const newAcc = [...acc];
            newAcc.push(...Array.from(albums.keys()).map((albumName) => {
                const data = [
                    albumName,
                    artists.find(({ name }) => name === artistName),
                ];
                return data;
            }));
            return newAcc;
        }, [])
            .filter(([, artist]) => !!artist)
            .map(([albumName, { id, image }]) => `('${albumName.replace(/'/g, `''`)}', '${image}', ${id})`)
            .join(', ')};`);
        const albums = await queryRunner.query('SELECT "a"."id", "a"."name", "a"."artistId" FROM "album" "a"');
        await queryRunner.query(`INSERT INTO "song" ("name", "filename", "path", "image", "duration", "artistId", "albumId") VALUES ${Array.from(artistsData.entries())
            .reduce((acc, [artistName, artistData]) => {
            const newAcc = [...acc];
            newAcc.push(...Array.from(artistData.albums.entries()).reduce((acc, [albumName, data]) => {
                const newAcc = [...acc];
                newAcc.push(...data.map((songData) => {
                    const data = [
                        songData,
                        artists.find(({ name }) => name === artistName),
                        albums.find(({ name }) => name === albumName),
                    ];
                    return data;
                }));
                return newAcc;
            }, []));
            return newAcc;
        }, [])
            .filter(([, artist, album]) => !!artist && !!album)
            .map(([songData, artist, album]) => `('${songData.name.replace(/'/g, `''`)}', '${songData.fileName}', '/songs/${songData.fileName}', '${songData.image}', ${songData.duration}, ${artist.id}, ${album.id})`)
            .join(', ')};`);
    }
    async down(queryRunner) {
        await queryRunner.query('DELETE FROM "song";');
        await queryRunner.query('DELETE FROM "album";');
        await queryRunner.query('DELETE FROM "artist";');
    }
    async getCover(path) {
        if (!fs.existsSync(path))
            return;
        const ext = path.split('.')[1];
        const mimetype = ext ? `image/${ext}` : undefined;
        return mimetype ? this.getThumbnail(path, mimetype) : undefined;
    }
    async getThumbnail(source, mimetype) {
        if (typeof source === 'string' && !fs.existsSync(source))
            return;
        const thumbnail = await imageThumbnail(source, {
            width: 100,
            height: 100,
            fit: 'cover',
        });
        return `data:${mimetype};base64,${Buffer.from(thumbnail).toString('base64')}`;
    }
}
exports.InitialData1664158383409 = InitialData1664158383409;
//# sourceMappingURL=1664158383409-InitialData.js.map