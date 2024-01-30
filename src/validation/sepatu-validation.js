import Joi from "joi";

const createSepatuValidation = Joi.object({
    merk: Joi.string().max(25).required(),
    ukuran: Joi.string().max(4).required(),
    warna: Joi.string().max(10).required(),
    harga: Joi.number().positive().required(),
    stok: Joi.number().positive().required(),
})

const getSepatuValidation = Joi.number().required()

const updateSepatuValidation = Joi.object({
    id:  Joi.number().required(),
    merk: Joi.string().max(25).optional(),
    ukuran: Joi.string().max(4).optional(),
    warna: Joi.string().max(10).optional(),
    harga: Joi.number().positive().optional(),
    stok: Joi.number().positive().optional(),
})

const searchSepatuValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(1),
    merk: Joi.string().max(25).optional(),
    ukuran: Joi.string().max(4).optional(),
    warna: Joi.string().max(10).optional(),
    harga: Joi.number().positive().optional(),
    stok: Joi.number().positive().optional(),
})

export {
    createSepatuValidation,
    getSepatuValidation,
    updateSepatuValidation,
    searchSepatuValidation,
}