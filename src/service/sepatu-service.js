import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createSepatuValidation, getSepatuValidation, searchSepatuValidation, updateSepatuValidation } from "../validation/sepatu-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    const sepatu = validate(createSepatuValidation, request);
    sepatu.username = user.username;

    return prismaClient.sepatu.create({
        data: sepatu
    })
}

const get = async (idSepatu) => {
    idSepatu = validate(getSepatuValidation, idSepatu);

    const sepatu = await prismaClient.sepatu.findUnique({
        where: {
            id: idSepatu
        }
    })

    if (!sepatu){
        throw new ResponseError(404, "sepatu tidak di temukan")
    }

    return sepatu;
}

const update = async (user, request) => {
    const sepatu = validate(updateSepatuValidation, request);

    const totalSepatu = await prismaClient.sepatu.count({
        where: {
            username: user.username,
            id: sepatu.id
        }
    })

    if (totalSepatu !== 1){
        throw new ResponseError(404, "sepatu tidak di temukan")
    }

    return prismaClient.sepatu.update({
        where: {
            id: sepatu.id
        },
        data: {
            merk: sepatu.merk,
            ukuran: sepatu.ukuran,
            stok: sepatu.stok,
            warna: sepatu.warna,
            harga: sepatu.harga,
        }
    })
}

const remove = async (user, idSepatu) => {
    idSepatu = validate(getSepatuValidation, idSepatu);
    
    const totalSepatu = await prismaClient.sepatu.count({
        where: {
            username: user.username,
            id: idSepatu
        }
    })

    if (totalSepatu !== 1){
        throw new ResponseError(404, "sepatu tidak di temukan")
    }

    return prismaClient.sepatu.delete({
        where: {
            id: idSepatu
        }
    })
}

const search = async (request) => {
    request = validate(searchSepatuValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    if (request.merk){
        filters.push({
            merk: {
                contains: request.merk
            }
        })
    }

    if (request.ukuran){
        filters.push({
            ukuran: {
                contains: request.ukuran
            }
        })
    }

    if (request.harga){
        filters.push({
            harga: {
                contains: request.harga
            }
        })
    }

    if (request.stok){
        filters.push({
            stok: {
                contains: request.stok
            }
        })
    }

    if (request.warna){
        filters.push({
            warna: {
                contains: request.warna
            }
        })
    }

    const sepatu = await prismaClient.sepatu.findMany({
        where: {
            AND: filters,
        },
        take: request.size,
        skip: skip,
    })

    const totalSepatu = await prismaClient.sepatu.count({
        where: {
            AND: filters
        }
    })

    return {
        data: sepatu,
        paging: {
            page: request.page,
            total_item: totalSepatu,
            total_page: Math.ceil(totalSepatu / request.size),
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search,
}