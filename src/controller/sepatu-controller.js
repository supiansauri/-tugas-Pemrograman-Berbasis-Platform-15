import sepatuService from "../service/sepatu-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await sepatuService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) =>{
    try {
        const idSepatu = req.params.idSepatu;

        const result = await sepatuService.get(idSepatu);
        res.status(200).json({
            data: result,
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const idSepatu = req.params.idSepatu;
        const request = req.body;
        request.id = idSepatu;

        const result = await sepatuService.update(user, request);
        res.status(200).json({
            data: result,
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const idSepatu = req.params.idSepatu;

        await sepatuService.remove(user, idSepatu);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req,res,next) => {
    try {
        const request = {
            merk: req.query.merk,
            ukuran: req.query.ukuran,
            harga: req.query.harga,
            stok: req.query.stok,
            warna: req.query.warna,
        }

        const result = await sepatuService.search(request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (e) {
        next(e) 
    }
}

export default {
    create, get, update, remove, search
}